// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App";
import router from "./router";

import Vuex from "vuex";

// UEditor相关
// import './assets/ueditor/ueditor.config.js'
// import './assets/ueditor/ueditor.all.js'
// import './assets/ueditor/lang/zh-cn/zh-cn.js'
// import './assets/ueditor/ueditor.parse.js'

import {INTERFACE, ZHIHUI_INTERFACE} from "./namespace";
import jQuery from "jquery";

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
Vue.prototype.signUp = function () {

  // var self = this;
  // $.ajax({
  //     type: 'post',
  //     //url: 'http://wechat.chinacaring.com:20999/api/sys/wxLogin/login?username=' + localStorage.getItem('user_id'),
  //     url:this.$store.state.ZHIHUI_INTERFACE.LOGIN,
  //     data: {
  //       username: sessionStorage.getItem('username'),
  //       password: sessionStorage.getItem('password'),
  //       site: 'admin'
  //     },
  //     success: function(res) {

  //         if (res.code === 0) {
  //            sessionStorage.setItem('token', res.data)
  //         document.cookie="token="+res.data;
  //             //self.$router.go(0)

  //             eval('self.'+function1+';');
  //         } else {
  //             alert(res.desc)
  //             console.log(res.desc)
  //         }
  //     },
  //     error: function() {
  //         alert('网络出错请重试')
  //         console.log('获取信息出错')
  //     }
  // })
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
};
// 创建Store实例
const store = new Vuex.Store({
  // 存储状态值
  state: {
    hospitalName: "淮安市淮安医院",
    hospital: "1200",
    INTERFACE,
    ZHIHUI_INTERFACE,
    category_id: 250,
    noticeAgentId: 1000015,
    hospitalLogo: "http://gl-yiyuan.oss-cn-beijing.aliyuncs.com/LG.png",
    hospitalDes: "淮安市淮安医院",
    // uploadImgServer: 'http://file.chinacaring.com/upload',
    uploadImgServer: "http://111.231.75.164:2233/upload",
    deleteImgServer: "http://111.231.75.164:2233/del",
    Authorization: "Basic ZmlsZTpmaWxlY2FyaW5nMjAxNw==",
    Authorization1: "Basic ZmlsZTpmaWxlUFc=",
    // fileDIR: 'http://chinacaring.oss-cn-shanghai.aliyuncs.com/',
    fileDIR: "https://chinaraising.oss-cn-hangzhou.aliyuncs.com/",
    flag: {
      newsList: true,
      newsCate: true,
      partyMemberList: true,
    },
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

// function getUserInfo(callback) {
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

// const unloginOpenList = ['login', 'nf404'] // 未登录公共权限
const LoginOpenList = [
  "partyDuesAdd",
  "partyDuesSetting",
  "partyDuesEdit",
  "partyMemberEdit",
  "partyMemberDetail",
  "partyMemberAdd",
  "partyMemberList",
  "examinationMain",
  "activityUpdate",
  "activityList",
  "activityAdd",
  "test1",
  "login",
  "changePass",
  "main",
  "nf404",
  "nopower",
  "index",
  "help",
  "doctorDetail",
  "newsDetail",
  "newsListEdit",
  "noticeDetail",
  "uploadVideo",
  "role",
  "examAdd",
  "examCondition",
  "examDetail",
  "examList",
  "examMain",
  "modelExamSetting",
  "questionAdd",
  "questionDetail",
  "questionImport",
  "questionList",
  "questionStoreList",
  "orderDetail",
  "questionare"
]; // 已登录公共权限
// router.beforeEach((to, from, next) => {
//   // 如果未匹配到路由
//   if (to.matched.length === 0) {
//     next({
//       name: "nf404"
//     });
//     return;
//   }
//   // 如果为登录或nf404，直接通过
//   if (to.name === "login" || to.name === "nf404") {
//     next();
//     return;
//   }
//   // 校验权限等的函数
//   let checkPerFunc = function() {
//     // 如果没有权限
//     if (
//       jQuery.inArray(to.name, store.state.permission) < 0 &&
//       jQuery.inArray(to.name, LoginOpenList) < 0
//     ) {
//       next({
//         name: "nopower"
//       });
//       return;
//     }
//     // 一切正常，则跳转
//     next();
//   };
//   // 如果sessionStorage以及store里面的jwt（token）都没有了
//   // 此场景发生在有人手欠，在前端删除sessionStorage，又刷新了页面（store被重置）
//   if (sessionStorage.getItem("jwt") === null && store.state.jwt === "") {
//     ElementUI.Message({
//       message: "请先登录",
//       type: "warning"
//     });
//     next({
//       name: "login"
//     });
//     return;
//   }
//   // 如果sessionStorage里的jwt没有，但store里的jwt还在
//   // 此场景发生在有人手欠前端删除sessionStorage，但是没有刷新页面（store没有被重置）
//   if (sessionStorage.getItem("jwt") === null && store.state.jwt !== "") {
//     sessionStorage.setItem("jwt", store.state.jwt);
//   }
//   // 如果store里的jwt没有了，但是sessionStorage里的jwt还在
//   // 此场景发生在用户刷新了页面，store被重置的情况
//   if (sessionStorage.getItem("jwt") !== null && store.state.jwt === "") {
//     store.commit("setJwt", sessionStorage.getItem("jwt"));
//   }
//   // 用户刷新了页面，那么就要重新获取权限列表，再判断能不能进入当前这个路由
//   if (store.state.permission.length === 0) {
//     getUserInfo(checkPerFunc);
//   } else {
//     checkPerFunc();
//   }
// });

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
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
