interface Headers {
  ['X-t']: number;
  ['X-s']: string;
}

interface Window {
  _webmsxyw: (url: string, e?: any) => Headers;
}

declare const window: Window;
