//登录

<template>
  <div class="login" id="login">
    <div @click="goBack()" class="log-close"><i class="icons close"></i></div>
    <div class="log-bg">
      <div class="log-cloud cloud1"></div>
      <div class="log-cloud cloud2"></div>
      <div class="log-cloud cloud3"></div>
      <div class="log-cloud cloud4"></div>

      <div class="log-logo">邮箱验证</div>
      <div class="log-text">@GKD</div>
    </div>
    <div class="log-email" v-model="userinfo">
      <el-input class="signin-input" v-model="userinfo.account"
                type="email"
                placeholder="请输入您的注册邮箱">
        <el-button style="display: inline;" slot="append" icon="el-icon-message" @click="checkUserExist"></el-button>
      </el-input>
      <!--<el-input type="password" class="signin-input" v-model="userinfo.password1"-->

      <!--placeholder="请输入密码">-->

      <!--</el-input>-->
      <!--<el-input type="password" class="signin-input" v-model="userinfo.password2"-->

      <!--placeholder="请再次输入密码">-->

      <!--</el-input>-->
      <el-input class="signin-input" v-model="userinfo.checkCode"

                placeholder="请输入邮件激活码">

      </el-input>
      <a class="log-btn" @click="checkValidCode">提&nbsp 交</a>
    </div>
    <!--<Loading v-if="isLoging" style="margin-top: -30rem;z-index: 50"></Loading>-->
  </div>
</template>

<script>
  import a from '../js/sha1.min.js'
  import {Loading} from 'element-ui'

  export default {
    name: 'forget',

    data() {
      return {
        isLoging: false,
        trueCheckCode: '',
        userinfo: {
          account: '',
          password1: '',
          password2: '',
          checkCode: ''
        }
      }
    },
    components: {
      Loading,

    },
    methods: {
      checkUserExist() {
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!regEmail.test(this.userinfo.account)) {
          this.$message.error('请输入正确的邮箱格式')
          return
        }
//        this.isLoging = true
        let loadingInstance = Loading.service({fullscreen: true});
        let self = this
        jQuery.ajax({
          type: 'get',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/PersonUser/personUser/info',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
          data: {
            username: self.userinfo.account
          },
          success: function (res) {
            loadingInstance.close()
            self.isLoging = false
            if (res.code === 0) {
              self.sendEmail()
            } else {
              self.$message.error('用户不存在！')
            }
          },
          error: function () {
            loadingInstance.close()
            self.isLoging = false
            self.$message.error('网络错误，请重试')
          }
        })
      },
      sendEmail() {
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!regEmail.test(this.userinfo.account)) {
          this.$message.error('请输入正确的邮箱格式')
          return
        }
//        this.isLoging = true
        let loadingInstance = Loading.service({fullscreen: true});
        let self = this
        jQuery.ajax({
          type: 'POST',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/PersonUser/personUser/getCheckCode',
//          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
          data: {
            email: self.userinfo.account
          },
          success: function (res) {
            loadingInstance.close()
            self.isLoging = false
            if (res.code === 0) {
              self.trueCheckCode = res.data
              self.$message.success('邮件已发送，请注意查收')
            } else {
              self.$message.error(res.msg)
            }
          },
          error: function () {
            loadingInstance.close()
            self.isLoging = false
            self.$message.error('网络错误，请重试')
          }
        })
      }

      ,
      checkValidCode() {
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!regEmail.test(this.userinfo.account)) {
          this.$message.error('请输入正确的邮箱格式')
          return

        } else if (this.userinfo.checkCode == '' || this.userinfo.checkCode != this.trueCheckCode) {
          this.$message.error('邮箱验证码错误')
          return
        } else {
          this.$router.push({
            name: 'updatePassword',
            query: {
              email: this.userinfo.account
            }
          })
        }
      },
      sign() {
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!regEmail.test(this.userinfo.account)) {
          this.$message.error('请输入正确的邮箱格式')
          return

        }
        this.isLoging = true
        let loadingInstance = Loading.service({fullscreen: true});
        let self = this
        jQuery.ajax({
          type: 'POST',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/PersonUser/personUser/register',
          data: {
            email: self.userinfo.account,
            password: self.userinfo.password1
          },
          success: function (res) {
            self.isLoging = false
            loadingInstance.close()
            if (res.code === 0) {

              self.goBack()
              self.$message.success('注册成功')
            } else {
              self.$message.error(res.msg)
            }
          },
          error: function () {
            self.isLoging = false
            loadingInstance.close()
            self.$message.error('网络错误，请重试')
          }
        })
      }
      ,
      goBack() {
        this.$router.go(-1)
      }
      ,


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
    margin-top: -300px;
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
    /*background: url(../images/login-bg.jpg);*/
    background-color: #409eff;
    width: 100%;
    height: 312px;
    overflow: hidden;
  }

  .log-logo {
    height: 80px;
    margin: 120px auto 25px;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 40px;
  }

  .log-text {
    color: white;
    font-size: 13px;
    text-align: center;
    margin: 0 auto;
  }

  .log-logo, .log-text {
    z-index: 4
  }

  .icons {
    background: url(../images/icons111.png) no-repeat;
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
    font-size: 20px;
    -webkit-border-radius: 5px;
    background-color: #3B5999;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    position: relative;
    margin-top: 1rem;
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
    background-color: #409eff;
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

  .signin-input {
    margin-bottom: 1rem;
    border-radius: 10px;
    width: 20rem;

  }
</style>
