<template>
  <div class="sub-route">
    <section class="app-section" id="userManage">

      <footer class="main-page-footer">
        CopyRight &copy; 2019 GKD
      </footer>

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
//        currentUserInfo: '',
//        currentLocation: '',
      }
    },
    methods: {
//      initData() {
//        this.currentUserInfo = sessionStorage.getItem('userName')
//        this.currentLocation = sessionStorage.getItem('currentCity')
//      },
//      logout() {
//        let self = this
//        let loadingInstance = Loading.service({fullscreen: true});
//        jQuery.ajax({
//          type: 'GET',
//          headers: {
////            Authorization: localStorage.getItem('token')
//          },
//          url: this.$store.state.Server + '/PersonUser/personUser/logout',
////          url: self.$store.state.SUB_INTERFAVE_URL.GET_CHECKCODE,
//          data: {},
//          success: function (res) {
//            loadingInstance.close()
//            if (res.code === 0) {
//              sessionStorage.setItem('jwt', '')
//              sessionStorage.setItem('username', '')
//              self.currentUserInfo = ''
//              self.$message.success('已退出')
//              self.$router.replace('/')
//              self.$router.go(0)
//            } else {
//              self.$message.error(res.msg)
//            }
//          },
//          error: function () {
//            loadingInstance.close()
//            self.$message.error('网络错误，请重试')
//          }
//        })
//      },
    },
    mounted: function () {
//      this.initData()
    }
  }
</script>
<style>
  #userManage {
    text-align: center;
    height: 1000px;
    width: 1000px;
    z-index: 3;
    position: relative;
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
</style>
