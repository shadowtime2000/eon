
const { pathToRegexp } = require('path-to-regexp');

class PathResolvePlugin {
    constructor() {}

    /*match(expr, path) {
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
        let captureAll = false;
        let matches = true;
        ex.forEach((s, i) => {
            if (pt[i] == s) return; // Matches, so far...
            else if (s.startsWith(':') && pt[i] !== undefined) return; // Capture
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
        let captureAll = false;
        let captureKey = '';
        let pathInfo = {};
        ex.forEach((s, i) => {
            if (pt[i] == s) return; // Matches, so far...
            else if (s.startsWith(':') && pt[i] !== undefined) return pathInfo[s.substr(1)] = pt[i];
            else if (captureAll) return pathInfo[captureKey].push(pt[i]); // Capture All
            else if (s.startsWith('^') && pt[i] !== undefined){
                captureAll = true;
                captureKey = s.substr(1);
                pathInfo[captureKey] = [pt[i]];
            }
            else return (matches = false);
        });
        if (pt.length > ex.length && captureAll) {
            let p = pt.slice(ex.length);
            while (p.length > 0) pathInfo[captureKey].push(p.shift());
        }
        return pathInfo;
    }*/

    apply(engine) {
        engine.events.resolvePath.listen((engine, basePath, req, webEngine) => {
            let paths;
            engine.globals.unresolved = undefined;
            if (req.method == 'GET') paths = engine.globals._get_paths;
            if (req.method == 'POST') paths = engine.globals._post_paths;
            let keys = Object.keys(paths);
            let match = keys.find(path => pathToRegexp(path).exec(basePath.pathname));
            if (match === undefined) return (engine.globals.unresolved = true);
            let pathkeys = [];
            let matched = pathToRegexp(match, pathkeys).exec(basePath.pathname).slice(1);
            let pathInfo = matched.reduce((a, v, i) => {
                let o = a;
                o[pathkeys[i].name] = v;
                return o;
            }, {});
            engine.globals.path = paths[match];
            engine.globals.pathInfo = pathInfo;
        });
    }
}

module.exports = PathResolvePlugin;