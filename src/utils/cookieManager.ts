import CookieManager from '@react-native-cookies/cookies';
import { BASE_URL, DEFAULT_DOMAIN } from 'src/constants';

export const setCookies = (cookies: Record<string, string>, url = BASE_URL) => {
  Object.entries(cookies).forEach((item) => {
    console.log(item, 'item', DEFAULT_DOMAIN);
    CookieManager.set(url, {
      name: item[0],
      value: item[1],
    });
  });
};

export const getCookies = (url = BASE_URL, useWebkit = false) => {
  return CookieManager.get(url, useWebkit);
};

export const clearCookies = () => {
  CookieManager.clearAll();
};

export const removeCookiesByKey = (key: string, url = BASE_URL) => {
  CookieManager.clearByName(url, key);
};

export const getCookieByKey = async (key: string, url = BASE_URL) => {
  const cookies = await CookieManager.get(url);
  return cookies[key];
};

export const setSingleCookie = (name: string, value: string, url = BASE_URL) => {
  return CookieManager.set(url, {
    name,
    value,
  });
};
