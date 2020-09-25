declare class Callable extends Function {
  constructor();
  _call(): void;
}

declare class EonWebEngine extends Callable {
  constructor(port?: number, options?: any);
  errorHandler(
    callback: (err: any, data: any, engine: EonWebEngine) => void
  ): EonWebEngine;
  get(path: string): GETPath;
  post(path: string): POSTPath;
  use(path: string, callback: Function): EonWebEngine;
  listen(callback: Function): void;
}

declare function eonWebEngineFactory(port?: number, options?: any): EonWebEngine;

export = eonWebEngineFactory;

declare class IncomingHTTPData {
  public whatwg: URL;
  public method: ("POST" | "GET"); // Only set to this because of current support
  public headers: any;
  public rawHeaders: string[];
  public url: string;
  public pathname: string;
  public query: any;
  public body: any;
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
  text(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => TextCallbackHandler): EonWebEngine;
  hook(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => HookCallbackHandler): EonWebEngine;
  json(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => JSONCallbackHandler): EonWebEngine;
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class POSTPath extends GETPath {
  onBody(callback: (req: IncomingHTTPData, res: OutgoingHTTPData) => any): EonWebEngine;
  invoke(
    req: IncomingHTTPData,
    res: OutgoingHTTPData,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}
