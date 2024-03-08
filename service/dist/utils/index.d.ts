import { XHeaderData } from 'src/type';
export declare const formatHeader: (xHeaderData: XHeaderData, activeCookie?: string) => {
    'x-t': string;
    'x-s': string;
    'x-s-common': string;
    cookie: string;
};
