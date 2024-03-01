import CookieManager from "@react-native-cookies/cookies"

export const setCookies = (url: string, cookies: Record<string, string>) => {
  Object.entries(cookies).forEach(item => {
    CookieManager.set(url, {
      name: item[0],
      value: item[1]
    });
  })
}

export const getCookies = (url: string, useWebkit = false) => {
  return CookieManager.get(url, useWebkit);
}

export const clearCookies = () => {
  CookieManager.clearAll();
}

export const removeCookiesByKey = (url: string, key: string) => {
  CookieManager.clearByName(url, key);
}
