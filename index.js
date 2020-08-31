const createLog = require('./libs/log');
const log = createLog('turbo', 'TB_LOGLEVEL');
const TurboWebEngine = require('./engine');

module.exports = (port) => new TurboWebEngine(port);