<template>
  <div class="sub-route">

    <section class="app-section" id="buildDetail">
      <div style="width:100%;height: 100%;">
        <div class="mainContent">

          <el-card style="margin:0 auto;width:100%;text-align: center" body-style="padding:0px">
            <div class="buildTitle">{{buildInfo.xiaoqu}}
              <el-tag class="colTag" type="warning">访问量：{{parseInt(coll.browsenum)}}次</el-tag>
              <el-tag class="colTag" type="warning">收藏量：{{parseInt(coll.collectnum)}}次</el-tag>
              <!--<span class="col">关注量：<span>{{parseInt(coll.collectnum)}}</span>次</span>-->
              <!--<span class="col">访问量: <span>{{parseInt(coll.browsenum)}}</span>人</span>-->
            </div>
            <div class="region">{{buildInfo.city}}-{{buildInfo.region}}</div>
            <el-carousel style="width:100%" height="500px" :interval="5000" loop>
              <el-carousel-item v-for="item in picList" :key="item">

                <img style="width:100%;height:100%"

                     :src="'https://ke-image.ljcdn.com/'+item.pic+'!m_fill,w_1000,l_fbk'"
                />

              </el-carousel-item>
            </el-carousel>
          </el-card>
          <el-card class="buildInfoCard">

            <div style="color:#fe615b">
              <span class="price">{{buildInfo.price}}</span> 元/平米(均价)
              <span>
                </span>
              <span class="subscribe" @click="handleCollect">
                <div style="background-size: 100%" :class="!isCollected?'icon':'icon2'"></div>
                <div>{{!isCollected ? '关注' : '取消关注'}}</div>
              </span>
            </div>
            <div class="resblock-tag">
              <el-tag class="featureTag" v-for="(it,index) in buildInfo.projectfeatures.split(' ')" :key="index"
                      type="warning">{{it}}
              </el-tag>
              <!--<span class="tagItem" v-for="(it,index) in buildInfo.projectfeatures.split(' ')" :key="index">-->
              <!--{{it}}-->
              <!--</span>-->

            </div>
            <div class="line"></div>
            <div class="infoType">基本信息</div>
            <div class="detailInfo">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="infoItem">
                    <span class="label">物业类型：</span>
                    <span class="val">{{buildInfo.propertytype}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">楼盘地址：</span>
                    <span class="val">{{buildInfo.propertyaddress}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">售楼处地址：</span>
                    <span class="val">{{buildInfo.salesofficeaddress}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">开发商：</span>
                    <span class="val">{{buildInfo.developer}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">区域位置：</span>
                    <span class="val">{{buildInfo.regionallocation}}</span>
                  </div>

                </el-col>
                <el-col :span="12">

                  <div class="infoItem">
                    <span class="label">参考价格：</span>
                    <span class="val">{{buildInfo.referenceprice}}</span>
                  </div>

                </el-col>
              </el-row>
            </div>
            <div class="infoType">规划信息</div>
            <div class="detailInfo">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="infoItem">
                    <span class="label">建筑类型：</span>
                    <span class="val">{{buildInfo.buildingtype}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">占地面积：</span>
                    <span class="val">{{buildInfo.sitearea}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">建筑面积：</span>
                    <span class="val">{{buildInfo.buildingarea}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">规划户数：</span>
                    <span class="val">{{buildInfo.numplan}}</span>
                  </div>

                  <div class="infoItem">
                    <span class="label">产权年限：</span>
                    <span class="val">{{buildInfo.yearofpropertyrights}}</span>
                  </div>


                </el-col>
                <el-col :span="12">
                  <div class="infoItem">
                    <span class="label">容积率：</span>
                    <span class="val">{{buildInfo.floorarearatio}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">绿化率：</span>
                    <span class="val">{{buildInfo.landscapingratio}}</span>
                  </div>


                </el-col>
              </el-row>
            </div>
            <div class="infoType">配套信息</div>
            <div class="detailInfo">
              <el-row :gutter="20">
                <el-col :span="12">
                  <div class="infoItem">
                    <span class="label">物业公司：</span>
                    <span class="val">{{buildInfo.propertycompany}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">物业费：</span>
                    <span class="val">{{buildInfo.propertycosts}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">供水方式：</span>
                    <span class="val">{{buildInfo.watersupplymethod}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">车位：</span>
                    <span class="val">{{buildInfo.parkingspace}}</span>
                  </div>


                </el-col>
                <el-col :span="12">
                  <div class="infoItem">
                    <span class="label">车位配比：</span>
                    <span class="val">{{buildInfo.parkingratio}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">供暖方式：</span>
                    <span class="val">{{buildInfo.heatingmethod}}</span>
                  </div>
                  <div class="infoItem">
                    <span class="label">供电方式：</span>
                    <span class="val">{{buildInfo.powersupply}}</span>
                  </div>

                </el-col>
              </el-row>
            </div>

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
    name: 'buildDetail',
    data: function () {
      return {
        picList: {
          pic: ''
        },
        coll: {
          xiaoquid: '',
          collectnum: '',
          browsenum: ''
        },
        buildInfo: {
          date: "20190301135132",
          city: "上海",
          region: "长宁",
          xiaoqu: "古北ONE",
          price: "100000",
          total: "总价1220万/套起",
          url: "https://sh.fang.ke.com/loupan/p_gbobjcno/xiangqing",
          propertytype: "住宅",
          referenceprice: "100000元/平",
          projectfeatures: "绿化率高 近地铁 低密度 车位充足 人车分流",
          regionallocation: "上海-长宁",
          propertyaddress: "荣华东道110号",
          salesofficeaddress: "荣华东道110号（接待时间 10:00 - 18:00）",
          developer: "上海英高置业有限公司",
          buildingtype: "板楼",
          landscapingratio: "30%",
          sitearea: "4，315㎡",
          floorarearatio: "3.38",
          buildingarea: "14，602㎡",
          yearofpropertyrights: "70年",
          numplan: "102",
          designtype: " ",
          propertycompany: "第一太平戴维斯",
          parkingratio: "1:0.8",
          propertycosts: "10元/m²/月",
          heatingmethod: "自采暖",
          watersupplymethod: "民水",
          powersupply: "民电",
          parkingspace: "地下车位数80",
          nearby: " ",
          area: "127.33333333333333",
          id: "44617"
        },
        isCollected: true
      }
    },
    methods: {
      getUserIsCollected() {
        let jwt = sessionStorage.getItem('jwt')
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/PersonUser/userBuilding/info',
          data: {
            token: jwt,
            buildingid: self.buildInfo.id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              if (res.data == null || res.data == '') {
                self.isCollected = false
              } else {
                self.isCollected = true
              }
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
      //处理点击收藏或者取消收藏操作
      handleCollect() {
        if (this.isCollected)
          this.cancelCollect()
        else
          this.collectBuilding()

      },
      //取消收藏
      cancelCollect() {
        let jwt = sessionStorage.getItem('jwt')
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/PersonUser/userBuilding/delete',
          data: {
            token: jwt,
            buildId: self.buildInfo.id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.isCollected = false
              self.$message.success('取消成功')
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
      //初始化楼盘数据
      initData() {
        let id = ''
        if (this.$route.query.id && this.$route.query.id !== '') {
          id = this.$route.query.id
        }
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/infodata/info',
          data: {
            id: id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.buildInfo = res.data.buildInfo
              self.coll = res.data.coll
              self.picList = res.data.picList;
              self.getUserIsCollected()
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
      //收藏该楼盘
      collectBuilding() {
        let jwt = sessionStorage.getItem('jwt')
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'post',
          url: this.$store.state.Server + '/PersonUser/userBuilding/collect',
          data: {
            token: jwt,
            buildId: self.buildInfo.id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.isCollected = true
              self.$message.success('收藏成功')
              self.getUserIsCollected()
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('操作错误,请稍后重试')
          }
        })
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>
<style>
  #buildDetail {
    text-align: center;
    height: 100%;
    z-index: 4;
    flex: 1;
    overflow-y: scroll;
  }

  #buildDetail .mainContent {
    margin: 0 auto;
    /*height: 100%;*/
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    padding-top: 75px;
    width: 70%;
  }

  #buildDetail .buildInfoCard {
    margin: 0 auto;
    margin-top: 15px;
    width: 100%;
  }

  #buildDetail .buildTitle {
    margin: 0 auto;
    margin-top: 15px;
    margin-left: 20px;
    text-align: left;
    font-size: 26px;
    font-weight: 600;
    color: #101d37;

  }

  #buildDetail .buildInfoCard {
    text-align: left;
  }

  #buildDetail .price {
    margin-left: 10px;
    font-size: 40px;
    font-family: Tahoma-Bold;
  }

  #buildDetail .subscribe {
    color: #101d37;
    float: right;
    margin-right: 5px;
    text-align: center;
    cursor: pointer;
  }

  #buildDetail .subscribe .collectAlt {
    color: #fe615b;
  }

  #buildDetail .subscribe .icon {
    margin: 0 auto;
    height: 20px;
    width: 20px;
    background: url(../images/toCollect.png) no-repeat;
  }

  #buildDetail .subscribe .icon2 {
    margin: 0 auto;
    height: 20px;
    width: 20px;
    background: url(../images/collected.png) no-repeat;
  }

  #buildDetail .resblock-tag {
    margin-top: 18px;
    margin-bottom: 60px;
  }

  #buildDetail .tagItem {
    padding: 6px 8px;
    font-size: 13px;
    text-align: center;
    margin-left: 10px;

    border-radius: 2px;
    color: #849aad;
    background: rgba(132, 154, 174, .15);
  }

  #buildDetail .line {
    margin: 0 auto;
    width: 98%;
    height: 1px;
    background-color: #e4e6f0;
  }

  #buildDetail .label {
    width: 70px;
    font-family: HiraginoSansGB-W6;
    font-size: 14px;
    color: #9399a5;
  }

  #buildDetail .val {
    font-family: HiraginoSansGB-W6;
    font-size: 14px;
  }

  #buildDetail .infoItem {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  #buildDetail .infoType {
    margin-top: 10px;
  }

  #buildDetail .region {
    margin-left: 20px;
    float: left;
    margin-bottom: 20px;
    font-size: 13px;
    color: #9399a5;
  }

  #buildDetail .col {
    margin-right: 20px;
    float: right;
    font-size: 13px;
    color: #9399a5;
  }

  #buildDetail .col span {
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
    color: black;
  }

  #buildDetail .colTag {
    float: right;
    margin-right: 20px;
  }

  #buildDetail .featureTag {
    float: left;
    margin-left: 10px;
  }
</style>
