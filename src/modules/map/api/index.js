/**
 * 接口
 */

import MYHTTP from '@/utils/MYHTTP';

export default class IndexApi {

  static demo(params) {
    return MYHTTP.get({
      url: 'dayBill.json',
      params: params
    });
  }

}