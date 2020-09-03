const { IncommingHTTPData, OutgoingHTTPData } = require('./streams');

class TextCallbackHandler {
    constructor(callback) {
        this.callback = callback;
    }

    invoke(req, res, noParseBody) {
        const Req = new IncommingHTTPData(req, noParseBody);
        if (Req.error) return res.writeHead(400).end('Invalid request: ' + Req.error.message);
        const Res = new OutgoingHTTPData(res);
        if (!res.ended) Res.end(this.callback(Req, Res));
    }
}

module.exports = TextCallbackHandler;