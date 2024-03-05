class Storage {
  constructor(path: string, opt?: any);

  readonly getItem(key: string): string | null;

  readonly setItem(key: string, val?: string): undefined | null;

  readonly removeItem(key: string): undefined;

  readonly clear(): void;

  readonly key(index: number): string | null;

  readonly length: number;

  readonly [Symbol.iterator](): IterableIterator<[string, string]>;
}