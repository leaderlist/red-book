const { encrypt_mcr, getPlatformCode, __webpack_require__, generateLocalId, encrypt_MD5, window, } = require('../X-Data');
const { RC4_SECRET_VERSION_KEY, RC4_SECRET_VERSION, LOCAL_ID_KEY, MINI_BROSWER_INFO_KEY, WEB_ID_KEY, } = require('./constants');
const localStorage = window.localStorage;
const js_cookie = __webpack_require__(72118);
function initCookie() {
    const localId = generateLocalId('Mac OS');
    js_cookie.Z().set(LOCAL_ID_KEY, localId);
    js_cookie.Z().set(WEB_ID_KEY, encrypt_MD5(localId));
    js_cookie.Z().set('xsecappid', 'xhs-pc-web');
}
initCookie();
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
module.exports = {
    getSignParams,
};
//# sourceMappingURL=getSignParams.js.map