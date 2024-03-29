"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncryptData = void 0;
const headers_1 = require("../../headers");
const getEncryptData = (url, cookie, params) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await (0, headers_1.getXHeader)(url, cookie, params);
            resolve(result);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.getEncryptData = getEncryptData;
//# sourceMappingURL=login.js.map