import { postFetch } from 'src/fetch';
import { getActivateReq } from 'src/service/snsWebV1/login';
import { ActiveRes, XHeaderData } from 'src/type';
import { ActivateData, MyResponseType } from 'src/type/fetch';

export const handleActivateReq = async (url: string): Promise<any> => {
  console.time('start handle fetch');
  const res = await getActivateReq(url);
  let responseData: ActiveRes = {
    code: 0,
    success: true,
    msg: '成功',
    data: null,
  };
  if (res) {
    const xHeaderData: XHeaderData = JSON.parse(res);
    if (!xHeaderData.cookie) {
      responseData = {
        code: -1,
        success: false,
        msg: '失败，cookie值无效',
        data: null,
      };
    } else {
      console.timeEnd('start handle fetch');
      const result = await postFetch<object, MyResponseType<ActivateData>>(
        `https://edith.xiaohongshu.com/api/sns/web/v1/login/activate`,
        {},
        {
          headers: {
            'x-t': xHeaderData['X-t'] + '',
            'x-s': xHeaderData['X-s'],
            'x-s-common': xHeaderData['X-s-common'],
            cookie: `a1=${xHeaderData.cookie};`,
            'content-type': 'application/json;charset=UTF-8',
          },
        },
      );
      const { user_id, session, secure_session } = result?.data;
      responseData = {
        code: 0,
        success: true,
        msg: '成功',
        data: { user_id, session, secure_session },
      };
    }
  } else {
    responseData = {
      code: -1,
      success: false,
      msg: '失败，获取X Header失败',
      data: null,
    };
  }
  return responseData;
};
