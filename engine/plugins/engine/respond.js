class ResponsePlugin {
    constructor() {}

    apply(engine) {
        engine.events.middlewareFinished.listen((engine, req, res, webEngine) => {
            if (!res.writeableEnded) {
                engine.events.resolvePath.fire(basePath, req, webEngine);
                if (engine.globals.unresolved !== undefined) {
                    res.statusCode = 404;
                    return res.end(`No ${req.method} path registered on ${req.url}`);
                }
                req.data = engine.globals.pathInfo;
                engine.events.onBeforeRequest.fire(req, res, webEngine);
                if (!res.writeableEnded)
                    (async () => { engine.globals.path.invoke(req, res, webEngine.options.noParseBody); })();
            }
        });
    }
}

module.exports = ResponsePlugin;