"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActivateReq = void 0;
const headers_1 = require("../../headers");
const getActivateReq = (url) => {
    console.time('start exec');
    return new Promise(async (resolve, reject) => {
        try {
            const result = await (0, headers_1.getXHeader)(url);
            resolve(JSON.stringify(result));
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.getActivateReq = getActivateReq;
//# sourceMappingURL=login.js.map