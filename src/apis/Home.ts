import { GetHomefeedCategoryResponse } from 'src/types/home';
import { fetch } from '.';

export const getHomeFeedCategory = () => {
  return fetch.get<GetHomefeedCategoryResponse>('/api/sns/web/v1/homefeed/category');
};
