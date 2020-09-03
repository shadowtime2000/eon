const eon = require('..')(8080);
const http = require('http');
eon.get('/').text(_ => 'hi');

http.createServer(eon).listen(8080, _ => console.log('listening on', 8080));