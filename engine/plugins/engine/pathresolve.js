const log = require('../../../libs/log')('eonjs', 'EON_LOGLEVEL');

class PathResolvePlugin {
    constructor() {}

    match(expr, path) {
        // Syntax:
        // Basic: /foo/bar
        //          -> /foo/bar => true
        //          -> /foo/bar/baz => false
        // Capture a section: /user/:name
        //          -> /user/me => true
        //          -> /user/you => true
        //          -> /user => false
        // Capture all following: /^filepath
        //          -> /this => true
        //          -> /this/that => true
        //          -> /this/that/path/to/my/f/i/l/e => true
        //          -> / => true
        let ex = expr.split('/');
        let pt = path.split('/');
        // trim trailing /
        if (pt[pt.length - 1] === '' && ex[ex.length - 1] !== '') pt.pop();
        let captureAll = false;
        let matches = true;
        ex.forEach((s, i) => {
            if (pt[i] == s) return; // Matches, so far...
            else if (s.startsWith(':') && (pt[i] !== undefined && pt[i] !== "")) return; // Capture
            else if (captureAll) return; // Capture All
            else if (s.startsWith('^') && pt[i] !== undefined) return (captureAll = true);
            else return (matches = false);
        });
        if (pt.length > ex.length && !captureAll) return false;
        return matches;
    }

    resolve(expr, path) {
        let ex = expr.split('/');
        let pt = path.split('/');
        // trim trailing /
        if (pt[pt.length - 1] === '') pt.pop();
        let captureAll = false;
        let captureKey = '';
        let pathInfo = {};
        ex.forEach((s, i) => {
            if (pt[i] == s) return; // Matches, so far...
            else if (s.startsWith(':') && (pt[i] !== undefined && pt[i] !== "")) return pathInfo[s.substr(1)] = pt[i];
            else if (captureAll) return pathInfo[captureKey].push(pt[i]); // Capture All
            else if (s.startsWith('^') && pt[i] !== undefined){
                captureAll = true;
                captureKey = s.substr(1);
                pathInfo[captureKey] = [pt[i]];
            }
        });
        if (pt.length > ex.length && captureAll) {
            let p = pt.slice(ex.length);
            while (p.length > 0) pathInfo[captureKey].push(p.shift());
        }
        return pathInfo;
    }

    apply(engine) {
        engine.events.resolvePath.listen((engine, basePath, req, webEngine) => {
            let paths;
            engine.globals.unresolved = undefined;
            engine.globals.only_head = false;
            if (req.method == 'GET') paths = engine.globals._get_paths;
            if (req.method == 'HEAD') {
                paths = engine.globals._get_paths;
                engine.globals.only_head = true;
            }
            if (req.method == 'POST') paths = engine.globals._post_paths;
            if (req.method == 'PUT') paths = engine.globals._put_paths;
            let keys = Object.keys(paths);
            log('silly', 'resolving path', basePath.pathname);
            log('silly', 'from', keys);
            let match = keys.find(path => this.match(path, basePath.pathname));
            log('silly', 'found', match);
            if (match === undefined) return (engine.globals.unresolved = true);
            let pathInfo = this.resolve(match, basePath.pathname);
            engine.globals.path = paths[match];
            engine.globals.pathInfo = pathInfo;
            log('silly', 'path', engine.globals.path);
            log('silly', 'pathI', engine.globals.pathInfo);
        });
    }
}

module.exports = PathResolvePlugin;