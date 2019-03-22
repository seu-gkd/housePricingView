<template>
  <div class="sub-route">
    <section class="app-section" id="priceForecast">
      <div style="width:100%;height: 100%;">
        <div class="mainContent">

          <el-card class="regionSelect" id="regionSelect">
            <el-cascader
              placeholder="区域选择"
              :options="options"
              filterable
              change-on-select
              v-model="region"

            ></el-cascader>
            <el-button type="warning" @click="search" round>查询并添加</el-button>
            <div class="selectRegions">
              <el-tag
                type="warning"
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
            </div>
          </el-card>
          <el-card class="chartView" id="chartView">
            <div id="preChartLiMeng"></div>
            <div id="historyPriceChart"></div>
            <div id="historyPriceRateChart"></div>
          </el-card>

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
  import echarts from 'echarts'

  export default {
    name: 'priceForecast',
    data: function () {
      return {
        dynamicTags: [],
        props: {
          value: 'label',
          children: 'cities'
        },
        currentUserInfo: '',
        currentLocation: '',
        region: '',
        options: [],
        priceHistory: [],
        priceHistoryLiMeng: []
      }
    },
    methods: {
      //搜索并添加区域折线
      search() {
        let tagName = this.region.join('-')
        if (this.dynamicTags.indexOf(tagName) < 0) {
          this.dynamicTags.push(tagName)
          this.getPreDataByLiMeng(tagName)
//          this.getHistoryData(tagName)
        }

      },
      //删除折线操作
      handleClose(tag) {
        let index = this.dynamicTags.indexOf(tag)
        if (index > -1)
          this.dynamicTags.splice(index, 1)
        this.delLine(tag)
      },
      getPreDataByLiMeng(tag) {
        let data = this.handletag(tag)
        let self = this
        let loadingInstance = Loading.service({target: document.getElementById('chartView')});
        jQuery.ajax({
          type: 'GET',
//          dataType:"jsonp",
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: 'http://47.101.44.55:5000/tsa/' + encodeURIComponent(data.province + '&' + data.city + '&' + data.citylevel),
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
          data: {},
          success: function (res) {
            res = JSON.parse(res)
            console.log(res)

            loadingInstance.close()
            if (res.code === 0) {
              let temp = {
                tagName: tag,
                priceList: {
                  time: [],
                  price: [],
//                  proportion: []
                }
              }
//              if (res.data.priceHistory.length < 111) {
//                for (let i = 0; i < (111 - res.data.priceHistory.length); i++) {
//                  temp.priceList.price.push('')
////                  temp.priceList.proportion.push('')
//                }

//              }
              res.data.priceHistory.forEach((item) => {
                temp.priceList.time.push(item.time)
                temp.priceList.price.push(item.price.price)
//                temp.priceList.proportion.push(item.proportion)
              })

              self.priceHistory.push(temp)
//              self.getPredictData(tag, self)
//              self.showHistoryPriceChart()
//              self.showHistoryPriceRateChart()
              self.showHistoryPriceChart()
//              self.showHistoryPriceRateChart()
            }
            else {
              self.$message.error(res.msg)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('网络错误，请重试')
          }
        })
      },
      showPreLiMeng() {

        let myChart = echarts.init(document.getElementById('preChartLiMeng'));
        myChart.setOption(option = {
          title: {
            text: 'Confidence Band',
            subtext: 'Example in MetricsGraphics.js',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                backgroundColor: '#ccc',
                borderColor: '#aaa',
                borderWidth: 1,
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                textStyle: {
                  color: '#222'
                }
              }
            },
            formatter: function (params) {
              return params[2].name + '<br />' + params[2].value;
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: data.map(function (item) {
              return item.date;
            }),
            axisLabel: {
              formatter: function (value, idx) {
                var date = new Date(value);
                return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
              }
            },
            splitLine: {
              show: false
            },
            boundaryGap: false
          },
          yAxis: {
            axisLabel: {
              formatter: function (val) {
                return (val - base) * 100 + '%';
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return ((params.value - base) * 100).toFixed(1) + '%';
                }
              }
            },
            splitNumber: 3,
            splitLine: {
              show: false
            }
          },
          series: [{
            name: 'L',
            type: 'line',
            data: data.map(function (item) {
              return item.l + base;
            }),
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            stack: 'confidence-band',
            symbol: 'none'
          }, {
            name: 'U',
            type: 'line',
            data: data.map(function (item) {
              return item.u - item.l;
            }),
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: '#rrr'
              }
            },
            stack: 'confidence-band',
            symbol: 'none'
          }, {
            type: 'line',
            data: data.map(function (item) {
              return item.value + base;
            }),
            hoverAnimation: false,
            symbolSize: 4,
            itemStyle: {
              normal: {
                color: '#c2'
              }
            },
            showSymbol: false
          }]
        });
      },
      //初始化页面基本数据
      initData() {
        this.$store.state.activeIndex = '/priceForecast'
        this.currentUserInfo = sessionStorage.getItem('userName')
        this.currentLocation = sessionStorage.getItem('currentCity')
        this.getDictData()
      },
      //登出操作
      logout() {
        let self = this
        let loadingInstance = Loading.service({fullscreen: true});
        jQuery.ajax({
          type: 'GET',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/PersonUser/personUser/logout',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
          data: {},
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              sessionStorage.setItem('jwt', '')
              sessionStorage.setItem('username', '')
              self.currentUserInfo = ''
              self.$message.success('已退出')
              self.$router.replace('/')
              self.$router.go(0)
            } else {
              self.$message.error(res.msg)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('网络错误，请重试')
          }
        })
      },
      //获取省市区字典表函数
      getDictData() {
        let self = this
        let loadingInstance = Loading.service({target: document.getElementById('regionSelect')});
        jQuery.ajax({
          type: 'GET',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/buildingPrice/countrypcr/countryInfo',
          data: {},
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.options = res.data;
            } else {
              self.$message.error(res.msg)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('网络错误，请重试')
          }
        })
      },
      //删除某一折线操作
      delLine(tag) {
        this.priceHistory.forEach(item => {
          if (item.tagName == tag) {
            let index = this.priceHistory.indexOf(item)
            this.priceHistory.splice(index, 1)
          }
        })
        console.log(this.priceHistory.length)
        this.showHistoryPriceChart()
        this.showHistoryPriceRateChart()
      },
      //tag数据处理
      handletag(tag) {
        let info = tag.split('-')
        let len = info.length
        let data = {}
        if (len == 1)
          data = {
            province: info[0],
            city: '无',
            citylevel: '无'
          }
        if (len == 2)
          data = {
            province: info[0],
            city: info[1],
            citylevel: '无'
          }
        if (len == 3)
          data = {
            province: info[0],
            city: info[1],
            citylevel: info[2]
          }
        return data
      },
      //获取历史价格和增长率数据
      getHistoryData(tag) {

        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('chartView')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/citypricehistory',
          data: this.handletag(tag),
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              let temp = {
                tagName: tag,
                priceList: {
                  time: [],
                  price: [],
                  proportion: []
                }
              }
              if (res.data.priceHistory.length < 111) {
                for (let i = 0; i < (111 - res.data.priceHistory.length); i++) {
                  temp.priceList.price.push('')
                  temp.priceList.proportion.push('')
                }

              }
              res.data.priceHistory.forEach((item) => {
                temp.priceList.time.push(item.time)
                temp.priceList.price.push(item.price)
                temp.priceList.proportion.push(item.proportion)
              })

              self.priceHistory.push(temp)
              self.getPredictData(tag, self)
//              self.showHistoryPriceChart()
//              self.showHistoryPriceRateChart()
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      //获取未来一个月的预测价格
      getPredictData(tag, self) {
//        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('chartView')});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/pricehistorynew/predicate',
          data: this.handletag(tag),
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.priceHistory.forEach(item => {
                if (item.tagName === tag) {

                  item.priceList.time.push(res.data.time)
                  item.priceList.price.push(res.data.hispre)
                  item.priceList.proportion.push(res.data.proportion)
                }
              })
              console.log(self.priceHistory)
              self.showHistoryPriceChart()
              self.showHistoryPriceRateChart()
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      //展示历史加个数据图表
      showHistoryPriceChart() {
        let datas = []
        this.priceHistory.forEach(item1 => {
          let tempRegion = {
            data: item1.priceList.price.map(item => {
              return item
            }),
            type: 'line',
            smooth: true,
            name: item1.tagName,
            markArea: {
              data: []
            }
          }
          datas.push(tempRegion)
          let marker = [{
            name: '预测数据',
            xAxis: '2019-03'
          }, {
            xAxis: '2028-11'
          }]
          datas[0].markArea.data.push(marker)
        })
        let option = {
          title: {
            text: '房价趋势预测图',
            subtext: '数据源于 @GKD',
            bottom: '90%',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: this.priceHistory[0].priceList.time.map(item => {
              return item
            })
          },
          yAxis: {
            type: 'value'
          },
          dataZoom: [{
            startValue: this.priceHistory[0].priceList.time[0]
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
        let historyPriceChart = echarts.init(document.getElementById('historyPriceChart'));
        historyPriceChart.setOption(option, true);
      },
      //展示历史价格增长率图表
      showHistoryPriceRateChart() {
        let datas = []
        this.priceHistory.forEach(item1 => {
          let tempRegion = {
            data: item1.priceList.proportion.map(item => {
              return item * 100
            }),
            type: 'line',
            smooth: true,
            name: item1.tagName,
            markArea: {
              data: []
            }
          }
          datas.push(tempRegion)
          let marker = [{
            name: '预测数据',
            xAxis: '2019-03'
          }, {
            xAxis: '2019-04'
          }]
          datas[0].markArea.data.push(marker)
        })
        let option = {
          title: {
            text: '房价变化速率预测折线图',

            bottom: '94%',
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            name: '时间',
            data: this.priceHistory[0].priceList.time.map(item => {
              return item
            })
          },
          yAxis: {
            type: 'value',
            name: '百分比'
          },
          dataZoom: [{
            startValue: this.priceHistory[0].priceList.time[0]
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
        let historyPriceRateChart = echarts.init(document.getElementById('historyPriceRateChart'));
        historyPriceRateChart.setOption(option, true);
      },

    },
    mounted: function () {
      this.initData()
    }
  }
</script>
<style scoped>
  #priceForecast {
    text-align: center;
    height: 100%;
    z-index: 3;
    flex: 1;
    overflow: scroll;
  }

  /*#priceForecast .el-menu {*/
  /*width: 100%;*/
  /*box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;*/
  /*-moz-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 25px;*/
  /*-webkit-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;*/
  /*z-index: 2;*/
  /*text-align: center;*/
  /*position: absolute;*/
  /*}*/

  #priceForecast .mainContent {
    margin: 0 auto;
    /*height: 100%;*/
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 65px;
    width: 80%;
  }

  #priceForecast .regionSelect {
    width: 100%;
    text-align: center;
    height: auto;
  }

  #priceForecast .chartView {
    margin-top: 5px;
    width: 100%;
    flex: 1;
  }

  #historyPriceChart {
    width: 100%;
    height: 600px;
  }

  #historyPriceRateChart {
    width: 100%;
    height: 600px;
  }

  #priceForecast .selectRegions {
    text-align: left;
    margin-top: 2rem;

  }

  #priceForecast .el-tag + .el-tag {
    margin-left: 10px;
  }

  .el-cascader-menu__item.is-active {
    color: #ebb563;
  }
</style>
