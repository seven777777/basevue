import Api from '@/api';
import Auth from '@/utils/Auth';

const GlobalStore = {
  namespaced: true,
  state: {
    user: null, //用户
    theme: localStorage.getItem('theme') || 'dark', //系统主题色
  },
  getters: {

  },
  mutations: {
    setUser(state, user) {
      state.user = Object.assign({}, state.user, user);
    },
    deleteUser(state) {
      state.user = null;
    },

    //设置主题
    setTheme(state, theme) {
      state.theme = theme;
    }
  },
  actions: {

    //设置主题 
    /**
     * 
     * @param {*} cotext 
     * @param {string} theme    
     */
    setTheme(cotext, theme) {
      cotext.commit('setTheme', theme);
    },
    //设置用户
    setUser(context, data) {
      context.commit('setUser', data);
    },
    //登出
    loginOut(context) {
      Auth.loginOut();
      context.commit('deleteUser');
      context.commit('setTabBarActiveStatus', 0);
    },
    //登录
    async loginIn({
      dispatch,
      commit
    }, user = {}) {
      try {
        let result = await Api.getUserInfo();
        if (result.status == 200) {
          dispatch('setUser', result.data.data);
          Auth.loginIn(result.data.data);
        }

      } catch (err) {
        console.log(err);
      }
    },

  }
}

export default GlobalStore;