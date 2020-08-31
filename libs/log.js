// Require dependencies
const createDebug = require('./debug');
// Define logLevels
const levels = {
    'error': 0,
    'warning': 1,
    'info': 2,
    'verbose': 3,
    'silly': 4
}
// Export function
module.exports = (_name, varName) => createDebug(_name, levels, varName);