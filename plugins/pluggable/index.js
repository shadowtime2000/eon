const PlugEvent = require('./event');

/**
 * An instance of this class can be "plugged in to". Extend it to add events.
 */
// More to come
class Pluggable {
    constructor(plugs, options) {
        this.events = {};
        this.plugs = plugs || [];
        this.plugs.map(p => this.registerPlug(p));
        this.options = options;
    }

    registerPlug(p) {
        if (!this.plugs.includes(p)) this.plugs.push(p);
        p.apply(this);
    }

    register(e, l) {
        this.events[e] = l;
    }
}

module.exports = {
    Pluggable,
    PlugEvent
}