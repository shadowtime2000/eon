// Require dependencies
const createDebug = require('./debug');
// Define logLevels
const levels = {
    'error': 0,
    'info': 1,
    'warning': 2,
    'verbose': 3,
    'silly': 4
}
// Export function
module.exports = (_name, varName) => createDebug(_name, levels, varName);