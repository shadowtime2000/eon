const log = require('../../../libs/log')('eonjs', 'EON_LOGLEVEL');

/**
 * This plugin simulates connect-like middleware in eon
 */

class MiddlewarePlugin {
    constructor() {}

    apply(engine) {
        engine.events.middleware.listen((engine, path_, callback, webEngine) => {
            let path = path_;
            let handle = callback;

            if (typeof path !== 'string') {
                path = '/';
                handle = path_;
            }

            if (typeof handle !== 'function') {
                throw "Middleware must be a function";
            }

            (engine.globals.middlewares = engine.globals.middlewares || []).push({path, handle});
        });

        engine.events.onBeforeResolution.listen((engine, req, res, webEngine) => {
            let stack = (engine.globals.middlewares || []).map(el => el);
            log('verbose', 'onBeforeResolution invoked');
            log('verbose', `res is ${res.writeableEnded ? 'closed' : 'open'}`);
            log('verbose', 'Middleware stack is', stack);

            function next(err) {
                if (err) {
                    res.statusCode = err.status || 500;
                    if (!res.writableEnded) res.end(err.message);
                    else log('warning', `middleware failed: ${err.message}`)
                } else if (stack.length) {
                    stack.shift().handle(req, res, next);
                } else {
                    engine.events.middlewareFinished.fire(req, res, webEngine);
                }
            }

            next();
        });
    }
}

module.exports = MiddlewarePlugin;