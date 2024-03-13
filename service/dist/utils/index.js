"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCookie = exports.formatHeader = exports.cookieMap = void 0;
exports.cookieMap = {};
const formatHeader = (xHeaderData, activeCookie) => {
    return {
        'x-t': xHeaderData['X-t'] + '',
        'x-s': xHeaderData['X-s'],
        'x-s-common': xHeaderData['X-s-common'],
        cookie: `a1=${xHeaderData.cookie};xsecappid=xhs-pc-web;${activeCookie || ''}`,
    };
};
exports.formatHeader = formatHeader;
const handleCookie = (result, response) => {
    if (result.cookie) {
        const { cookie } = result;
        const cookieData = cookie.reduce((acc, cur) => {
            return acc + cur.split(';')[0] + ';';
        }, '');
        response.setHeader('set-cookie', cookieData);
        cookie.forEach((item) => {
            const cookieStr = item.split(';')[0];
            const [key, value] = cookieStr.split('=');
            exports.cookieMap[key] = value;
        });
        console.log(exports.cookieMap, 'cookieMap');
    }
    return result;
};
exports.handleCookie = handleCookie;
//# sourceMappingURL=index.js.map