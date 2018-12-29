import Vue from 'vue'
import Vuex from 'vuex'

//全局store
import GlobalStore from '@/store/globalStore';
//地图store
import MapStore from '@/modules/map/store';
//首页store
import IndexStore from '@/modules/index/store';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    GlobalStore,
    MapStore,
    IndexStore,

  }
});

export default store;