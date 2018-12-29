/**\
 *  消费记录store
 */
import IndexApi from '../api';
import Auth from '@/utils/Auth';


const IndexStore = {
  namespaced: true,
  state: {
    data: ''
  },
  getters: {

  },
  mutations: {
    setData(state, data) {
      state.data = data;
    }

  },
  actions: {

    async login(context) {

      let res = await IndexApi.test();

      context.commit('setData', res.data.data);
      return res.data;

    }



  }
}

export default IndexStore;