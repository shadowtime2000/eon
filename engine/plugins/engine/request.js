const log = require('../../../libs/log')('eonjs', 'EON_LOGLEVEL');

class HandlerPlugin {
    constructor() { }

    apply(engine) {
        engine.events.request.listen((engine, req, res, webEngine) => {
            // Get base path
            const basePath = (new URL(req.url, `http://localhost:${webEngine.port}`));
            // Resolve path
            engine.globals.unresolved = undefined;
            log('verbose', 'invoking onBeforeResolution');
            log('verbose', `res is ${res.writeableEnded ? 'closed' : 'open'}`);
            engine.events.onBeforeResolution.fire(req, res, webEngine);
        });
    }
}

module.exports = HandlerPlugin;