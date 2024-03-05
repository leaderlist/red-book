declare module '*.png' {
  const width: number;
  const height: number;
  export default src;
}

interface Headers {
  ['X-t']: number;
  ['X-s']: string;
}

interface Window {
  _webmsxyw: (url: string, e?: any) => Headers;
}

declare const window: Window;

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
}
