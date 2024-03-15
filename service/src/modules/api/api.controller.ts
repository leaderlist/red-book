import {
  Controller,
  Get,
  Post,
  Res,
  Req,
  Query,
  Body,
  Param,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetHomeFeedRequest, LoginCodeRequest, SendType } from 'src/type/fetch';
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
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(phone, zone, type);
    return this.apiService.sendCode(req, { phone, zone, type }, res);
  }

  @Post('v1/login/activate')
  async activate(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.getActivate(req, res);
  }

  @Get('v1/login/check_code')
  async checkCode(
    @Req() req: Request,
    @Query('phone') phone: number,
    @Query('zone') zone: number,
    @Query('code') code: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.checkCode(req, { phone, zone, code }, res);
  }

  @Get('v1/user/otherinfo')
  async getOtherInfo(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('user_id') user_id: string,
  ) {
    console.log(user_id, 'getOtherInfo');
    return this.apiService.getOtherInfo(req, { user_id }, res);
  }

  @Post('v2/login/code')
  async loginCode(
    @Req() req: Request,
    @Body() reqBody: LoginCodeRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { mobile_token, phone, zone } = reqBody;
    const data = { mobile_token, phone, zone };
    return this.apiService.loginCode(req, data, res);
  }

  @Post('v2/login/password')
  async loginPassword(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { phone, zone, password } = req.body;
    const data = { phone, zone, password };
    return this.apiService.loginPassword(req, data, res);
  }

  @Get('v2/user/me')
  async getUserInfo(@Req() req: Request) {
    console.log(req.url, 'getUserInfo');
    return this.apiService.getUserInfo(req);
  }

  @Post('v1/homefeed')
  async getHomeFeed(
    @Req() req: Request,
    @Body() body: GetHomeFeedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.cookies)
    return this.apiService.getHomeFeed(req, body, res);
  }

  @Get('v1/homefeed/category')
  async getHomefeedCategory(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.getHomefeedCategory(req, res);
  }
}
