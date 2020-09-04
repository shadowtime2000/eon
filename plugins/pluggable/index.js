const PlugEvent = require('./event');

/**
 * An instance of this class can be "plugged in to". Extend it to add events.
 */
// More to come
class Pluggable {
    constructor(options) {
        this.events = {};
        this.options = options;
    }

    register(e, l) {
        this.events[e] = l;
    }
}

module.exports = {
    Pluggable,
    PlugEvent
}