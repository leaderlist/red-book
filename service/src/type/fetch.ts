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

export enum SendType {
  Login = 'login'
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

export interface GetUserInfoResponseData {
  user_id: string;
  guest: boolean;
  nickname?: string;
  desc?: string;
  images?: string;
  imageb?: string;
}

export enum ModelType {
  Note = 'note',
}

export enum CardType {
  Video = 'video',
}

export interface HomeFeedItem {
  id: string;
  ignore: boolean;
  model_type: ModelType;
  note_card: NoteCardItem[];
  track_id: string;
}

export interface NoteCardItem {
  cover: any;
  display_title: string;
  type: CardType;
  interact_info: {
    liked: boolean;
    liked_count: string;
  };
  user: {
    nick_name: string;
    avatar: string;
    nickname: string;
    user_id: string;
  };
  video: {
    capa: { duration: number };
  };
}

export interface GetHomeFeedResponseData {
  cursor_score: string;
  items: HomeFeedItem[];
}

export enum Category {
  Recommend = 'homefeed_recommend',
}

export enum RefreshType {
  Change = 1,
  Drop = 3,
}

export enum ImageFilter {
  Jpg = 'jpg',
  Webp = 'webp',
  Avif = 'avif',
}

export interface GetHomeFeedRequest {
  category: Category;
  cursor_score: string;
  image_formats: ImageFilter[];
  need_filter_image: boolean;
  need_num: number;
  note_index: number;
  num: number;
  refresh_type: RefreshType;
  search_key: string;
  unread_begin_note_id: string;
  unread_end_note_id: string;
  unread_note_count: number;
}

export type ActivateResponse = BaseResponse<ActivateData>;
export type SendCodeResponse = BaseResponse<{}>;
export type CheckCodeResponse = BaseResponse<{ mobile_token: string }>;
export type LoginCodeResponse = BaseResponse<LoginCodeResponseData>;
export type GetUserInfoResponse = BaseResponse<GetUserInfoResponseData>;
export type GetHomeFeedResponse = BaseResponse<GetHomeFeedResponseData>;
