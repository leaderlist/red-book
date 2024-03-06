import { Request, Response } from 'express';
import { SendType } from 'src/type/fetch';
import { ApiService } from './api.service';
export declare class ApiController {
    private readonly apiService;
    constructor(apiService: ApiService);
    sendCode(req: Request, phone: number, zone: number, type: SendType): Promise<SendCodeResponse>;
    activate(req: Request, res: Response): Promise<ActiveRes>;
    checkCode(req: Request, phone: number, zone: number, code: number): Promise<SendCodeResponse>;
    loginCode(req: Request): Promise<void>;
}
