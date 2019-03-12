<template>
  <div>
    <el-menu
      :default-active="$store.state.activeIndex"
      class="el-menu"
      mode="horizontal"

      text-color="#fff"
      active-text-color="#fff">
      <div class="logo">
        <img class="logoImg" :src="require('./components/images/logo2.png')"/>
        <!--<div class="logoTitle">GKD</div>-->
        <!--<div class="subTitle">搞得快一点</div>-->
      </div>
      <span class="CurrentLocation el-icon-location-outline">{{this.$store.state.currentLocation}}</span>
      <el-menu-item index="1" @click="go('1')">
        主页
      </el-menu-item>
      <el-menu-item index="2" @click="go('2')">房价统计</el-menu-item>
      <el-menu-item index="3" @click="go('3')">房价预测</el-menu-item>


      <div class="account-admin" v-if="this.$store.state.isLogin=='true'">
        <span class="top-btn">
              <el-dropdown style="cursor:pointer;" :show-timeout="0">
                <span class="el-dropdown-link" style="color:#fff;">
                  {{this.$store.state.currentUserInfo}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding:5px 10px;">
              <div style="font-size:14px;">
                {{this.$store.state.currentUserInfo}}
                <el-tooltip class="item" effect="dark" :content="'最后登录于 ' " placement="top-end">
                  <i class="fa fa-clock-o" aria-hidden="true" style="margin-left:8px;color:#aaa;cursor:pointer;"></i>
                </el-tooltip>
              </div>
            </div>
            <!--<el-dropdown-item divided>-->
            <!--<div @click="toPath('changePass')">修改密码</div>-->
            <!--</el-dropdown-item>-->
             <el-dropdown-item>
          <div>用户中心</div>
        </el-dropdown-item>
            <el-dropdown-item>
              <div @click="logout()">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          </span>
      </div>
      <!--<el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="currentUserInfo!=''">-->
      <!--<router-link to="">用户中心</router-link>-->
      <!--</el-menu-item>-->
      <el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="this.$store.state.isLogin=='false'">
        <router-link to="/signin" style="text-decoration: none">注册</router-link>
      </el-menu-item>
      <el-menu-item style="float: right;margin-right: 3rem;" index="4" v-if="this.$store.state.isLogin=='false'">
        <router-link style="text-decoration: none" to="/login">登陆</router-link>
      </el-menu-item>
    </el-menu>
    <div id="app">

      <router-view/>
    </div>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'

  export default {
    name: 'app',
    data: function () {

    },
    compoments: {
      Loading
    }
  }
</script>

<style>
  #app {
    font-family: '微软雅黑', Helvetica, Arial, sans-serif;
    height: 100%;
    min-width: 1150px;
    -webkit-font-smoothing: antialiased;
  }

  .main-page-footer {
    display: block;
    text-align: center;
    font-size: 13px;
    height: 50px;
    vertical-align: bottom;
    z-index: 2;
    position: relative;
    color: white;
    background-image: url('components/images/footer-bg.jpg');
  }

  .logo {
    display: inline-block;
    float: left;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    margin-top: 4px;
    margin-left: 8%;
  }

  .el-menu {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 60px;
    position: absolute;
    box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    -moz-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 25px;
    -webkit-box-shadow: rgba(222, 28, 29, 0.08) 0px 0px 50px;
    z-index: 5;
    text-align: center;
    border-bottom: 0;

  }

  .logoTitle {
    font-size: 35px;
    padding-top: 5px;
    display: inline-block;
    font-weight: 500;
  }

  .subTitle {
    font-size: 10px;
    display: inline-block;
  }

  .CurrentLocation {
    background: rgba(0, 0, 0, 0.25);
    display: inline-block;
    height: 27px;
    line-height: 27px;
    text-align: center;
    color: #fff;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 15px;
    padding: 0 10px;
    font-size: 12px;
    float: left;
    margin-right: 10%;
    margin-left: 10%;
  }

  section.app-section {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: #fff;
    width: calc(100%);
    width: -webkit-calc(100%);
    height: calc(100%);
    height: -webkit-calc(100%);
    font-family: "微软雅黑";
    /*overflow-y: auto;*/
    /*padding: 20px;*/
  }

  .sub-route {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s ease;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(200px);
    opacity: 0;
  }

  .top-btn {
    float: right;
  }

  .logoImg {
    height: 45px;
  }

  .account-admin {
    line-height: 60px;
    float: right;
    margin-right: 20px;
  }
</style>
