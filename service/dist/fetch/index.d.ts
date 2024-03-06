import { AxiosRequestConfig } from 'axios';
import { MyResponseType } from 'src/type/fetch';
declare const fetch: import("axios").AxiosInstance;
export declare const getFetch: <T, D>(url: string, params?: T, options?: AxiosRequestConfig) => Promise<D>;
export declare const postFetch: <T, D extends MyResponseType<any>>(url: string, data?: T, options?: AxiosRequestConfig) => Promise<D>;
export default fetch;
