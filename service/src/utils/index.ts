import { XHeaderData } from 'src/type';
import { BaseResponse } from 'src/type/fetch';
import type { Response } from 'express';

export const cookieMap: Record<string, string> = {};

export const formatHeader = (
  xHeaderData: XHeaderData,
  activeCookie?: string,
) => {
  return {
    'x-t': xHeaderData['X-t'] + '',
    'x-s': xHeaderData['X-s'],
    'x-s-common': xHeaderData['X-s-common'],
    cookie: `a1=${xHeaderData.cookie};xsecappid=xhs-pc-web;${activeCookie || ''}`,
  };
};

export const handleCookie = <T extends BaseResponse<any>>(
  result: T,
  response: Response,
) => {
  if (result.cookie) {
    const { cookie } = result;
    const cookieData = cookie.reduce((acc, cur) => {
      return acc + cur.split(';')[0] + ';';
    }, '');
    response.setHeader('set-cookie', cookieData);
    // mock数据用，之后删除
    cookie.forEach((item) => {
      const cookieStr = item.split(';')[0];
      const [key, value] = cookieStr.split('=');
      cookieMap[key] = value;
    });
    console.log(cookieMap);
  }

  return result;
};
