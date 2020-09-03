const Callable = require('../../engine/callable');

class Plug extends Callable {
    constructor(options) {
        super();
    }

    _call() {
        this.apply();
    }

    apply() {}
}

module.exports = { Plug };