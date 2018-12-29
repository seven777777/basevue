<template>
<div class="echarts"/>
</template>

<script>
import echarts from 'echarts/lib/echarts'
window.Echarts = echarts
import debounce from 'lodash.debounce'
import Vue from 'vue'

const ACTION_EVENTS = [
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  'axisareaselected',
  'focusnodeadjacency',
  'unfocusnodeadjacency',
  'brush',
  'brushselected'
]

const MOUSE_EVENTS = [
  'click',
  'dblclick',
  'mouseover',
  'mouseout',
  'mousedown',
  'mouseup',
  'globalout'
]

export default {
  props: {
    options: Object,
    theme: [String, Object],
    initOptions: Object,
    group: String,
    autoResize: Boolean,
    watchShallow: Boolean
  },
  data () {
    return {
      chart: null
    }
  },
  computed: {
    width: {
      cache: false,
      get () {
        return this.delegateGet('width', 'getWidth')
      }
    },
    height: {
      cache: false,
      get () {
        return this.delegateGet('height', 'getHeight')
      }
    },
    isDisposed: {
      cache: false,
      get () {
        return !!this.delegateGet('isDisposed', 'isDisposed')
      }
    },
    computedOptions: {
      cache: false,
      get () {
        return this.delegateGet('computedOptions', 'getOption')
      }
    }
  },
  watch: {
    group (group) {
      this.chart.group = group
    }
  },
  methods: {
    mergeOptions (options, notMerge, lazyUpdate) {
      this.delegateMethod('setOption', options, notMerge, lazyUpdate)
    },
    resize (options) {
      this.delegateMethod('resize', options)
    },
    dispatchAction (payload) {
      this.delegateMethod('dispatchAction', payload)
    },
    convertToPixel (finder, value) {
      return this.delegateMethod('convertToPixel', finder, value)
    },
    convertFromPixel (finder, value) {
      return this.delegateMethod('convertFromPixel', finder, value)
    },
    containPixel (finder, value) {
      return this.delegateMethod('containPixel', finder, value)
    },
    showLoading (type, options) {
      this.delegateMethod('showLoading', type, options)
    },
    hideLoading () {
      this.delegateMethod('hideLoading')
    },
    getDataURL (options) {
      return this.delegateMethod('getDataURL', options)
    },
    getConnectedDataURL (options) {
      return this.delegateMethod('getConnectedDataURL', options)
    },
    clear () {
      this.delegateMethod('clear')
    },
    dispose () {
      this.delegateMethod('dispose')
    },
    delegateMethod (name, ...args) {
      if (!this.chart) {
        Vue.util.warn(`Cannot call [${name}] before the chart is initialized. Set prop [options] first.`, this)
        return
      }
      return this.chart[name](...args)
    },
    delegateGet (name, method) {
      if (!this.chart) {
        Vue.util.warn(`Cannot get [${name}] before the chart is initialized. Set prop [options] first.`, this)
      }
      return this.chart[method]()
    },
    init () {
      if (this.chart) {
        return
      }

      let chart = echarts.init(this.$el, this.theme, this.initOptions)

      if (this.group) {
        chart.group = this.group
      }

      chart.setOption(this.options, true)

      ACTION_EVENTS.forEach(event => {
        chart.on(event, params => {
          this.$emit(event, params)
        })
      })
      MOUSE_EVENTS.forEach(event => {
        chart.on(event, params => {
          this.$emit(event, params)
          this.$emit('chart' + event, params)
        })
      })

      if (this.autoResize) {
          this.__resizeHanlder = debounce(() => {
            try {
              chart.resize();
              this.options && chart.setOption(this.options, true);
            }catch(e){
              console.error(e)
            }
          }, 100, { leading: true })
          window.addEventListener('resize', this.__resizeHanlder)
      }

      this.chart = chart
    },
    destroy () {
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }
      this.dispose()
      this.chart = null
    },
    refresh () {
      this.destroy()
      this.init()
    },
    lazyLoading(){
      let windowHeight = document.documentElement.clientHeight||window.innerHeight;
      // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // let windowBottom = +scrollTop + +windowHeight;
      let selfTop = this.$el.getBoundingClientRect().top;
      let selfBottom = this.$el.getBoundingClientRect().bottom;
      let selfwidth = this.$el.getBoundingClientRect().width;
      if(windowHeight >= selfTop + 50  && !!selfwidth ){
          this.options && this.init() ;
      }
    }
  },
  created () {
    this.$watch('options', options => {
      if (!this.chart && options) {
        this.init()
      } else {
        this.chart.setOption(this.options, true)
      }
    }, { deep: !this.watchShallow })

    let watched = ['theme', 'initOptions', 'autoResize', 'watchShallow']
    watched.forEach(prop => {
      this.$watch(prop, () => {
        this.refresh()
      }, { deep: true })
    })
  },
  mounted () {
     this.options && this.init() ;
  },
  activated () {
    if (this.autoResize) {
      this.chart && this.chart.resize()
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.destroy()
  },
  connect (group) {
    if (typeof group !== 'string') {
      group = group.map(chart => chart.chart)
    }
    echarts.connect(group)
  },
  disconnect (group) {
    echarts.disConnect(group)
  },
  registerMap (...args) {
    echarts.registerMap(...args)
  },
  registerTheme (...args) {
    echarts.registerTheme(...args)
  }
}
</script>