import {
  ActivateData,
  CheckCodeRequest,
  CheckCodeResponseData,
  GetUserInfoResponse,
  LoginCodeRequest,
  LoginCodeResponse,
  LoginRequest,
  LoginResponse,
  SendCodeRequest,
} from 'src/types/user';
import { fetch } from '.';

export const login = () => {
  return fetch.get<LoginResponse, LoginRequest>('/');
};

export const getActivate = () => {
  return fetch.post<ActivateData>('/api/sns/web/v1/login/activate');
};

export const sendCode = (params: SendCodeRequest) => {
  console.log(params, 'params send code');
  return fetch.get<{}, SendCodeRequest>('/api/sns/web/v2/login/send_code', { params });
};

export const checkCode = (params: CheckCodeRequest) => {
  return fetch.get<CheckCodeResponseData, CheckCodeRequest>('/api/sns/web/v1/login/check_code', { params });
};

export const loginCode = (data: LoginCodeRequest) => {
  return fetch.post<LoginCodeResponse, LoginCodeRequest>('/api/sns/web/v2/login/code', { data });
};

export const getUserInfo = () => {
  return fetch.get<GetUserInfoResponse>('/api/sns/web/v2/user/me');
};
