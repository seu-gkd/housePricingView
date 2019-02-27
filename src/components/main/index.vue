<template>
  <section class="app-section" id="index">
    <el-alert
      title="欢迎使用【浦口中医院智慧党建管理平台】"
      type="success"
      description="友情提醒：如果您想获得更佳的用户体验，我们建议您升级浏览器！如果您已经是最新版，请忽略本条提示！"
      show-icon
      close-text="知道了"
      style="margin-bottom:25px;">
    </el-alert>
    <div style="margin-bottom:20px;display:flex;display:-webkit-flex;">
      <img :src="$store.state.hospitalLogo" style="width:80px;height:80px;">
      <div style="flex:1;-webkit-flex:1;margin-left:20px;">
        <span style="font-size:17px;opacity:.7;line-height:45px;">南京市浦口中医院</span><br>
        <span style="font-size:15px;opacity:.45;">南京市浦口中医院</span>
        <span style="float:right;line-height:20px;margin-top:-20px;opacity:.40;font-size:14px;">欢迎使用浦口中医院智慧党建管理平台</span>
      </div>
    </div>
    <!--<div>-->
    <!--<el-row>-->
    <!--<el-col :span="5" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">-->
    <!--<el-card :body-style="{padding:'0px'}">-->
    <!--<div style="padding:10px;text-align:center;">-->
    <!--<div style="font-size:40px;height:80px;line-height:80px;color:#C6D0D4;">{{index}}</div>-->
    <!--<div style="font-size:14px;height:30px;line-height:30px;">紧急事件</div>-->
    <!--</div>-->
    <!--</el-card>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</div>-->
    <footer>
      CopyRight &copy; 2018 南京睿恒智晟科技有限公司 ChinaRaising
    </footer>
    <!-- <transition name="slide-fade">
        <router-view></router-view>
    </transition> -->
  </section>
</template>

<script>
  // import { Loading } from 'element-ui'

  export default {
    name: 'index',
    data: function () {
      return {}
    },
    methods: {}
  }
</script>

<style>
  #index footer {
    position: absolute;
    width: 100%;
    height: 60px;
    line-height: 60px;
    color: #999;
    font-size: 14px;
    left: 0;
    bottom: 0;
    text-align: center;
  }

  #index .clearfix:before,
  #index .clearfix:after {
    display: table;
    content: "";
  }
</style>
