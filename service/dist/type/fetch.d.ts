export interface MyResponseType<T = any> {
    code: number;
    success: boolean;
    message: string;
    data?: T;
}
export interface BaseResponse<T> {
    code: number;
    success: boolean;
    message: string;
    data: T | null;
}
export type ActiveRes = BaseResponse<ActiveResponseData>;
export interface ActiveResponseData {
    user_id: string;
    session: string;
    secure_session: string;
}
export interface ActivateData {
    user_id: string;
    session: string;
    secure_session: string;
}
export declare enum SendType {
    Login = "login"
}
export interface SendCodeRequest {
    phone: number;
    zone: number;
    type: SendType;
}
export interface CheckCodeRequest {
    phone: number;
    zone: number;
    code: number;
}
export interface LoginCodeRequest {
    mobile_token: string;
    phone: string;
    zone: string;
}
export interface LoginCodeResponseData {
    onboarding_page: any[];
    session: string;
    user_exists: boolean;
    user_id: string;
}
export type ActivateResponse = BaseResponse<ActivateData>;
export type SendCodeResponse = BaseResponse<{}>;
export type CheckCodeResponse = BaseResponse<{
    mobile_token: string;
}>;
export type LoginCodeResponse = BaseResponse<LoginCodeResponseData>;
