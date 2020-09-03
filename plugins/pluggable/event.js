/**
 * This class represents a Plugify Event.
 */
class PlugEvent {
    /**
     * Create a new Plugify Event
     * @param {*} options Create a new plugify event
     */
    constructor(options) {
        this.hooks = [];
    }

    /**
     * Fire the Event
     * @param  {...any=} args Arguments passed to handlers
     */
    fire(...args) {
        this.hooks.forEach(hook => {
            hook(...args);
        });
    }

    /**
     * Asynchronously fire the Event.
     * @param {boolean} sync Whether to call the hooks one adfter another. Default: false
     * @param  {...any=} args Arguments passed to handlers
     */
    async asyncFire(snyc, ...args) {
        this.hooks.forEach(hook => {
            sync ? hook(...args) : this._asyncCall(hook, args);
        });
    }

    /**
     * (Internal) asynchronously dispatch a function
     * @param {function} f Function
     * @param {*} a Arguments
     */
    async _asyncCall(f, a) {
        f(...a);
    }
}

module.exports = PlugEvent;