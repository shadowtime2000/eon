---
title: 'Plugins API'
number: 5
---

# Plugins
In version v1.15.0, I decided to re-write most of the `EonWebEngine` into an "everything's-a-plugin" system. This doesn't change most of the actual API, but it gives developers much more control over what happens internally.

## Creating Plugins
A plugin is just a class like any other, with the only requirement being the `apply` method. This method is passed the `pluggable`, an instance that has different *events* that a plugin can plug into. Take this example:
```js
class MyPlugin {
    constructor() {}

    apply(pluggable) {
        pluggable.events.onBeforeRequest.listen((pluggable, req, res, webEngine) => {
            console.log(`Received a request to ${req.url}.`);
        });
    }
}
```
This simple plugin plugs into the `onBeforeRequest` event. This is fired immediately before the request handler is invoked, but after the request has been received and the correct handler has been resolved. Also, the `req` and `res` arguments are the raw `IncommingMessage` and `ServerResponse` created by HTTP, not the `IncommingHTTPData` and `OutgoingHTTPData` classes passed to the listener.

## Applying a plugin
To actually add a plugin to the `EonWebEngine`, you can pass eon a configuration object, like so:
```js
const eon = require('eonjs')(8080, {
    plugins: [
        new MyPlugin()
    ]
});
```
When `null` or `undefined` are passed as the first argument, eon will fall back to `process.env.PORT` if available, otherwise `8080`.

## Available Events
- `resolvePath`: Called first when a request is received. This event is a callout to resolve a `Path` object. Because there is an internal plugin, the path will already have been resolved when other plugins are called. If successfull, `pluggable.globals.path` will be set to the resolved path, otherwise `pluggable.globals.unresolved` will be set to true. If you have own logic to resolve paths, **make sure to set** `pluggable.globals.unresolved` **to** `undefined`, so that no "invalid request" response will be sent, or to `true` if your logic, too, failed.
- `request`: Internally, this event is triggered before `reolvePath`, but an internal plugin fires `resolvePath` before other plugins can act on `request`. Other plugins on the `request` event will be fired directly after the **_aynchronous_ dispatchment** of the user-provided request handler, so the handler may, or may not, be running at the execution of your plugin.
- `onBeforeRequest`: Like `request`, but fired **before** the asynchronous dispatchment of the user-provided request handler.