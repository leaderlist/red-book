import { Response } from 'express';
import { CheckCodeRequest, SendCodeResponse, SendCodeRequest, ActiveRes, LoginCodeRequest, GetUserInfoResponse, GetHomeFeedResponse, GetHomeFeedRequest } from 'src/type/fetch';
export declare class ApiService {
    getActivate(url: string, response: Response): Promise<ActiveRes>;
    sendCode(url: string, params: SendCodeRequest): Promise<SendCodeResponse>;
    checkCode(url: string, params: CheckCodeRequest): Promise<SendCodeResponse>;
    loginCode(url: string, data: LoginCodeRequest, response: Response): Promise<SendCodeResponse>;
    getUserInfo(url: string): Promise<GetUserInfoResponse>;
    getHomeFeed(url: string, data: GetHomeFeedRequest): Promise<GetHomeFeedResponse>;
}
