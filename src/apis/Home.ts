import { GetHomeFeedRequest, GetHomeFeedResponse, GetHomefeedCategoryResponse } from 'src/types/home';
import { fetch } from '.';

export const getHomeFeedCategory = () => {
  return fetch.get<GetHomefeedCategoryResponse>('/api/sns/web/v1/homefeed/category');
};

export const getHomeFeed = (data: GetHomeFeedRequest) => {
  return fetch.post<GetHomeFeedResponse, GetHomeFeedRequest>('/api/sns/web/v1/homefeed', { data });
};
