<template>
  <div>
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
        map.centerAndZoom(point, 5);             // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom(); // 允许滚轮缩放

        var points = [{'name': '上海', "lng": '121.530216', 'lat': '31.149067', 'price': '0'},
          {'name': '南京', "lng": '118.804147', 'lat': '32.063673', 'price': '0'},
          {'name': '合肥', "lng": '117.231716', 'lat': '31.825105', 'price': '0'},
          {'name': '杭州', "lng": '120.21896', 'lat': '30.253581', 'price': '0'},
//          {'name':'济南',"lng":'117.231716','lat':'31.825105','price':'0'},
//          {'name':'石家庄',"lng":'117.231716','lat':'31.825105','price':'0'},
//          {'name':'天津',"lng":'','lat':'','price':'0'},
//          {'name':'北京',"lng":'','lat':'','price':'0'},
//          {'name':'太原',"lng":'','lat':'','price':'0'},
//          {'name':'成都',"lng":'','lat':'','price':'0'},
//          {'name':'深圳',"lng":'','lat':'','price':'0'},
//          {'name':'广州',"lng":'','lat':'','price':'0'},
//          {'name':'佛山',"lng":'','lat':'','price':'0'},
//          {'name':'沈阳',"lng":'','lat':'','price':'0'},
//          {'name':'武汉',"lng":'','lat':'','price':'0'},
//          {'name':'厦门',"lng":'','lat':'','price':'0'},
//          {'name':'烟台',"lng":'','lat':'','price':'0'},
//          {'name':'大连',"lng":'','lat':'','price':'0'},
//          {'name':'东莞',"lng":'','lat':'','price':'0'},
//          {'name':'青岛',"lng":'','lat':'','price':'0'},
//          {'name':'重庆',"lng":'','lat':'','price':'0'},
//          {'name':'长沙',"lng":'','lat':'','price':'0'},
//          {'name':'深圳',"lng":'','lat':'','price':'0'},
        ];

        function addMarker(point) {
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
        }

        //添加标注
        for (var i = 0; i < points.length; i++) {
          var point = new BMap.Point(points[i].lng, points[i].lat);
          addMarker(point);
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
    height: 45rem;
    width: 100%;
  }

  #r-result {
    width: 100%;
  }
</style>
