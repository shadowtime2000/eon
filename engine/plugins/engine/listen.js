const http = require('http');

class ListenPlugin {
    constructor() {}

    apply(engine) {
        engine.events.listen.listen((engine, callback, webEngine) => {
            engine.globals.server = http.createServer(webEngine.listener);
            engine.globals.server.listen(webEngine.port, _ => {
                if (typeof callback === 'function') callback(webEngine.port);
            });
        });
    }
}

module.exports = ListenPlugin;