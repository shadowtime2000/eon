const TextCallbackHandler = require('./handlers/text');
const HookCallbackHandler = require('./handlers/hook');
const JSONCallbackHandler = require('./handlers/json');

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

    invoke(req, res, noParseBody) {
        if (this._handler == null) return res.end('Missing handler');
        return this._handler.invoke(req, res, noParseBody);
    }
}

module.exports = GETPath