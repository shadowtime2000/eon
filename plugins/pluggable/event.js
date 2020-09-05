/**
 * This class represents a Plugify Event.
 */
class PlugEvent {
    /**
     * Create a new Plugify Event
     * @param {Pluggable} host Host
     */
    constructor(host) {
        this.hooks = [];
        this.host = host;
    }

    /**
     * Listen for event emission
     * @param {function} callback Called when event is emitted
     */
    listen(callback) {
        this.hooks.append(callback);
    }

    /**
     * Fire the Event
     * @param  {...any=} args Arguments passed to handlers
     */
    fire(...args) {
        this.hooks.forEach(hook => {
            hook(this.host, ...args);
        });
    }

    /**
     * Asynchronously fire the Event. This options great when an event might trigger side-effects
     * whose outputs are not valuable to the immediatly following code.
     * @param {boolean} sync Whether to call the hooks one adfter another. Default: false
     * @param  {...any=} args Arguments passed to handlers
     */
    async asyncFire(snyc, ...args) {
        this.hooks.forEach(hook => {
            sync ? hook(this.host, ...args) : this._asyncCall(hook, [this.host, ...args]);
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