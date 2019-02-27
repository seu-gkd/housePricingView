<template>
  <div id="login">
    <div class="login-wrapper">
      <img :src="$store.state.hospitalLogo"/>
      <div class="title"><span style="letter-spacing:.5em;">浦口中医院</span><br>智慧党建管理平台</div>
      <div style="width:80%;max-width:300px;margin:30px auto;">
        <el-input placeholder="请输入账号" v-model="username" autofocus @keyup.enter.native="login">
          <!-- <template slot="prepend">&nbsp;&nbsp;<i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;</template> -->
        </el-input>
      </div>
      <div style="width:80%;max-width:300px;margin:20px auto;">
        <el-input placeholder="请输入密码" v-model="password" type="password" @keyup.enter.native="login">
          <!-- <template slot="prepend">&nbsp;&nbsp;<i class="fa fa-lock" aria-hidden="true"></i>&nbsp;&nbsp;</template> -->
        </el-input>
      </div>
      <div style="margin-top:30px;">
        <el-button type="primary" @click="login()">登录</el-button>
        <el-button @click="reset()">重置</el-button>
      </div>
    </div>
    <footer>
      CopyRight &copy; 2018 南京睿恒智晟科技有限公司 ChinaRaising
    </footer>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  import md5 from 'md5'
  import jQuery from 'jquery'

  export default {
    name: 'login',
    data: function () {
      return {
        username: '',
        password: '',
        oo: {
          aa: 'ca',
          bb: 'vd'
        }
      }
    },
    methods: {
      test(ss) {
        ss = JSON.parse(ss)
        console.log(ss.aa)
      },
      login() {

        var self = this
        var username = this.username
        var password = this.password
        var reg1 = /^[A-Za-z]*$/
        var reg2 = /^[A-Za-z0-9]*$/
        if (username === '') {
          this.$message({
            message: '请输入账号！',
            type: 'warning'
          })
          return
        }
        if (!reg1.test(username)) {
          this.$message({
            message: '账号只能由字母组成！',
            type: 'warning'
          })
          return
        }

        if (password === '') {
          this.$message({
            message: '请输入密码！',
            type: 'warning'
          })
          return
        }
        // var ss='登陆'
        //this.signUp(self,"test('"+JSON.stringify( this.oo)+"')")
        //console.log(Number(1))
        // return;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        // loading加载开始
        let loadingInstance = Loading.service({fullscreen: true})
        jQuery.ajax({
          type: 'POST',
          url: this.$store.state.ZHIHUI_INTERFACE.LOGIN,
          data: {
            username: this.username,
            password: this.password,
            site: 'admin'
          },
          success: function (res) {
            console.log(res)
            loadingInstance.close()
            if (res.code === 0) {
              // 登录成功
              self.$message({
                type: 'success',
                message: '登录成功，跳转中...'
              })
              // sessionStorage只保留jwt；标签页关闭，sessionStorage就失效
              // sessionStorage.setItem('jwt', res.data.jwt)
              // self.$store.commit("setJwt", res.data.jwt)
              // menu保存在vux store中，防止用户前端修改；但是一旦用户刷新页面，vux store将会被重置，于是，我们可以在main.vue被mounted时根据sessionStorage中的jwt再重新获取menu
              // 法2: main.vue始终获取menu和role列表

              // self.$store.commit("setToken", res.data);
              sessionStorage.setItem('token', res.data)
              document.cookie = "token=" + res.data;
              self.$router.push({
                name: 'index'
              })
            } else {
              self.$alert('用户名或密码错误', '提示', {
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
      reset() {
        this.username = ''
        this.password = ''
      }
    },
    //查询当前登录人信息
    searchUserInfo() {
      var self = this;
      jQuery.ajax({
        type: 'GET',
        url: this.$store.state.ZHIHUI_INTERFACE.CURRENTUSER,
        headers: {
          // 'Authorization-shiro': sessionStorage.getItem('jwt'),
          Authorization: this.$store.state.token,
        },
        success: function (res) {
          // console.log('登录人信息', res);
          if (res.code === 0) {
            // 登录成功
            // self.$alert('获取成功', '提示', {
            //   confirmButtonText: '确定',
            //   type: 'success'
            // });
            //存储id
            sessionStorage.setItem('userid', res.data.id);
            sessionStorage.setItem('username', res.data.username);
            self.$store.commit("setUserid", res.data.id);
            //根据ID获取菜单栏
            self.getMenu();
          } else {
            self.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
          }
        },
        error: function () {
          loadingInstance.close()
          self.$alert('网络请求失败，请稍后再试！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    getMenu() {
      var self = this;
      jQuery.ajax({
        type: 'GET',
        url: this.$store.state.ZHIHUI_INTERFACE.MENU,
        data: {
          userId: this.$store.state.userid
        },
        success: function (res) {
          if (res.code === 0) {
            // console.log('用户菜单', res.data);
            sessionStorage.setItem('menu', JSON.stringify(res.data));
            self.$store.commit("setMenu", res.data);
            console.log('menu信息');
            console.log(JSON.parse(sessionStorage.getItem('menu')));
          } else {
            self.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type: 'error'
            })
          }
        },
        error: function () {
          loadingInstance.close()
          self.$alert('网络请求失败，请稍后再试！', '提示', {
            confirmButtonText: '确定',
            type: 'error'
          })
        }
      })
    },
    mounted: function () {
    }
  }
</script>

<style>
  #login {

  }

  .login-wrapper {
    padding-top: 7%;
    text-align: center;
    width: 100%;
    margin: auto;
  }

  #login img {
    width: 150px;
    height: 150px;
  }

  #login .title {
    color: #888;
    line-height: 150%;
    font-size: 150%;
    letter-spacing: .5em;
    margin-top: 1em;
  }

  #login footer {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #999;
    font-size: 14px;
    left: 0;
    bottom: 0;
    text-align: center;
  }
</style>
