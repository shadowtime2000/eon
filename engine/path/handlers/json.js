const BaseHandler = require('./text');
const { IncommingHTTPData, OutgoingHTTPData } = require('./streams');

class JSONCallbackHandler extends BaseHandler {
    invoke(req, res, options) {
        const Req = new IncommingHTTPData(req, options.noParseBody);
        if (Req.error) return res.writeHead(400).end('Invalid request: ' + Req.error.message);
        const Res = new OutgoingHTTPData(res, false, options.onlyHead);
        const data = this.callback(Req, Res);
        if (!Res.getHeader('content-type')) Res.header('content-type', `application/json${options.noUTF8Header ? '': '; charset=utf-8'}`);
        if(!Res.ended) Res.end(JSON.stringify(data));
    }
}

module.exports = JSONCallbackHandler;