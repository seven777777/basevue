<!--

## 说明

滑动选择tab组件

####
```
className:"自定义class",

props:activeId:0，//当前选中的id

bottomData:[{  //数据格式
    id:0,
    name:"全部"
},
{
    id:1,
    name:"学校"
}
]
```

-->
<template>
  <div :class="className">
    <swiper :options="swiperOption" :class="className">
      <!-- slides -->
      <swiper-slide
        class="button"
        :class="{'on':activeId==item.id}"
        v-for="(item,idx) in bottomData"
        :key="idx"
      >
        <span @click="change(item)">{{item.name}}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  props: {
    bottomData: {
      default() {
        return [];
      }
    },
    activeId: {
      default() {
        return 0;
      }
    },
    className: {
      default() {
        return "bottom_wrap";
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },

  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 2
      }
    };
  },

  mounted() {},

  watch: {},
  methods: {
    change(item) {
      this.$emit("change", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom_wrap {
  box-sizing: border-box;
  padding: 2px 3px 0;
  box-shadow: 0px 0px 8px 0px rgba(36, 47, 59, 0.08);
}

.button {
  overflow: hidden;

  text-align: center;
  line-height: 27px;
  width: 62px;
  height: 27px;

  display: flex;
  align-items: center;

  span {
    flex: 1;
    height: 100%;
    font-size: 12px;
    color: #5a78a5;
    background: #ffffff;
    cursor: pointer;
    overflow: hidden;
    border-radius: 5px;
  }
}

.on {
  span {
    flex: 1;
    height: 27px;
    font-size: 12px;
    background: #5a78a5;
    color: #fff;
    cursor: pointer;
  }

  &::after {
    display: none;
  }
}

.button:not(:last-child)::after {
  content: "";
  width: 1px;
  height: 10px;
  background: #5a78a5;
  margin-left: 2px;
}

.top_box {
  padding: 0 30px;
}

.swiper-button-prev {
  display: none;
}
.swiper-button-next {
  display: none;
}
.swiper-scrollbar {
  display: none;
}
</style>
