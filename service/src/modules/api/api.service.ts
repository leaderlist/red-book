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
  LoginPasswordRequest,
  LoginPasswordResponse,
  OtherInfoRequest,
  OtherInfoResponse,
  HomeFeedCategoryResponse,
} from 'src/type/fetch';
import { formatHeader, handleCookie, cookieMap } from 'src/utils';

const modulePrefix = '/api/sns/web';

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
        responseData = handleCookie(result, response);
      }
    } else {
      responseData = defaultHeaderFailedRes;
    }
    console.log(responseData, 'responseData');
    return responseData;
  }

  async sendCode(url: string, params: SendCodeRequest, response: Response) {
    const encryptData = await getEncryptData(url);
    let resData: SendCodeResponse = defaultRes;
    const webSession = `web_session=${cookieMap['web_session']};`;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<SendCodeRequest, SendCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/send_code`,
        params,
        { headers: formatHeader(encryptData, webSession) },
      );
      resData = handleCookie(result, response);
    } else {
      resData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return resData;
  }

  async checkCode(url: string, params: CheckCodeRequest, response: Response) {
    const encryptData = await getEncryptData(url);
    let resData: CheckCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await getFetch<CheckCodeRequest, CheckCodeResponse>(
        `${BASE_URL}${modulePrefix}/v1/login/check_code`,
        params,
        { headers: formatHeader(encryptData, webSession) },
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

  async loginCode(url: string, data: LoginCodeRequest, response: Response) {
    const encryptData = await getEncryptData(url, data);
    let resData: LoginCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await postFetch<LoginCodeRequest, LoginCodeResponse>(
        `${BASE_URL}${modulePrefix}/v2/login/code`,
        data,
        { headers: { ...formatHeader(encryptData, webSession) } },
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
    url: string,
    params: OtherInfoRequest,
    response: Response,
  ) {
    const encryptData = await getEncryptData(url);
    let responseData: OtherInfoResponse = defaultRes;
    if (encryptData?.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await postFetch<OtherInfoRequest, OtherInfoResponse>(
        `${BASE_URL}${modulePrefix}/v2/user/info`,
        params,
        { headers: { ...formatHeader(encryptData, webSession) } },
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
    url: string,
    data: LoginPasswordRequest,
    response: Response,
  ) {
    const encryptData = await getEncryptData(url, data);
    let resData: LoginPasswordResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await postFetch<
        LoginPasswordRequest,
        LoginPasswordResponse
      >(`${BASE_URL}${modulePrefix}/v2/login/password`, data, {
        headers: { ...formatHeader(encryptData, webSession) },
      });
      resData = handleCookie(result, response);
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
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      console.log('webSession', webSession, 'encryptData', encryptData);
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

  async getHomeFeed(url: string, data: GetHomeFeedRequest, response: Response) {
    const encryptData = await getEncryptData(url, data);
    let responseData: GetHomeFeedResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await postFetch<GetHomeFeedRequest, GetHomeFeedResponse>(
        `${BASE_URL}${modulePrefix}/v1/homefeed`,
        data,
        {
          headers: {
            ...formatHeader(encryptData, webSession),
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      );
      console.log(result);
      responseData = handleCookie(result, response);
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }

    return responseData;
  }

  async getHomefeedCategory(url: string, response: Response) {
    const encryptData = await getEncryptData(url);
    let responseData: HomeFeedCategoryResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const webSession = `web_session=${cookieMap['web_session']};`;
      const result = await getFetch<unknown, HomeFeedCategoryResponse>(
        `${BASE_URL}${modulePrefix}/v1/homefeed/category`,
        undefined,
        {
          headers: { ...formatHeader(encryptData, webSession) },
        },
      );
      console.log(result);
      responseData = handleCookie(result, response);
    } else {
      responseData = encryptData.cookie
        ? defaultHeaderFailedRes
        : defaultCookieFailedRes;
    }
    return responseData;
  }
}
