/**
 * ************************************************************************************
 *                          百度地图工具-hp-2018-12-24                                 *
 * ************************************************************************************
 */
import Util from './Util';
import * as mapv from 'mapv';


import dotblue from "@/assets/imgs/maps/dotblue.png";
import dotred from "@/assets/imgs/maps/dotred.png";
import trainMark from "@/assets/imgs/maps/trainmark.png";
const BmapUtil = function (options) {}


BmapUtil.prototype = {
    _overlays: [], //地图覆盖物集合
    _map: null, //地图对象
    _currentOverlay: null, //当前对象  
    defaultRichTemps: [

    ], //默认的模板集合,占位，

    //拿到map
    getMap() {
        return this._map;
    },

    //获取所有的覆盖物
    getOverlays() {
        return this._overlays;
    },
    //创建地图
    /**
     * 
     * @param {dom} el    dom元素
     * @param {array} center  [1222.3,133.4]
     * @param {number} zoom 缩放等级 1-18
     * @param {string} type 
     */
    createMap(el, center, zoom, type) {
        let mapType = {
            enableMapClick: false
        };
        if (type == "卫星") {
            mapType = {
                enableMapClick: false,
                mapType: BMAP_SATELLITE_MAP
            }
        }
        this._map = new BMap.Map(el, mapType);
        this._map.centerAndZoom(new BMap.Point(center[0], center[1]), zoom);
        this._map.enableScrollWheelZoom(true);
        return this._map;


    },
    //设置地图样式
    /**
     * 
     * @param {json} styleJson  百度地图样式json
     */
    setMapStyle(styleJson) {
        this._map.setMapStyle({
            styleJson: styleJson
        });
    },



    //绘制区块
    /*
        用法
        this.BmapUtil.drawPolygon(this.map, polygonPints, {
            events: {
                click(item,style) {
                    alert(item);
                },
                ...
            },
            styles:{
                ...
            }
        });
    
    */

    /**
     * 
     * @param {_MAP} map 
     * @param {string} boundary :'1223.2,32323.2;133232.4,3432432.6;'
     * @param {*Object} param2 选填  {styles:{...}||events:{...} }
     */
    drawPolygon(map = this._map, boundary, {
        styles,
        events
    } = {}) {
        if (!boundary) return;
        let aryPoint = boundary.split(';');
        let aryP = [];
        aryPoint.forEach((item, index) => {
            let point = new BMap.Point(item.split(',')[0], item.split(',')[1]);
            aryP.push(point);
        });

        //样式
        let styleConfig = Object.assign({}, {
            fillColor: "#000",
            fillOpacity: 0.8,
            strokeOpacity: 0.6,
            strokeWeight: 2,
            strokeColor: "#000"
        }, styles);


        //默认事件
        let eventsConfig = Object.assign({}, {
            click: null,
            mouseover: null,
            mouseout: null,
            dblclick: null,
        }, events);

        let polygonObj = {
            type: "polygon",
            item: new BMap.Polygon(aryP, styleConfig),
        };

        map.addOverlay(polygonObj.item);

        this._overlays.push(polygonObj);

        let keys = Object.keys(eventsConfig);
        //绑定事件
        keys.forEach(keyName => {
            let event = eventsConfig[keyName];
            if (event) {
                polygonObj.item.addEventListener(keyName, () => {
                    eventsConfig[keyName](polygonObj.item, styleConfig)
                });
            }
        })

    },

    //转换成bmap图标格式
    /**
     * 
     * @param {jsonObejcet} myIcon  {src:,width:,height:}
     */
    makeIcon(myIcon) {
        return new BMap.Icon(myIcon.src, new BMap.Size(myIcon.width, myIcon.height), {
            anchor: new BMap.Size(myIcon.width / 2, myIcon.height)
        });
    },
    //转换成bmap 坐标
    /**
     * 
     * @param {array} position 
     */
    makePoint(position) {
        return new BMap.Point(position[0], position[1]);
    },

    //绘制mark点
    /**
     * 
     * @param {_map} map 
     * @param {BMap.Point} point 
     * @param {BMap.Icon} icon 
     * @param {jsonObejcet} events 选填  {events:{click:(item,point){...},...} }
     */
    drawMark(map = this._map, point, icon = null, events) {

        let markerObj = {
            type: "mark",
            item: icon ? new BMap.Marker(point, icon) : new BMap.Marker(point)
        }; // 创建
        map.addOverlay(markerObj.item); // 将标注添加到地图中
        this._overlays.push(markerObj);

        //默认事件
        let eventsConfig = Object.assign({}, {
            click: null,
            mouseover: null,
            mouseout: null,
            dblclick: null,
        }, events);

        let keys = Object.keys(eventsConfig);
        //绑定事件
        keys.forEach(keyName => {
            let event = eventsConfig[keyName];
            if (event) {
                markerObj.item.addEventListener(keyName, () => {
                    eventsConfig[keyName](markerObj.item, point)
                });
            }
        })

    },

    //绘制richMark点
    /**
     * 
     * @param {_map} map 
     * @param {BMap.Point} point 
     * @param {string} html  html片段 `<div id="xx">片段</div>`
     */
    drawRichMark(map = this._map, point, html = ``) {
        let markerObj = {
            type: "richMark",
            item: new BMapLib.RichMarker(html, point, {
                "anchor": new BMap.Size(-8, -22)
            })
        };
        map.addOverlay(markerObj.item);
        this._overlays.push(markerObj);
    },

    //绘制地铁首末站点
    /**
     * 
     * @param {*} bmapPoint 
     * @param {*} metroLineObj 
     * @param {*} map 
     * @param {*} html 
     * @param {*} events {click(maker){..},...}
     */
    addTerminalMarker(bmapPoint, metroLineObj, map = this._map, html = ``, events) {

        if (!html || html == '') {
            html = `
            <div class="metroTerminal">
            <div class="metroTerminalMarker" ><span><img src="${trainMark}"></span></div>
            <span class="metroTerminalInfo" metrolinename="${
              metroLineObj.METRO_LINE_NAME
            }" style="display:none;">${metroLineObj.METRO_LINE}</span>
            </div>
         `;

        }

        var marker = new BMapLib.RichMarker(html, bmapPoint, {
            anchor: new BMap.Size(-8, -22)
        });

        map.addOverlay(marker);
        this._overlays.push({
            type: "station_richMark",
            item: marker
        });

        //默认事件
        let eventsConfig = Object.assign({}, {
            click: null,
            mouseover: function () {
                $('[metrolinename="' + metroLineObj.METRO_LINE_NAME + '"]').show();
            },
            mouseout: function () {
                $('[metrolinename="' + metroLineObj.METRO_LINE_NAME + '"]').hide();
            },
            dblclick: null,
        }, events);

        let keys = Object.keys(eventsConfig);
        //绑定事件
        keys.forEach(keyName => {
            let event = eventsConfig[keyName];
            if (event) {
                marker.addEventListener(keyName, () => {
                    eventsConfig[keyName](marker, metroLineObj)
                });
            }
        })


    },


    //绘制地铁口点
    /**
     * 
     * @param {*} metroLineObj 
     * @param {*} map 
     * @param {*} html //mark点模板
     */
    drawStationPoint(metroLineObj, map = this._map, html = ``) {
        const newHtml = html && html != "";
        if (metroLineObj && metroLineObj.MetroStationList) {
            metroLineObj.MetroStationList.forEach((MetroStation, index) => {

                if (MetroStation) {


                    if (!newHtml) {

                        html = `
                            <div class="stationPointCon">
                                <div class="stationInfo">${MetroStation.STATION_NAME} <div class="close">X</div></div>
                                <img id="stationId${MetroStation.METRO_LINE_STATION_ID}"  dataId ="stationId${MetroStation.METRO_LINE_STATION_ID}" class="stationPoint" src="${dotblue}"/>
                            </div>
                            `;
                    }
                    let center = new BMap.Point(MetroStation.X, MetroStation.Y);
                    let marker = new BMapLib.RichMarker(html, center, {
                        "anchor": new BMap.Size(0, -5)
                    });
                    map.addOverlay(marker);
                    this._overlays.push({
                        type: "stationPoint_richMark",
                        item: marker
                    });

                    if (!newHtml) {

                        let zoomNum = this._map.getZoom();
                        if (zoomNum > 11) {
                            $('.stationPointCon').show();
                        } else {
                            $('.stationPointCon').hide();
                        }

                        $('.stationPoint').hover(
                            function () {
                                let marker = $(this);
                                marker.attr('src', dotred);

                            },
                            function () {
                                let marker = $(this);
                                marker.attr('src', dotblue);
                            }
                        );

                        $('.stationPoint').click(function () {
                            let marker = $(this);
                            let con = marker.closest('.stationPointCon');
                            con.find('.stationInfo').show();
                        });

                        $('.stationInfo').find('.close').click(function () {
                            let con = $(this).closest('.stationInfo');
                            con.hide();
                        });
                    }
                } //end-if


            });
        }
    },

    //绘制地铁线
    /**
     * 
     * @param {*} metroLineObj 
     * @param {*} html 
     * @param {*} color 
     * @param {*} map 
     */
    drawMetroLine(metroLineObj, color, map = this._map) {


        let path = metroLineObj.COORDINATE.split(",");
        let aryP = [];
        $.each(path, function (index, it) {
            var _coordinate = it.split(" ");
            var point = new BMap.Point(_coordinate[0], _coordinate[1]);
            aryP.push(point);
        });
        var polyline = new BMap.Polyline(aryP, {
            strokeColor: color,
            strokeWeight: 3,
            strokeOpacity: 1
        });
        map.addOverlay(polyline);
        this._overlays.push({
            type: "metro_polyline",
            item: polyline
        });

        //添加起点、终点
        if (aryP.length > 0) {
            this.addTerminalMarker(aryP[0], metroLineObj);
            this.addTerminalMarker(aryP[aryP.length - 1], metroLineObj);
        }

    },

    //载入地铁路线信息
    /**
     * 
     * @param {*} pointData 
     * @param {*} colors 
     * @param {*} mapvOptions1 
     * @param {*} mapvOptions2 
     */
    LoadMapPolyLine(pointData, colors = [], mapvOptions1, mapvOptions2) {

        let metroLineColorList = [
            "#d11a1a",
            "#1aa31a",
            "#d9c400",
            "#751a75",
            "#d11ad1",
            "#ff4674",
            "#ff8c1a",
            "#0067d0",
            "#1a75d1",
            "#27cde2",
            "#e396ff",
            "#ff7dc2",
            "#aa0909",
            "#03785c",
            "#12c0be",
            "#cc524e"
        ];
        let colorArr = colors && colors.length > 0 ? colors : metroLineColorList;
        //添加线路
        pointData.forEach((item, index) => {
            if (index >= colorArr.length) {
                index = index % colorArr.length;
            }
            this.drawMetroLine(item, metroLineColorList[index]);
        });

        var timeData = [];
        var data = [];
        var maxJ = 0;
        for (var i = 0; i < pointData.length; i++) {
            var item = pointData[i].COORDINATE.split(",");
            var coordinates = [];
            for (var j = 0; j < item.length; j++) {
                coordinates.push([item[j], item[j + 1]]);
                timeData.push({
                    geometry: {
                        type: "Point",
                        coordinates: [item[j].split(" ")[0], item[j].split(" ")[1]]
                    },
                    count: 1,
                    time: j
                });
                maxJ = maxJ > j ? maxJ : j;
            }

            data.push({
                geometry: {
                    type: "LineString",
                    coordinates: coordinates
                }
            });
        }

        var dataSet = new mapv.DataSet(data);

        var options = Object.assign({}, {
            strokeStyle: "rgba(53,57,255,0.5)",
            coordType: "bd09mc",
            // globalCompositeOperation: 'lighter',
            shadowColor: "rgba(53,57,255,0.2)",
            shadowBlur: 3,
            lineWidth: 5.0,
            draw: "simple"
        }, mapvOptions1);

        var mapvLayer = this.drawMapvPoint(dataSet, options);

        var dataSetTime = new mapv.DataSet(timeData);
        var optionsTime = Object.assign({}, {
            fillStyle: "rgba(255,255,255, 0.8)",
            zIndex: 200,
            size: 2,
            animation: {
                type: "time", // 按时间展示动画
                stepsRange: {
                    start: 0,
                    end: maxJ
                },
                trails: 15,
                duration: 10
            },
            draw: "simple"
        }, mapvOptions1);

        var maplayer = this.drawMapvPoint(dataSetTime, optionsTime);


    },

    //绘制mapvppoint
    /**
     * 
     * @param {string} drawType  //展示类型 'simple|heatmap（热力图）|honeycomb（蜂窝网格）|grid（网格）|bubble（水泡）|intensity（阈值）|category（分类设值）|choropleth（ 区间）|icon(图标)'  
     * @param {*} data 
     * @param {*} options 
     */
    drawMapvPoint(dataSet, options = {}, drawType = 'simple', map = this._map) {
        options.draw = options.draw || drawType;
        return new mapv.baiduMapLayer(map, dataSet, options);
    },

    //生成mapv dataset
    /**
     * 
     * @param {array} data 
     */
    mapvDataSet(data) {
        return new mapv.DataSet(data);
    },

    //绘制公交点
    /**
     * 
     * @param {*} data 
     * @param {*} map 
     * @param {*} options1 
     * @param {*} options2 
     */
    drawBusPoint(data = [], map = this._map, options1 = {}, options2 = {}) {
        let defaultOpt1 = {
            fillStyle: '#7da7d9',
            size: 4,
            draw: 'simple',
            bigData: 'Point'
        };
        let defaultOpt2 = {
            fillStyle: 'rgba(255, 255, 255, 0.9)',
            size: 1.2,
            draw: 'simple',
            bigData: 'Point',
            animation: {
                type: 'time',
                stepsRange: {
                    start: 0,
                    end: 10
                },
                trails: 1,
                duration: 6,
            }
        };

        let opt1 = Object.assign({}, defaultOpt1, options1, map);
        let opt2 = Object.assign({}, defaultOpt2, options2, map);
        let datas = [];
        if (data.length == 0) {
            return;
        }
        data.forEach(item => {

            datas.push({
                geometry: {
                    type: 'Point',
                    coordinates: [item.X, item.Y]
                },
                time: Math.random() * 10
            });
        });

        let dataSet = this.mapvDataSet(datas);

        this.drawMapvPoint(dataSet, opt1);
        this.drawMapvPoint(dataSet, opt2);

    },

    //显示其他的overlay,除了自己以外
    showOtherOverlay(overlay) {
        this._overlays.forEach(_overlay => {
            if (overlay != _overlay.item) {
                _overlay.item.show();
            }

        });
    },

    //隐藏其他的overlay,除了自己以外
    hideOtherOverlay(overlay) {
        this._overlays.forEach(_overlay => {
            if (overlay != _overlay.item) {
                _overlay.item.hide();
            }

        });
    },

    //清除覆盖物
    removeOverlay(overlay) {
        this._overlays.forEach((_overlay, index) => {

            if (overlay == _overlay.item) {
                this._map.removeOverlay(overlay);
                this._overlays.splice(index, 1);
            }
        });
    },
    //清除对应type的overlay
    /**
     * 
     * @param {string} type 'richMark|mark|polygon|stationPoint_richMark|station_richMark(地铁首末)|metro_polyline(地铁线)'
     */
    removeOverLaysByType(type) {
        this._overlays.forEach((_overLay, index) => {
            if (_overLay.type == type) {
                this._map.removeOverlay(_overLay.item);
                this._overlays.splice(index, 1);
            }
        });
    },

    //根据类型获取overlays
    /**
     * 
     * @param {*} type 'richMark|mark|polygon|stationPoint_richMark|station_richMark(地铁首末)|metro_polyline(地铁线)'
     */
    getOverlaysByType(type) {
        let overLays = [];
        this._overlays.forEach((_overLay, index) => {
            if (_overLay.type == type) {
                overLays.push(_overLay);
            }
        });
        return overLays;
    },




    //清除所有overlays
    clearAllOverlays() {
        this._overlays.forEach(_overLay => {
            this._map.removeOverlay(_overLay.item);
        });
    },



    //销毁
    destroy() {

        this._map = null;
        this._currentOverlay = null;
        this._overLays = [];

    }

};


export default BmapUtil;