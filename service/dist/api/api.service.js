"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../constants/service");
const fetch_1 = require("../fetch");
const login_1 = require("../service/snsWebV1/login");
const utils_1 = require("../utils");
const modulePrefix = '/api/sns/web';
let webSession = '';
let ApiService = class ApiService {
    async getActivate(url, response) {
        console.time('start handle fetch');
        const xHeaderData = await (0, login_1.getEncryptData)(url, {});
        let responseData = { ...service_1.defaultRes };
        if (xHeaderData) {
            if (!xHeaderData.cookie) {
                responseData = service_1.defaultCookieFailedRes;
            }
            else {
                console.timeEnd('start handle fetch');
                const result = await (0, fetch_1.postFetch)(`${service_1.BASE_URL}${modulePrefix}/v1/login/activate`, {}, {
                    headers: {
                        ...(0, utils_1.formatHeader)(xHeaderData),
                        'content-type': 'application/json;charset=UTF-8',
                    },
                });
                responseData = result;
                if (result.data.session) {
                    webSession = `web_session=${result.data.session};`;
                    response.setHeader('set-cookie', webSession);
                }
            }
        }
        else {
            responseData = service_1.defaultHeaderFailedRes;
        }
        return responseData;
    }
    async sendCode(url, params) {
        const encryptData = await (0, login_1.getEncryptData)(url);
        let resData = service_1.defaultRes;
        if (encryptData && encryptData.cookie) {
            const result = await (0, fetch_1.getFetch)(`${service_1.BASE_URL}${modulePrefix}/v2/login/send_code`, params, { headers: (0, utils_1.formatHeader)(encryptData, webSession) });
            console.log(result);
            resData = result;
        }
        else {
            resData = encryptData.cookie
                ? service_1.defaultHeaderFailedRes
                : service_1.defaultCookieFailedRes;
        }
        return resData;
    }
    async checkCode(url, params) {
        const encryptData = await (0, login_1.getEncryptData)(url);
        let resData = service_1.defaultRes;
        if (encryptData && encryptData.cookie) {
            const result = await (0, fetch_1.getFetch)(`${service_1.BASE_URL}${modulePrefix}/v1/login/check_code`, params, { headers: (0, utils_1.formatHeader)(encryptData, webSession) });
            resData = result;
        }
        else {
            resData = encryptData.cookie
                ? service_1.defaultHeaderFailedRes
                : service_1.defaultCookieFailedRes;
        }
        return resData;
    }
    async loginCode(url, data, response) {
        console.log(url, data);
        const encryptData = await (0, login_1.getEncryptData)(url, data);
        let resData = service_1.defaultRes;
        if (encryptData && encryptData.cookie) {
            const result = await (0, fetch_1.postFetch)(`${service_1.BASE_URL}${modulePrefix}/v2/login/code`, data, {
                headers: {
                    ...(0, utils_1.formatHeader)(encryptData, webSession),
                    'Content-Type': 'application/json',
                },
            });
            resData = result;
            if (result.data.session) {
                webSession = `web_session=${result.data.session};`;
                response.setHeader('Set-Cookie', webSession);
            }
        }
        else {
            resData = encryptData.cookie
                ? service_1.defaultHeaderFailedRes
                : service_1.defaultCookieFailedRes;
        }
        return resData;
    }
    async getUserInfo(url) {
        const encryptData = await (0, login_1.getEncryptData)(url);
        let responseData = service_1.defaultRes;
        console.log((0, utils_1.formatHeader)(encryptData, webSession));
        if (encryptData && encryptData.cookie) {
            const result = await (0, fetch_1.getFetch)(`${service_1.BASE_URL}${modulePrefix}/v2/user/me`, undefined, {
                headers: {
                    ...(0, utils_1.formatHeader)(encryptData, webSession),
                },
            });
            console.log(result, '/v2/user/me');
            responseData = result;
        }
        else {
            responseData = encryptData.cookie
                ? service_1.defaultCookieFailedRes
                : service_1.defaultHeaderFailedRes;
        }
        return responseData;
    }
    async getHomeFeed(url, data) {
        const encryptData = await (0, login_1.getEncryptData)(url);
        let responseData = service_1.defaultRes;
        if (encryptData && encryptData.cookie) {
            const result = await (0, fetch_1.getFetch)(`${service_1.BASE_URL}${modulePrefix}/v1/homefeed`, data, {
                headers: {
                    ...(0, utils_1.formatHeader)(encryptData, webSession),
                    Accept: 'gzip,deflate,br',
                },
            });
            console.log(result);
            responseData = result;
        }
        else {
            responseData = encryptData.cookie
                ? service_1.defaultHeaderFailedRes
                : service_1.defaultCookieFailedRes;
        }
        return responseData;
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);
//# sourceMappingURL=api.service.js.map