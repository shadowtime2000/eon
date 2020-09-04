const { Pluggable, PlugEvent } = require('../../plugins');

/**
 * This is the root pluggable for this app
 */
class Engine extends Pluggable {
    constructor(options) {
        super(options);
        this.events.create = new PlugEvent(this);
        this.events.path = new PlugEvent(this);
        this.events.request = new PlugEvent(this);
        this.events.listen = new PlugEvent(this);
        this.events.tearDown = new PlugEvent(this);
    }
}

module.exports = Engine;