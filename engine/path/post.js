const BasePath = require('./get');

class POSTPath extends BasePath {
    constructor(engine, method) {
        super(engine);
        this.method = method;
        if (method === 'put') {
            this.text = undefined;
            this.json = undefined;
        }
    }

    onBody(callback) {
        return this.hook((req, res) => {req.on('body', _ => {
            return callback(req, res);
        })});
    }

    invoke(req, res, options) {
        super.invoke(req, res, options, this.method === 'put');
    }
}

module.exports = POSTPath;