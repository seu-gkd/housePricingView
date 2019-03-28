// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App";
import router from "./router";

import Vuex from "vuex";

import echarts from 'echarts'

Vue.prototype.$echarts = echarts
// UEditor相关
// import './assets/ueditor/ueditor.config.js'
// import './assets/ueditor/ueditor.all.js'
// import './assets/ueditor/lang/zh-cn/zh-cn.js'
// import './assets/ueditor/ueditor.parse.js'

import {INTERFACE, ZHIHUI_INTERFACE, SUB_INTERFAVE_URL} from "./namespace";
import jQuery from "jquery";
import {
  VChart,
  VLine,
  VArea,
  VBar,
  VPie,
  VPoint,
  VScale,
  VAxis,
  VTooltip,
  VLegend,
  VGuide,
  XButton,
  Grid,
  GridItem
} from 'vux'

Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('v-chart', VChart)
Vue.component('v-line', VLine)
Vue.component('v-area', VArea)
Vue.component('v-bar', VBar)
Vue.component('v-pie', VPie)
Vue.component('v-point', VPoint)
Vue.component('v-scale', VScale)
Vue.component('v-axis', VAxis)
Vue.component('v-guide', VGuide)
Vue.component('v-tooltip', VTooltip)
Vue.component('v-legend', VLegend)
Vue.component('x-button', XButton)
Vue.use(Vuex);

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.distinct = (arr) => {
  var res = []
  var json = {}
  for (var i = 0; i < arr.length; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i])
      json[arr[i]] = 1
    }
  }
  return res
};
const FastClick = require('fastclick')
FastClick.attach(document.body)
const axios = require('axios')
Vue.prototype.$ajax = axios;
Vue.prototype.signUp = function () {

  if (sessionStorage.getItem('haveShowBox') === 'true') return
  sessionStorage.setItem('haveShowBox', 'true')
  ElementUI.MessageBox.confirm('登录状态无效或过期，<br>请重新登录！', '', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '前往登录',
    cancelButtonText: '暂不登录',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: 'warning',
    center: true
  }).then(() => {
    sessionStorage.setItem('nowRouteName', nowRouteName)
    router.push({
      name: 'login'
    })
  }).catch(() => {
    sessionStorage.setItem('haveShowBox', false)
  })
};
// 创建Store实例
const store = new Vuex.Store({
  // 存储状态值
  state: {
    activeIndex: '/',
    Server: 'http://47.101.44.55:8090',
    // Server:'http://localhost:9988',
    currentUserInfo: null,
    isLogin: '1',
    currentLocation: '',
    menu: [],
    role: [],
    permission: [],
    token: '',
    userid: '',
    username: '',
    level: 9999 // 值越大，权限越小
  },
  // 状态值的改变方法,操作状态值
  // 提交mutations是更改Vuex状态的唯一方法
  mutations: {


    // mutations
    changePartyMemberListFlag(state) {
      state.flag.partyMemberList = !state.flag.partyMemberList
    },
    changeNewsListFlag(state) {
      state.flag.newsList = !state.flag.newsList;
    },
    changeNewsCateFlag(state) {
      state.flag.newsCate = !state.flag.newsCate;
    },
    setToken(state, token) {
      state.token = token
    },
    setMenu(state, menu) {
      state.menu = menu
    },
    setRole(state, role) {
      state.role = role
    },
    setPermission(state, permission) {
      state.permission = permission
    },
    setLevel(state, level) {
      state.level = level
    },
    setUsername(state, username) {
      state.username = username
    },
    setUserid(state, userid) {
      state.userid = userid
    }
  },
  // 在store中定义getters（可以认为是store的计算属性）。Getters接收state作为其第一个函数
  getters: {
    // getters
  },
  actions: {
    // actions
  }
});

var nowRouteName = ''
let self = this
// function getUserInfo(callback) {
Vue.prototype.logout = function () {
  let self = this
  // let loadingInstance = Loading.service({fullscreen: true});
  jQuery.ajax({
    type: 'GET',
    headers: {
//            Authorization: localStorage.getItem('token')
    },
    url: this.$store.state.Server + '/PersonUser/personUser/logout',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
    data: {},
    success: function (res) {
      // loadingInstance.close()
      if (res.code === 0) {
        sessionStorage.setItem('jwt', null)
        sessionStorage.setItem('username', null)
        self.$store.state.currentUserInfo = null
        self.$store.state.isLogin = '1'
        sessionStorage.setItem('isLogin', '1')
        self.$message.success('已退出')
        self.$router.replace('/')
        // self.$router.go(0)
      } else {
        self.$message.error(res.msg)
      }
    },
    error: function () {
      // loadingInstance.close()
      self.$message.error('网络错误，请重试')
    }
  })
}
;
Vue.prototype.go = function (key) {
  // if (store.state.activeIndex == i)
  //   return
  router.push(key)
  // if (i == '1') {
  //   // store.state.activeIndex = '1'
  //   router.replace('/')
  // }
  // else if (i == '2') {
  //   // store.state.activeIndex = '2'
  //   router.replace('/priceAnalysis')
  // }
  // else if (i == '4') {
  //   // store.state.activeIndex = '3'
  //   router.replace('/userManage')
  // }
  // else if (i == '4') {
  //   router.replace('/priceForecast')
  // }
};

function getUserInfo() {
  console.log(nowRouteName)
  jQuery.ajax({
    type: 'GET',
    url: store.state.ZHIHUI_INTERFACE.CURRENTUSER,
    headers: {
      'Authorization': store.state.token || sessionStorage.getItem('token')
      // 'Authorization': store.state.jwt || sessionStorage.getItem('jwt')
    },
    success: function (res) {
      console.log('main.js', res);
      if (res.code === 0) {
        // store.commit('setMenu', res.data.menuList)
        store.commit('setRole', res.data.roleIds)
        // store.commit('setLevel', res.data.level)
        store.commit('setUserid', res.data.id)
        sessionStorage.setItem('nickname', res.data.name)
        sessionStorage.setItem('name', res.data.username)
        // sessionStorage.setItem('lastloginTime', res.data.lastloginTime)
        let permissionList = [];
        console.log(res.data.roleIds);
        // res.data.roleIds.forEach((item) => {
        //   item.permissionList.forEach((_item) => {
        //     if (_item.router !== null && _item.router !== undefined && jQuery.inArray(_item.router, permissionList) < 0) {
        //       permissionList.push(_item.router)
        //     }
        //   })
        // })
        store.commit('setPermission', permissionList)
        // if (typeof callback === 'function') callback()
        getMenu();
      } else {
        // store.commit('setMenu', [])
        store.commit('setRole', [])
        // store.commit('setPermission', [])
        // store.commit('setLevel', 9999)
        store.commit('setUserid', '')
        sessionStorage.removeItem('nickname')
        sessionStorage.removeItem('name')
        // sessionStorage.removeItem('lastloginTime')
        let mes = res.code === 30007 ? '授权令牌无效或过期' : res.message
        ElementUI.MessageBox.confirm(mes + '，<br>请重新登录！', '', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '前往登录',
          cancelButtonText: '暂不登录',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          type: 'warning',
          center: true
        }).then(() => {
          sessionStorage.setItem('nowRouteName', nowRouteName)
          router.push({
            name: 'login'
          })
        }).catch(() => {
          sessionStorage.setItem('nowRouteName', nowRouteName)
          router.push({
            name: 'login'
          })
        })
      }
    },
    error: function () {
      // store.commit('setMenu', [])
      store.commit('setRole', [])
      // store.commit('setPermission', [])
      // store.commit('setLevel', 9999)
      store.commit('setUserid', '')
      sessionStorage.removeItem('nickname')
      sessionStorage.removeItem('name')
      // sessionStorage.removeItem('lastloginTime')
      ElementUI.MessageBox.confirm('网络请求异常，获取用户身份出错！<br>请重新登录！', '', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '前往登录',
        cancelButtonText: '暂不登录',
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning',
        center: true
      }).then(() => {
        router.push({
          name: 'login'
        })
      })
      console.log('测试main.js');
    }
  })
}


function getMenu() {
  var self = this;
  // var userid = sessionStorage.getItem('userid');
  // var userid2 =  store.state.userid;
  jQuery.ajax({
    type: 'GET',
    url: store.state.ZHIHUI_INTERFACE.MENU,
    data: {
      userId: store.state.userid
    },
    success: function (res) {
      console.log("mainMenu", res);
      if (res.code === 0) {
        // console.log('用户菜单', res.data);
        sessionStorage.setItem('menu', JSON.stringify(res.data));
        store.commit("setMenu", res.data);
        // console.log('menu信息');
        // console.log(JSON.parse(sessionStorage.getItem('menu')));
      } else {
        // self.$alert(res.msg, '提示', {
        //   confirmButtonText: '确定',
        //   type: 'error'
        // })
      }
    },
    error: function (res) {
      console.log(res)
      loadingInstance.close()
      // self.$alert('网络请求失败，请稍后再试！', '提示', {
      //   confirmButtonText: '确定',
      //   type: 'error'
      // })
    }
  })
}

//定义获取基础数据的方法
function initMainData() {
  // store.state.isLogin = sessionStorage.getItem('isLogin', '1')
  store.state.currentUserInfo = sessionStorage.getItem('username')
  getCurrentCity()
};

function getCurrentCity() {    //定义获取城市方法
  const geolocation = new BMap.Geolocation();
  let self = this
  geolocation.getCurrentPosition(function getinfo(position) {
    let city = position.address.city;             //获取城市信息
//          let province = position.address.province;    //获取省份信息
    store.state.currentLocation = city.substr(0, city.length - 1)

    sessionStorage.setItem('currentCity', city.substr(0, city.length - 1))
  }, function (e) {
  }, {provider: 'baidu'});
};
// const unloginOpenList = ['login', 'nf404'] // 未登录公共权限
const LoginOpenList = [
  "/priceAnalysis",
  '/priceForecast',
  '/userManage',
  '/buildDetail',
  '/mapLayout',
  '/lookingFor'

]; // 已登录公共权限


/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},

  mounted() {
    let self = this
    initMainData()
    router.beforeEach((to, from, next) => {
      /* 路由发生变化修改页面title */
      let temp = true
      LoginOpenList.forEach(item => {
        if (item == to.path) {
          if (sessionStorage.getItem('jwt') == null || sessionStorage.getItem('jwt') == '' || sessionStorage.getItem('jwt') == 'null') {
            self.$message.error('请先登录')
            temp = false
            return
          }
        }
      })
      if (!temp) {
        router.replace('/')
      } else
        next();
    })
  },
  // 将store实例注入到根组件下的所有子组件中
  store
  // 子组件通过this.$store来方位store
})

// 注册公共令牌过期方法
sessionStorage.removeItem('haveShowBox')
Vue.prototype.invalidTokenEvent = function () {
  if (sessionStorage.getItem('haveShowBox') === 'true') return
  sessionStorage.setItem('haveShowBox', 'true')
  ElementUI.MessageBox.confirm('登录状态无效或过期，<br>请重新登录！', '', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '前往登录',
    cancelButtonText: '暂不登录',
    showClose: false,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    type: 'warning',
    center: true
  }).then(() => {
    sessionStorage.setItem('nowRouteName', nowRouteName)
    router.push({
      name: 'login'
    })
  }).catch(() => {
    sessionStorage.setItem('haveShowBox', 'false')
  })
}
