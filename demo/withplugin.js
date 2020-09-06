class MyPlugin {
    constructor() {}

    apply(engine) {
        engine.events.onBeforeRequest.listen((engine, req, res, webEngine) => {
            console.log(`A request was received on ${req.url} (Pre-Listener)`);
        });
    }
}

const eon = require('..')(8080, {
    plugins: [ new MyPlugin() ]
});

eon.get('/').text((req, res) => 'eon test');
eon.get('/hook').hook((req, res) => res.end(`You requested ${req.pathname}`));
eon.get('/json').json((req, res) => (console.log('hi') || {hello: 'world'}));
eon.post('/post').hook((req, res) => req.on('body', _ => {
    res.end(`You sent me: ${JSON.stringify(req.body)}`);
}));
eon.post('/post2').onBody((req, res) => {
    res.end(`You sent me: ${JSON.stringify(req.body)}`);
})
eon.listen(p => console.log(`Listening on http://localhost:${p}`));