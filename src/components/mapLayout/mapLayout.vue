<template>
  <div class="sub-route">
    <section class="app-section" id="mapLayout">
      <div style="width:100%;height: 100%;">
        <div class="mainContent">

          <div id="container" class="is-always-shadow"></div>
          <el-button style="position: absolute;z-index: 4;left: 15px;top: 75px" type="primary"
                     icon="el-icon-back" circle
                     v-if="!isShowCities"
                     @click.native="initData()"
          ></el-button>
          <div :class="leftChartShow==true?'box-card-chart-show':'box-card-chart'">
            <el-card style="margin-right: 4rem">
              <div slot="header" class="clearfix" v-model="currentCityInfo">
                <span>{{currentCityInfo.cityName}}各区房价条形统计图</span>

              </div>
              <v-chart class="v-chart-city" ref="demo"
                       :data="chartdata"
                       :width="800"
                       :height="350">
                <v-bar/>
                <v-tooltip :show-item-marker="true"/>

              </v-chart>
            </el-card>
            <el-button style="position: absolute;z-index: 4;right: 0px;top: 47%" type="primary"
                       :icon="leftChartShow==true?'el-icon-arrow-left':'el-icon-arrow-right'" circle
                       @click.native="switchPanel()"
            ></el-button>
          </div>
          <el-card class="box-card-list-show" @mouseover.native="panelShow(2)"
                   @mouseout.native="panelOff(2)">
            <div slot="header" class="clearfix" v-model="currentCityInfo">
              <span>{{currentCityInfo.cityName}}房价平均数：</span>
              <span style="color:red;font-size: 23px">{{currentCityInfo.cityPrice}}</span>
              <span>万元/平方米</span>
              <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <el-row :gutter="1" class="left-title">
              <el-col :span="8">
                <div class="grid-content bg-purple">序号</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">行政区</div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">房价(万元/平方米)</div>
              </el-col>


            </el-row>
            <div v-for="(item,index) in currentCityInfo.cityRegions" :key="id" class="text item">
              <el-row :gutter="1" class="left-item">
                <el-col :span="8">
                  <div class="grid-content bg-purple">{{index + 1}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple item-name" @click="cityItemClick(item.regionname)">
                    {{item.regionname}}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">{{Math.round(item.avgprice / 100) / 100}}</div>
                </el-col>


              </el-row>
            </div>
          </el-card>


        </div>
        <!--  <footer class="main-page-footer">
           © Copyright©2010-2019 GKD版权所有&nbsp;
           <div><a target="_blank"
                   href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024019"
                   style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin: 0 auto;text-align: center;">

           </a></div>
         </footer> -->
      </div>


    </section>
  </div>
</template>
<script>
  import {Loading} from 'element-ui'
  import echarts from 'echarts'
  import '../js/Heatmap_min.js'

  export default {
    name: 'mapLayout',
    data: function () {
      return {
        leftChartShow: false,
        rightListShow: false,
        mp: '',
        pointsList: [{'name': '上海', "lng": '121.530216', 'lat': '31.149067', 'price': '0'},
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
          {'name': '厦门', "lng": '118.094135', 'lat': '24.489091', 'price': '0'},
          {'name': '烟台', "lng": '121.449243', 'lat': '37.473706', 'price': '0'},
          {'name': '大连', "lng": '121.617029', 'lat': '38.921199', 'price': '0'},
          {'name': '东莞', "lng": '113.757268', 'lat': '23.028904', 'price': '0'},
          {'name': '青岛', "lng": '120.392333', 'lat': '36.073627', 'price': '0'},
          {'name': '重庆', "lng": '106.560737', 'lat': '29.566986', 'price': '0'},
          {'name': '长沙', "lng": '112.946045', 'lat': '28.234381', 'price': '0'},
          {'name': '深圳', "lng": '114.056503', 'lat': '22.547922', 'price': '0'},
          {'name': '苏州', "lng": '120.5924120000', 'lat': '31.3035650000', 'price': '0'}
        ],
        chartdata: [],
        currentCityInfo: {
          cityId: 1,
          cityName: '全国',
          cityPrice: 3.67,
          cityRegions: []
        },
        heatmapOverlay: '',
      }
    },
    methods: {
      switchPanel() {

        this.leftChartShow = !this.leftChartShow
      },
      panelShow(t) {
        if (t == 1) {
          this.leftChartShow = true
        } else if (t == 2) {
          this.rightListShow = true
        }
      },
      panelOff(t) {
        if (t == 1) {
          this.leftChartShow = false
        } else if (t == 2) {
          this.rightListShow = false
        }
      },
      showCustomOverlay(flag) {
        let self = this

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
          div.style.boxShadow = 'rgba(222, 28, 29, 0.08) 0px 0px 100px';
          div.style.stroke = 'rgb(113,194,244)';
          div.style.strokeWidth = '0';
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

            this.style.textAlign = "center";
            this.style.borderColor = "#6BADCA";
            this.style.color = "black";
            this.style.borderRadius = "22px";
            this.style.height = "40px";
            this.style.width = "40px";
            this.getElementsByTagName("span")[0].innerHTML = that._overText;
            arrow.style.backgroundPosition = "0px -20px";
          }

          //地点点击事件
          div.onclick = function () {
            self.mp.centerAndZoom(that._point, 11);
            self.getRegionData(that._text)
            self.isShowCities = false

          }
          //鼠标放上事件
          div.onmouseout = function () {
            this.style.backgroundColor = "#6BADCA";
            this.style.color = 'white';
            this.style.borderColor = "#6BADCA";
            this.style.borderRadius = "17px";
            this.style.color = "white";
            this.style.height = "30px";
            this.style.width = "30px";
            this.getElementsByTagName("span")[0].innerHTML = that._text;
            arrow.style.backgroundPosition = "0px 0px";
          }

          self.mp.getPanes().labelPane.appendChild(div);

          return div;
        }
        ComplexCustomOverlay.prototype.draw = function () {
          var map = this._map;
          var pixel = map.pointToOverlayPixel(this._point);
          this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
          this._div.style.top = pixel.y - 30 + "px";
        }
        //城市
        if (flag == 1) {
          for (var i = 0; i < self.pointsList.length; i++) {
            var txt = self.pointsList[i].name, mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

            var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(self.pointsList[i].lng, self.pointsList[i].lat), self.pointsList[i].name, mouseoverTxt);
            self.mp.addOverlay(myCompOverlay);
          }
        }
        //所选城市的区域
        else if (flag == 2) {
          let currentRegions = self.currentCityInfo.cityRegions
          for (var i = 0; i < currentRegions.length; i++) {
            var txt = currentRegions[i].regionname,
              mouseoverTxt = txt + "平均房价为 " + Math.round(currentRegions[i].avgprice / 100) / 100 + '万元/平方米';

            var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(currentRegions[i].lng, currentRegions[i].lat), currentRegions[i].regionname, mouseoverTxt);

            self.mp.addOverlay(myCompOverlay);
          }
        }

      },
      showheat() {

        this.mp = new BMap.Map("container");          // 创建地图实例

        var point = new BMap.Point(112.418261, 31.921984);
        this.mp.centerAndZoom(point, 6);             // 初始化地图，设置中心点坐标和地图级别
//        this.mp.enableScrollWheelZoom(); // 允许滚轮缩放
        //展示全国城市数据
        this.showCustomOverlay(1)

      },
      getRegionData(currentName) {
        this.chartdata = []
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/regioninfo/page',
          data: {
            pageSize: 50,
            cityname: currentName,

          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.currentCityInfo.cityName = res.data.cityName
              self.currentCityInfo.cityPrice = Math.round(res.data.avgPrice / 100) / 100
              self.currentCityInfo.cityRegions = res.data.allRegion

              res.data.allRegion.forEach(item => {
                let map = {}
                map['regionname'] = item.regionname
                map['avgprice'] = Math.round(item.avgprice)
                self.chartdata.push(map)
              })
              self.$refs.demo.rerender()
              //展示所选城市的所有区数据
              self.showCustomOverlay(2)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })

      },
      initData() {
        if (sessionStorage.getItem('jwt') != null) {
          this.currentUserInfo = sessionStorage.getItem('username')

        }
        this.isShowCities = true
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/regioninfo/cityavg',
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.currentCityInfo.cityName = '全国'
              self.currentCityInfo.cityPrice = ''
//              self.currentCityInfo.cityRegions = res.data
              let sumPrice = 0
              res.data.slice(0, 20).forEach(item => {
                let map = {}
                map['regionname'] = item.cityName
                map['avgprice'] = Math.round(item.avgPrice)
                sumPrice += parseInt(item.avgPrice)
                self.chartdata.push(map)
                self.currentCityInfo.cityRegions.push(map)
              })
              self.currentCityInfo.cityPrice = Math.round(sumPrice / self.currentCityInfo.cityRegions.length / 100) / 100
              self.$refs.demo.rerender()
              self.showheat()
//              self.renderVChart()

//              self.chartdata.rows = res.data.results
              // self.showCustomOverlay(2)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },

    },
    mounted: function () {
      this.initData()


    }
  }
</script>
<style scoped>
  #mapLayout {
    overflow: scroll;
    text-align: center;
    height: 100%;
    z-index: 3;
    flex: 1;
    /*overflow: scroll;*/
  }

  #mapLayout .mainContent {
    margin: 0 auto;
    /*height: 100%;*/

    padding-top: 65px;
    width: 100%;
  }

  .mapLayout {
    /*width: 100%;*/
    position: relative;
    background-color: white;
  }

  #mapLayout .anchorBL {
    visibility: hidden;
  }

  #mapLayout #container {
    height: 100%;
    width: 100%;

    position: absolute;

    z-index: 3;

  }

  .box-card-list-show {

    z-index: 3;

    right: 2rem;
    display: inline-block;
    width: 20%;
    max-height: 28.5rem;
    height: auto;
    position: absolute;
    overflow-y: scroll;
    margin-top: 10rem;
    /*transform: translate(21.5rem, 0);*/
    /*transition-duration: 0.5s;*/
  }

  .box-card-chart-show {
    max-height: 30rem;
    z-index: 3;
    display: inline-block;
    position: absolute;
    left: 0px;
    width: 55rem;
    overflow-x: scroll;
    margin-top: 10rem;
    /*border-radius: 10px;*/
    transform: translate(0, 0);
    transition-duration: 0.5s;
  }

  .box-card-list {
    min-height: 30rem;
    z-index: 2;
    position: absolute;

    width: 20rem;
    overflow-y: scroll;
    overflow-x: scroll;
    border-radius: 10px;
    transform: translate(20rem, 0);
    transition-duration: 0.5s;
  }

  .box-card-chart {
    max-height: 30rem;
    margin-top: 10rem;
    z-index: 3;
    position: absolute;
    display: inline;
    left: 0;
    /*margin-left: 0.5rem;*/
    width: 50rem;
    overflow-y: scroll;
    overflow-x: scroll;
    border-radius: 10px;
    transform: translate(-47rem, 0);
    transition-duration: 0.5s;
  }

  .left-title {
    font-size: 10px;
    margin-bottom: 10px;
    color: gray;
    text-align: center;

  }

  .left-item {
    text-align: center;
    margin-bottom: 10px;
    font-size: 10px;
  }

  .item-name {
    color: #003bb3;
  }

  .v-chart-city {
    width: 20rem;
    height: 20rem;
    float: left;
  }

  .v-chart-city.noselect {
    height: 200px;
    width: 200px;
  }

</style>
