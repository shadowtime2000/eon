# Eon.js Examples
This page will give a few examples to get you up and running more quickly.

## Simple Webserver
A simple API with a single endpoint on `/`
```js
// Import eon.js
const eon = require('eonjs')(8080);
// Create an endpoint on / and listen
eon.get('/').text(_ => 'Hello, World').listen(_ => console.log('listening'));
```

## Post Endpoint
A post endpoint can be created as so:
```js
eon.post('/post').hook((req, res) => {req.on('body', _ => {
    res.end(`You sent me ${JSON.stringify(req.body)}`);
})});
```