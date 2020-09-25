declare class Callable extends Function {
  constructor();
  _call(): void;
}

declare class EonWebEngine extends Callable {
  constructor(port?: number, options?: any);
  errorHandler(
    callback: (err: any, data: any, engine: EonWebEngine) => void
  ): EonWebEngine;
  get(path: string): any;
  post(path: string): any;
  use(path: string, callback: Function): EonWebEngine;
  listen(callback: Function);
}

declare function createWebEngine(port?: number, options?: any): EonWebEngine;

export = createWebEngine;

declare class IncomingHTTPData {
  constructor(req: any, noParseBody: any, engine: EonWebEngine, res: any);
  on(e: any, L: any): void;
}

declare class OutgoingHTTPData {
  constructor(res: any);
  status(n: number): OutgoingHTTPData;
  header(name: string, value: string): OutgoingHTTPData;
  getHeader(name: string): string;
  write(data: any): OutgoingHTTPData;
  end(data: any): OutgoingHTTPData;
}

declare class TextCallbackHandler {
  constructor(callback: (req: any, res: any) => any);
  invoke(
    req: any,
    res: any,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class JSONCallbackHandler extends TextCallbackHandler {
  invoke(
    req: any,
    res: any,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class HookCallbackHandler extends TextCallbackHandler {
  invoke(
    req: any,
    res: any,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class GETPath {
  constructor(engine: EonWebEngine);
  text(callback: (req: any, res: any) => any): EonWebEngine;
  hook(callback: (req: any, res: any) => any): EonWebEngine;
  json(callback: (req: any, res: any) => any): EonWebEngine;
  invoke(
    req: any,
    res: any,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}

declare class POSTPath extends GETPath {
  onBody(callback: (req: any, res: any) => any): EonWebEngine;
  invoke(
    req: any,
    res: any,
    options: { noParseBody: boolean; noUTF8Header: boolean }
  ): void;
}
