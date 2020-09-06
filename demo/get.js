const eon = require('..')(8080);

eon.get('/files/:volume/^path').text(req => `No file '${req.data.path.join('/')}' in '${req.data.volume}' for you today :(`).listen();