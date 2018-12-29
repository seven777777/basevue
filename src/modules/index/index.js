import {
  mapState,
  mapActions
} from "vuex";
import IndexApi from './api';
import Auth from "@/utils/Auth";


export default {
  name: "index",

  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      'data': state => state.IndexStore.data,
    }),
  },

  mounted() {
    this.login();
  },


  methods: {
    ...mapActions('IndexStore', {
      login: 'login'
    }),


  }
};