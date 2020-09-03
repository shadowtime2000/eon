const http = require('http');
const { GETPath, POSTPath } = require('./path');
const createLog = require('../libs/log');
const log = createLog('eonjs', 'EON_LOGLEVEL');
const Callable = require('./callable');

class EonWebEngine extends Callable {
    constructor(port, options) {
        super();
        this.port = port || process.env.PORT || 8080;
        this._get_paths = {};
        this._post_paths = {};
        this._put_paths = {};
        let defaults = {
            post: {
                noParseBody: false
            }
        }
        this.options = { ...defaults, ...options};
        this.listener = (req, res) => {
            let baseUrl = new URL(req.url, 'http://localhost:3000').pathname;
            if (req.method == 'GET') {
                log('info', `<= GET ${baseUrl}`);
                if (this._get_paths[baseUrl] === undefined) {
                    log('info', `=> \x1b[31m404\x1b[0m ${baseUrl}`);
                    res.writeHead(404, `No path registered on ${baseUrl}`);
                    res.end(`No GET path registered on ${baseUrl}`);
                    return;
                }
                this._get_paths[baseUrl].invoke(req, res);
                return;
            }
            if (req.method == 'POST') {
                log('info', `<= POST ${baseUrl}`);
                if (this._post_paths[baseUrl] === undefined) {
                    log('info', `=> \x1b[31m404\x1b[0m ${baseUrl}`);
                    res.writeHead(404, `No path registered on ${baseUrl}`);
                    res.end(`No POST path registered on ${baseUrl}`);
                    return;
                }
                this._post_paths[baseUrl].invoke(req, res, this.options.post.noParseBody);
                return;
            }
            if (req.method == 'PUT') {
                log('info', `<= PUT ${baseUrl}`);
                if (this._put_paths[baseUrl] === undefined) {
                    log('info', `=> \x1b[31m404\x1b[0m ${baseUrl}`);
                    res.writeHead(404, `No path registered on ${baseUrl}`);
                    res.end(`No PUT path registered on ${baseUrl}`);
                    return;
                }
                this._put_paths[baseUrl].invoke(req, res, this.options.post.noParseBody);
                return;
            }
        }
    }

    _call(...args) {
        return this.listener(...args);
    }

    /**
     * Listen on this.port
     * @param {Function=} callback Called once listening
     */
    listen(callback) {
        this.server = http.createServer(this.listener);
        const cb = () => {
            if (typeof callback === 'function') return callback(this.port);
        }
        this.server.listen(this.port, cb);
    }

    /**
     * This function creates a new GET path on the current engine
     * @param {string} path Path to listen on. Example: `/` or `/test`
     */
    get(path) {
        const pathObject = new GETPath(this);
        this._get_paths[path] = pathObject;
        return pathObject;
    }

    /**
     * This function creates a new POST path on the current engine
     * @param {string} path Path to listen on. Example: `/` or `/test`
     */
    post(path) {
        const pathObject = new POSTPath(this);
        this._post_paths[path] = pathObject;
        return pathObject;
    }
}

module.exports = EonWebEngine;