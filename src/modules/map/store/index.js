/**\
 * store
 */
import MapApi from '../api';
import Auth from '@/utils/Auth';
import mapvPoint from '../mockDatas/mapvPoint.json';
import busPoint from '../mockDatas/busPoint.json';
import metroStation from '../mockDatas/metroStation.json';
import metroLine from '../mockDatas/metroLine.json';
import '@/assets/styles/common.scss';

const MapStore = {
  namespaced: true,
  state: {
    mapvPoint, //mav的点
    busPoint, //公交的点
    metroStation, //地铁站点
    metroLine, //地铁线
  },
  getters: {

  },
  mutations: {


  },
  actions: {


  }
}

export default MapStore;