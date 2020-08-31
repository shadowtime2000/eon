// Require dependencies
const createDebug = require('./debug');

/**
 * A logger based on `debug` with a log-level functionality.
 * Returns a function that will log `msg` if `levels[process.env.LOGLEVEL] > levels[level]`
 * @param {string} name The name of the debugger
 * @param {object} levels A mapping of `{string} levelName` to `{number} level`
 * @returns {Function}
 */
function createLogger(name, levels, logVar) {
    var debug = createDebug(name);
    if (!levels.hasOwnProperty(process.env[logVar])) createDebug('WARNING')('Loglevel specified in LOGLEVEL envvar is invalid. Logs will be shown by default');
    return function (level, ...msg) {
        if (!levels.hasOwnProperty(process.env[logVar])) return debug(`[\x1b[1;3${(levels[level] + 1) % 8}m${level}\x1b[0m]`, ...msg);
        if (!levels.hasOwnProperty(level)) throw `Invalid loglevel '${level}'`;
        if (levels[process.env[logVar]] >= levels[level]) debug(`[\x1b[1;3${(levels[level] + 1) % 8}m${level}\x1b[0m]`, ...msg);
    }
}
// Define logLevels
const levels = {
    'error': 0,
    'info': 1,
    'warning': 2,
    'verbose': 3,
    'silly': 4
}
// Export function
module.exports = (_name, varName) => createLogger(_name, levels, varName);