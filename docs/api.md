# API
API referenece.

### `eon(port [, options]): EonWebEngine`
This function is the default export of the Eon library. It will create a new EonWebEngine instance.
Args:
- `port:number` The port to listen on
- `options:EonWebOptions` Additional options
    - `noParseBody:boolean` If this option is set to `true`, eon will **not** parse the request body. The body value will be equal to `req.rawBody`.
    - `noUTF8Header:boolean` When set to `true`, the `.text()` and `.json()` handlers will not append `; charset=utf-8` to the `content-type` header.

## Class: `EonWebEngine extends Function`
An instance of this class is created by `require('eon')(<port>)`. As of v1.14.0, this class is *callable*. You can pass it as a listener to http.createServer. ([see advanced docs](https://eon.js.org/#/advanced?id=own-server))

### `constructor`
Args:
- `port:number` The port to listen on

### `errorHandler(callback):EonWebEngine`
The provided callback will be called if an error occurs during the handling of a request. If no callbacks are listed, the error will be thrown as normal.

Args:
- `callback:Function(error: Error [, data: Object [,engine: EonWebEngine]])` Handle an error during request handling

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
When a request is received on this path, the text returned from `callback(req, res)` will be sent to the client. Will automatically send `content-type: text/plain` header. Can be overriden by setting the header in the callback.

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

### `json(callback):EonWebEngine`
Like `Path.text()` but will run `JSON.stringify` on callback output before sending. Will automatically send `content-type: application/json` header. Can be overriden by setting the header in the callback.

### `hook(callback):EonWebEngine`
Like `Path.text()`, but expects the callback to send data itsself

Args:
- `callback:function(req:IncomingHTTPData, res:OutgoingHTTPData)` The request handler

Returns: `EonWebEngine` The Engine that created it.

## Class: `POSTPath extends Path`
Like `Path`, but with some methods that are specific to POST, PUT, etc requests.

### `onBody(callback):EonWebEngine`
Like `Path.hook()`, but will wait until the request body is available. When the callback is invoked, `req.body` can be used.

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
The parsed post/put body (Only available for Non-GET requests **after the** `body` **event has fired**). If the Engine's `noParseBody` option is set, this will be equal to `rawBody`

### field: `rawBody:string`
The unparsed post/put body.

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

### `status(code):this`
Sets the response status

Args:
- `code:number` The status code to send

Returns: `OutgoingHTTPData` The object it was called on

### `header(name, value):this`
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

### `write(data):this`
Sends data to the client

Args:
- `data:string` The data to write

Returns: `OutgoingHTTPData` The object it was called on

### `end(data):this`
Like `write()` but will close the stream

Returns: `OutgoingHTTPData` The object it was called on

### `cookie(name, value[, options]):this`
Sets the Set-Cookie header.

Args:
- `name:string` The name of the cookie
- `value:string` The value of the cookie
- `options:CookieOptions` some options:
    - `expires:Date` Expiration Date
    - `max_age:number` Seconds to expiration
    - `path:string` Value for the `Path` attribute
    - `domain:string` Value for the `Domain` attribute
    - `same_site:string` Value for `SameSite` attribute
    - `secure:boolean` Whether to add the `; Secure` attribute
    - `HttpOnly:boolean` Whether to add the `; HttpOnly` attribute