<template>
  <div class="sub-route">

    <section class="app-section" id="userManage">

      <div style="text-align:center;width:100%;margin-top:65px;flex:1;overflow-y: scroll">

        <el-card class="mainContent">


          <el-tabs v-model="activeTab" type="border" tab-position="left" style="margin-top: 1.5rem">
            <el-tab-pane disabled style="margin-bottom: 20px">
              <span slot="label" style="height: 50px;color:black">


                <div class="userName">{{this.$store.state.currentUserInfo}}</div>

                </span>
            </el-tab-pane>
            <el-tab-pane name="1">
              <span slot="label"><i class="el-icon-star-off"></i> 我的收藏</span>
              <el-card>
                <div slot="header">共<span style="color:darkred">{{totalRecord}}</span> 套关注房源</div>
                <div class="buildingList" id="buildingBinding">
                  <div>
                    <div class="buildingItem" v-for="item in userCollection" :key="item.id"
                         @click="itemDetail(item.id)">
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
                            <!--<span v-for="(it,index) in item.projectFeatures.split(' ')" :key="index">-->
                            <!--{{it}}-->
                            <!--</span>-->
                            <el-tag class="featureTag" v-for="(it,index) in item.projectFeatures.split(' ')"
                                    :key="index"
                                    type="warning">{{it}}
                            </el-tag>
                          </div>
                          <div class="resblock-price">
                            <div class="main-price">

                              <span class="number1">{{item.price}}</span>
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
                    :current-page="pageNo"
                    :page-sizes="[5,10, 20, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    class="buildingsPagincation"
                    :total="totalRecord">
                  </el-pagination>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class=""></i> 我的资料</span>
              <div></div>
            </el-tab-pane>

          </el-tabs>
        </el-card>
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
  <!--<div style="width: 100%;height: 100%;">dfasdfgsdfgsdfasea dsfasdfs</div>-->
</template>
<script>
  import {Loading} from 'element-ui'

  export default {
    name: 'userManage',
    data: function () {
      return {
        activeTab: '1',
        activeIndex: '1',
        currentUserInfo: '',
        currentLocation: '',
        userCollection: [],
        pageNo: '',
        pageSize: '',
        totalRecord: ''
      }
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
      initData() {
        this.$store.state.activeIndex = '4'
        this.currentUserInfo = sessionStorage.getItem('userName')
        this.currentLocation = sessionStorage.getItem('currentCity')
        this.getUserCollection()
      },
      getUserCollection() {
        let self = this
        let loadingInstance = Loading.service({fullscreen: true});
        jQuery.ajax({
          type: 'GET',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/PersonUser/userBuilding/userhistory',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
          data: {
            token: sessionStorage.getItem('jwt')
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.userCollection = res.data.results
              self.pageNo = res.data.pageNo
              self.pageSize = res.data.pageSize
              self.totalRecord = res.data.totalRecord
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
    },
    mounted: function () {
      this.initData()
    }
  }
</script>
<style>
  #userManage {
    text-align: center;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    z-index: 3;

  }

  #userManage .mainContent {
    margin: 0 auto;
    text-align: left;
    /*height: 100%;*/
    padding-left: 1rem;
    padding-right: 1rem;
    width: 80%;
    border-radius: 10px;

    /*overflow-y: scroll;*/
    flex: 1;
    background-color: white;
  }

  #userManage .menuItem {
    text-align: center;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #666666;
  }

  #userManage .usetInfoTitle {
    background-color: #ebb563;
    color: white;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    height: auto;
  }

  #userManage .el-menu-vertical {
    width: 100%;
  }

  /*#userManage .el-menu {*/
  /*width: 100%;*/
  /*box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;*/
  /*-moz-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 25px;*/
  /*-webkit-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;*/
  /*z-index: 2;*/
  /*text-align: center;*/
  /*position: absolute;*/
  /*}*/

  #userManage .buildingList {
    width: 100%;
    height: inherit;
    overflow-y: scroll;
  }

  #userManage .buildingItem {
    text-align: left;
    display: inline-block;
    width: 100%;
    /*height: 2rem;*/
    margin-bottom: 40px;
  }

  #userManage .buildImg {
    width: 18rem;
    height: 11rem;
    display: inline-block;

  }

  #userManage .buildContent {

    display: inline-block;
    margin-left: 1rem;
    cursor: pointer;
    height: 10rem;
    width: 25rem;
  }

  #userManage .buildName {
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

  #userManage .resblock-location {
    margin-top: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666
  }

  #userManage .split {

    margin: 0 8px;
    font-size: 14px;
    color: #ccc;
  }

  #userManage .resblock-area {
    height: 16px;
    color: #666;
    margin-top: 16px;
  }

  #userManage .resblock-tag {
    margin-top: 18px;
  }

  #userManage .resblock-price {
    position: relative;

    right: 0;
  }

  #userManage .number1 {
    font-family: Tahoma-Bold;
    font-size: 28px;
    line-height: 28px;
    color: red;
    vertical-align: bottom;
  }

  #userManage .desc {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #d44d38;
    vertical-align: bottom;
  }

  #userManage .resblock-tag span {

    display: inline-block;
    height: 30px;

    margin-right: 10px;
    padding: 0 12px;
    line-height: 30px;
    font-size: 12px;
    /*color: #849aae;*/
    /*background: rgba(132, 154, 174, .1)*/
  }

  #userManage .buildingsPagincation {
    height: 30px;
  }

  #userManage .el-tabs__item.is-active {
    color: #ebb563;
  }
</style>
