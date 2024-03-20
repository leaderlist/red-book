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

export interface CategoryItem {
  name: string;
  id: Category;
}

export enum RefreshType {
  Drop = 1,
  Change = 3,
}

export enum ImageFilter {
  Jpg = 'jpg',
  Webp = 'webp',
  Avif = 'avif',
}

export interface GetHomefeedCategoryResponse {
  categories: CategoryItem[];
}

export enum ModelType {
  Note = 'note',
}

export enum CardType {
  Video = 'video',
  Normal = 'normal',
}

export interface HomeFeedItem {
  id: string;
  ignore: boolean;
  model_type: ModelType;
  note_card: NoteCardItem;
  track_id: string;
}

export enum ImageScene {
  WB_PRV = 'WB_PRV',
  WB_DFT = 'WB_DFT',
}

interface InfoItem {
  image_scene: ImageScene;
  url: string;
}

interface Cover {
  file_id: string;
  height: number;
  width: number;
  url: string;
  url_pre: string;
  url_default: string;
  info_list: InfoItem[];
}

export interface NoteCardItem {
  cover: Cover;
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
  video?: {
    capa: { duration: number };
  };
}

export interface GetHomeFeedResponse {
  cursor_score: string;
  items: HomeFeedItem[];
}
