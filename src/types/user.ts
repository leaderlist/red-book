export interface LoginRequest {
  name: string;
  pwd: string;
}

export interface LoginResponse {
  name: string;
  avatar?: string;
  desc?: string;
  sex?: SexyType;
  redBookId: number;
  location?: string;
  nickName?: string;
}

export enum SexyType {
  MALE = 'male',
  FEMALE = 'female',
}

export interface ActivateData {
  user_id: string;
  session: string;
  secure_session: string;
}

export enum SendType {
  Login = 'login',
}

export interface SendCodeRequest {
  phone: number;
  zone: number;
  type: SendType;
}

export interface CheckCodeRequest {
  phone: number;
  zone: number;
  code: number;
}

export interface CheckCodeResponseData {
  mobile_token: string;
}

export interface LoginCodeResponse {
  onboarding_page: any[];
  session: string;
  user_exists: boolean;
  user_id: string;
}

export interface LoginCodeRequest {
  mobile_token: string;
  phone: number;
  zone: number;
}

export interface GetUserInfoResponse {
  user_id: string;
  guest: boolean;
  nickname?: string;
  desc?: string;
  images?: string;
  imageb?: string;
}
