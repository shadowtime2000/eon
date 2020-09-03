const BasePath = require('./get');

class POSTPath extends BasePath {
    onBody(callback) {
        return this.hook((req, res) => {req.on('body', _ => {
            return callback(req, res);
        })});
    }

    invoke(req, res, noParseBody) {
        super.invoke(req, res, noParseBody);
    }
}

module.exports = POSTPath;