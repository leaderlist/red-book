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
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const fetch_1 = require("../type/fetch");
const api_service_1 = require("./api.service");
let ApiController = class ApiController {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async sendCode(req, phone, zone, type) {
        return this.apiService.sendCode(req.url, { phone, zone, type });
    }
    async activate(req, res) {
        const result = await this.apiService.getActivate(req.url);
        res.setHeader('set-cookie', `web_session=${result.data.session}`);
        return result;
    }
    async checkCode(req, phone, zone, code) {
        return this.apiService.checkCode(req.url, { phone, zone, code });
    }
    async loginCode(req) {
        console.log(req.body);
        return this.apiService.loginCode(req.url, { mobile_token: req.body.mobile_token, phone: req.body.phone, zone: req.body.zone });
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)('v2/login/send_code'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('phone')),
    __param(2, (0, common_1.Query)('zone')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "sendCode", null);
__decorate([
    (0, common_1.Post)('v1/login/activate'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "activate", null);
__decorate([
    (0, common_1.Get)('v1/login/check_code'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('phone')),
    __param(2, (0, common_1.Query)('zone')),
    __param(3, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "checkCode", null);
__decorate([
    (0, common_1.Post)('v2/login/code'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "loginCode", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api/sns/web'),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
//# sourceMappingURL=api.controller.js.map