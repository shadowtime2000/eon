const createLog = require('./libs/log');
const log = createLog('fasterjs', 'FT_LOGLEVEL');
const FasterWebEngine = require('./engine');

module.exports = (port) => new FasterWebEngine(port);