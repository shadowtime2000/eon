const { GETPath, POSTPath } = require('../../path');

class PathPlugin {
    constructor() {}

    apply(engine) {
        engine.events.create.listen((engine, method, path, webEngine) => {
            if (method === 'get') engine.globals.next_path = new GETPath(webEngine);
            else if (method === 'post') engine.globals.next_path = new POSTPath(webEngine);
            else if (method === 'put') engine.globals.next_path = new POSTPath(webEngine, 'put');
        });
    }
}

module.exports = PathPlugin;