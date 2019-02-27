<template>
  <div id="main">
    <div class="page-top">
      <img src="../../assets/chinacaring_logo2_transparent.png"/>
      <div class="page-top-title" style="padding-left:15px;">南京瞰聆信息科技有限公司-医院管理平台</div>
      <div class="accoun-admin">
        <img :src="$store.state.hospitalLogo"/>
        <span style="margin:0 20px;color:#fff;">{{$store.state.hospitalName}}</span>
        <el-dropdown>
              <span class="el-dropdown-link" style="color:#fff;">
                  {{ loginName }}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/main/changePass">修改密码</router-link>
            </el-dropdown-item>
            <el-dropdown-item><span @click="logout()">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="page-middle">
      <el-row class="tac" style="display:flex;width:100%;">
        <el-col style="width:auto;height:100%;background-color:#545c64;overflow-y:auto;overflow-x:hidden;z-index:10;"
                class="left-menu">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :collapse="isCollapse"
            :unique-opened="true">
            <div
              style="color:#878d99;text-align:center;cursor:pointer;height:50px;line-height:50px;background-color:rgba(94,100,119,.6);"
              @click="isCollapse = !isCollapse">
              <i class="fa fa-bars" aria-hidden="true" style="margin:0;will-change:transform;"
                 :class="{'rotated': !isCollapse}"></i>
            </div>
            <el-menu-item index="1" key="1">
              <i class="fa fa-home" aria-hidden="true"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2" key="2">
              <template slot="title">
                <i class="fa fa-heartbeat" aria-hidden="true"></i>
                <span slot="title">医院管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toPath('information')">医院信息</el-menu-item>
                <el-menu-item index="2-2" @click="toPath('depts')">科室信息</el-menu-item>
                <el-menu-item index="2-3" @click="toPath('doctor')">医生信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3" key="3">
              <template slot="title">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                <span slot="title">文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="toPath('newsList')">文章列表</el-menu-item>
                <el-menu-item index="3-2" @click="toPath('newsAdd')">发布文章</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4" key="4">
              <template slot="title">
                <i class="fa fa-bullhorn" aria-hidden="true"></i>
                <span slot="title">通知管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="toPath('noticeList')">通知列表</el-menu-item>
                <el-menu-item index="4-2" @click="toPath('noticeAdd')">发布通知</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5" key="5">
              <template slot="title">
                <i class="fa fa-signal" aria-hidden="true"></i>
                <span slot="title">财务管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="toPath('order')">订单查看</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6" key="6">
              <template slot="title">
                <i class="fa fa-rocket" aria-hidden="true"></i>
                <span slot="title">工具应用</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1" @click="toPath('salary')">工资条</el-menu-item>
                <el-menu-item index="6-2" @click="toPath('questionAdd')">在线考试</el-menu-item>
                <el-menu-item index="6-3" @click="toPath('questionare')">问卷调查</el-menu-item>
                <el-menu-item index="6-4" @click="toPath('festival')">节日祝福</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7" key="7">
              <template slot="title">
                <i class="fa fa-cog" aria-hidden="true"></i>
                <span slot="title">系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="7-1" @click="toPath('power')">账号管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col style="position:relative;height:100%;flex:1;-webkit-flex:1;background-color:#fff;z-index:0;">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  import jQuery from 'jquery'

  export default {
    name: 'main',
    data: function () {
      return {
        username: '',
        loginName: '',
        isCollapse: true
      }
    },
    methods: {
      logout() {
        let self = this
        this.$confirm('是否确定退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除cookie , access_token, loginName
          document.cookie = ''
          self.$store.state.access_token = ''
          self.$store.state.loginName = ''
          setTimeout(() => {
            self.$message({
              message: '退出登录成功！',
              type: 'success'
            })
            self.$router.push({
              path: '/login'
            })
          })
        })
      }
    },
    mounted: function () {
      if (!document.cookie) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        this.$router.push({
          path: '/login',
          name: 'login'
        })
        return
      }
      // console.log(this.$route.params.username)
      var _cookie = JSON.parse(document.cookie)
      // console.log(_cookie)
      this.username = this.$route.params.username || _cookie.username
      this.loginName = _cookie.loginName || ''
    }
  }
</script>

<style>
  #main {
    height: 100%;
    overflow-y: hidden;
  }

  #main .rotated {
    transform: rotate(90deg);
  }

  #main .el-menu {
    border-right: none;
  }

  #main .left-menu i.fa {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  #main .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  a {
    text-decoration: none;
  }

  .page-top {
    height: 60px;
    background-color: #545c64;
    z-index: 9999;
  }

  .page-top img {
    float: left;
    width: 50px;
    height: 50px;
    margin: 5px 20px;
    margin-right: 0;
  }

  .page-top-title {
    float: left;
    line-height: 60px;
    color: #fff;
    margin-left: 10px;
  }

  .accoun-admin {
    line-height: 60px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  .el-dropdown-menu__item a {
    color: #000;
  }

  .page-middle {
    background-color: #545c64;
    height: calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
  }

  .page-middle .tac {
    height: 100%;
  }

  .el-menu {
    background-color: rgba(0, 0, 0, 0);
  }

</style>
