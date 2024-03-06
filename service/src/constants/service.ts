import { BaseResponse } from "src/type/fetch";

export const defaultRes: BaseResponse<null> = {
  code: 0,
  success: true,
  message: '成功',
  data: null,
};

export const defaultHeaderFailedRes: BaseResponse<null> = {
  code: -1,
  success: false,
  message: '失败，获取X Header失败',
  data: null,
}

export const defaultCookieFailedRes: BaseResponse<null> = {
  code: -1,
  success: false,
  message: '失败，cookie值无效',
  data: null,
}

export const BASE_URL = 'https://edith.xiaohongshu.com';