"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const shell_1 = require("./shell");
const axios_1 = require("axios");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    async activate(req) {
        console.time('start handle fetch');
        const url = '/api/sns/web/v1/login/activate';
        const command = `node -e "require('./src/headers/index.js').getXHeader('${url}')"`;
        const res = await (0, shell_1.executeCommand)(command);
        let responseData = { code: 0, success: true, msg: '成功', data: null };
        if (res) {
            const xHeaderData = JSON.parse(res);
            if (!xHeaderData.cookie) {
                responseData = { code: -1, success: false, msg: '失败，cookie值无效', data: null };
            }
            else {
                console.timeEnd('start handle fetch');
                console.time('start fetch');
                const result = axios_1.default.post(`https://edith.xiaohongshu.com/api/sns/web/v1/login/activate`, {}, {
                    headers: {
                        'x-t': xHeaderData['X-t'] + '',
                        'x-s': xHeaderData['X-s'],
                        'x-s-common': xHeaderData['X-s-common'],
                        cookie: `a1=${xHeaderData.cookie};`,
                        'content-type': 'application/json;charset=UTF-8',
                    }
                }).then(async (res) => {
                    console.timeEnd('start fetch');
                    console.log(res.data);
                    return res;
                }).catch(err => console.log(err, 2222));
                responseData = {
                    code: 0,
                    success: true,
                    msg: '成功',
                    data: {
                        user_id: '65e1db6100000000030264f7',
                        session: '030037a2d28f156a2180a6ab9b224aefe30447',
                        secure_session: 'Xbdbd0session.030037a2d28f156a2180a6ab9b224aefe30447',
                    }
                };
            }
        }
        else {
            responseData = { code: -1, success: false, msg: '失败，获取X Header失败', data: null, };
        }
        return responseData;
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('/api/sns/web/v1/login/activate'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "activate", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map