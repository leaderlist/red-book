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
  cookie?: string[];
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
  Login = 'login',
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

export interface OtherInfoRequest {
  user_id: string;
}

export type OtherInfoResponseData = Record<string, any>;

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
  // 推荐
  RECOMMEND = 'homefeed_recommend',
  // 穿搭
  FASHION = 'homefeed.fashion_v3',
  // 美食
  FOOD = 'homefeed.food_v3',
  // 彩妆
  COSMETICS = 'homefeed.cosmetics_v3',
  // 影视
  MOVIE = 'homefeed.movie_and_tv_v3',
  // 职场
  CAREER = 'homefeed.career_v3',
  // 情感
  EMOTION = 'homefeed.love_v3',
  // 家居
  HOUSE = 'homefeed.household_product_v3',
  // 游戏
  GAME = 'homefeed.gaming_v3',
  // 旅行
  TRAVEL = 'homefeed.travel_v3',
  // 健身,
  FITNESS = 'homefeed.fitness_v3',
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

export interface CheckCodeResponseData {
  mobile_token: string;
}

export interface LoginPasswordRequest {
  phone: number;
  zone: number;
  password: string;
}
export interface LoginPasswordResponseData {
  onboarding_page: any[];
  session: string;
  user_exists: boolean;
  user_id: string;
}

export interface CategoryItem {
  id: string;
  name: string;
}

export interface GetHomeFeedCategoryData {
  categories: CategoryItem[];
}

export type ActivateResponse = BaseResponse<ActivateData>;
export type SendCodeResponse = BaseResponse<{}>;
export type CheckCodeResponse = BaseResponse<CheckCodeResponseData>;
export type LoginCodeResponse = BaseResponse<LoginCodeResponseData>;
export type GetUserInfoResponse = BaseResponse<GetUserInfoResponseData>;
export type GetHomeFeedResponse = BaseResponse<GetHomeFeedResponseData>;
export type LoginPasswordResponse = BaseResponse<LoginPasswordResponseData>;
export type OtherInfoResponse = BaseResponse<OtherInfoResponseData>;
export type HomeFeedCategoryResponse = BaseResponse<GetHomeFeedCategoryData>;
