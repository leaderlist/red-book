import { Controller, Get, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { executeCommand } from './shell';
import { ActiveRes, XHeaderData } from './type';
// import fetch, { post } from './fetch';
// import { getXHeader } from './headers/index';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/api/sns/web/v1/login/activate')
  async activate(@Request() req: any) {
    console.time('start handle fetch');
    const url = '/api/sns/web/v1/login/activate';
    const command = `node -e "require('./src/headers/index.js').getXHeader('${url}')"`;
    // console.log(getXHeader(url));
    const res = await executeCommand(command);
    let responseData: ActiveRes = {code: 0, success: true, msg: '成功', data: null };
    if (res) {
      const xHeaderData: XHeaderData = JSON.parse(res);
      if (!xHeaderData.cookie) {
        responseData = { code: -1, success: false, msg: '失败，cookie值无效', data: null };
      } else {
        console.timeEnd('start handle fetch');
        console.time('start fetch')
        const result = axios.post(`https://edith.xiaohongshu.com/api/sns/web/v1/login/activate`, {}, {
          headers: {
            'x-t': xHeaderData['X-t'] + '',
            'x-s': xHeaderData['X-s'],
            'x-s-common': xHeaderData['X-s-common'],
            cookie: `a1=${xHeaderData.cookie};`,
            'content-type': 'application/json;charset=UTF-8',
          }
        }).then(async res => {
          console.timeEnd('start fetch')
          // const result = await res.json();
          // console.log(result, 1111);
          console.log(res.data);
          return res;
        }).catch(err => console.log(err, 2222));
        // console.log(result, 11111);
        responseData = {
          code: 0,
          success: true,
          msg: '成功',
          data: {
            user_id: '65e1db6100000000030264f7',
            session: '030037a2d28f156a2180a6ab9b224aefe30447',
            secure_session:
              'Xbdbd0session.030037a2d28f156a2180a6ab9b224aefe30447',
          }
        }
      }
    } else {
      responseData =  { code: -1, success: false, msg: '失败，获取X Header失败', data: null, };
    }

    return responseData;
  }
}
