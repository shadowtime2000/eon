const turbo = require('..')(8080);

turbo.get('/').text((req, res) => 'Faster test');
turbo.get('/hook').hook((req, res) => res.end(`You requested ${req.pathname}`));
turbo.listen(p => console.log(`Listening on http://localhost:${p}`));