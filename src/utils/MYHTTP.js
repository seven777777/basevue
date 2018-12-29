/**
 * 自封AXIOS
 * author:hp
 */
import axios from 'axios';

import Config from  '../config';

let myHttp = axios.create({
  // baseURL: 'http://localhost:9992/',
  baseURL:Config.apiPath,
  timeout: 6000,
  headers: {
    'Content-Type':`application/json; charset=utf-8`}
});

// 添加请求拦截器
myHttp.interceptors.request.use(function (config) {

  //防闪
  let noLoadingUrls = [];

  let data = config.data||{};

  // 在发送请求之前做些什么
   return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
myHttp.interceptors.response.use(function (response) {

  // 对响应数据做点什么
  return response;
}, function (error) {

  // 对响应错误做点什么
  return Promise.reject(error);
});

export default class MYHTTP{

  static get({url='',params={},config={}}){
    return myHttp.get(url,Object.assign({},{params:params},config));
  }
  static post({url='',params={},config={}}){

    return myHttp.post(url,params,config);
  }

  static upload({url='',params={},config={}}){
    return myHttp.post(url,params,Object.assign({
      headers: {'Content-Type': 'multipart/form-data'},
    },config));
  }


}

