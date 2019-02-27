<template>
  <div id="main">
    <el-container class="lj-el-container">
      <el-header>
        <div class="page-top">
          <!-- <img src="../../assets/chinacaring_logo2_transparent.png" />
          <div class="page-top-title" style="padding-left:15px;">南京瞰聆医院管理平台</div> -->
          <img :src="$store.state.hospitalLogo"/>
          <div class="page-top-title" style="padding-left:15px;">浦口中医院 智慧党建后台管理系统</div>
          <div class="accoun-admin">
            <!-- <img :src="$store.state.hospitalLogo" />
            <span style="margin:0 20px;color:#fff;">{{$store.state.hospitalName}}</span> -->
            <!--<span class="top-btn" style="display:inline-block;line-height:60px;height:60px;cursor:pointer;color:#fff;font-size:14px;padding:0 10px;" @click="toPath('help')">帮助</span>-->
            <!--<span class="top-btn">-->
            <!--<el-popover ref="popover" placement="bottom-end" width="300" trigger="hover" style="cursor:pointer;">-->
            <!--<el-collapse class="message">-->
            <!--<el-collapse-item v-for="(i, index) in messageList" :key="index+''" v-if="index < 6"> &lt;!&ndash;最多显示5条&ndash;&gt;-->
            <!--<template slot="title">-->
            <!--<div style="line-height:30px;">【{{i.type}}】{{i.title}}</div>-->
            <!--<div style="line-height:12px;opacity:.5;font-size:12px;">{{i.time}}</div>-->
            <!--</template>-->
            <!--<div style="display:-webkit-flex;display:flex;">-->
            <!--<span-->
            <!--style="flex:1;-webkit-flex:1;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;line-height:30px;">{{i.desc}}</span>-->
            <!--<el-button type="text" size="small">详细</el-button>-->
            <!--</div>-->
            <!--</el-collapse-item>-->
            <!--</el-collapse>-->
            <!--<div style="line-height:25px;height:25px;text-align:center;">-->
            <!--<el-button type="text" size="small">查看更多</el-button>-->
            <!--</div>-->
            <!--</el-popover>-->
            <!--<el-badge v-popover:popover :value="messageList.length" :max="99" class="badge-item" style="margin-right:10px;line-height:0;cursor:pointer;">-->
            <!--<i class="el-icon-bell" style="color:#fff;font-size:24px;"></i>-->
            <!--</el-badge>-->
            <!--</span>-->
            <span class="top-btn">
              <el-dropdown style="cursor:pointer;" :show-timeout="0">
                <span class="el-dropdown-link" style="color:#fff;">
                  {{nickname}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
          <el-dropdown-menu slot="dropdown">
            <div style="padding:5px 10px;">
              <div style="font-size:14px;">
                {{name}}
                <el-tooltip class="item" effect="dark" :content="'最后登录于 ' + lastloginTime" placement="top-end">
                  <i class="fa fa-clock-o" aria-hidden="true" style="margin-left:8px;color:#aaa;cursor:pointer;"></i>
                </el-tooltip>
              </div>
            </div>
            <!--<el-dropdown-item divided>-->
            <!--<div @click="toPath('changePass')">修改密码</div>-->
            <!--</el-dropdown-item>-->
            <el-dropdown-item>
              <div @click="logout()">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
          </el-dropdown>
          </span>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-menu class="el-menu-vertical-demo left-menu" background-color="#545c64" text-color="#fff"
                 :default-active="activeMenuIndex" active-text-color="#ffd04b" :collapse="isCollapse"
                 :unique-opened="true">
          <div
            style="color:#878d99;text-align:center;cursor:pointer;height:50px;line-height:50px;background-color:rgba(94,100,119,1);"
            @click="isCollapse = !isCollapse">
            <i class="fa fa-bars" aria-hidden="true" style="margin:0;will-change:transform;"
               :class="{'rotated': !isCollapse}"></i>
          </div>
          <el-menu-item v-for="(i, index) in $store.state.menu" v-if="i.resourceEntityList.length === 0"
                        :index="index+1+''" :key="index+1+''" @click="toRouter(i.url, index+1+'')">
            <i class="fa" :class="'fa-'+i.icon" aria-hidden="true"></i>
            <!-- <i class="fa" :class="'fa-bar-chart'" aria-hidden="true"></i> -->
            <span slot="title">{{i.name}}</span>
          </el-menu-item>
          <el-submenu style="" v-for="(i, index) in $store.state.menu" v-if="i.resourceEntityList.length !== 0"
                      :index="index+1+''" :key="index+1+''">
            <template slot="title">
              <!-- <i class="fa" :class="'fa-bar-chart'" aria-hidden="true"></i> -->
              <i class="fa" :class="'fa-'+i.icon" aria-hidden="true"></i>
              <span slot="title">{{i.name}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="(j, _index) in i.resourceEntityList" :index="Number(index+1)+'-'+Number(_index+1)"
                            :key="Number(index+1)+'-'+Number(_index+1)"
                            @click="toRouter(j.url, Number(index+1)+'-'+Number(_index+1))">{{j.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!--<el-submenu index="13">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">活动管理</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('activityList')" index="14-15">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">活动列表</span>-->
          <!--</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('activityAdd')" index="15-16">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">活动添加</span>-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="14">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">党员管理</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('partyMemberList')" index="Number(15+1)+'-'+Number(16+1)">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">党员列表</span>-->
          <!--</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('partyMemberAdd')" index="Number(16+1)+'-'+Number(17+1)">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">党员添加</span>-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="15">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">文章管理</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('newsList')" index="Number(15+1)+'-'+Number(16+1)">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">文章列表</span>-->
          <!--</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('newsAdd')" index="Number(16+1)+'-'+Number(17+1)">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">文章添加</span>-->
          <!--</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-submenu index="17">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">党费收缴</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('partyDuesSetting')" index="17+'-'+18">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">党费设置</span>-->
          <!--</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--&lt;!&ndash;   <el-menu-item @click="toPath('partyDuesSettingAdd')" index="18+'-'+19">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">党员添加</span>-->
          <!--</el-menu-item> &ndash;&gt;-->
          <!--</el-submenu>-->
          <!--<el-menu-item @click="toPath('eduList')" index="15">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">学习管理</span>-->
          <!--</template>-->
          <!--</el-menu-item>-->
          <!--<el-submenu index="19">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">积分</span>-->
          <!--</template>-->
          <!--<el-menu-item-group>-->
          <!--<el-menu-item @click="toPath('test1')" index="19+'-'+1">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">积分政策</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item @click="toPath('scoreAdjust')" index="19+'-'+2">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">积分调整</span>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item @click="toPath('scoreApplyList')" index="19+'-'+3">-->
          <!--<i aria-hidden="true"></i>-->
          <!--<span slot="title">加分审批</span>-->
          <!--</el-menu-item>-->
          <!--</el-menu-item-group>-->
          <!--</el-submenu>-->
          <!--<el-menu-item @click="toPath('examList')" index="17">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">考试管理</span>-->
          <!--</template>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item @click="toPath('uploadVideo')" index="17">-->
          <!--<template slot="title">-->
          <!--<i class="fa" :class="'el-icon-circle-plus'" aria-hidden="true"></i>-->
          <!--<span slot="title">视频管理</span>-->
          <!--</template>-->
          <!--</el-menu-item>-->
          <!-- <el-submenu index="8">
                    <template slot="title">
                      <i class="fa fa-film" aria-hidden="true"></i>
                      <span slot="title">视频管理</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="8-1" @click="toPath('uploadVideo')">上传视频</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu> -->
          <div style="position:absolute;width:100%;height:50px;line-height:50px;left:0;bottom:0;text-align:center;">
            <el-tooltip class="item" effect="dark" :content="'菜单自动折叠（' + (autoCollapse ? 'ON' : 'OFF') + '）'"
                        placement="top">
              <el-switch class="autoCollapse-switch" v-model="autoCollapse" active-color="#409EFF"
                         inactive-color="#909399" @change="changeAutoCollapse">
              </el-switch>
            </el-tooltip>
          </div>
        </el-menu>
        <el-main>
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import {Loading} from "element-ui";
  import jQuery from "jquery";
  import {mapGetters} from "vuex";

  export default {
    name: "main",
    data: function () {
      return {
        nickname: '',
        name: '',
        lastloginTime: '',
        isCollapse: false,
        autoCollapse: true,
        activeMenuIndex: '0',
        messageList: []
      };
    },
    methods: {
      searchUserInfo() {
        var self = this;
        var showToken = sessionStorage.getItem('token')
        // console.info('d='+document.cookie)
        // sessionStorage.setItem('token', showToken);
        // self.$store.commit("setToken", showToken);
        // console.info('t='+showToken)
        jQuery.ajax({
          type: 'GET',
          url: this.$store.state.ZHIHUI_INTERFACE.CURRENTUSER,
          headers: {
            // Authorization: sessionStorage.getItem('token'),
            Authorization: showToken,
          },
          success: function (res) {
            if (res.code === 0) {
              // console.log('登录人信息', res);
              // 登录成功
              // self.$alert('获取成功', '提示', {
              //   confirmButtonText: '确定',
              //   type: 'success'
              // });
              //存储id
              sessionStorage.setItem('userid', res.data.id);
              self.$store.commit("setUserid", res.data.id);
              //根据ID获取菜单栏
              self.getMenu(res.data.id);
            } else if (res.code == 30202) {
              self.signUp(self, 'searchUserInfo');
            } else {
              // self.$alert(res.msg, '提示', {
              //   confirmButtonText: '确定',
              //   type: 'error'
              // })
              self.$router.push({
                path: '/login'
              })
            }
          },
          error: function (res) {
            // console.log(res)
            // loadingInstance.close()
            self.$alert('网络请求失败，请稍后再试！', '提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      },
      getMenu(userid) {
        var self = this;
        jQuery.ajax({
          type: 'GET',
          url: this.$store.state.ZHIHUI_INTERFACE.MENU,
          data: {
            userId: userid
          },
          success: function (res) {
            console.log("菜单" + res)
            if (res.code === 0) {
              // console.log('用户菜单', res.data);
              sessionStorage.setItem('menu', JSON.stringify(res.data));
              self.$store.commit("setMenu", res.data);
              // console.log('menu信息');
              // console.log(JSON.parse(sessionStorage.getItem('menu')));
            } else if (res.code == 30202) {
              self.signUp();
            } else {
              self.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type: 'error'
              })
            }
          },
          error: function (res) {
            // console.log(res)
            loadingInstance.close()
            self.$alert('网络请求失败，请稍后再试！', '提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
          }
        })
      },
      changeAutoCollapse(val) {
        // console.log(val)
        localStorage.setItem('autoCollapse', val ? 'true' : 'false')
      },
      toRouter(name, index) {
        // alert(111);
        // if (this.$route.name === name) {
        //   this.$router.push({
        //     name: 'main'
        //   })
        //   var self = this
        //   setTimeout(() => {
        //     self.$router.push({
        //       name: name
        //     })
        //   })
        //   return
        // }
        // var routerName = "/main/"+name;
        // alert(routerName);
        this.$router.push({
          name: name
        })
        // this.$router.push({
        //   path: routerName
        // })
      },
      toPath(name, index) {
        sessionStorage.setItem('activeMenuIndex', index);
        if (this.$route.name === name) {
          this.$router.push({
            name: 'main'
          })
          var self = this
          setTimeout(() => {
            self.$router.push({
              name: name
            })
          })
          return
        }
        this.$router.push({
          name: name
        })
        // if (this.autoCollapse) { // 开启菜单自动折叠（不太合适的设计）
        //   this.isCollapse = true
        // }
        console.log(name);
      },
      logout() {
        let self = this
        this.$confirm('是否确定退出登录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 清除所有缓存信息
          sessionStorage.clear()
          localStorage.clear()
          self.$store.commit('setJwt', '')
          self.$store.commit('setMenu', [])
          self.$store.commit('setRole', [])
          self.$store.commit('setPermission', [])
          self.$store.commit('setLevel', 9999)
          self.$store.commit('setUserid', '')
          sessionStorage.setItem('username', '')
          sessionStorage.setItem('password', '')
          sessionStorage.setItem('token', '')
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
    created: function () {

      this.searchUserInfo();
      this.activeMenuIndex = sessionStorage.getItem('activeMenuIndex')
      // 读取sessionStorage中的用户相关信息（泄漏无妨的信息）
      this.nickname = sessionStorage.getItem('nickname')
      this.name = sessionStorage.getItem('name')
      this.lastloginTime = sessionStorage.getItem('lastloginTime')
      // 读取菜单是否自动折叠
      // if (localStorage.getItem('autoCollapse') === 'true') { // 设置自动折叠为true
      //   this.autoCollapse = true
      //   this.isCollapse = true
      // } else { // 设置自动折叠为false
      //   this.autoCollapse = false
      // }
      window.addEventListener('resize', () => {
        if (window.innerWidth > 1450) {
          this.isCollapse = false
        } else {
          this.isCollapse = true
        }
      })
    }
  }

</script>
<style>
  #main {
    height: 100%;
    overflow-y: hidden;
  }

  #main .lj-el-container {
    height: 100%;
  }

  #main .page-top .top-btn {
    background-color: #545c64;
    display: inline-block;
    height: 60px;
    padding: 0 10px;
  }

  #main .page-top .top-btn:hover {
    background-color: #5e6771;
  }

  .message .el-collapse-item__header {
    line-height: 0;
  }

  .message .el-collapse-item__content {
    padding-bottom: 5px;
  }

  #main .lj-el-container .el-header {
    padding: 0;
  }

  #main .el-main {
    padding: 0;
    position: relative;
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
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  .el-dropdown-menu__item a {
    color: #000;
  }

  /*
    .page-middle {
        background-color: #545c64;
        height: calc(100% - 60px);
        height: -webkit-calc(100% - 60px);
    }
    .page-middle .tac {
      height: 100%;
    } */

  .el-menu {
    background-color: rgba(0, 0, 0, 0);
  }

  #main .autoCollapse-switch {
    opacity: 0.2;
    will-change: opacity;
    transition: all 0.5s linear;
  }

  #main .autoCollapse-switch:hover {
    opacity: 1;
  }

  /* #main ul li.el-submenu:nth-child(5),
    #main ul li.el-submenu:nth-child(6),
    #main ul li.el-submenu:nth-child(7),
    #main ul li.el-submenu:nth-child(8),
    #main ul li.el-submenu:nth-child(9) {
      display: none;
    } */

</style>
