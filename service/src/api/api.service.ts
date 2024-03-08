import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import {
  BASE_URL,
  defaultCookieFailedRes,
  defaultHeaderFailedRes,
  defaultRes,
} from 'src/constants/service';
import { getFetch, postFetch } from 'src/fetch';
import { getEncryptData } from 'src/service/snsWebV1/login';
import {
  CheckCodeRequest,
  SendCodeResponse,
  SendCodeRequest,
  ActiveRes,
  CheckCodeResponse,
  LoginCodeRequest,
  ActivateResponse,
  LoginCodeResponse,
  GetUserInfoResponse,
  GetHomeFeedResponse,
  GetHomeFeedRequest,
} from 'src/type/fetch';
import { formatHeader } from 'src/utils';

const modulePrefix = '/api/sns/web';
let webSession = '';

@Injectable()
export class ApiService {
  async getActivate(url: string, response: Response) {
    console.time('start handle fetch');
    const xHeaderData = await getEncryptData(url, {});
    let responseData: ActiveRes = { ...defaultRes };
    if (xHeaderData) {
      if (!xHeaderData.cookie) {
        responseData = defaultCookieFailedRes;
      } else {
        console.timeEnd('start handle fetch');
        const result = await postFetch<object, ActivateResponse>(
          `${BASE_URL}${modulePrefix}/v1/login/activate`,
          {},
          {
            headers: {
              ...formatHeader(xHeaderData),
              'content-type': 'application/json;charset=UTF-8',
            },
          },
        );
        responseData = result;
        if (result.data.session) {
          webSession = `web_session=${result.data.session};`;
          response.setHeader('set-cookie', webSession);
        }
      }
    } else {
      responseData = defaultHeaderFailedRes;
    }
    return responseData;
  }

  async sendCode(url: string, params: SendCodeRequest) {
    const encryptData = await getEncryptData(url);
    let resData: SendCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<SendCodeRequest, SendCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/send_code`,
        params,
        { headers: formatHeader(encryptData, webSession) },
      );
      console.log(result);
      resData = result;
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async checkCode(url: string, params: CheckCodeRequest) {
    const encryptData = await getEncryptData(url);
    let resData: SendCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<CheckCodeRequest, CheckCodeResponse>(
        `${BASE_URL}${modulePrefix}/v1/login/check_code`,
        params,
        { headers: formatHeader(encryptData, webSession) },
      );
      resData = result;
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async loginCode(url: string, data: LoginCodeRequest, response: Response) {
    console.log(url, data);
    const encryptData = await getEncryptData(url, data);
    let resData: SendCodeResponse | void = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await postFetch<LoginCodeRequest, LoginCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/code`,
        data,
        {
          headers: {
            ...formatHeader(encryptData, webSession),
            'Content-Type': 'application/json',
          },
        },
      );
      resData = result;
      if (result.data.session) {
        webSession = `web_session=${result.data.session};`;
        response.setHeader('Set-Cookie', webSession);
      }
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async getUserInfo(url: string) {
    const encryptData = await getEncryptData(url);
    let responseData: GetUserInfoResponse = defaultRes;
    console.log(formatHeader(encryptData, webSession))
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<undefined, GetUserInfoResponse>(
        `${BASE_URL}${modulePrefix}/v2/user/me`,
        undefined,
        {
          headers: {
            ...formatHeader(encryptData, webSession),
          },
        },
      );
      console.log(result, '/v2/user/me');
      responseData = result;
    } else {
      responseData = encryptData.cookie
        ? defaultCookieFailedRes
        : defaultHeaderFailedRes;
    }

    return responseData;
  }

  async getHomeFeed(url: string, data: GetHomeFeedRequest) {
    const encryptData = await getEncryptData(url);
    let responseData: GetHomeFeedResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<GetHomeFeedRequest, GetHomeFeedResponse>(
        `${BASE_URL}${modulePrefix}/v1/homefeed`,
        data,
        {
          headers: {
            ...formatHeader(encryptData, webSession),
            Accept: 'gzip,deflate,br',
          },
        },
      );
      console.log(result);
      responseData = result;
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }

    return responseData;
  }
}
