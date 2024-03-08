"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHeader = void 0;
const formatHeader = (xHeaderData, activeCookie) => {
    return {
        'x-t': xHeaderData['X-t'] + '',
        'x-s': xHeaderData['X-s'],
        'x-s-common': xHeaderData['X-s-common'],
        cookie: `a1=${xHeaderData.cookie};xsecappid=xhs-pc-web;${activeCookie || ''}`,
    };
};
exports.formatHeader = formatHeader;
//# sourceMappingURL=index.js.map