const TextCallbackHandler = require('./handlers/text');
const HookCallbackHandler = require('./handlers/hook');
const JSONCallbackHandler = require('./handlers/json');
const log = require('../../libs/log')('eonjs', 'EON_LOGLEVEL');

class GETPath {
    constructor(engine) {
        this._handler = null;
        this._engine = engine;
    }

    text(callback) {
        this._handler = new TextCallbackHandler(callback);
        return this._engine;
    }

    hook(callback) {
        this._handler = new HookCallbackHandler(callback);
        return this._engine;
    }

    json(callback) {
        this._handler = new JSONCallbackHandler(callback);
        return this._engine;
    }

    invoke(req, res, options, noResponse) {
        log('silly', 'handler invoked')
        if (this._handler == null) return res.end('Missing handler');
        return this._handler.invoke(req, res, { engine: this._engine, noResponse, ...options });
    }
}

module.exports = GETPath