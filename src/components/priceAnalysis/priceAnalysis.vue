<template>
  <div>

    <router-view></router-view>
    <div class="sub-route">

      <section class="app-section" id="priceAnalysis">

        <div style="width:100%;height: 100%;padding-top: 60px">


          <div class="mainContent">
            <el-card class="regionSelect" id="regionSelect">
              <div style="width:100%;text-align: center">
                <el-select v-model="inputContent"
                           style="margin-top: 0.6%;border-radius:10px;width: 20rem;margin-bottom: 2rem"
                           placeholder="查询城市名称" filterable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>

                </el-select>
                <el-button type="warning" style="display: inline;" slot="append" icon="el-icon-search"
                           @click="search"></el-button>
              </div>
              <div>区域选择：</div>
              <el-radio-group fill="#ebb563" size="mini" style="overflow: hidden;overflow-x: hidden;width: 100%"
                              v-model="currentRegion">
                <el-radio-button class="regionBtn"
                                 :label="currentLocationInfo.locationName">全{{currentLocationInfo.locationName}}市
                </el-radio-button>
                <el-radio-button v-for="region in currentLocationInfo.regionsInfo1" :key="region.regionName"
                                 class="regionBtn"
                                 :label="region.regionName">{{region.regionName}}区
                </el-radio-button>
              </el-radio-group>
              <el-radio-group size="mini" style="overflow: hidden;overflow-x: hidden;width: 100%"
                              v-model="currentRegion">
                <el-radio-button v-for="region in currentLocationInfo.regionsInfo2" :key="region.regionName"
                                 class="regionBtn"
                                 :label="region.regionName">{{region.regionName}}区
                </el-radio-button>
              </el-radio-group>
            </el-card>
            <div style="width: 100%;margin-top: 1rem">
              <el-row :gutter="20">
                <el-col :span="18" v-show="showCityInfo">
                  <el-card style="background-color:#ebb563;height: 20rem;text-align: left;color:white;font-size: 13px"
                           v-model="currentLocationInfo">
                    <div class="clearfix">
                      {{currentLocationInfo.locationName}}
                      <!--<span style="font-size: 20px">{{currentLocationInfo.locationLevel}}</span>-->
                    </div>
                    <div>近期平均房价</div>

                    <div>
                      <div style="height: 60px">
                  <span
                    style="font-size: 60px;">{{Math.round(currentLocationInfo.locationPrice) }}</span>
                        <span>&nbsp;&nbsp; 元/㎡</span>
                        <span class="line"></span>
                        <span style="float: right">
                     挂牌&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style="font-size: 60px;">{{Math.round(currentLocationInfo.locationSupply / 100) / 100}}</span>&nbsp;&nbsp;&nbsp;万套
                  </span>
                      </div>
                    </div>

                  </el-card>

                  <el-card style="height: auto;margin-top: 1rem;min-height: 20rem">
                    <el-select v-model="regionForData" placeholder="请选择区" multiple>
                      <el-option
                        label="全市"
                        key="全市"
                        value="无"
                      ></el-option>
                      <el-option
                        v-for="item in currentLocationInfo.regionsInfo"
                        :key="item.regionName"
                        :label="item.regionName"
                        :value="item.regionName">
                      </el-option>
                    </el-select>
                    <el-button type="info" @click="regionHistory">查询</el-button>
                    <div id="chartmainline" style="width:100%;height:500px"></div>
                    <div id="priceRateChart" style="width:100%;height:500px;margin-top: 2rem;"></div>
                    <div>
                      <div id="chart1"></div>
                      <div id="chart2"></div>
                    </div>


                  </el-card>
                </el-col>
                <el-col :span="18" v-show="!showCityInfo">
                  <el-card
                    style="background-color:#ebb563;height: 3.5rem;text-align: left;color:white;font-size: 22px;vertical-align: middle">
                    {{currentRegion}}区楼盘信息
                  </el-card>
                  <el-card class="buildingList" id="buildingBinding">
                    <div>
                      <div class="buildingItem" v-for="item in buildingsByRegion.buildings" :key="item.id"
                      >
                        <img class="buildImg"
                             style="background-color:#ebb563"
                             src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3934637875,3708288823&fm=26&gp=0.jpg"
                        />
                        <div class="buildContent" @click="itemDetail(item.id)">
                          <div>
                            <div class="buildName">{{item.xiaoqu}}</div>
                            <div class="resblock-location">
                              <span>{{item.region}}</span>
                              <i class="split">/</i>
                              <span>{{item.propertyaddress}}</span>
                            </div>
                            <div class="resblock-area">
                              <span>建面 {{Math.round(item.area)}}㎡</span>
                            </div>
                            <div class="resblock-tag">
                              <el-tag class="featureTag" v-for="(it,index) in item.projectfeatures.split(' ')"
                                      :key="index"
                                      type="warning">{{it}}
                              </el-tag>
                              <!--<span  v-for="(it,index) in item.projectfeatures.split(' ')" :key="index">-->
                              <!--{{it}}-->
                              <!--</span>-->

                            </div>
                            <div class="resblock-price">
                              <div class="main-price">

                                <span class="number">{{item.price}}</span>
                                <span class="desc">&nbsp;元/平(均价)</span>

                              </div>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="buildingsByRegion.pageNo"
                      :page-sizes="[5,10, 20, 30]"
                      :page-size="buildingsByRegion.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      class="buildingsPagincation"
                      :total="buildingsByRegion.totalRecord">
                    </el-pagination>
                  </el-card>
                </el-col>
                <el-col :span="6">
                  <el-card style="height:auto;">
                    <div slot="header" class="rightHeaderTitle" v-model="currentLocationInfo">
                      <span>{{currentLocationInfo.locationName}}市各区房价</span>

                      <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                    </div>
                    <el-row :gutter="1" class="left-title">


                      <el-col :span="8">
                        <div class="grid-content bg-purple">行政区</div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">房价(元/平方米)</div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple">供给量(套)</div>
                      </el-col>

                    </el-row>
                    <div v-for="item in currentLocationInfo.regionsInfo" :key="item.regionName" class="text item">
                      <el-row :gutter="1" class="left-item">

                        <el-col :span="8">
                          <div class="grid-content bg-purple item-name">{{item.regionName}}区</div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">{{Math.round(item.price) }}</div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple">{{Math.round(item.supply) }}</div>
                        </el-col>


                      </el-row>
                    </div>
                  </el-card>
                </el-col>

              </el-row>
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
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  import echarts from 'echarts'

  export default {
    name: 'priceAnalysis',
    data() {
      return {
        regionForData: [],
        options: [],
        //楼盘列表信息
        buildingsByRegion: {
          regionName: '',
          buildings: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 0,
          totalRecord: 0
        },
        showCityInfo: true,
        //当前区域基本信息
        currentLocationInfo: {
          locationName: '上海',
          locationPrice: 90898,
          locationSupply: 120123,
          locationLevel: '国际一流城市',
          proportion: {
            time: [],
            proportion: []
          },
          regionPriceByType: []
          ,
          regionsInfo: [],
          regionsInfo1: [],
          regionsInfo2: []

        },
        inputContent: '',
        //区域历史数据
        locationHistoryData: [],


        optionbar: {
          title: {
            text: 'ECharts 数据统计'
          },
          tooltip: {},
          legend: {
            data: ['用户来源']
          },
          xAxis: {
            data: ["Android", "IOS", "PC", "Ohter"]
          },
          yAxis: {},
          series: [{
            name: '访问量',
            type: 'bar', //设置图表主题
            data: [500, 200, 360, 100]
          }]
        },
        currentRegion: '苏州',
        currentUserInfo: "",
        activeIndex: '2'
      }
    }, components: {
      Loading,

    },
    computed: {},
    watch: {
      currentRegion: {

        handler(newVal, oldVal) {

          if (newVal != this.currentLocationInfo.locationName) {
            this.showCityInfo = false
            this.getBuildingsByRegion()
          } else {
            this.showCityInfo = true
          }
        }
      },

    },
    methods: {
      itemDetail(id) {
        console.log('asd')
        this.$router.push({
          path: '/priceAnalysis/buildDetail',
          query: {
            id: id
          }
        },)
      },
      getAllCities() {
        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('regionSelect')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/regioninfo/cityavg',
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.options = res.data.map(item => {
                return {value: item.cityName, label: item.cityName}
              })
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      handleSizeChange(val) {
        this.buildingsByRegion.pageSize = val
        console.log('pageSize', val)
        this.getBuildingsByRegion()

      },
      handleCurrentChange(val) {
        this.buildingsByRegion.pageNo = val
        console.log('currentpage', val)
        this.getBuildingsByRegion()
      },
      search() {
        if (this.inputContent != null) {
          this.getCurrentLocationData(this.inputContent)
          this.inputContent = ''
        }

      },

      getCurrentLocationData(cityName) {
        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('mainContent')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/citypriceInfo',
          data: {
            city: cityName,
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.currentLocationInfo.locationName = ''
              self.currentRegion = ''
              self.locationHistoryData = []
              self.currentLocationInfo.locationPrice = ''
              self.currentLocationInfo.locationLevel = ''
              self.currentLocationInfo.locationSupply = ''
              self.currentLocationInfo.locationName = res.data.cityName
              self.currentRegion = res.data.cityName
              self.currentLocationInfo.locationPrice = Math.round(res.data.cityAvgPrice)
              self.currentLocationInfo.locationLevel = res.data.cityLevel
              self.currentLocationInfo.locationSupply = res.data.citySupplyNum
              self.currentLocationInfo.proportion.time = []
              self.currentLocationInfo.proportion.proportion = []
              res.data.proportion.forEach(item => {
                self.currentLocationInfo.proportion.time.push(item.time)
                self.currentLocationInfo.proportion.proportion.push(item.proportion)
              })
              self.currentLocationInfo.regionsInfo = []
              self.currentLocationInfo.regionsInfo1 = []
              self.currentLocationInfo.regionsInfo = res.data.regionInfo
              self.currentLocationInfo.regionsInfo2 = []
              if (res.data.regionInfo.length < 16) {
                self.currentLocationInfo.regionsInfo1 = res.data.regionInfo
              }
              else {
                self.currentLocationInfo.regionsInfo1 = res.data.regionInfo.slice(0, 15)
                self.currentLocationInfo.regionsInfo2 = res.data.regionInfo.slice(15)
              }
              self.getCityHistoryData()
              self.getRegionPricesByType()
              self.showRoundChart()
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      initData() {
        this.$store.state.activeIndex = '/priceAnalysis'
        //到时候添加对路由跳转数据的判断


        if (sessionStorage.getItem('jwt') != null) {
          this.currentUserInfo = sessionStorage.getItem('username')

        }
        let cityName = sessionStorage.getItem('currentCity')
        if (this.$route.params.info && this.$route.params.info !== '') {
          this.$store.state.activeIndex = '/priceAnalysis'
          cityName = this.$route.params.info
        }

        if (cityName == null || cityName == '') {
          return
        }
        else {
          this.getCurrentLocationData(cityName)
          this.getAllCities()
        }
      },
      getCityHistoryData() {
        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('chartmainline')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/citypricehistory',
          data: {
            city: self.currentLocationInfo.locationName,
            citylevel: '无',
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              let temp = {
                cityName: '',
                historyData: {
                  time: [],
                  price: [],
                  proportion: []
                }
              }
              self.locationHistoryData = []
              temp.cityName = res.data.cityName

              res.data.priceHistory.forEach((item) => {
                temp.historyData.time.push(item.time)
                temp.historyData.price.push(item.price)
                temp.historyData.proportion.push(item.proportion)
              })
              self.locationHistoryData.push(temp)
              self.showLineChart()
              self.showPriceRateChart()

            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      regionHistory() {
        this.locationHistoryData = []
//        for(let i in this.regionForData){
//          this.getRegionHistoryData(this.regionForData[i])
//        }
        this.regionForData.forEach(item => {
          this.getRegionHistoryData(item)
        })

      },
      getRegionHistoryData(regionName) {
        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('chartmainline')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/citypricehistory',
          data: {
            city: self.currentLocationInfo.locationName,
            citylevel: regionName,
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              let temp = {
                cityName: '',
                historyData: {
                  time: [],
                  price: [],
                  proportion: []
                }
              }

              temp.cityName = res.data.cityName
              res.data.priceHistory.forEach((item) => {
                temp.historyData.time.push(item.time)
                temp.historyData.price.push(item.price)
                temp.historyData.proportion.push(item.proportion)
              })
              self.locationHistoryData.push(temp)
              self.showLineChart()
              self.showPriceRateChart()
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      getRegionPricesByType() {
        var self = this
        let loadingInstance1 = Loading.service({target: document.getElementById('chart1')});
        let loadingInstance2 = Loading.service({target: document.getElementById('chart2')});
        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/propertyType',
          data: {
            city: self.currentLocationInfo.locationName,
          },
          success: function (res) {
            loadingInstance1.close()
            loadingInstance2.close()
            if (res.code === 0) {
              self.currentLocationInfo.regionPriceByType = res.data
              self.showRadial()
            }
          },
          error: function () {
            loadingInstance1.close()
            loadingInstance2.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      showRoundChart() {
        let prices = this.currentLocationInfo.regionsInfo.map(function (d) {
          return d.price;
        })
        let regions = this.currentLocationInfo.regionsInfo.map(function (d) {
          return d.regionName;
        })
        let barHeight = 50;

        let option = {
          title: {
            text: this.currentLocationInfo.locationName + '各区房价',
            subtext: '数据源于 @GKD'
          },
//          legend: {
//            show: true,
//            data: ['价格范围', '均值']
//          },
          grid: {
            top: 100
          },
          angleAxis: {
            type: 'category',
            data: regions
          },
          tooltip: {
            show: true,
            formatter: function (params) {
              var id = params.dataIndex;
              return regions[id] + '<br>平均房价：' + prices[id];
            }
          },
          radiusAxis: {},
          polar: {},
          series: [{
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#ebb563'
              }
            },
            data: prices,
            coordinateSystem: 'polar',
            stack: '最大最小值',

          }],

        };
        let chart1 = echarts.init(document.getElementById('chart1'))
        chart1.setOption(option)
      },
      showRadial() {
        let option = {
          title: {
            text: this.currentLocationInfo.locationName + '各类型房型供给量',
            subtext: '数据源于 @GKD',
            bottom: '85%',
          },
          angleAxis: {
            type: 'category',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.regionName
            }),
            z: 10
          },
          radiusAxis: {},
          polar: {},
          series: [{
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[0].numPlan
            }),
            coordinateSystem: 'polar',
            name: '住宅',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[1].numPlan
            }),
            coordinateSystem: 'polar',
            name: '商业',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[2].numPlan
            }),
            coordinateSystem: 'polar',
            name: '写字楼',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[3].numPlan
            }),
            coordinateSystem: 'polar',
            name: '别墅',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[4].numPlan
            }),
            coordinateSystem: 'polar',
            name: '底商',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[5].numPlan
            }),
            coordinateSystem: 'polar',
            name: '酒店式公寓',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[6].numPlan
            }),
            coordinateSystem: 'polar',
            name: '公寓',
            stack: 'a'
          }, {
            type: 'bar',
            data: this.currentLocationInfo.regionPriceByType.map(function (item) {
              return item.info[7].numPlan
            }),
            coordinateSystem: 'polar',
            name: '商铺',
            stack: 'a'
          },],
          legend: {
            type: 'scroll',
            show: true,
            data: ['住宅', '商业', '写字楼', '别墅', '底商', '酒店式公寓', '公寓', '商铺']
          }
        };
        let chart2 = echarts.init(document.getElementById('chart2'))
        chart2.setOption(option)
      },
      getBuildingsByRegion() {
        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('buildingBinding')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/infodata/page',
          data: {
            city: self.currentLocationInfo.locationName,
            pageNo: self.buildingsByRegion.pageNo,
            pageSize: self.buildingsByRegion.pageSize,
            region: self.currentRegion
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              console.log(self.currentRegion)
              self.buildingsByRegion.regionpageNo = []
              self.buildingsByRegion.pageSize = []
              self.buildingsByRegion.totalPage = []
              self.buildingsByRegion.totalRecord = []
              self.buildingsByRegion.regionpageNo = res.data.pageNo
              self.buildingsByRegion.pageSize = res.data.pageSize
              self.buildingsByRegion.totalPage = res.data.totalPage
              self.buildingsByRegion.totalRecord = res.data.totalRecord
              self.buildingsByRegion.buildings = []
              self.buildingsByRegion.buildings = res.data.results
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })

      },
      showLineChart() {
        let datas = []
//        if(this.locationHistoryData.length==0)
//          return
        this.locationHistoryData.forEach(item1 => {
          let tempRegion = {
            data: item1.historyData.price.map(item => {
              return item
            }),
            type: 'line',
            smooth: true,
            name: item1.cityName
          }
          datas.push(tempRegion)
        })
        let option = {
          title: {
            text: this.currentLocationInfo.locationName + '房价趋势图',
            subtext: '数据源于 @GKD',
            bottom: '90%',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: this.locationHistoryData[0].historyData.time.map(item => {
              return item
            })
          },
          yAxis: {
            type: 'value'
          },
          dataZoom: [{
            startValue: this.locationHistoryData[0].historyData.time[0]
          }, {
            type: 'inside'
          }],
//          visualMap: {
//            top: -5,
//            right: 1,
//            pieces: [{
//              gt: 0,
//              lte: 10000,
//              color: '#096'
//            }, {
//              gt: 10000,
//              lte: 20000,
//              color: '#ffde33'
//            }, {
//              gt: 20000,
//              lte: 30000,
//              color: '#ff9933'
//            }, {
//              gt: 30000,
//              lte: 40000,
//              color: '#cc0033'
//            }, {
//              gt: 40000,
//              lte: 50000,
//              color: '#660099'
//            }, {
//              gt: 50000,
//              color: '#7e0023'
//            }],
//            outOfRange: {
//              color: '#999'
//            }
//          },
          series: datas
        };
        let chartmainline = echarts.init(document.getElementById('chartmainline'));
        chartmainline.setOption(option, true);

      },
      showPriceRateChart() {
        let datas = []
        this.locationHistoryData.forEach(item1 => {
          let tempRegion = {
            data: item1.historyData.proportion.map(item => {
              return item * 100
            }),
            type: 'line',
            smooth: false,
            name: item1.cityName
          }
          datas.push(tempRegion)
        })
        let option = {
          title: {
            text: this.currentLocationInfo.locationName + '房价变化速率折线图',

            bottom: '94%',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            name: '时间',
            data: this.locationHistoryData[0].historyData.time.map(item => {
              return item
            })
          },
          yAxis: {
            type: 'value',
            name: '百分比'
          },
          dataZoom: [{
            startValue: this.locationHistoryData[0].historyData.time[0]
          }, {
            type: 'inside'
          }],
//          visualMap: {
//            top: 10,
//            right: 10,
//            pieces: [{
//              gt: -5,
//              lte: 0,
//              color: '#096'
//            }, {
//              gt: 0,
//              lte: 5,
//              color: '#ffde33'
//            }, {
//              gt: 5,
//              lte: 10,
//              color: '#ff9933'
//            }, {
//              gt: 10,
//              lte: 15,
//              color: '#cc0033'
//            }, {
//              gt: 15,
//              lte: 20,
//              color: '#660099'
//            }, {
//              gt: 20,
//              color: '#7e0023'
//            }],
//            outOfRange: {
//              color: '#999'
//            }
//          },
          series: datas
        };
        let priceRateChart = echarts.init(document.getElementById('priceRateChart'));
        priceRateChart.setOption(option, true);
      }
    },
    mounted: function () {


      this.initData()
//      this.$nextTick(() => {
//
//
//        this.showRadial()
//      })

    }
  }
</script>

<style type="text/css" scoped>


  .mainContent {
    margin: 0 auto;

    padding-left: 1rem;
    padding-right: 1rem;
    width: 1180px;

    /*background-color: #0e90d2;*/
  }

  .regionSelect {
    width: 100%;
    margin-top: 1rem;
    overflow: hidden;
    overflow-x: scroll;
    text-align: left;
    /*background-color: #0000cc;*/
    height: auto;

  }

  #priceAnalysis .el-menu {
    width: 100%;
    box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    -moz-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 25px;
    -webkit-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    z-index: 2;
    text-align: center;
    position: absolute;
  }

  #priceAnalysis .el-menu {
    z-index: 4;
  }

  #priceAnalysis {
    text-align: center;
    flex: 1;
    overflow-y: scroll;
    z-index: 3;
  }

  .regionBtn {
    /*width:5rem;*/
    /*border:1px solid #2c2e3c;*/
    border-radius: 1rem;
    margin-top: 1rem;
    /*margin:1px;*/
  }

  #chart1 {
    margin-top: 2rem;
    height: 400px;
  }

  #chart2 {
    margin-top: 3rem;
    margin-bottom: 5rem;
    height: 500px;
  }

  #priceAnalysis .line {
    width: 1px;
    height: 60px;
    background-color: white;
    margin-left: 10rem;
  }

  .left-title {
    font-size: 10px;
    margin-bottom: 10px;
    color: gray;
    text-align: center;

  }

  #priceAnalysis .logo {
    display: inline-block;
    float: left;
    vertical-align: middle;
    color: #fff;
    margin-left: 8%;
  }

  #priceAnalysis .logoTitle {
    font-size: 35px;
    padding-top: 5px;
    display: inline-block;
    font-weight: 500;
  }

  #priceAnalysis .subTitle {
    font-size: 10px;
    display: inline-block;
  }

  .left-item {
    text-align: center;
    margin-bottom: 10px;
    font-size: 10px;
  }

  .item-name {
    color: #003bb3;
  }

  #priceAnalysis .clearfix {
    font-size: 40px;
    margin-left: 1rem;
    margin-bottom: 8rem;

    font-weight: 700;
  }

  #priceAnalysis .rightHeaderTitle {
    /*float: left;*/
    /*margin-left: 1rem;*/
    /*padding-bottom: 1rem;*/

    font-weight: 700;
  }

  #priceAnalysis .buildingList {
    width: 100%;
    height: auto;
  }

  #priceAnalysis .buildingItem {
    text-align: left;
    display: inline-block;
    width: 100%;
    /*height: 2rem;*/
    margin-bottom: 40px;
  }

  #priceAnalysis .buildImg {
    width: 18rem;
    height: 11rem;
    display: inline-block;

  }

  #priceAnalysis .buildContent {

    display: inline-block;
    margin-left: 1rem;
    cursor: pointer;
    height: 10rem;
    width: 25rem;
  }

  #priceAnalysis .buildName {
    cursor: pointer;
    display: inline-block;
    max-width: 75%;
    font-size: 20px;
    line-height: 20px;
    vertical-align: middle;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  #priceAnalysis .resblock-location {
    margin-top: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666
  }

  #priceAnalysis .split {

    margin: 0 8px;
    font-size: 14px;
    color: #ccc;
  }

  #priceAnalysis .resblock-area {
    height: 16px;
    color: #666;
    margin-top: 16px;
  }

  #priceAnalysis .resblock-tag {
    margin-top: 18px;
  }

  #priceAnalysis .resblock-price {
    position: relative;

    right: 0;
  }

  #priceAnalysis .number {
    font-family: Tahoma-Bold;
    font-size: 28px;
    line-height: 28px;
    color: red;
    vertical-align: bottom;
  }

  #priceAnalysis .desc {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #d44d38;
    vertical-align: bottom;
  }

  #priceAnalysis .resblock-tag span {

    display: inline-block;
    height: 30px;
    margin-right: 10px;
    padding: 0 12px;
    line-height: 30px;
    font-size: 12px;
    /*color: #849aae;*/
    /*background: rgba(132, 154, 174, .1)*/
  }

  #priceAnalysis {
    -webkit-font-smoothing: antialiased;
  }

  #priceAnalysis .buildingsPagincation {
    height: 2rem;
  }

  #priceAnalysis .top-btn {
    float: right;
  }

  #priceAnalysis .account-admin {
    line-height: 60px;
    float: right;
    margin-right: 20px;
  }

  #priceAnalysis .el-select-dropdown {
    min-width: 300px;
    max-width: 320px;
  }


</style>
