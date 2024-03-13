import { GetHomefeedCategoryResponse } from 'src/types/home';
import { fetch } from '.';

export const getHomeFeed = (data: any) => {
  return fetch.post('/api/sns/web/v1/homefeed', { data });
};

export const getHomeFeedCategory = () => {
  return fetch.get<GetHomefeedCategoryResponse>('/api/sns/web/v1/homefeed/category');
};
