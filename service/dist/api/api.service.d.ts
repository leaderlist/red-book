import { CheckCodeRequest, SendCodeResponse, SendCodeRequest, ActiveRes, LoginCodeRequest } from 'src/type/fetch';
export declare class ApiService {
    getActivate(url: string): Promise<ActiveRes>;
    sendCode(url: string, params: SendCodeRequest): Promise<SendCodeResponse>;
    checkCode(url: string, params: CheckCodeRequest): Promise<SendCodeResponse>;
    loginCode(url: string, data: LoginCodeRequest): Promise<void | SendCodeResponse>;
}
