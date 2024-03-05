const { encrypt_mcr, getPlatformCode, __webpack_require__, map_default, window } = require('../X-Data');
const { CHARSET, RC4_SECRET_VERSION_KEY, RC4_SECRET_VERSION, LOCAL_ID_KEY, MINI_BROSWER_INFO_KEY, INIT_STORAGE_VALUES } = require('./constants');
const localStorage = window.localStorage;
function initLocalStorage() {
    const miniBroswerInfo = localStorage.getItem(MINI_BROSWER_INFO_KEY);
    const rc4SecretVersion = localStorage.getItem(RC4_SECRET_VERSION_KEY);
    if (!miniBroswerInfo || !rc4SecretVersion) {
        localStorage.setItem(MINI_BROSWER_INFO_KEY, INIT_STORAGE_VALUES[0]);
        localStorage.setItem(RC4_SECRET_VERSION_KEY, INIT_STORAGE_VALUES[1]);
    }
}
const concat = __webpack_require__(60056);
const concat_default = __webpack_require__.n(concat);
const js_cookie = __webpack_require__(72118);
async function getSignParams(headers) {
    const platform = getPlatformCode('Mac OS');
    const rc4SecretVersion = localStorage.getItem(RC4_SECRET_VERSION_KEY) || RC4_SECRET_VERSION;
    let r, n;
    const u = headers['X-t'];
    const c = headers['X-s'];
    const f = localStorage.getItem(MINI_BROSWER_INFO_KEY);
    const x5 = await js_cookie.Z().get(LOCAL_ID_KEY);
    let x9 = 0;
    try {
        x9 = encrypt_mcr(concat((r = concat((n = ''.concat(u + ''))).call(n, c))).call(r, f));
    }
    catch (e) {
        x9 = Math.floor(Math.random() * 1000000000);
    }
    return {
        s0: platform,
        s1: '',
        x0: rc4SecretVersion,
        x1: '3.6.8',
        x2: 'MacOS',
        x3: 'xhs-pc-web',
        x4: '4.2.5',
        x5: x5,
        x6: headers['X-t'],
        x7: headers['X-s'],
        x8: f,
        x9,
    };
}
;
function genRandomString(t) {
    var e, r;
    return map_default()(e = (r = Array(t)).fill(void 0)).call(e, (function () {
        return CHARSET[Math.floor(36 * Math.random())];
    })).join("");
}
function crc32(t) {
    for (var e, r = [], n = 0; n < 256; n++) {
        e = n;
        for (var o = 0; o < 8; o++)
            e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
        r[n] = e;
    }
    for (var i = -1, a = 0; a < t.length; a++)
        i = i >>> 8 ^ r[255 & (i ^ t.charCodeAt(a))];
    return (-1 ^ i) >>> 0;
}
;
module.exports = {
    initLocalStorage,
    getSignParams,
};
//# sourceMappingURL=getSignParams.js.map