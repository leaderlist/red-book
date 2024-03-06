import { getXHeader } from 'src/headers';

export const getActivateReq = (url: string): Promise<string> => {
  console.time('start exec');
  return new Promise(async (resolve, reject) => {
    try {
      const result = await getXHeader(url);
      resolve(JSON.stringify(result));
    } catch (e) {
      reject(e);
    }
  });
};
