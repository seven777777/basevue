import BmapUtil from '@/utils/BmapUtil';
import $ from 'jquery';
import {
    mapState,
    mapActions
} from "vuex";

export default {

    data() {
        return {
            map: null,
            BmapUtil: new BmapUtil(),

        }
    },
    computed: {
        ...mapState({
            mapvPoint: state => state.MapStore.mapvPoint, //mapv的点集合
            busPoint: state => state.MapStore.busPoint, //公交点
            metroStation: state => state.MapStore.metroStation, //地铁站
            metroLine: state => state.MapStore.metroLine, //地铁线

        })
    },
    mounted() {



        //测试打点
        // let drawTestPoint = [116.404, 39.915];
        // this.initMap(drawTestPoint);
        // this.drawTest();

        //测试mapv打点
        let point = [106.530635, 29.544606];
        this.initMap(point);
        this.drawMapvPointTest();
        var overlays = [];
        var overlaycomplete = function (e) {
            overlays.push(e.overlay);
        };


        let styleOptions = {
            strokeColor: "#E50020", //边线颜色。
            fillColor: "#E50020", //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3, //边线的宽度，以像素为单位。
            strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
            fillOpacity: 0.2, //填充的透明度，取值范围0 - 1。
            strokeStyle: 'dashed' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(this.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            enableCalculate: true, //是否开启测量模式
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });

        drawingManager.addEventListener('overlaycomplete', overlaycomplete);




        //测试公交打点
        //this.drawBusPointTest();

        //this.BmapUtil.drawStationPoint(this.metroStation)
        //this.BmapUtil.LoadMapPolyLine(this.metroLine);
    },

    methods: {
        //初始化地图
        initMap(point) {

            this.BmapUtil.createMap(this.$refs.baseMap, point, 15);
            this.map = this.BmapUtil.getMap();
        },

        //测试公交点
        drawBusPointTest() {
            this.BmapUtil.drawBusPoint(this.busPoint);
        },
        //测试mapv打点
        drawMapvPointTest() {
            let that = this;
            let data = [];

            this.mapvPoint.forEach(pdata => {
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: pdata.point
                    },

                });
            });

            let dataSet = this.BmapUtil.mapvDataSet(data);

            let options = {
                fillStyle: 'rgba(211, 0, 30,0.5)',
                shadowColor: '#D3001E',
                shadowBlur: 0,
                //globalCompositeOperation: 'lighter',
                methods: {
                    mousemove(item) {

                        if (item) {
                            let array = item.geometry.coordinates;
                            let bmapPoint = that.BmapUtil.makePoint(array);
                            let html = `<div class="richmark">123</div>`;
                            that.BmapUtil.removeOverLaysByType('richMark');
                            that.BmapUtil.drawRichMark(that.map, bmapPoint, html);
                        } else {
                            that.BmapUtil.removeOverLaysByType('richMark');
                        }
                    }
                },
                size: 5,
            }

            this.BmapUtil.drawMapvPoint(dataSet, options);

        },

        //打点测试
        drawTest() {
            let that = this;
            let polygonPints = "116.387112,39.920977;116.385243,39.913063;116.394226,39.917988;116.401772,39.921364;116.41248,39.927893";
            //画区域
            this.BmapUtil.drawPolygon(this.map, polygonPints, {
                events: {
                    click(item) {
                        //that.BmapUtil.removeOverlay(item);
                        item.hide();
                        that.BmapUtil.showOtherOverlay(item);
                    }
                }
            });
            //画普通点
            this.BmapUtil.drawMark(this.map, this.BmapUtil.makePoint([116.387112, 39.920977]), null, {
                click(mark) {
                    mark.hide();
                    that.BmapUtil.showOtherOverlay(mark);
                }
            });

            //richmark

            let html = `<div class="richmark">123</div>`;

            this.BmapUtil.drawRichMark(this.map, this.BmapUtil.makePoint([116.385243, 39.913063]), html);

            $('.richmark').click(function () {
                alert(123);
            });

        }
    },
    beforeDestroy() {
        this.BmapUtil.destroy();
        this.map = null;
    },


}