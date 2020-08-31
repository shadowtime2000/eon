const faster = require('..')(8080);

faster.get('/').text((req, res) => 'Faster test');
faster.get('/hook').hook((req, res) => res.end(`You requested ${req.pathname}`));
faster.get('/json').json((req, res) => ({hello: 'world'}));
faster.post('/post').hook((req, res) => req.on('body', _ => {
    res.end(`You sent me: ${JSON.stringify(req.body)}`);
}));
faster.listen(p => console.log(`Listening on http://localhost:${p}`));