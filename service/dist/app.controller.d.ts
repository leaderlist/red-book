import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    activate(req: any): Promise<{
        code: number;
        success: boolean;
        msg: string;
        data: {
            user_id: string;
            session: string;
            secure_session: string;
        };
    }>;
}
