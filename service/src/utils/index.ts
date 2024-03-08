import { XHeaderData } from 'src/type';

export const formatHeader = (
  xHeaderData: XHeaderData,
  activeCookie?: string,
) => {
  return {
    'x-t': xHeaderData['X-t'] + '',
    'x-s': xHeaderData['X-s'],
    'x-s-common': xHeaderData['X-s-common'],
    cookie: `a1=${xHeaderData.cookie};xsecappid=xhs-pc-web;${activeCookie || ''}`,
  };
};
