import { getXHeader } from 'src/headers';
import { XHeaderData } from 'src/type';

export const getEncryptData = (
  url: string,
  cookie?: string,
  params?: any,
): Promise<XHeaderData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await getXHeader(url, cookie, params);
      resolve(result as any);
    } catch (e) {
      reject(e);
    }
  });
};
