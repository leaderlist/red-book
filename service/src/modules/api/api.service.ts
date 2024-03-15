import { Injectable } from '@nestjs/common';
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
  LoginPasswordRequest,
  LoginPasswordResponse,
  OtherInfoRequest,
  OtherInfoResponse,
  HomeFeedCategoryResponse,
} from 'src/type/fetch';
import { formatHeader, handleCookie, cookieMap, formatCookies } from 'src/utils';
import { Request, Response } from 'express';

const modulePrefix = '/api/sns/web';

@Injectable()
export class ApiService {
  async getActivate(request: Request, response: Response) {
    console.time('start handle fetch');
    const xHeaderData = await getEncryptData(request.url, {});
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
        responseData = handleCookie(result, response);
      }
    } else {
      responseData = defaultHeaderFailedRes;
    }
    console.log(responseData, 'responseData');
    return responseData;
  }

  async sendCode(request: Request, params: SendCodeRequest, response: Response) {
    const encryptData = await getEncryptData(request.url);
    let resData: SendCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<SendCodeRequest, SendCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/send_code`,
        params,
        { headers: formatHeader(encryptData, formatCookies(request.cookies)) },
      );
      resData = handleCookie(result, response);
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async checkCode(request: Request, params: CheckCodeRequest, response: Response) {
    const encryptData = await getEncryptData(request.url);
    let resData: CheckCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<CheckCodeRequest, CheckCodeResponse>(
        `${BASE_URL}${modulePrefix}/v1/login/check_code`,
        params,
        { headers: formatHeader(encryptData, formatCookies(request.cookies)) },
      );
      resData = handleCookie(result, response);
      console.log(resData, 'check code');
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async loginCode(request: Request, data: LoginCodeRequest, response: Response) {
    const encryptData = await getEncryptData(request.url, data);
    let resData: LoginCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await postFetch<LoginCodeRequest, LoginCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/code`,
        data,
        { headers: { ...formatHeader(encryptData, formatCookies(request.cookies)) } },
      );
      resData = handleCookie(result, response);
      console.log(resData, 'loginCode');
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async getOtherInfo(
    request: Request,
    params: OtherInfoRequest,
    response: Response,
  ) {
    const encryptData = await getEncryptData(request.url);
    let responseData: OtherInfoResponse = defaultRes;
    if (encryptData?.cookie) {
      const result = await postFetch<OtherInfoRequest, OtherInfoResponse>(
        `${BASE_URL}${modulePrefix}/v2/user/info`,
        params,
        { headers: { ...formatHeader(encryptData, formatCookies(request.cookies)) } },
      );
      responseData = handleCookie(result, response);
      console.log(responseData, 'getOtherInfo');
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return responseData;
  }

  async loginPassword(
    request: Request,
    data: LoginPasswordRequest,
    response: Response,
  ) {
    const encryptData = await getEncryptData(request.url, data);
    let resData: LoginPasswordResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await postFetch<
        LoginPasswordRequest,
        LoginPasswordResponse
      >(`${BASE_URL}${modulePrefix}/v2/login/password`, data, {
        headers: { ...formatHeader(encryptData, formatCookies(request.cookies)) },
      });
      resData = handleCookie(result, response);
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async getUserInfo(request: Request) {
    const encryptData = await getEncryptData(request.url);
    let responseData: GetUserInfoResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<undefined, GetUserInfoResponse>(
        `${BASE_URL}${modulePrefix}/v2/user/me`,
        undefined,
        {
          headers: {
            ...formatHeader(encryptData, formatCookies(request.cookies)),
          },
        },
      );
      responseData = result;
    } else {
      responseData = encryptData.cookie
        ? defaultCookieFailedRes
        : defaultHeaderFailedRes;
    }

    return responseData;
  }

  async getHomeFeed(request: Request, data: GetHomeFeedRequest, response: Response) {
    const encryptData = await getEncryptData(request.url, data);
    let responseData: GetHomeFeedResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      console.log(data, 'cookies home feed', formatHeader(encryptData, formatCookies(request.cookies)));
      const result = await postFetch<GetHomeFeedRequest, GetHomeFeedResponse>(
        `${BASE_URL}${modulePrefix}/v1/homefeed`,
        data,
        {
          headers: {
            ...formatHeader(encryptData, formatCookies(request.cookies)),
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      );
      console.log(result, 'get home feed')
      responseData = handleCookie(result, response);
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }

    return responseData;
  }

  async getHomefeedCategory(request: Request, response: Response) {
    const encryptData = await getEncryptData(request.url);
    let responseData: HomeFeedCategoryResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<unknown, HomeFeedCategoryResponse>(
        `${BASE_URL}${modulePrefix}/v1/homefeed/category`,
        undefined,
        {
          headers: { ...formatHeader(encryptData, formatCookies(request.cookies)) },
        },
      );
      responseData = handleCookie(result, response);
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return responseData;
  }
}
