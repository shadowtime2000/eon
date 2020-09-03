const BaseHandler = require('./text');
const { IncommingHTTPData, OutgoingHTTPData } = require('./streams');

class JSONCallbackHandler extends BaseHandler {
    invoke(req, res, noParseBody) {
        const Req = new IncommingHTTPData(req, noParseBody);
        if (Req.error) return res.writeHead(400).end('Invalid request: ' + Req.error.message);
        const Res = new OutgoingHTTPData(res);
        if(!Res.ended) Res.end(JSON.stringify(this.callback(Req, Res)));
    }
}

module.exports = JSONCallbackHandler;