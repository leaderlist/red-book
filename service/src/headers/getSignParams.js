/* eslint-disable @typescript-eslint/no-var-requires */
// import { __webpack_require__, map_default } from '../X-Data/webpack';
const {
  encrypt_mcr,
  getPlatformCode,
  __webpack_require__,
  generateLocalId,
  encrypt_MD5,
  window,
} = require('../X-Data');
const {
  RC4_SECRET_VERSION_KEY,
  RC4_SECRET_VERSION,
  LOCAL_ID_KEY,
  MINI_BROSWER_INFO_KEY,
  WEB_ID_KEY,
} = require('./constants');
// import { window } from '../X-Data/Window';

const localStorage = window.localStorage;

const js_cookie = __webpack_require__(72118);

function initCookie() {
  const localId = generateLocalId('Mac OS')
  js_cookie.Z().set(LOCAL_ID_KEY, localId);
  js_cookie.Z().set(WEB_ID_KEY, encrypt_MD5(localId));
  js_cookie.Z().set('xsecappid', 'xhs-pc-web');
}

initCookie();

async function getSignParams(headers) {
  const platform = getPlatformCode('Mac OS');
  const rc4SecretVersion =
    localStorage.getItem(RC4_SECRET_VERSION_KEY) || RC4_SECRET_VERSION;
  let r, n;
  const u = headers['X-t'];
  const c = headers['X-s'];
  const f = localStorage.getItem(MINI_BROSWER_INFO_KEY);
  const x5 = await js_cookie.Z().get(LOCAL_ID_KEY);
  let x9 = 0;
  try {
    x9 = encrypt_mcr(
      concat((r = concat((n = ''.concat(u + ''))).call(n, c))).call(r, f),
    );
  } catch (e) {
    x9 = Math.floor(Math.random() * 1000000000); // window对象和浏览器不一致，很多属性不具备，无法正确调用 encrypt_mcr 函数
  }
  return {
    s0: platform,
    s1: '',
    x0: rc4SecretVersion,
    x1: '3.6.8', // 跟随xiaohongshu版本
    x2: 'MacOS',
    x3: 'xhs-pc-web', // todo
    x4: '4.2.5',
    x5: x5,
    x6: headers['X-t'],
    x7: headers['X-s'],
    x8: f, // todo，目前没找到set的方式，只能默认写死
    x9,
  };
}
// function genRandomString(t) {
//   var e, r;
//   return map_default()(e = (r = Array(t)).fill(void 0)).call(e, (function() {
//       return CHARSET[Math.floor(36 * Math.random())]
//   }
//   )).join("")
// }
// module.exports = getSignParams;

module.exports = {
  getSignParams,
};
