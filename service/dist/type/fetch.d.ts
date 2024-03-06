export interface MyResponseType<T = any> {
    code: number;
    success: boolean;
    message: string;
    data?: T;
}
export interface ActivateData {
    user_id: string;
    session: string;
    secure_session: string;
}
