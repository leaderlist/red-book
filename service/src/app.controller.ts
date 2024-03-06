import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { handleActivateReq } from './controller/request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/sns/web/v1/login/activate')
  async activate(@Request() req: { url: string }) {
    const result = await handleActivateReq(req.url);
    return result;
  }
}
