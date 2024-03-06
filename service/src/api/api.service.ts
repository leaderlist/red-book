import { Injectable } from '@nestjs/common';
import { BASE_URL, defaultCookieFailedRes, defaultHeaderFailedRes, defaultRes } from 'src/constants/service';
import { getFetch, postFetch } from 'src/fetch';
import { getEncryptData } from 'src/service/snsWebV1/login';
import { CheckCodeRequest, SendCodeResponse, SendCodeRequest, ActiveRes, MyResponseType, CheckCodeResponse, LoginCodeRequest, ActivateResponse } from 'src/type/fetch';
import { formatHeader } from 'src/utils';

@Injectable()
export class ApiService {
  async getActivate(url: string) {
    console.time('start handle fetch');
    const xHeaderData = await getEncryptData(url, {});
    let responseData: ActiveRes = { ...defaultRes };
    if (xHeaderData) {
      if (!xHeaderData.cookie) {
        responseData = defaultCookieFailedRes;
      } else {
        console.timeEnd('start handle fetch');
        const result = await postFetch<object, ActivateResponse>(
          `${BASE_URL}/api/sns/web/v1/login/activate`,
          {},
          {
            headers: {
              ...formatHeader(xHeaderData),
              'content-type': 'application/json;charset=UTF-8',
            },
          },
        );
        responseData = result;
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
        `${BASE_URL}/api/sns/web/v2/login/send_code`,
        params,
        { headers: formatHeader(encryptData) }
      );
      console.log(result);
      resData = result;
    } else {
      resData = encryptData.cookie ? defaultHeaderFailedRes : defaultCookieFailedRes;
    }
    return resData;
  }

  async checkCode(url: string, params: CheckCodeRequest) {
    const encryptData = await getEncryptData(url);
    let resData: SendCodeResponse = defaultRes;
    if (encryptData && encryptData.cookie) {
      const result = await getFetch<CheckCodeRequest, CheckCodeResponse>(
        `${BASE_URL}/api/sns/web/v1/login/check_code`,
        params,
        { headers: formatHeader(encryptData) }
      );
      resData = result;
    } else {
      resData = encryptData.cookie ? defaultHeaderFailedRes : defaultCookieFailedRes;
    }
    return resData;
  }

  async loginCode(url: string, data: LoginCodeRequest) {

  }
}
