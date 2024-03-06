export function getXHeader(url: any, param: any): Promise<{
    'X-s-common': any;
    cookie: string;
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string;
    getSetCookie(): string[];
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
    entries(): IterableIterator<[string, string]>;
    keys(): IterableIterator<string>;
    values(): IterableIterator<string>;
    "X-t": number;
    "X-s": string;
    [Symbol.iterator](): IterableIterator<[string, string]>;
}>;
