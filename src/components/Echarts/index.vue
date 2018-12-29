<template>
  <echarts
    ref="echarts"
    :options="options"
    :theme="chartTheme"
    :auto-resize="true"
    class="chart-box-wrap"
  ></echarts>
</template>

<script>
import echarts from "@/components/VueEcharts";

import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/title";
// import 'echarts-liquidfill';
// Map of China
// registering map data
import "echarts/lib/component/geo";

// import chinaMap from '@/config/china.json';
// echarts.registerMap("china", chinaMap);

export default {
  data() {
    return {
      watchShallow: true
    };
  },
  props: {
    options: Object
  },
  computed: {
    chartTheme() {
      return "";
    }
  },
  mounted() {
    window.dispatchEvent(new Event("resize"));
  },
  components: {
    echarts
  }
};
</script>
<style lang="scss" scoped>
.chart-box-wrap {
  width: 100%;
  height: 100%;
  margin: auto;
  border: none;
  background-color: transparent;
}
</style>

