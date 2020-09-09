const eon = require('..')(8080);

eon
    .get('/:name').json(req => req.data)
    .get('/files/:volume/').text(req => `No file '${req.data.path}' in '${req.data.volume}' for you today :(`).listen();