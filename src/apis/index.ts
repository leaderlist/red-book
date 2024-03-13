import { BASE_URL } from 'src/constants';
import MyFetch from './Fetch';

export const fetch = new MyFetch({
  baseUrl: BASE_URL,
});

fetch.interceptors.request.use((config) => {
  // console.log(config, 'fetch config');
  return config;
});

fetch.interceptors.response.use(
  (response) => {
    console.log(response, 'fetch success');
    return response;
  },
  (err) => {
    console.log(err.message, 'fetch error');
    return err;
  },
);
