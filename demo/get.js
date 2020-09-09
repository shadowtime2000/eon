const eon = require('..')(8080);

eon.get('/:name').json(req => req.data);
eon.get('/files/:volume/^path').text(req => `No file '${req.data.path.join('/')}' in '${req.data.volume}' for you today :(`).listen();