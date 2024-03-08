import {
  Controller,
  Get,
  Post,
  HttpCode,
  Res,
  Req,
  Query,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetHomeFeedRequest, SendType } from 'src/type/fetch';
import { ApiService } from './api.service';

@Controller('api/sns/web')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('v2/login/send_code')
  async sendCode(
    @Req() req: Request,
    @Query('phone') phone: number,
    @Query('zone') zone: number,
    @Query('type') type: SendType,
  ) {
    return this.apiService.sendCode(req.url, { phone, zone, type });
  }

  @Post('v1/login/activate')
  @HttpCode(201)
  async activate(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.getActivate(req.url, res);
  }

  @Get('v1/login/check_code')
  async checkCode(
    @Req() req: Request,
    @Query('phone') phone: number,
    @Query('zone') zone: number,
    @Query('code') code: number,
  ) {
    return this.apiService.checkCode(req.url, { phone, zone, code });
  }

  @Post('v2/login/code')
  async loginCode(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { mobile_token, phone, zone } = req.body;
    const data = { mobile_token, phone, zone };
    return this.apiService.loginCode(req.url, data, res);
  }

  @Get('v2/user/me')
  async getUserInfo(@Req() req: Request) {
    return this.apiService.getUserInfo(req.url);
  }

  @Post('v1/homefeed')
  async getHomeFeed(@Req() req: Request, @Body() body: GetHomeFeedRequest) {
    return this.apiService.getHomeFeed(req.url, body, req.headers);
  }
}
