/**
 * 公共数据接口
 */

import MYHTTP from '@/utils/MYHTTP';

export default class Api {
  static getUserInfo(params) {
    return MYHTTP.get({
      url: 'user.json',
      params: params
    });
  }


}
