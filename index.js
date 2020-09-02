const createLog = require('./libs/log');
const log = createLog('eonjs', 'EON_LOGLEVEL');
const EonWebEngine = require('./engine');

module.exports = (port) => new EonWebEngine(port);