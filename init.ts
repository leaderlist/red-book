import { encrypt_MD5 } from 'src/xiaoHongShuHelper/encrypt_MD5';
import {
  INIT_STORAGE_VALUES,
  LOCAL_ID_KEY,
  MINI_BROSWER_INFO_KEY,
  RC4_SECRET_VERSION_KEY,
  WEB_ID_KEY,
  WEB_SESSION_KEY,
} from './src/constants/sign';
import { setStorage, multiGetStorage } from './src/stores/storage';
import { getCookies, setSingleCookie } from './src/utils/cookieManager';
import getSignParams, { generateLocalId } from './src/utils/getSignParams';
import { getXSCommon, initParams, encrypt_sign } from './src/xiaoHongShuHelper/X-S-Common';
import { activateFetch, getSelf } from 'src/apis/snsWeb';
import './src/xiaoHongShuHelper/signTest';

interface XHeaderData {
  ['X-s']?: string;
  ['X-t']?: number;
  ['X-s-common']?: string;
}

export let XHeader: XHeaderData = {};

const cookieList = [LOCAL_ID_KEY, WEB_ID_KEY];
const cookieValuesList = [generateLocalId('Mac OS'), encrypt_MD5(generateLocalId('Mac OS'))];
export const initAppData = async () => {
  initParams();

  const keys = [MINI_BROSWER_INFO_KEY, RC4_SECRET_VERSION_KEY];
  const initStorage = await multiGetStorage(keys);

  console.log(window._webmsxyw);

  await Promise.all(
    initStorage.map((item, index) => {
      const promise = new Promise<void>((resolve, reject) => {
        if (!item[1]) {
          setStorage(keys[index], INIT_STORAGE_VALUES[index])?.then(resolve).catch(reject);
        } else {
          resolve();
        }
      });

      return promise;
    }),
  );

  const signResult = window._webmsxyw('/api/sns/web/v1/login/activate');
  console.log(signResult, 'signResult');

  let XSCommonParams;
  try {
    XSCommonParams = await getSignParams(signResult);
  } catch (e) {
    console.log(e);
  }

  console.log(XSCommonParams, 'XSCommonParams');

  XHeader = {
    ...signResult,
    ['X-s-common']: getXSCommon(XSCommonParams),
  };

  console.log(XHeader, 'XHeader');

  const allCookies = await getCookies('https://edith.xiaohongshu.com');

  cookieList.forEach((key, index) => {
    if (!allCookies[key]?.value) {
      setSingleCookie('https://edith.xiaohongshu.com', key, cookieValuesList[index]);
    }
  });

  Promise.all(
    cookieList
      .filter((key) => !allCookies[key]?.value)
      .map((key, index) => {
        const promise = new Promise<void>((resolve, reject) => {
          setSingleCookie('https://edith.xiaohongshu.com', key, cookieValuesList[index])
            .then(() => resolve())
            .catch((rej) => reject(rej));
        });

        return promise;
      }),
  )
    .then(async () => {
      const allCookieList = await getCookies('https://edith.xiaohongshu.com');
      console.log(allCookieList, 'allCookieList');
      // if (!allCookieList[WEB_SESSION_KEY]?.value) {
        try {
          const signStr = encrypt_sign('/api/sns/web/v1/login/activate');
          console.log(signStr, 'signStr');
        } catch (e) {
          console.log(e);
        }
        activateFetch().then((result) => console.log(result, 'activateFetch'));
        getSelf();
      // }
    })
    .catch((err) => console.log(err, 'init data Promise'));
};
