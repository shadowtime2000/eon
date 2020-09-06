const PathPlugin = require('./path');
const ListenPlugin = require('./listen');
const HandlerPlugin = require('./request');
const PathResolverPlugin = require('./pathresolve');
const MiddlwarePlugin = require('./middleware');

module.exports = [
    new PathPlugin(),
    new ListenPlugin(),
    new HandlerPlugin(),
    new PathResolverPlugin(),
    new MiddlwarePlugin()
]