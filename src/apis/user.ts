import { LoginRequest, LoginResponse } from 'src/types/user';
import { fetch } from '.';

export const login = (params: LoginRequest) => {
  return fetch.get<LoginRequest, LoginResponse>('user/login', params);
};
