declare class Callable extends Function {
  constructor();
  _call(): void;
}

declare class EonWebEngine extends Callable {
  public host: Engine;
  public port: number;
  public options: { plugins: any[] };
  private _onerror: ((err: Error, data: any, engine: EonWebEngine) => void)[];
  constructor(port?: number, options?: { plugins: any[] });
  errorHandler(
    callback: (err: Error, data: any, engine: EonWebEngine) => void
  ): EonWebEngine;
  get(path: string): GETPath;
  post(path: string): POSTPath;
  use(path: string, callback: Function): EonWebEngine;
  listen(callback: Function): void;
}

declare function eonWebEngineFactory(
  port?: number,
  options?: any
): EonWebEngine;

export = eonWebEngineFactory;

declare class IncomingHTTPData {
  public whatwg: URL;
  public method: "POST" | "GET"; // Only set to this because of current support
  public headers: any;
  public rawHeaders: string[];
  public url: string;
  public pathname: string;
  public query: any | undefined;
  public body: any | undefined;
  constructor(req: any, noParseBody: any, engine: EonWebEngine, res: any);
  on(event: string, listener: Function): void;
}

declare class OutgoingHTTPData {
  public endend: boolean;
  constructor(res: any);
  status(n: number): OutgoingHTTPData;
  header(name: string, value: string): OutgoingHTTPData;
  getHeader(name: string): string;
  write(data: string): OutgoingHTTPData;
  end(data: any): OutgoingHTTPData;
}

declare class TextCallbackHandler {
  public callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any;
  constructor(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any);
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class JSONCallbackHandler extends TextCallbackHandler {
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class HookCallbackHandler extends TextCallbackHandler {
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class GETPath {
  constructor(engine: EonWebEngine);
  text(
    callback: (
      req: IncomingHTTPData,
      res: OutgoingHTTPData
    ) => TextCallbackHandler
  ): EonWebEngine;
  hook(
    callback: (
      req: IncomingHTTPData,
      res: OutgoingHTTPData
    ) => HookCallbackHandler
  ): EonWebEngine;
  json(
    callback: (
      req: IncomingHTTPData,
      res: OutgoingHTTPData
    ) => JSONCallbackHandler
  ): EonWebEngine;
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class POSTPath extends GETPath {
  onBody(
    callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any
  ): EonWebEngine;
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class Engine extends Pluggable {
  public events: any;
  constructor(plugins: Pluggable[], options: any);
}

declare class Plug extends Callable {
  constructor(options: any);
  public _call(): void;
  public apply(pluggable: Pluggable): void;
}

declare class Pluggable {
  public events: any;
  public globals: any;
  public plugs: Plug[];
  public options: any;
  public registerPlug(p: Plug): void;
  public register(event: string, listener: Function): void;
}

declare class PlugEvent {
  hooks: Function[];
  constructor(host: Pluggable);
  listen(callback: (host: Pluggable, ...args: any) => void): void;
  fire(...args: any): void;
  asyncFire(snyc: boolean, ...args: any): void;
  private _asyncCall(f: (...args: any) => void, ...args: any): void;
}
