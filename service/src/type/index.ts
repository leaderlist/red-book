export interface XHeaderData {
  ['X-t']: number;
  ['X-s']: string;
  cookie: string;
}

export interface ActiveRes {
  code: number;
  success: boolean;
  msg: string;
  data: ActiveResponseData | null;
}

export interface ActiveResponseData {
  user_id: string;
  session: string;
  secure_session: string;
}
