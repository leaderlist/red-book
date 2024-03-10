import { XHeaderData } from 'src/type';
import { BaseResponse } from 'src/type/fetch';
import type { Response } from 'express';
export declare const cookieMap: Record<string, string>;
export declare const formatHeader: (xHeaderData: XHeaderData, activeCookie?: string) => {
    'x-t': string;
    'x-s': string;
    'x-s-common': string;
    cookie: string;
};
export declare const handleCookie: <T extends BaseResponse<any>>(result: T, response: Response) => T;
