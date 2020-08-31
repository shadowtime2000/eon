const turbo = require('..')(8080);

turbo.get('/').text((req, res) => 'Faster test').listen(p => console.log(`Listening on http://localhost:${p}`));