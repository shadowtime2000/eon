const BasePath = require('./get');

class POSTPath extends BasePath {
    onBody(callback) {
        return this.hook((req, res) => {req.on('body', _ => {
            return callback(req, res);
        })});
    }

    invoke(req, res, options) {
        super.invoke(req, res, options);
    }
}

module.exports = POSTPath;