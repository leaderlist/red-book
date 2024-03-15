import { Category, GetHomeFeedRequest, ImageFilter, RefreshType } from 'src/types/home';

export function insertStr(str: string, index: number, insertString: string) {
  return str.substring(0, index) + insertString + str.substring(index);
}

export function isRealPhoneNumber(numberVal?: string) {
  return numberVal && isNumber(Number(numberVal));
}

export function isNumber(number: any) {
  return typeof number === 'number' && !Number.isNaN(number) && !!number;
}

const columns = 4;
const renderNotes = 18;

export function getHomeFeedParams({
  category,
  cursor_score,
  refresh_type,
  note_index,
  unread_begin_note_id = '',
  unread_end_note_id = '',
  unread_note_count = 0,
}: {
  category: Category;
  cursor_score: string;
  refresh_type: RefreshType;
  note_index: number;
  unread_begin_note_id?: string;
  unread_end_note_id?: string;
  unread_note_count?: number;
}): GetHomeFeedRequest {
  return {
    category,
    cursor_score,
    refresh_type,
    note_index,
    image_formats: [ImageFilter.Jpg, ImageFilter.Avif, ImageFilter.Webp],
    need_filter_image: false,
    need_num: renderNotes - 2 * columns,
    num: renderNotes + 3 * columns,
    search_key: '',
    unread_begin_note_id,
    unread_end_note_id,
    unread_note_count,
  };
}
