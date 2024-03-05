import { AppService } from './app.service';
import { ActiveRes } from './type';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    activate(req: any): Promise<ActiveRes>;
}
