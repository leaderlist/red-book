declare module '*.png' {
  const width: number;
  const height: number;
  export default src;
}

interface Window {
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
