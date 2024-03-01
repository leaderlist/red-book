import { Platform } from 'react-native';
import { getStorage } from 'src/stores/storage';
import { __webpack_require__, map_default } from '../xiaoHongShuHelper/webpack';
import { encrypt_mcr, getPlatformCode } from '../xiaoHongShuHelper/X-S-Common';
import {
  CHARSET,
  LOCAL_ID_SECRET_VERSION,
  RC4_SECRET_VERSION_KEY,
  RC4_SECRET_VERSION,
  LOCAL_ID_KEY,
  MINI_BROSWER_INFO_KEY,
} from 'src/constants/sign';


const concat = __webpack_require__(60056);
const concat_default = __webpack_require__.n(concat);

const js_cookie = __webpack_require__(72118);

const platFormMap = {
  ios: 'iOS',
  android: 'Android',
  macos: 'MacOS',
  windows: 'Windows',
  web: 'Web',
};

interface Headers {
  ['X-t']: number;
  ['X-s']: string;
}

export default async (headers: Headers) => {
  const platform = platFormMap[Platform.OS];
  const rc4SecretVersion = await getStorage(RC4_SECRET_VERSION_KEY) || RC4_SECRET_VERSION;
  let r:any, n: any;
  const u = headers['X-t'];
  const c = headers['X-s'];
  const f = await getStorage(MINI_BROSWER_INFO_KEY,);
  return {
    s0: platform,
    s1: '',
    x0: rc4SecretVersion,
    x1: '3.6.8', // 跟随xiaohongshu版本
    x2: platform || 'PC',
    x3: 'xhs-mobile-android', // todo
    x4: '4.2.5',
    x5: js_cookie.Z.get(LOCAL_ID_KEY),
    x6: headers['X-t'],
    x7: headers['X-s'],
    x8: f, // todo，目前没找到set的方式，只能默认写死
    x9: encrypt_mcr(concat_default()((r = concat_default()((n = ''.concat(u))).call(n, c))).call(r, f))
  };
}

export function generateLocalId(t: string) {
  var e, r, n, o, i, a = getPlatformCode(t), u = concat_default()(e = concat_default()(r = concat_default()(n = concat_default()(o = "".concat((+new Date).toString(16))).call(o, genRandomString(30))).call(n, a)).call(r, LOCAL_ID_SECRET_VERSION)).call(e, "000"), c = crc32(u);
  return concat_default()(i = "".concat(u)).call(i, c).substring(0, 52)
}

function genRandomString(t: number) {
  var e, r;
  return map_default()(e = (r = Array(t)).fill(void 0)).call(e, (function() {
      return CHARSET[Math.floor(36 * Math.random())]
  }
  )).join("")
}

function crc32(t: string) {
  for (var e, r = [], n = 0; n < 256; n++) {
      e = n;
      for (var o = 0; o < 8; o++)
          e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
      r[n] = e
  }
  for (var i = -1, a = 0; a < t.length; a++)
      i = i >>> 8 ^ r[255 & (i ^ t.charCodeAt(a))];
  return (-1 ^ i) >>> 0
};