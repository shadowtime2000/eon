class Callable extends Function {
    constructor() {
        super('...args', 'return this._bound._call(...args)');
        this._bound = this.bind(this);
        return this._bound;
    }

    _call() {
        console.log('You called me!');
    }
}

module.exports = Callable;