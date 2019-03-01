//登录

<template>
  <div class="login" id="login">
    <div @click="goBack()" class="log-close"><i class="icons close"></i></div>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">邮箱快捷登录</div>
      <div class="log-text">@chy</div>
    </div>
    <div class="log-email">
      <input type="email" placeholder="邮箱" :class="'log-input' + (userinformation.account==''?' log-input-empty':'')"
             v-model="userinformation.account"><input type="password" placeholder="密码"
                                                      :class="'log-input' + (userinformation.password==''?' log-input-empty':'')"
                                                      v-model="userinformation.password">
      <div class="log-btn" @click="login">登录</div>
    </div>
    <!--<Loading v-if="isLoging" marginTop="-30%"></Loading>-->
    <footer style="text-align: center;font-size: 13px;">
      CopyRight &copy; 2019 GKD
    </footer>
  </div>
</template>

<script>

  import a from '../js/sha1.min.js'
  import {Loading} from 'element-ui'

  export default {
    name: 'Login',
    data() {
      return {

        userinformation: {
          account: '',
          password: ''
        }
      }
    },
    components: {
      Loading,

    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      //登录逻辑
      login() {

        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!regEmail.test(this.userinformation.account)) {
          this.$message.error('请输入正确的邮箱格式')
          return
        } else if (this.userinformation.password == '') {
          this.$message.error('请输入密码')
        } else {
          let self = this
          let loadingInstance = Loading.service({fullscreen: true});
          jQuery.ajax({
            type: 'POST',
            headers: {
//            Authorization: localStorage.getItem('token')
            },
            url: 'http://localhost:9988/PersonUser/personUser/login',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
            data: {
              username: self.userinformation.account,
              password: self.userinformation.password
            },
            success: function (res) {
              loadingInstance.close()
              if (res.code === 0) {
                sessionStorage.setItem('jwt', res.data)
                sessionStorage.setItem('username', self.userinformation.account)
                self.$message.success('欢迎登录')
                self.$router.replace('/');
              } else {
                self.$message.error(res.msg)
              }
            },
            error: function () {
              loadingInstance.close()
              self.$message.error('网络错误，请重试')
            }
          })
        }
      },


    }
  }
</script>

<style scoped>
  .login {
    position: fixed;
    overflow: hidden;
    left: 50%;
    margin-left: -250px;
    top: 50%;
    margin-top: -350px;
    width: 500px;
    min-height: 555px;
    z-index: 10;
    right: 140px;
    background: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    -webkit-box-shadow: 0px 3px 16px -5px #070707;
    box-shadow: 0px 3px 16px -5px #070707
  }

  .log-close {
    display: block;
    position: absolute;
    top: 12px;
    right: 12px;
    opacity: 1;
  }

  .log-close:hover .icons {
    transform: rotate(180deg);
  }

  .log-close .icons {
    opacity: 1;
    transition: all .3s
  }

  .log-cloud {
    background-image: url(../images/login-cloud.png);
    width: 63px;
    height: 40px;
    position: absolute;
    z-index: 3
  }

  .login .cloud1 {
    top: 21px;
    left: -30px;
    transform: scale(.6);
    animation: cloud1 20s linear infinite;
  }

  .login .cloud2 {
    top: 87px;
    right: 20px;
    animation: cloud2 19s linear infinite;
  }

  .login .cloud3 {
    top: 160px;
    left: 5px;
    transform: scale(.8);
    animation: cloud3 21s linear infinite;
  }

  .login .cloud4 {
    top: 150px;
    left: -40px;
    transform: scale(.4);
    animation: cloud4 19s linear infinite;
  }

  .log-bg {
    background: url(../images/login-bg.jpg);
    width: 100%;
    height: 312px;
    overflow: hidden;
  }

  .log-logo {
    height: 80px;
    margin: 120px auto 25px;
    text-align: center;
    color: #1fcab3;
    font-weight: bold;
    font-size: 40px;
  }

  .log-text {
    color: #57d4c3;
    font-size: 13px;
    text-align: center;
    margin: 0 auto;
  }

  .log-logo, .log-text {
    z-index: 4
  }

  .icons {
    background: url(../images/icons.png) no-repeat;
    display: inline-block;
  }

  .close {
    height: 16px;
    width: 16px;
    background-position: -13px 0;
  }

  .login-email {
    height: 17px;
    width: 29px;
    background-position: -117px 0;
  }

  .log-btns {
    padding: 15px 0;
    margin: 0 auto;
  }

  .log-btn {
    width: 402px;
    display: block;
    text-align: left;
    line-height: 50px;
    margin: 0 auto 15px;
    height: 50px;
    color: #fff;
    font-size: 13px;
    -webkit-border-radius: 5px;
    background-color: #3B5999;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    position: relative;
  }

  .log-btn.tw {
    background-color: #13B4E9
  }

  .log-btn.email {
    background-color: #50E3CE
  }

  .log-btn:hover, .log-btn:focus {
    color: #fff;
    opacity: .8;
  }

  .log-email {
    text-align: center;
    margin-top: 20px;
  }

  .log-email .log-btn {
    background-color: #50E3CE;
    text-align: center;
  }

  .log-input-empty {
    border: 1px solid #f37474 !important;
  }

  .isloading {
    background: #d6d6d6
  }

  .log-btn .icons {
    margin-left: 30px;
    vertical-align: middle;
  }

  .log-btn .text {
    left: 95px;
    line-height: 50px;
    text-align: left;
    position: absolute;
  }

  .log-input {
    width: 370px;
    overflow: hidden;
    padding: 0 15px;
    font-size: 13px;
    border: 1px solid #EBEBEB;
    margin: 0 auto 15px;
    height: 48px;
    line-height: 48px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
  }

  .log-input.warn {
    border: 1px solid #f88787
  }

  @-webkit-keyframes cloud1 {
    0% {
      left: 200px
    }
    100% {
      left: -130px;
    }
  }

  @keyframes cloud1 {
    0% {
      left: 200px
    }
    100% {
      left: -130px;
    }
  }

  @-webkit-keyframes cloud2 {
    0% {
      left: 500px;
    }
    100% {
      left: -90px;
    }
  }

  @keyframes cloud2 {
    0% {
      left: 500px;
    }
    100% {
      left: -90px;
    }
  }

  @-webkit-keyframes cloud3 {
    0% {
      left: 620px;
    }
    100% {
      left: -70px;
    }
  }

  @keyframes cloud3 {
    0% {
      left: 620px;
    }
    100% {
      left: -70px;
    }
  }

  @-webkit-keyframes cloud4 {
    0% {
      left: 100px;
    }
    100% {
      left: -70px;
    }
  }

  @keyframes cloud4 {
    0% {
      left: 100px;
    }
    100% {
      left: -70px;
    }
  }

</style>
