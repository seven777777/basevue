import Vue from 'vue'
import Vuex from 'vuex'
import Store from '@/store/store';
import router from '@/router';

class Auth{

   static  LOGIN_STORAGE ="FanLoginInfo";
   static  TOKEN = "FanToken";

  //取得本地系统缓存信息
  static getLocalSysInfo() {
    let info = localStorage.getItem(Auth.LOGIN_STORAGE);
    if(info) {
      return JSON.parse(info);
    } else {
      return null;
    }
  }
  //设置本地系统缓存信息
  static setLocalSysInfo(sysInfo) {

    if(sysInfo) {
      localStorage.setItem(Auth.LOGIN_STORAGE, JSON.stringify(sysInfo));
    }
  }

  //删除本地系统缓存新
  static removeLocalSysInfo() {
    localStorage.removeItem(Auth.LOGIN_STORAGE);
  }

  //登录
  static loginIn(user){
     //Store.dispatch('GlobalStore/setUser',user);
     Auth.setLocalSysInfo(user);
    // console.log(Auth.getLocalSysInfo());
     //router.replace('/login');
  }
  //登出
  static loginOut(){
    Auth.removeLocalSysInfo();
  }

  //是否登录
  static isLogin(){
    let SysInfo =  Auth.getLocalSysInfo();
    if(SysInfo&&SysInfo.id){
      return true;
    }else{
      return false;
    }
  }

  //是否绑定手机
  static isBindMobile(){
    let SysInfo =  Auth.getLocalSysInfo();
    let isBind = false;
    if(SysInfo&&SysInfo.phoneNo!=""&&SysInfo.isBindMobile==1){
      isBind = true;
    }
    return isBind;
  }

  //拿到本地Token
  static getToken() {
    return localStorage.getItem(Auth.TOKEN);
  }

  //设置token
  static setToken(token) {
    localStorage.setItem(Auth.TOKEN, token);
  }

  //删除token
  static removeToken() {
    localStorage.removeItem(Auth.TOKEN);
  }


}

export default Auth;
