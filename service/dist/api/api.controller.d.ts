import { Request, Response } from 'express';
import { GetHomeFeedRequest, SendType } from 'src/type/fetch';
import { ApiService } from './api.service';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    sendCode(req: Request, phone: number, zone: number, type: SendType): Promise<import("src/type/fetch").SendCodeResponse>;
    activate(req: Request, res: Response): Promise<import("src/type/fetch").ActiveRes>;
    checkCode(req: Request, phone: number, zone: number, code: number): Promise<import("src/type/fetch").SendCodeResponse>;
    loginCode(req: Request, res: Response): Promise<import("src/type/fetch").SendCodeResponse>;
    getUserInfo(req: Request): Promise<import("src/type/fetch").GetUserInfoResponse>;
    getHomeFeed(req: Request, body: GetHomeFeedRequest): Promise<import("src/type/fetch").GetHomeFeedResponse>;
}
