const http = require('http');
const { GETPath } = require('./path');

class TurboWebEngine {
    constructor(port, options) {
        this.port = port || process.env.PORT || 8080;
        this._get_paths = {};
        this._post_paths = {};
        this._put_paths = {};
        this.server = http.createServer(this.listener);
    }

    listener = (req, res) => {
        let baseUrl = new URL(req.url, 'http://localhost:3000').pathname;
        if (req.method == 'GET') {
            if (this._get_paths[baseUrl] === undefined) {
                res.writeHead(404, `No path registered on ${baseUrl}`);
                res.end(`No path registered on ${baseUrl}`);
                return;
            }
            this._get_paths[baseUrl].invoke(req, res);
            return;
        }
        if (req.method == 'POST') {
            if (this._post_paths[baseUrl] === undefined) {
                res.writeHead(404, `No path registered on ${baseUrl}`);
                res.end(`No path registered on ${baseUrl}`);
                return;
            }
            this._post_paths[baseUrl].invoke(req, res);
            return;
        }
        if (req.method == 'PUT') {
            if (this._put_paths[baseUrl] === undefined) {
                res.writeHead(404, `No path registered on ${baseUrl}`);
                res.end(`No path registered on ${baseUrl}`);
                return;
            }
            this._put_paths[baseUrl].invoke(req, res);
            return;
        }
    }

    /**
     * Listen on this.port
     * @param {Function} callback Called once listening
     */
    listen(callback) {
        const cb = () => {
            return callback(this.port);
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
}

module.exports = TurboWebEngine;