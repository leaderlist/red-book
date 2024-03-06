"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleActivateReq = void 0;
const fetch_1 = require("../fetch");
const login_1 = require("../service/snsWebV1/login");
const handleActivateReq = async (url) => {
    console.time('start handle fetch');
    const res = await (0, login_1.getActivateReq)(url);
    let responseData = {
        code: 0,
        success: true,
        msg: '成功',
        data: null,
    };
    if (res) {
        const xHeaderData = JSON.parse(res);
        if (!xHeaderData.cookie) {
            responseData = {
                code: -1,
                success: false,
                msg: '失败，cookie值无效',
                data: null,
            };
        }
        else {
            console.timeEnd('start handle fetch');
            const result = await (0, fetch_1.postFetch)(`https://edith.xiaohongshu.com/api/sns/web/v1/login/activate`, {}, {
                headers: {
                    'x-t': xHeaderData['X-t'] + '',
                    'x-s': xHeaderData['X-s'],
                    'x-s-common': xHeaderData['X-s-common'],
                    cookie: `a1=${xHeaderData.cookie};`,
                    'content-type': 'application/json;charset=UTF-8',
                },
            });
            const { user_id, session, secure_session } = result?.data;
            responseData = {
                code: 0,
                success: true,
                msg: '成功',
                data: { user_id, session, secure_session },
            };
        }
    }
    else {
        responseData = {
            code: -1,
            success: false,
            msg: '失败，获取X Header失败',
            data: null,
        };
    }
    return responseData;
};
exports.handleActivateReq = handleActivateReq;
//# sourceMappingURL=request.js.map