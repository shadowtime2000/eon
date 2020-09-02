# Advanced Examples
Here are some more advanced examples to help you up your game more quickly

## POST endpoint
You can create a POST endpoint using the `post` method:

!> Note that the body is received asynchronously and therefore the `hook` handler has to be used.

```js
const eon = require('eonjs');
// Create a post path on /post
eon.post('/post').hook((req, res) => {
    // Listen for the arrival of the body
    req.on('body', _ => {
        // Send back a response
        res.end(`You sent me ${JSON.stringify(req.body)}`);
    });
})
```
Try it out with curl:
```bash
curl localhost:8080/post -d 'foo=bar&baz=buzz'; echo
```
Output:
```txt
You sent me: {"foo":"bar","baz":"buzz"}
```
The endpoint can also handle JSON input:
```bash
curl localhost:8080/post -d '{"foo":"bar","baz":"buzz"}' -H "content-type:application/json"; echo
```
Will result in the same output.