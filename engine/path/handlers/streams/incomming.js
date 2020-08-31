class IncomingHTTPData {
    constructor(req) {
        this.whatwg = new URL(req.url, `http://${req.headers.host}`);
        this.method = req.method;
        this.body = undefined;
        this.error = false;
        this.headers = req.headers;
        this.rawHeaders = req.rawHeaders;
        if (req.method == 'GET') {
            this.query = {};
            this.whatwg.searchParams.forEach((val, key) => this.query[key] = val);
        } else {
            try {
                if (req.headers['content-type'] === 'application/json') {
                    this.body = JSON.parse(req.body || '');
                } else {
                    this.body = require('querystring').parse(req.body || '');
                }
            } catch (e) {
                this.error = e;
            }
        }
    }
}

module.exports = IncomingHTTPData;