<template>
  <div class="sub-route">
    <section class="app-section" id="priceForecast">
      <!--<el-menu-->
      <!--:default-active="$store.state.activeIndex"-->
      <!--class="el-menu"-->
      <!--mode="horizontal"-->
      <!--background-color="#00ae66"-->
      <!--text-color="#fff"-->
      <!--active-text-color="#fff">-->
      <!--<div class="logo">-->
      <!--<div class="logoTitle">GKD</div>-->
      <!--<div class="subTitle">搞得快一点</div>-->
      <!--</div>-->
      <!--<span class="CurrentLocation el-icon-location-outline">{{currentLocation}}</span>-->
      <!--<el-menu-item index="1" @click="go('1')">-->
      <!--主页-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="2" @click="go('2')">房价统计</el-menu-item>-->
      <!--<el-menu-item index="3">房价预测</el-menu-item>-->


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
      <!--<div @click="logout()">退出登录</div>-->
      <!--</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--</span>-->
      <!--</div>-->
      <!--&lt;!&ndash;<el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="currentUserInfo!=''">&ndash;&gt;-->
      <!--&lt;!&ndash;<router-link to="">用户中心</router-link>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-menu-item>&ndash;&gt;-->
      <!--<el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="currentUserInfo==''">-->
      <!--<router-link to="/signin">注册</router-link>-->
      <!--</el-menu-item>-->
      <!--<el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="currentUserInfo==''">-->
      <!--<router-link to="/login">登陆</router-link>-->
      <!--</el-menu-item>-->
      <!--</el-menu>-->
      <footer class="main-page-footer">
        CopyRight &copy; 2019 GKD
      </footer>

    </section>
  </div>
</template>
<script>
  import {Loading} from 'element-ui'

  export default {
    name: 'priceForecast',
    data: function () {
      return {
        currentUserInfo: '',
        currentLocation: '',
      }
    },
    methods: {
      initData() {
        this.currentUserInfo = sessionStorage.getItem('userName')
        this.currentLocation = sessionStorage.getItem('currentCity')
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
  #priceForecast {
    text-align: center;
    height: 100%;
    z-index: 3;
  }

  #priceForecast .el-menu {
    width: 100%;
    box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    -moz-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 25px;
    -webkit-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    z-index: 2;
    text-align: center;
    position: absolute;
  }
</style>
