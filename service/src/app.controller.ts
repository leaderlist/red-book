import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { getXHeader } from './headers';
import { executeCommand } from './shell';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/sns/web/v1/login/activate')
  async activate(@Request() req: any) {
    const url = '/api/sns/web/v1/login/activate';
    const res = await executeCommand(
      `node -e "require('./src/headers/test.js').getXHeader('${url}')`,
    );
    if (res) {
      const xHeaderData = JSON.parse(JSON.stringify(res));
      console.log(xHeaderData);
      return {
        code: 0,
        success: true,
        msg: '成功',
        data: {
          user_id: '65e1db6100000000030264f7',
          session: '030037a2d28f156a2180a6ab9b224aefe30447',
          secure_session:
            'Xbdbd0session.030037a2d28f156a2180a6ab9b224aefe30447',
        },
      };
    } else {
      return {
        code: -1,
        success: false,
        msg: '失败，获取X Header失败',
        data: null,
      };
    }
  }
}
