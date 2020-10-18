const BaseHandler = require('./text');
const { IncommingHTTPData, OutgoingHTTPData } = require('./streams');

class HookCallbackHandler extends BaseHandler {
    invoke(req, res, options) {
        const Res = new OutgoingHTTPData(res);
        const Req = new IncommingHTTPData(req, options.noParseBody, options.engine, Res);
        if (Req.error) return res.writeHead(400).end('Invalid request: ' + Req.error.message);
        return this.callback(Req, Res);
    }
}

module.exports = HookCallbackHandler;