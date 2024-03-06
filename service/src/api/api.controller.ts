import { Controller, Get, Post, HttpCode, Res, Req, Query } from '@nestjs/common';
import { Request, Response } from 'express';
import { SendType } from 'src/type/fetch';
import { ApiService } from './api.service';

@Controller('api/sns/web')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('v2/login/send_code')
  async sendCode(@Req() req: Request, @Query('phone') phone: number, @Query('zone') zone: number, @Query('type') type: SendType) { //['phone', 'zone', 'type']
    return this.apiService.sendCode(req.url, { phone, zone, type });
  }

  @Post('v1/login/activate')
  @HttpCode(201)
  async activate(@Req() req: Request, @Res({ passthrough: true }) res: Response){
    const result = await this.apiService.getActivate(req.url);
    res.setHeader('set-cookie', `web_session=${result.data.session}`);
    return result;
  }

  @Get('v1/login/check_code')
  async checkCode(@Req() req: Request, @Query('phone') phone: number, @Query('zone') zone: number, @Query('code') code: number) {
    return this.apiService.checkCode(req.url, { phone, zone, code });
  }

  @Post('v2/login/code')
  async loginCode(@Req() req: Request) {
    console.log(req.body);
    return this.apiService.loginCode(req.url, { mobile_token: req.body.mobile_token, phone: req.body.phone, zone: req.body.zone });
  }
}
