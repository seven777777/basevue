/*
 * @Author: wyx 
 * @Date: 2018-10-31 19:06:51 
 * @Last Modified by: seven.zhang
 * @Last Modified time: 2018-11-16 11:14:47
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from '@/store/store';
import 'element-ui/lib/theme-chalk/index.css';
import Util from '@/utils/Util';

// import '@/lib/richMark.js';
// import '@/lib/DrawingManage.js';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper, /* { default global options } */ )

//全局对象工具
Vue.prototype.$UtilTool = Util;

let router = new VueRouter({
  routes,
  mode: 'hash',
  linkActiveClass: 'selected',
});


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');