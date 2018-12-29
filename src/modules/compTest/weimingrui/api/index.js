/**
 * 首页接口
 */

import MYHTTP from '@/utils/MYHTTP';

export default class IndexApi {
  //获取日账单接口
  static test(params) {
    return MYHTTP.post({
      url: 'https://www.easy-mock.com/mock/5c22ebcd55ad3921e859416f/api/login',
      params: params
    });
  }

}