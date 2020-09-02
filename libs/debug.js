module.exports =  function (name) {
    return function(...msg) {
        if ((process.env.DEBUG || '').split(',').includes(name)) {
            let color = `\x1b[38;5;${(Math.abs((name + " ").split('').reduce((p, idx) => ((typeof p === 'string') ? p.charCodeAt(0) : p) + name.charCodeAt(idx)) - 1) % 256)};1m`;
            return console.error(color + ' ', name + '\x1b[0m', ...msg);
        }
    }
}