"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BASE_URL = exports.defaultCookieFailedRes = exports.defaultHeaderFailedRes = exports.defaultRes = void 0;
exports.defaultRes = {
    code: 0,
    success: true,
    message: '成功',
    data: null,
};
exports.defaultHeaderFailedRes = {
    code: -1,
    success: false,
    message: '失败，获取X Header失败',
    data: null,
};
exports.defaultCookieFailedRes = {
    code: -1,
    success: false,
    message: '失败，cookie值无效',
    data: null,
};
exports.BASE_URL = 'https://edith.xiaohongshu.com';
//# sourceMappingURL=service.js.map