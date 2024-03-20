import { getActivate } from 'src/apis/user';
import { getCookies } from 'src/utils/cookieManager';

export const initAppData = async () => {
  const cookies = await getCookies();
  console.log(cookies, 'cookies')
  if (!cookies.web_session) {
    // 如果没有web_session，则请求activate
    getActivate().catch((err) => console.log(err)); // todo,重试机制，不然没有有效的session
  }
};
