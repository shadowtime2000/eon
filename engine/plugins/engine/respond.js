
const log = require('../../../libs/log')('eonjs', 'EON_LOGLEVEL');

class ResponsePlugin {
    constructor() { }

    apply(engine) {
        engine.events.middlewareFinished.listen((engine, req, res, webEngine) => {
            engine.globals.unresolved = undefined;
            if (!res.writeableEnded) {
                // Get base path
                const basePath = (new URL(req.url, `http://localhost:${webEngine.port}`));
                // Resolve path
                engine.events.resolvePath.fire(basePath, req, webEngine);
                if (engine.globals.unresolved !== undefined) {
                    res.statusCode = 404;
                    return res.end(`No ${req.method} path registered on ${req.url}`);
                }
                req.data = engine.globals.pathInfo;
                engine.events.onBeforeRequest.fire(req, res, webEngine);
                if (!res.writeableEnded)
                    (async () => { engine.globals.path.invoke(req, res, webEngine.options); })().catch((error) => {
                        log('error', `Failed to respond to request: ${req.url}`);
                        webEngine._handle_error(error);
                        res.statusCode = 500;
                        if (!res.writeableEnded) { res.end(`Error: ${error.message}`) }
                    });
            }
        });
    }
}

module.exports = ResponsePlugin;