import {
  mapState,
  mapActions
} from "vuex";
import IndexApi from './api';
import Auth from "@/utils/Auth";
import Datepicker from '@/components/DatePicker';
import SwiperSelecter from '@/components/SwiperSelecter';

export default {

  name: "huapengTest",
  components: {
    Datepicker,
    SwiperSelecter
  },
  data() {
    return {
      bottomData: [{ //数据格式
          id: 0,
          name: "全部"
        },
        {
          id: 1,
          name: "学校"
        }
      ],
      activeId: 0,
    };
  },

  computed: {

  },

  mounted() {

  },


  methods: {
    bottomChange(item) {
      this.activeId = item.id;
    }
  }
};