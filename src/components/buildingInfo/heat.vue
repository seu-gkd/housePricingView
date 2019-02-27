<template>
  <div>

    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"

      active-text-color="#ffd04b">
      <el-menu-item index="1">主菜单1</el-menu-item>
      <el-submenu index="2">
        <template slot="title">主菜单2</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>主菜单3</el-menu-item>
      <el-input v-model="input"
                style="display:inline-block;position: absolute;margin-left:25%;margin-top: 0.6%;border-radius:10px;width: 20rem;"
                placeholder="请输入搜索内容"></el-input>
      <el-menu-item style="float: right;margin-right: 3rem;" index="4"><a href="#" target="_blank">用户中心</a>
      </el-menu-item>
    </el-menu>
    <div id="container"></div>
    <input type="button" @onclick="getData" value="数据测试"/>
    <span><h>
  {{loupanInfo}}
</h></span>

  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  //  import './js/aa.js'
  import './js/Heatmap_min.js'
  //  import BMap from 'BMap'
  //  import BMapLib from 'BMapLib'
  //  import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'

  export default {
    name: 'heat',
    data: function () {
      return {
        activeIndex: 1,
        loupanInfo: '大萨达',
        heatmapOverlay: '',
        canSubmit: false,
        showAudit: false,
        loading: false,
        auditForm: {},
        rules2: {
          opinion: [
            {required: true, message: '请输入理由', trigger: 'blur'}
          ]
        }
      }
    }, components: {
      'remote-js': {
        render(createElement) {
          return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
        },
        props: {
          src: {type: String, required: true},
        },
      },
    },
    computed: {},
    methods: {
      getData() {

        var self = this
        this.loading = true
        jQuery.ajax({
          type: 'get',
          url: 'localhost:9988/buildingInfo/buildinginfo/info',
          data: {
            id: 3
          },
          success: function (res) {
            if (res.code === 0) {
              self.loupanInfo = res.data.loupanname
              self.$message.success('查询成功')

//              self.$message.success('查询成功')
//              self.score_tableData = res.data.results
//              self.totalNum = res.data.totalRecord
            }
          },
          error: function () {
            self.$message.error('查询错误,请稍后重试')
          }
        })
        self.loading = false

      },
      showheat() {
        var map = new BMap.Map("container");          // 创建地图实例

        var point = new BMap.Point(112.418261, 31.921984);
        map.centerAndZoom(point, 6);             // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(); // 允许滚轮缩放

        var points = [{'name': '上海', "lng": '121.530216', 'lat': '31.149067', 'price': '0'},
          {'name': '南京', "lng": '118.804147', 'lat': '32.063673', 'price': '0'},
          {'name': '合肥', "lng": '117.231716', 'lat': '31.825105', 'price': '0'},
          {'name': '杭州', "lng": '120.21896', 'lat': '30.253581', 'price': '0'},
          {'name': '济南', "lng": '117.120075', 'lat': '36.66026', 'price': '0'},
          {'name': '石家庄', "lng": '114.514055', 'lat': '38.044675', 'price': '0'},
          {'name': '天津', "lng": '117.20722', 'lat': '39.098149', 'price': '0'},
          {'name': '北京', "lng": '116.411087', 'lat': '39.910924', 'price': '0'},
          {'name': '太原', "lng": '112.548347', 'lat': '37.870154', 'price': '0'},
          {'name': '成都', "lng": '104.075206', 'lat': '30.667255', 'price': '0'},
          {'name': '深圳', "lng": '114.070301', 'lat': '22.552194', 'price': '0'},
          {'name': '广州', "lng": '113.259356', 'lat': '23.134804', 'price': '0'},
          {'name': '佛山', "lng": '113.130809', 'lat': '23.028823', 'price': '0'},
          {'name': '沈阳', "lng": '123.46001', 'lat': '41.721346', 'price': '0'},
          {'name': '武汉', "lng": '114.31676', 'lat': '30.594985', 'price': '0'},
          {'name': '厦门', "lng": '114.31676', 'lat': '30.594985', 'price': '0'},
          {'name': '烟台', "lng": '121.449243', 'lat': '37.473706', 'price': '0'},
          {'name': '大连', "lng": '121.617029', 'lat': '38.921199', 'price': '0'},
          {'name': '东莞', "lng": '113.757268', 'lat': '23.028904', 'price': '0'},
          {'name': '青岛', "lng": '120.392333', 'lat': '36.073627', 'price': '0'},
          {'name': '重庆', "lng": '106.560737', 'lat': '29.566986', 'price': '0'},
          {'name': '长沙', "lng": '112.946045', 'lat': '28.234381', 'price': '0'},
          {'name': '深圳', "lng": '114.056503', 'lat': '22.547922', 'price': '0'},
        ];

//        function addMarker(point) {
//          var myIcon = new BMap.Icon('http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png', new BMap.Size(32, 32))
//          var marker = new BMap.Marker(point, {icon: myIcon});//创建标注点
//          map.addOverlay(marker);
//        }

        //添加标注
//        for (var i = 0; i < points.length; i++) {
//          var point = new BMap.Point(points[i].lng, points[i].lat);
//          addMarker(point);
//        }

        //自定义标注

        //定义函数 复杂布局的图层
        function ComplexCustomOverlay(point, text, mouseoverText) {
          this._point = point;
          this._text = text;
          this._overText = mouseoverText;
        }

        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function (map) {
          this._map = map;
          var div = this._div = document.createElement("div");
          div.style.position = "absolute";
          div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
          div.style.backgroundColor = "#6BADCA";
          div.style.border = "1px solid #6BADCA"
          div.style.borderRadius = "17px";
          div.style.color = "white";
          div.style.height = "30px";
          div.style.width = "30px";
          div.style.padding = "2px";
          div.style.lineHeight = "30px";
          div.style.textAlign = "center";
          div.style.verticalAlign = "center";
          div.style.whiteSpace = "nowrap";
          div.style.MozUserSelect = "none";
          div.style.fontSize = "10px"
          var span = this._span = document.createElement("span");
          div.appendChild(span);
          span.appendChild(document.createTextNode(this._text));
          var that = this;

          var arrow = this._arrow = document.createElement("div");
          arrow.style.backgroundColor = "0.01";
          arrow.style.position = "absolute";
          arrow.style.width = "11px";
          arrow.style.height = "10px";
          arrow.style.top = "22px";
          arrow.style.left = "10px";
          arrow.style.overflow = "hidden";
          arrow.style.visibility = "False";
          div.appendChild(arrow);

          div.onmouseover = function () {
            this.style.backgroundColor = "red";
            this.style.borderColor = "#6BADCA";
            this.style.color = "black";
            this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px -20px";
          }

          div.onmouseout = function () {
            this.style.backgroundColor = "#6BADCA";
            this.style.color = 'white';
            this.style.borderColor = "#6BADCA";
            this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
          }

          map.getPanes().labelPane.appendChild(div);

          return div;
        }
        ComplexCustomOverlay.prototype.draw = function () {
          var map = this._map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
          this._div.style.top = pixel.y - 30 + "px";
        }

        //新建单个point

//        var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";
//
//        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845, 39.914101), "银湖海岸城", mouseoverTxt);
//
//        map.addOverlay(myCompOverlay);
//

        //批量建立标注
        for (var i = 0; i < points.length; i++) {
          var txt = points[i].name, mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

          var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(points[i].lng, points[i].lat), points[i].name, mouseoverTxt);

          map.addOverlay(myCompOverlay);
//          var point = new BMap.Point(points[i].lng, points[i].lat);
//          addMarker(point);
        }
        if (!isSupportCanvas()) {
          alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
        }
        //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
        //参数说明如下:
        /* visible 热力图是否显示,默认为true
           * opacity 热力的透明度,1-100
           * radius 势力图的每个点的半径大小
           * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
           *	{
                  .2:'rgb(0, 255, 255)',
                  .5:'rgb(0, 110, 255)',
                  .8:'rgb(100, 0, 255)'
              }
              其中 key 表示插值的位置, 0~1.
                  value 为颜色值.
           */
        var heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 20});
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data: points, max: 100});

        //是否显示热力图
//        heatmapOverlay.show();
        closeHeatmap();

        function setGradient() {
          /*格式如下所示:
           {
                 0:'rgb(102, 255, 0)',
                 .5:'rgb(255, 170, 0)',
                 1:'rgb(255, 0, 0)'
           }*/
          var gradient = {};
          var colors = document.querySelectorAll("input[type='color']");
          colors = [].slice.call(colors, 0);
          colors.forEach(function (ele) {
            gradient[ele.getAttribute("data-key")] = ele.value;
          });
          heatmapOverlay.setOptions({"gradient": gradient});
        }

        //判断浏览区是否支持canvas
        function isSupportCanvas() {
          var elem = document.createElement('canvas');
          return !!(elem.getContext && elem.getContext('2d'));
        }
      },

    },
    mounted: function () {
      this.showheat()
//      this.getAuditInfo()
    }
  }
</script>

<style type="text/css">
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
    float: left;
  }

  html {
    height: 100%
  }

  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: "微软雅黑";
  }

  #container {
    height: 60rem;
    width: 100%;
  }

  #r-result {
    width: 100%;
  }

  .el-menu {
    width: 100%;
  }
</style>
