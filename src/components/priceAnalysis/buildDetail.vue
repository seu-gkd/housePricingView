<template>
  <div class="sub-route">

    <section class="app-section" id="buildDetail">
    </section>
  </div>
</template>
<script>
  import {Loading} from 'element-ui'
  import echarts from 'echarts'

  export default {
    name: 'buildDetail',
    data: function () {
      return {
        buildInfo: '',
      }
    },
    methods: {
      //初始化楼盘数据
      initData() {
        let id = ''
        if (this.$route.params.id && this.$route.params.id !== '') {
          id = this.$route.params.id
        }
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/buildingPrice/infodata/info',
          data: {
            id: id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.buildInfo = res.data
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('查询错误,请稍后重试')
          }
        })
      },
      //收藏该楼盘
      collectBuilding() {
        let jwt = sessionStorage.getItem('jwt')
        var self = this
        let loadingInstance = Loading.service({fullscreen: true});

        jQuery.ajax({
          type: 'get',
          url: this.$store.state.Server + '/PersonUser/userBuilding/collect',
          data: {
            token: jwt,
            buildId: self.buildInfo.id
          },
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.$message.success('收藏成功')
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('操作错误,请稍后重试')
          }
        })
      }
    },
    mounted() {
      this.initData();
    }
  }
</script>
<style>
  #buildDetail {
    text-align: center;
    height: 100%;
    z-index: 4;
    width: 100%;
    position: fixed;
  }
</style>
