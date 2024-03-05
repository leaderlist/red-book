import CookieManager from '@react-native-cookies/cookies';

export const setCookies = (url: string, cookies: Record<string, string>) => {
  console.log(cookies, 'cookies');
  Object.entries(cookies).forEach((item) => {
    console.log(item)
    CookieManager.set(url, {
      name: item[0],
      value: item[1],
    });
  });
};

export const getCookies = (url: string, useWebkit = false) => {
  return CookieManager.get(url, useWebkit);
};

export const clearCookies = () => {
  CookieManager.clearAll();
};

export const removeCookiesByKey = (url: string, key: string) => {
  CookieManager.clearByName(url, key);
};

export const getCookieByKey = async (url: string, key: string) => {
  const cookies = await CookieManager.get(url);
  return cookies[key];
};

export const setSingleCookie = (url: string, name: string, value: string) => {
  return CookieManager.set(url, {
    name,
    value,
  });
};
