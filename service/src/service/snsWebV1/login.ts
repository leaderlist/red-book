import { getXHeader } from 'src/headers';
import { XHeaderData } from 'src/type';

export const getEncryptData = (url: string, params?: any): Promise<XHeaderData> => {
  console.time('start exec');
  return new Promise(async (resolve, reject) => {
    try {
      const result = await getXHeader(url, params);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};
