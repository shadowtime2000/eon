const TextCallbackHandler = require('./handlers/text');
const HookCallbackHandler = require('./handlers/hook');

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

    invoke(req, res) {
        if (this._handler == null) return res.end('Missing handler');
        return this._handler.invoke(req, res);
    }
}

module.exports = GETPath