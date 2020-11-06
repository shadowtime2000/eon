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
                log('silly', 'resolved path', engine.globals.path)
                if (engine.globals.unresolved !== undefined) {
                    res.statusCode = 404;
                    return res.end(`No ${req.method} path registered on ${req.url}`);
                }
                req.data = engine.globals.pathInfo;
                log('verbose', 'firing onBeforeRequest')
                engine.events.onBeforeRequest.fire(req, res, webEngine);
                log('verbose', 'invoking');
                if (!res.writeableEnded)
                    (async () => await Promise.resolve(engine.globals.path.invoke(req, res, webEngine.options)) )().catch((error) => {
                        log('error', `Failed to respond to request: ${req.url}`);
                        log('error', `Error:`, error);
                        webEngine._handle_error(error, {
                            url: req.url,
                            time: new Date()
                        });
                        res.statusCode = 500;
                        if (!res.writeableEnded) { res.end(`Error: ${error.message}`) }
                    });
                else log('info', 'writable already ended');
            }
        });
    }
}

module.exports = ResponsePlugin;