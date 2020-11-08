const app = require('..')(8080);

app.put('/put').onBody((req, res) => {
    console.log('Received body:', req.body);
    res.status(201).header('Content-Location', '/somewhere').end();
}).listen(p => console.log(`http://localhost:${p}/put`));