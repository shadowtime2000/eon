
const createLog = require('../../../../libs/log');
const log = createLog('eonjs', 'EON_LOGLEVEL');

class IncomingHTTPData {
    constructor(req, noParseBody) {
        this.whatwg = new URL(req.url, `http://${req.headers.host}`);
        this.method = req.method;
        this.body = undefined;
        this.error = false;
        this.headers = req.headers;
        this.rawHeaders = req.rawHeaders;
        this.url = req.url;
        this.pathname = this.whatwg.pathname;
        this._events = {};
        this._fired = [];
        if (req.method == 'GET') {
            this.query = {};
            this.whatwg.searchParams.forEach((val, key) => this.query[key] = val);
        } else {
            let body = "";
            req.on('data', d => body += d.toString());
            req.on('end', _ => {
                this.rawBody = body;
                if (!noParseBody) {
                    try {
                        if (req.headers['content-type'] === 'application/json') {
                            log('info', 'request body is json');
                            this.body = JSON.parse(body || '');
                        } else {
                            log('info', 'assumed request body is form');
                            this.body = require('querystring').parse(body || '');
                        }
                        this._fire('body', true);
                    } catch (e) {
                        log('warning', `Error while parsing body '${body}': ${e.message}`);
                        this.error = e;
                    }
                } else {
                    log('info', 'not parsing body');
                    this.body = this.rawBody;
                    this._fire('body', true);
                };
            });
        }
    }

    on(e, l) {
        if (this._fired.includes(e)) return l();
        if (this._events[e]) return this._events[e].push(l);
        this._events[e] = [l];
    }

    _fire(e, t, ...d) {
        if (this._events[e]) this._events[e].forEach(l => l(...d));
        if (t) this._fired.push(e);
    }
}

module.exports = IncomingHTTPData;