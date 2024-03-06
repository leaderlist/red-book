import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    activate(req: {
        url: string;
    }): Promise<any>;
}
