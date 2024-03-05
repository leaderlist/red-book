import { SNS_WEB_PREFIX } from 'src/constants/api';
import { fetch } from '../index';
import { XHeader } from '../../../init';

export interface SelfInfo {
  result: FetchResult;
  basic_info: BasicInfo;
  interactions: InteractionItem[],
  tags: TagItem[],
  tab_public: {
    collection: boolean
  }
}

interface FetchResult {
  success: boolean;
  code: number;
  message: string;
}

export interface BasicInfo {
  gender: number,
  ip_location?: string;
  desc?: string;
  imageb: string;
  images: string;
  nickname: string;
  red_id: string;
}

export interface InteractionItem {
  type: 'follows' | 'fans' | 'interaction';
  name: string;
  count: string;
}

export interface TagItem {
  icon: string;
  name: string;
  tagType: 'info';
}

/**
 * @description 检测到没有web_session cookie时请求，获取最新web_session cookie
 */
export const activateFetch = () => {
  return fetch.post(`${SNS_WEB_PREFIX}/v1/login/activate`, undefined, { headers: { ...XHeader } });
};

export const getSelf = () => fetch.get<undefined, { data: SelfInfo }>('/v1/user/selfinfo');
