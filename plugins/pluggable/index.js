const PlugEvent = require('./event');

/**
 * An instance of this class can be "plugged in to". Extend it to add events.
 */
// More to come
class Pluggable {
    constructor() {
        this.events = {};
    }
}

module.exports = {
    Pluggable,
    PlugEvent
}