const { IncommingHTTPData, OutgoingHTTPData } = require('./streams');

class TextCallbackHandler {
    constructor(callback) {
        this.callback = callback;
    }

    invoke(req, res, options) {
        const Req = new IncommingHTTPData(req, options.noParseBody);
        if (Req.error) return res.writeHead(400).end('Invalid request: ' + Req.error.message);
        const Res = new OutgoingHTTPData(res);
        const data = this.callback(Req, Res);
        if (!Res.getHeader('content-type')) Res.header('content-type', `text/plain${options.noUTF8Header ? '': '; charset=utf-8'}`);
        if (!Res.ended) Res.end(data);
    }
}

module.exports = TextCallbackHandler;