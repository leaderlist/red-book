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
