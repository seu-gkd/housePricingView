<template>

  <div class="sub-route">
    <router-view></router-view>
    <section class="app-section" id="heat">
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
            round
            style="display: inline;background-color:#00000050;color:white;border:0px;height:55px;position: relative "
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
        <div style="width: 100%;background: white;">
          <div class="fl">
            <div class="name">精品楼盘<span>为你而选</span></div>
            <div class="subP">好房源那么多，我们为你精选，GKD会越来越懂你</div>
          </div>
          <div style="padding-bottom: 50px">
            <el-card class="buildingItem" v-for="item in recommendations.slice(0,4)" :key="item.Information.id"
                     @click="itemDetail(item.id)">
              <img class="buildImg"
                   style="background-color:#409eff"
                   :src="'https://ke-image.ljcdn.com/'+item.Picture.pic+'!m_fill,w_1000,l_fbk'"
              />
              <div class="buildContent" @click="itemDetail(item.Information.id)">
                <div>
                  <div class="buildName">{{item.Information.xiaoqu}}</div>
                  <div class="resblock-location">
                    <span>{{item.Information.region}}</span>
                    <i class="split">/</i>
                    <span>{{item.Information.propertyaddress}}</span>
                  </div>
                  <div class="resblock-area">
                    <span>建面 {{Math.round(item.Information.area)}}㎡</span>
                    <div class="resblock-price">
                      <div class="main-price">

                        <span class="number1">{{item.Information.price}}</span>
                        <span class="desc">&nbsp;元/平(均价)</span>

                      </div>


                    </div>
                  </div>
                </div>
                <!-- <div class="resblock-tag">

                  <el-tag class="featureTag" v-for="(it,index) in item.Information.projectfeatures.split(' ')"
                          :key="index"
                          type="primary">{{it}}
                  </el-tag>
                </div> -->

              </div>
            </el-card>
          </div>
        </div>


        <footer class="main-page-footer">
          © Copyright©2010-2019 GKD版权所有&nbsp;
          <div><a target="_blank"
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024019"
                  style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin: 0 auto;text-align: center;">

          </a></div>
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
        recommendations: [],
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
      itemDetail(id) {
        this.$router.push({
          path: '/buildDetail',
          query: {
            id: id
          }
        },)
      },
      //获取推荐楼盘
      getRecommendation() {
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/infodata/getAheadLoupan',
          data: {
            city: sessionStorage.getItem('currentCity'),
            region: '无'
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.recommendations = res.data;

            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('操作错误,请稍后重试')
          }
        })

      },
      search() {

        this.$router.push({
          name: 'priceAnalysis',
          params: {
            info: this.inputContent
          }
        })
      },
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
          self.getRecommendation()
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
      this.getCurrentCity()
    }
  }
</script>

<style type="text/css">

  #heat .buildingItem .el-card__body {
    padding: 0px;
  }

  #heat .buildingItem .resblock-tag {

  }

  #heat .buildingItem el-tag {
    display: inline;
  }

  #heat .tagItem {
    padding: 6px 8px;
    font-size: 13px;
    text-align: center;
    /*margin-left: 10px;*/

    border-radius: 2px;
    color: #849aad;
    background: rgba(132, 154, 174, .15);
  }

  #heat .buildingItem {
    text-align: left;
    line-height: 15px;
    display: inline-block;
    width: 18rem;
    margin-top: 15px;
    margin-right: 10px;
    /*height: 2rem;*/
    margin-bottom: 0px;
  }

  #heat .buildImg {
    width: 100%;
    height: 11rem;
    display: block;

  }

  #heat .buildContent {

    display: block;

    cursor: pointer;
    height: 6rem;
    width: 100%;
  }

  #heat .buildName {
    margin-left: 1rem;
    display: inline-block;
    max-width: 75%;
    font-size: 20px;
    line-height: 20px;
    vertical-align: middle;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }

  #heat .resblock-location {
    margin-left: 1rem;
    margin-top: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666
  }

  #heat .split {

    margin: 0 8px;
    font-size: 14px;
    color: #ccc;
  }

  #heat .resblock-area {
    margin-left: 1rem;
    height: 16px;
    color: #666;
    margin-top: 10px;
  }

  #heat .resblock-tag {
    margin-top: 5px;
  }

  #heat .resblock-price {
    position: relative;
    float: right;
    margin-right: 1rem;
    margin-bottom: 10px;

  }

  #heat .number1 {
    font-family: Tahoma-Bold;
    font-size: 15px;
    color: #d44d38;
    vertical-align: bottom;
  }

  #heat .desc {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #d44d38;
    vertical-align: bottom;
  }

  #heat .resblock-tag span {

    display: inline-block;
    height: 30px;

    margin-right: 10px;
    padding: 0 12px;
    line-height: 30px;
    font-size: 12px;
    /*color: #849aae;*/
    /*background: rgba(132, 154, 174, .1)*/
  }

  #heat .fl {
    height: 100px;
    padding-top: 30px;
  }

  #heat .fl .name {
    float: left;
    display: block;
    font-weight: 700;
    width: 90%;
    text-align: left;
    font-size: 30px;
    padding-left: 30px;

  }

  #heat .fl .name span {
    font-weight: 200;
    font-size: 30px;

    margin-left: 10px;
  }

  #heat .fl .subP {
    text-align: left;
    float: left;
    padding-left: 30px;

    display: block;
    color: #888;
    margin-top: 10px;
  }

  #heat .fl p > a {

  }

  #heat {
    text-align: center;
    min-width: 1065px;

  }

  #heat #container {
    height: 900px;
    width: 100%;
    border-radius: 2rem;
    display: inline-block;
    z-index: 2;
    margin-left: 0.5rem;

  }

  #heat .box-card-list-show {

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

  #heat .box-card-chart-show {
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

  #heat .box-card-list {
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

  #heat .box-card-chart {
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

  #heat .left-title {
    font-size: 10px;
    margin-bottom: 10px;
    color: gray;
    text-align: center;

  }

  #heat .left-item {
    text-align: center;
    margin-bottom: 10px;
    font-size: 10px;
  }

  #heat .item-name {
    color: #003bb3;
  }

  #heat .clearfix {

  }

  #heat .v-chart-city {
    width: 20rem;
    height: 20rem;
    float: left;
  }

  #heat .v-chart-city.noselect {
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
    border: 0px;
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
    display: inline-block;

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
    display: inline-block;
    margin-top: 20px;
    text-align: center;
  }

  #heat .elItem {
    float: inherit;
  }

  #heat .mapLayout {
    /*width: 100%;*/
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
  /*#heat .el-select-dropdown {*/
  /*min-width: 630px;*/
  /*max-width: 640px;*/
  /*}*/
</style>

