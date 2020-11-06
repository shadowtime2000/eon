<h1 align="center">Eon.js</h1>
<p align="center">
A simple framework for creating web services
</p>
<p align="center">
<img src="https://res.cloudinary.com/db3degzpn/image/upload/v1604679393/social_new_rl1m2v.png" width="100%" height="auto">
</p>
<p align="center"><img src="https://img.shields.io/npm/v/eonjs" alt="version badge">
<img src="https://img.shields.io/npm/l/eonjs" alt="license badge">
<img src="https://img.shields.io/github/languages/code-size/eon-web/eon" alt="size badge">
<img src="https://img.shields.io/badge/dependencies-none-brightgreen" alt="dependency badge">
<img src="https://img.shields.io/npm/dw/eonjs?logo=npm" alt="downloads badge">
<img src="https://img.shields.io/github/issues/eon-web/eon" alt="issues badge">
<img src="https://img.shields.io/github/issues-closed/eon-web/eon" alt="closed issues badge">
<img src="https://img.shields.io/github/issues-pr/eon-web/eon" alt="pr badge">
<img src="https://img.shields.io/github/stars/eon-web/eon" alt="stars badge">
<img src="https://img.shields.io/website?down_color=red&down_message=down.%20please%20report%20this%20to%20the%20repo%20owner&up_color=brightgreen&up_message=up&url=https%3A%2F%2Feon.js.org&cachebust=1" alt="website badge">
<img src="https://img.shields.io/github/commit-activity/m/eon-web/eon?foo=bar" alt="commit badge">
<img src="https://img.shields.io/bundlephobia/min/eonjs" alt="size badge">
<img src="https://img.shields.io/github/repo-size/eon-web/eon" alt="repo size badge"></p>

## Why Eon?
Yes, another web server framework. Whenever a new one comes out, you have to ask yourself: Do I need this? Am I fine to just continue using express/fastify/etc...? I want to present to you the reasons why I began writing this framework and hopefully make your decision a bit easier.

### Express is _not_ a small framework
Express is great, because it provides lots of features, but that also makes it a quite large library. With Eon, I tried to reduce the bundle size by writing as much code as possible on my own and adding only the necessary features.

### 0 Dependencies
As of `v1.11.x`, Eon.js has *no dependencies whatsoever*, thereby further reducing the bundle size and overhead of additional packages to manage.

# Installation
To install eon, simply run
```bash
npm i eonjs@latest --save
```

# Examples & Usage
Here is an example of using Eon:
```js
// Require Eon
const eon = require('eonjs');
// Create App
// Shorthand: const app = require('eonjs')(8080);
const app = eon(8080);
// Create a get path
app.get('/').json((req, res) => ({hello: 'world', how_are: 'you?'}));
```

## Typescript
This framework has Typescript typings bundled with it.

# API
API reference. **Please Refer to the full documentation at [eon.js.org](https://eon.js.org/#/)**

## Plugins API
**New In v1.15**: Version 1.15 introduces the new Plugins API. I decided to take the time, rather sooner than later, to rewrite Eon into an "everything's-a-plugin" type of system. The full Plugin docs will be available soon at [eon.js.org](https://eon.js.org).

### `eon(port): EonWebEngine`
This function is the default export of the Eon library. It will create a new EonWebEngine instance.

## Class: `EonWebEngine`
An instance of this class is created by `require('eon')(<port>)`;

### `constructor`
Args:
- `port:number` The port to listen on

### `get(path):Path`
Registers a new GET listener on `path`.

Args:
- `path:string` The pathname to register the listener on. Examples: `"/"`, `"/test"`

Returns: `GETPath extends Path`

### `post(path):Path`
Registers a new POST listener on `path`.

Args:
- `path:string` The pathname to register the listener on. Examples: `"/"`, `"/test"`

Returns: `POSTPath extends Path`

### `listen([callback]):void`
Listens on the port specified by the constructor.

Args:
- `callback?:function(port)` (optional) Will be called once the server is listening. Arguments: The port the server is listening on.

Returns: `void`

## Class: `Path`
A path listener

### `text(callback):EonWebEngine`
When a request is received on this path, the text returned from `callback(req, res)` will be sent to the client.

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

### `json(callback):EonWebEngine`
Like `Path.text()` but will run `JSON.stringify` on callback output before sending

### `hook(callback):EonWebEngine`
Like `Path.text()`, but expects the callback to send data itself

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

## Class: `IncomingHTTPData`
An incoming HTTP request

### field: `whatwg:URL`
A parsed `URL` object ([see nodejs URL docs](https://nodejs.org/api/url.html#url_url_strings_and_url_objects))

### field: `method:string`
The request method ('GET', 'POST', 'PUT', etc..)

### field: `headers:object`
The request headers ([see nodejs http docs](https://nodejs.org/api/http.html#http_message_headers))

### field: `rawHeaders:object`
The unprocessed request headers ([see nodejs http docs](https://nodejs.org/api/http.html#http_message_rawheaders))

### field: `url:string`
The full request url, without protocol and host. Example: `/p/a/t/h?name=john&lastname=doe#info`

### field: `pathname:string`
alias for `IncomingHTTPData.whatwg.pathname`

### field: `query:object`
The parsed querystring (Only available for GET requests)

### field: `body:object`
The parsed post/put body (Only available for Non-GET requests **after the** `body` **event has fired**)

### event: `body`
Fired on POST-like requests after the body is received and parsed

Arguments to handler: none

### `on(event, handler)`
Register an event handler. Multiple handlers can be registed for one event. **Handlers cannot be unregistered**

Args:
- `event:string` Name of the event to listen for
- `handler:function(...args)` The handler to call when the event is fired

## Class: `OutgoingHTTPData`
An outgoing HTTP response. Passed as second argument to request handlers

### field: `endend:boolean`
Wether the stream has been closed

### `status(code):OutgoingHTTPData`
Sets the response status

Args:
- `code:number` The status code to send

Returns: `OutgoingHTTPData` The object it was called on

### `header(name, value):OutgoingHTTPData`
Sets a response header

Args:
- `name:string` The name of the header
- `value:string` The value of the header

Returns: `OutgoingHTTPData` The object it was called on

### `getHeader(name):string`
Returns the value of a header

Args:
- `name:string` The name of the header to retrieve

Returns `string` The value of the header

### `write(data):OutgoingHTTPData`
Sends data to the client

Args:
- `data:string` The data to write

Returns: `OutgoingHTTPData` The object it was called on

### `end(data):OutgoingHTTPData`
Like `write()` but will close the stream

Returns: `OutgoingHTTPData` The object it was called on
