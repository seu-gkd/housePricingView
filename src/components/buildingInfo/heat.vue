<template>

  <div class="sub-route">
    <router-view></router-view>
    <section class="app-section" id="heat">
      <!--<el-menu-->
      <!--:default-active="$store.state.activeIndex"-->
      <!--class="el-menu"-->
      <!--mode="horizontal"-->

      <!--text-color="#fff"-->

      <!--active-text-color="#fff">-->
      <!--<div class="logo">-->
      <!--<div class="logoTitle">GKD</div>-->
      <!--<div class="subTitle">搞得快一点</div>-->
      <!--</div>-->
      <!--<span class="CurrentLocation el-icon-location-outline">{{currentLocation}}</span>-->
      <!--<el-menu-item class="elItem" index="1">-->
      <!--主页-->
      <!--</el-menu-item>-->
      <!--<el-menu-item class="elItem" index="2" @click="go('2')">-->
      <!--房价统计-->
      <!--</el-menu-item>-->
      <!--<el-menu-item class="elItem" index="3" @click="go('3')">-->
      <!--<router-link style="text-decoration: none" to="/priceAnalysis">房价预测</router-link>-->
      <!--</el-menu-item>-->
      <!--<div class="account-admin" v-if="currentUserInfo!=''">-->
      <!--<span class="top-btn">-->
      <!--<el-dropdown style="cursor:pointer;" :show-timeout="0">-->
      <!--<span class="el-dropdown-link" style="color:#fff;">-->
      <!--{{currentUserInfo}}<i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>-->
      <!--</span>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<div style="padding:5px 10px;">-->
      <!--<div style="font-size:14px;">-->
      <!--{{currentUserInfo}}-->
      <!--<el-tooltip class="item" effect="dark" :content="'最后登录于 ' + lastloginTime" placement="top-end">-->
      <!--<i class="fa fa-clock-o" aria-hidden="true" style="margin-left:8px;color:#aaa;cursor:pointer;"></i>-->
      <!--</el-tooltip>-->
      <!--</div>-->
      <!--</div>-->
      <!--&lt;!&ndash;<el-dropdown-item divided>&ndash;&gt;-->
      <!--&lt;!&ndash;<div @click="toPath('changePass')">修改密码</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-dropdown-item>&ndash;&gt;-->
      <!--<el-dropdown-item>-->
      <!--<div>用户中心</div>-->
      <!--</el-dropdown-item>-->
      <!--<el-dropdown-item>-->
      <!--<div @click="logout">退出登录</div>-->
      <!--</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--</span>-->
      <!--</div>-->

      <!--<el-menu-item class="elItem" style="float: right" index="4" v-if="currentUserInfo==''">-->
      <!--<router-link to="/signin" style="text-decoration: none">注册</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item class="elItem" style="float: right" index="4" v-if="currentUserInfo==''">-->
      <!--<router-link to="/login" style="text-decoration: none">登陆</router-link>-->
      <!--</el-menu-item>-->
      <!--</el-menu>-->
      <video class="mainImg" autoplay loop poster muted>
        <source :src="require('../videos/HongKong.mp4')" type="video/mp4">
      </video>
      <div style="position:relative;width: 100%;height: 100%; overflow-y: scroll;">

        <!--<video  :src="" >-->
        <!--</video>-->
        <div class="mainSearch">
          <el-select v-model="inputContent"
                     style="margin-top: 100px;width: 40rem;height: 55px;border: 0;"
                     placeholder="查询城市信息" filterable>
            <el-option
              v-for="item in currentCityInfo.cityRegions"
              :key="item.regionname"
              :label="item.regionname"
              :value="item.regionname">
            </el-option>
          </el-select>
          <el-button
            style="display: inline;background-color:#00ae66;color:white;border:0px;height:55px;position: relative "
            slot="append" @click="search">
            开始搜索
          </el-button>
        </div>
        <div class="funShow">
          <ul class="count-3">
            <li class="hvr-bob"><img
              :src="require('../images/fenxi.png')">
              <div>房价趋势</div>
            </li>
            <li class="hvr-bob"><img
              :src="require('../images/ditu.png')">
              <div>地图找房</div>
            </li>
            <li class="hvr-bob"><img
              :src="require('../images/yuce.png')">
              <div>房价预测</div>
            </li>
          </ul>
        </div>
        <el-row class="mapLayout" :gutter="20">
          <el-col :span="15">
            <div id="container" class="is-always-shadow"></div>
          </el-col>
          <el-col :span="9">
            <el-card :class="box-card-chart-show" @mouseover.native="panelShow(1)"
                     @mouseout.native="panelOff(1)">
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

          </el-col>
        </el-row>
        <div>


          <!--<el-card :class="[leftChartShow?'box-card-chart-show':'box-card-chart']" @mouseover.native="panelShow(1)"-->
          <!--@mouseout.native="panelOff(1)">-->
          <!--<div slot="header" class="clearfix" v-model="currentCityInfo">-->
          <!--<span>{{currentCityInfo.cityName}}各区房价条形统计图</span>-->

          <!--</div>-->
          <!--<v-chart class="v-chart-city" ref="demo"-->
          <!--:data="chartdata"-->
          <!--:width="800"-->
          <!--:height="350">-->
          <!--<v-bar/>-->
          <!--<v-tooltip :show-item-marker="true"/>-->

          <!--</v-chart>-->
          <!--</el-card>-->
        </div>


        <footer class="main-page-footer">
          CopyRight &copy; 2019 GKD
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  //  import './js/aa.js'
  import './js/Heatmap_min.js'
  //  import BMap from 'BMap'
  //  import BMapLib from 'BMapLib'
  //  import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
  import Login from '@/components/login&signin/Login.vue'

  export default {
    name: 'heat',
    data: function () {
      return {
        mp: '',
        inputContent: '',
        currentLocation: '',
        isShowCities: true,
        leftChartShow: false,
        rightListShow: false,
        chartdata: [],
        showLoginPanel: false,
        currentUserInfo: '',
        currentCityInfo: {
          cityId: 1,
          cityName: '全国',
          cityPrice: 3.67,
          cityRegions: []
        },
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
        heatActiveIndex: "1",
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
      Loading,
      'Login': Login
    },
    computed: {},
    methods: {
//      logout() {
//        let self = this
//        let loadingInstance = Loading.service({fullscreen: true});
//        jQuery.ajax({
//          type: 'GET',
//          headers: {
////            Authorization: localStorage.getItem('token')
//          },
//          url: this.$store.state.Server + '/PersonUser/personUser/logout',
////          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
//          data: {},
//          success: function (res) {
//            loadingInstance.close()
//            if (res.code === 0) {
//              sessionStorage.setItem('jwt', '')
//              sessionStorage.setItem('username', '')
//              self.currentUserInfo = ''
//              self.$message.success('已退出')
//            } else {
//              self.$message.error(res.msg)
//            }
//          },
//          error: function () {
//            loadingInstance.close()
//            self.$message.error('网络错误，请重试')
//          }
//        })
//      },
      cityItemClick(regionName) {

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
      initData() {
        if (sessionStorage.getItem('jwt') != null) {
          this.currentUserInfo = sessionStorage.getItem('username')

        }
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
              res.data.forEach(item => {
                let map = {}
                map['regionname'] = item.cityName
                map['avgprice'] = Math.round(item.avgPrice)
                sumPrice += parseInt(item.avgPrice)
                self.chartdata.push(map)
                self.currentCityInfo.cityRegions.push(map)
              })
              self.currentCityInfo.cityPrice = Math.round(sumPrice / self.currentCityInfo.cityRegions.length / 100) / 100
              self.$refs.demo.rerender()
//              self.renderVChart()

//              self.chartdata.rows = res.data.results
              self.showCustomOverlay(2)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
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
      getData() {

        var self = this
        this.loading = true
        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingInfo/buildinginfo/info',
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
      getCurrentCity() {    //定义获取城市方法
        const geolocation = new BMap.Geolocation();
        let self = this
        geolocation.getCurrentPosition(function getinfo(position) {
          let city = position.address.city;             //获取城市信息
//          let province = position.address.province;    //获取省份信息
          self.currentLocation = city.substr(0, city.length - 1)

          sessionStorage.setItem('currentCity', city.substr(0, city.length - 1))
        }, function (e) {
        }, {provider: 'baidu'});
      },
      showheat() {
        this.mp = new BMap.Map("container");          // 创建地图实例

        var point = new BMap.Point(112.418261, 31.921984);
        this.mp.centerAndZoom(point, 6);             // 初始化地图，设置中心点坐标和地图级别
//        this.mp.enableScrollWheelZoom(); // 允许滚轮缩放
        //展示全国城市数据
        this.showCustomOverlay(1)

      },
    },
    mounted: function () {
      this.initData()
      this.showheat()
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

  #heat {
    text-align: center;

  }

  #container {
    height: 900px;
    width: 100%;
    border-radius: 2rem;
    display: inline-block;
    z-index: 2;
    margin-left: 0.5rem;

  }



  .box-card-list-show {

    z-index: 2;

    right: 2rem;
    display: inline-block;
    width: 100%;
    max-height: 28.5rem;
    height: auto;
    overflow-y: scroll;
    margin-top: 1rem;
    /*transform: translate(21.5rem, 0);*/
    /*transition-duration: 0.5s;*/
  }

  .box-card-chart-show {
    max-height: 30rem;
    z-index: 2;
    display: inline-block;

    /*margin-left: 1rem;*/
    width: 100%;
    overflow-x: scroll;
    border-radius: 10px;
    /*transform: translate(-21rem, 0);*/
    /*transition-duration: 0.5s;*/
  }

  .box-card-list {
    min-height: 30rem;
    z-index: 2;

    margin-left: 98.5rem;

    width: 20rem;
    overflow-y: scroll;
    overflow-x: scroll;
    border-radius: 10px;
    transform: translate(20rem, 0);
    transition-duration: 0.5s;
  }

  .box-card-chart {
    max-height: 30rem;
    z-index: 3;
    position: absolute;
    margin-top: 920px;
    /*margin-left: 0.5rem;*/
    width: 45rem;
    overflow-y: scroll;
    overflow-x: scroll;
    border-radius: 10px;
    transform: translate(-44.5rem, 0);
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

  .clearfix {

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

  /*#heat .CurrentLocation {*/
  /*background: rgba(0, 0, 0, 0.25);*/
  /*display: inline-block;*/
  /*height: 27px;*/
  /*line-height: 27px;*/
  /*text-align: center;*/
  /*color: #fff;*/
  /*margin-top: 20px;*/
  /*cursor: pointer;*/
  /*border-radius: 15px;*/
  /*padding: 0 10px;*/
  /*font-size: 12px;*/
  /*float: left;*/
  /*margin-right: 10%;*/
  /*margin-left: 10%;*/
  /*}*/

  #heat .mainImg {
    /*margin-top: 60px;*/
    object-fit: fill;
    top: 0;
    left: 0;
    width: 100%;
    height: 700px;
    position: absolute;
    z-index: 0;
    background-color: black;

  }

  #heat .el-input__inner {
    height: 55px;
    color: white;
    background-color: rgb(0, 0, 0, 0.4);
  }

  #heat .funShow {
    height: 160px;
    width: 100%;
    position: relative;
    background-color: white;
    text-align: center;
    vertical-align: middle;
  }

  #heat .hvr-bob {
    width: 33%;

  }

  #heat .hvr-bob img {
    height: 90px;

  }

  #heat .mainSearch {
    margin-top: 200px;
    height: 540px;
    z-index: 2;
    text-align: center;
    vertical-align: middle;
    width: 100%;

  }

  #heat .hvr-bob div {
    margin-top: 10px;
    color: #666;

  }

  #heat .count-3 {
    width: 100%;
    height: 100px;
    margin-top: 20px;
    text-align: center;
  }

  #heat .elItem {
    float: inherit;
  }

  #heat .mapLayout {
    width: 100%;
    position: relative;
    background-color: white;
  }

  #heat .anchorBL {
    visibility: hidden;
  }

  /*video{*/
  /*position: fixed;*/
  /*right: 0px;*/
  /*bottom: 0px;*/
  /*min-width: 100%;*/
  /*min-height: 100%;*/
  /*height: auto;*/
  /*width: auto;*/
  /*!*加滤镜*!*/
  /*!*-webkit-filter: grayscale(100%);*!*/
  /*!*filter:grayscale(100%);*!*/
  /*z-index:-11*/
  /*}*/
  /*source{*/
  /*min-width: 100%;*/
  /*min-height: 100%;*/
  /*height: auto;*/
  /*width: auto;*/
  /*}*/
  #heat .el-select-dropdown {
    min-width: 630px;
    max-width: 640px;
  }
</style>

