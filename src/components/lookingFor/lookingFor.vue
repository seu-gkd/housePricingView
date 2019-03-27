<template>
  <div class="sub-route">
    <section class="app-section" id="lookingFor">
      <div style="width:100%;height: 100%;">
        <div class="mainContent">
          <el-card>
            <div style="float: left;">

            </div>
            <div class="selectClass"><span class="selectTitle">地区</span><span class="selectOption"> <el-cascader
              placeholder="城市选择"
              :options="options"
              filterable
              change-on-select
              v-model="selected.region"
            ></el-cascader>
              <!--<el-button type="warning" @click="search" round>查询</el-button>-->
            </span></div>
            <div class="selectClass" style="vertical-align: middle">
              <span class="selectTitle">类型</span>
              <span class="selectOption" style="padding-left: -30px">
                <el-checkbox style="margin-left: 0px;margin-right: 30px;" :indeterminate="isIndeterminate1"
                             v-model="checkAllTypes" @change="handleSelectAllTypes">全选</el-checkbox>
                <el-checkbox-group
                  @change="handleSelectType"
                  v-model="selected.buildType"
                >

                    <el-checkbox style="margin-left: 0px;margin-right: 30px;margin-top:-7px" v-for="item in buildTypes"
                                 :label="item"
                                 :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </span>
            </div>
            <div class="selectClass">
              <div style="width: 3rem;display: inline" class="selectTitle">标签</div>
              <div class="selectOption">
                <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAllTags" @change="handleSelectAllTags">
                  全选
                </el-checkbox>
                <el-checkbox-group
                  v-model="selected.buildTag"

                  @change="handleSelectTag"
                  style="width: 95%;">


                  <el-checkbox style="display: inline-block" v-for="item in tags" :label="item" :key="item">{{item}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="line"></div>
            <el-row>
              <el-col :span="12" style="padding-left: 5%">
                <div class="first-pay-nav">按单价<i>(元/平)</i></div>
                <div style="width:40%;">
                  <ul class="list-container" style="left: 0px;">
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 12px; width: 7.5px"></li>
                    <li class="list-item" style="height: 12px; width: 7.5px"></li>
                    <li class="list-item" style="height: 28px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 32px; width: 7.5px"></li>
                    <li class="list-item" style="height: 44px; width: 7.5px"></li>
                    <li class="list-item" style="height: 44px; width: 7.5px"></li>
                    <li class="list-item" style="height: 60px; width: 7.5px"></li>
                    <li class="list-item" style="height: 40px; width: 7.5px"></li>
                    <li class="list-item" style="height: 60px; width: 7.5px"></li>
                    <li class="list-item" style="height: 52px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 28px; width: 7.5px"></li>
                    <li class="list-item" style="height: 36px; width: 7.5px"></li>
                    <li class="list-item" style="height: 20px; width: 7.5px"></li>
                    <li class="list-item" style="height: 24px; width: 7.5px"></li>
                    <li class="list-item" style="height: 28px; width: 7.5px"></li>
                    <li class="list-item" style="height: 24px; width: 7.5px"></li>
                    <li class="list-item" style="height: 28px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 36px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 8px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 12px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 8px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 8px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                  </ul>
                </div>
                <div style="margin-top:90px">
                  <el-slider
                    class="priceSlider"
                    @change="handlePriceArea"
                    v-model="selected.priceRange"
                    range

                    :max="100000">
                  </el-slider>
                </div>
                <div style="text-align: left;margin-bottom: 20px">
                  <span class="priceSelectLabel">拖动按钮选择售价</span>
                  <el-input class="priceSelectInput" v-model="selected.priceRange[0]"></el-input>
                  ~&nbsp;
                  <el-input class="priceSelectInput" v-model="selected.priceRange[1]"></el-input>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="first-pay-nav">按面积<i>(平)</i></div>
                <div style="width:40%;">
                  <ul class="list-container" style="left: 0px;">
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 12px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 12px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 32px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 44px; width: 7.5px"></li>
                    <li class="list-item" style="height: 6px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 60px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 36px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 24px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 24px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 16px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 9px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 8px; width: 7.5px"></li>
                    <li class="list-item" style="height: 3px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                    <li class="list-item" style="height: 0px; width: 7.5px"></li>
                    <li class="list-item" style="height: 4px; width: 7.5px"></li>
                  </ul>
                </div>
                <div style="margin-top:90px">
                  <el-slider
                    class="priceSlider"

                    v-model="selected.areaRange"
                    range
                    @change="handlePriceArea"
                    :max="1000">
                  </el-slider>
                </div>
                <div style="text-align: left;margin-bottom: 20px">
                  <span class="priceSelectLabel">拖动按钮选择面积</span>
                  <el-input class="priceSelectInput" v-model="selected.areaRange[0]"></el-input>
                  ~&nbsp;
                  <el-input class="priceSelectInput" v-model="selected.areaRange[1]"></el-input>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
            <el-row>
              <el-col :span="24">
                <div class="buildingList">
                  <div class="buildingItem" v-for="item in buildingsByParams.buildings" :key="item.id"
                  >
                    <img class="buildImg"
                         style="background-color:#ebb563"
                         :src="'https://ke-image.ljcdn.com/'+item.url+'!m_fill,w_1000,l_fbk'"
                    />
                    <div class="buildContent" @click="itemDetail(item.id)">
                      <el-row style="width:100%">
                        <el-col :span="21">
                          <div>
                            <div class="buildName">{{item.xiaoqu}}</div>
                            <div class="resblock-location">
                              <span>{{item.region}}</span>
                              <i class="split">/</i>
                              <span>{{item.propertyaddress}}</span>
                            </div>
                            <div class="resblock-area">
                              <span>建面 {{Math.round(item.area)}}㎡</span>
                            </div>
                            <div class="resblock-tag">
                              <el-tag class="featureTag" v-for="(it,index) in item.projectfeatures.split(' ')"
                                      :key="index"
                                      type="warning">{{it}}
                              </el-tag>
                              <!--<span  v-for="(it,index) in item.projectfeatures.split(' ')" :key="index">-->
                              <!--{{it}}-->
                              <!--</span>-->

                            </div>

                          </div>
                        </el-col>
                        <el-col :span="3">
                          <div class="resblock-price">
                            <div class="main-price">

                              <span class="number1">{{item.price}}</span>
                              <span class="desc">&nbsp;元/平(均价)</span>

                            </div>


                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="0">

              </el-col>
            </el-row>

            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="buildingsByParams.pageNo"
              :page-sizes="[5,10, 20, 30]"
              :page-size="buildingsByParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              class="buildingsPagincation"
              :total="buildingsByParams.totalRecord">
            </el-pagination>
          </el-card>
        </div>
        <footer class="main-page-footer">
          © Copyright©2010-2019 GKD版权所有&nbsp;
          <div><a target="_blank"
                  href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802024019"
                  style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin: 0 auto;text-align: center;">

          </a></div>
        </footer>
      </div>


    </section>
  </div>
</template>
<script>
  import {Loading} from 'element-ui'
  import echarts from 'echarts'

  export default {
    name: 'lookingFor',
    data: function () {
      return {
        isIndeterminate1: false,
        isIndeterminate2: false,
        checkAllTypes: false,
        checkAllTags: false,
        options: [],
        buildTypes: ['住宅', '商业', '写字楼', '别墅', '底商', '酒店式公寓', '公寓', '商铺'],
        tags: ['绿化率高', '近地铁', '现房', '品牌房企', '花园洋房', '低密度', '车位充足', '带花园', '外环外', '小户型', '万科认证', '复式', '现竞房', '法式独栋', '湖畔别墅', '带飘窗', '精装', '小高屋', '旅游地产', '生态宜居', '养生度假', '刚需房', '主卧带卫', '厨卫不对门', '通透户型', '江景地产', '老盘加推', '在售', '湖景地产', '动静分离', '户型方正', '大社区', '品牌开发商', '成熟小区', '景观居所', '塔楼', '普通住宅', '双卫', '联排别墅', '山景地产', '经济住宅', '其他'],
        //楼盘列表信息
        buildingsByParams: {
          regionName: '',
          buildings: [],
          pageNo: 1,
          pageSize: 10,
          totalPage: 0,
          totalRecord: 0
        },
        selected: {
          region: [],
          buildType: [],
          buildTag: [],
          areaRange: [0, 1000],
          priceRange: [0, 100000],
        }
      }
    },
    methods: {
      handleSelectType(val) {
        this.checkAllTypes = (val.length === this.buildTypes.length);
        this.isIndeterminate1 = val.length > 0 && val.length < this.buildTypes.length
        this.getBuildingsByParams()
      },
      handleSelectTag(val) {
        this.checkAllTags = (val.length === this.tags.length);
        this.isIndeterminate2 = val.length > 0 && val.length < this.tags.length
        this.getBuildingsByParams()
      },
      handleSelectAllTypes(val) {
        this.selected.buildType = val ? this.buildTypes : [];
        this.checkAllTypes = val;
        this.isIndeterminate1 = false
        this.getBuildingsByParams()
      },
      handleSelectAllTags(val) {
        this.selected.buildTag = val ? this.tags : [];
        console.log(val)
        this.checkAllTags = val;
        this.isIndeterminate2 = false
        this.getBuildingsByParams()
      },
      handlePriceArea() {
        this.getBuildingsByParams()
      },
      itemDetail(id) {
        console.log('asd')
        this.$router.push({
          path: '/lookingFor/buildDetail',
          query: {
            id: id
          }
        },)
      },
      handleData() {


        if (this.selected.region.length === 1) {
          return {
            city: this.selected.region[0],
            pageNo: this.buildingsByParams.pageNo,
            pageSize: this.buildingsByParams.pageSize,
            startPrice: this.selected.priceRange[0],
            endPrice: this.selected.priceRange[1],
            startArea: this.selected.areaRange[0],
            endArea: this.selected.areaRange[1],
            projectFeaturesList: this.selected.buildTag,
            propertyTypeList: this.selected.buildType

          }
        } else
          return {
            region: this.selected.region[1],
            city: this.selected.region[0],
            pageNo: this.buildingsByParams.pageNo,
            pageSize: this.buildingsByParams.pageSize,
            startPrice: this.selected.priceRange[0],
            endPrice: this.selected.priceRange[1],
            startArea: this.selected.areaRange[0],
            endArea: this.selected.areaRange[1],
            projectFeaturesList: this.selected.buildTag,
            propertyTypeList: this.selected.buildType

          }

      },
      //根据多个条件获取楼盘列表
      getBuildingsByParams() {
        if (this.selected.region.length <= 1) {
          this.$message.warning('请选择到市及市以下级别')
          return
        }
        if (this.selected.buildType.length === 0) {
          this.$message.warning('请至少选择一个类型')
          return
        }
        if (this.selected.buildTag.length === 0) {
          this.$message.warning('请至少选择一个标签')
          return
        }

        var self = this
        let loadingInstance = Loading.service({target: document.getElementById('buildingBinding')});

        jQuery.ajax({
          type: 'post',
          traditional: true,
          url: this.$store.state.Server + '/buildingPrice/infodata/searchByMultiInfo',
          data: this.handleData(),
          success: function (res) {
            loadingInstance.close()
            self.buildingsByParams.regionpageNo = []
            self.buildingsByParams.pageSize = []
            self.buildingsByParams.totalPage = []
            self.buildingsByParams.totalRecord = []
            self.buildingsByParams.buildings = []
            if (res.code === 0) {
              self.buildingsByParams.regionpageNo = res.data.pageNo
              self.buildingsByParams.pageSize = res.data.pageSize
              self.buildingsByParams.totalPage = res.data.totalPage
              self.buildingsByParams.totalRecord = res.data.totalRecord
              self.buildingsByParams.buildings = res.data.results
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
      //获取省市区字典表函数
      getDictData() {
        let self = this
        let loadingInstance = Loading.service({target: document.getElementById('regionSelect')});
        jQuery.ajax({
          type: 'GET',
          headers: {
//            Authorization: localStorage.getItem('token')
          },
          url: this.$store.state.Server + '/buildingPrice/infodata/getAllData',
          data: {},
          success: function (res) {
            loadingInstance.close()
            if (res.code === 0) {
              self.options = res.data;
            } else {
              self.$message.error(res.desc)
            }
          },
          error: function () {
            loadingInstance.close()
            self.$message.error('网络错误，请重试')
          }
        })
      },
    },


    mounted: function () {
      this.getDictData()
    }
  }
</script>
<style>

  #lookingFor .line {
    width: 1px;
    height: 60px;
    background-color: white;
    margin-left: 10rem;
  }

  #lookingFor .optionTitle {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  #lookingFor .selectOption {
    font-size: 12px;
    margin-top: -27px;
    color: #394043;
    line-height: 27px;
    margin-left: 30px;
    font-family: "Hiragino Sans GB";

  }

  #lookingFor .el-checkbox-group {
    display: inline-block;
  }

  #lookingFor .selectClass {
    text-align: left;
    margin-bottom: 20px;
  }

  #lookingFor .selectTitle {
    width: 4.5%;
    font-weight: 700;
    line-height: 27px;
    font-size: 12px;
    font-family: "Hiragino Sans GB";
    color: #333;
  }

  #lookingFor {
    text-align: center;
    height: 100%;
    z-index: 3;
    flex: 1;
    overflow: scroll;
  }

  #lookingFor .mainContent {
    margin: 0 auto;
    /*height: 100%;*/
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 65px;
    width: 80%;
  }

  #lookingFor .regionInfoCard {
    background-color: #ebb563;
    height: 6.5rem;
    text-align: left;
    color: white;
    font-size: 22px;
    margin-bottom: 15px;
    vertical-align: middle
  }

  #lookingFor .list-container {
    position: relative;
    height: 60px;
    margin: 0;
    width: 300px;
    padding: 0;
    font-size: 0;
  }

  #lookingFor .list-item {
    background: #ebb56390;
    display: inline-block;
    vertical-align: bottom;
  }

  #lookingFor .priceSlider {
    width: 300px;
    /*background: #ebb563;*/
    margin: 0;
    padding: 0;

  }

  #lookingFor .el-slider__bar {
    background-color: #ebb563;
  }

  #lookingFor .el-slider__runway .el-slider__bar {
    background-color: #ebb563;
  }

  #lookingFor .el-slider__runway {
    margin-top: 0;
  }

  #lookingFor .el-slider__button {
    border: 2px solid #ebb563;
  }

  #lookingFor .first-pay-nav {
    float: left;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    text-align: left;
    display: block;
  }

  #lookingFor .first-pay-nav i {
    margin-left: 5px;
    font-size: 12px;
    color: #666;
    vertical-align: bottom;
    text-decoration: none;
    font-weight: 300;
  }

  #lookingFor .priceSelectLabel {
    font-size: 12px;
    color: #9c9fa1;
    vertical-align: bottom;
    margin-right: 10px;
    user-select: none;
  }

  #lookingFor .priceSelectInput .el-input__inner {
    text-align: center;
    width: 80px;
    font-size: 13px;
    height: 30px;
  }

  #lookingFor .priceSelectInput {
    width: 85px;

  }

  #lookingFor .line {
    margin: 0 auto;
    margin-bottom: 20px;
    width: 98%;
    height: 1px;
    background-color: #e4e6f0;
  }

  #lookingFor .el-checkbox {
    width: 94px;
    vertical-align: middle;
    font-size: 12px;
    overflow-x: hidden;
    margin-left: 30px;

  }

  #lookingFor .is-checked {
    color: #ebb563;
  }

  #lookingFor .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #ebb563;
  }

  #lookingFor .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ebb563;
    border-color: #ebb563;
  }

  #lookingFor .buildingList {
    width: 100%;
    height: auto;
  }

  #lookingFor .buildingItem {
    text-align: left;
    display: inline-block;
    width: 100%;
    /*height: 2rem;*/
    margin-bottom: 40px;
  }

  #lookingFor .buildImg {
    width: 18rem;
    height: 11rem;
    display: inline-block;

  }

  #lookingFor .buildContent {

    display: inline-block;
    margin-left: 1rem;
    cursor: pointer;
    height: 10rem;
    width: 25rem;
  }

  #lookingFor .buildName {
    cursor: pointer;
    display: inline-block;
    max-width: 75%;
    font-size: 20px;
    line-height: 20px;
    vertical-align: middle;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  #lookingFor .resblock-location {
    margin-top: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666
  }

  #lookingFor .split {

    margin: 0 8px;
    font-size: 14px;
    color: #ccc;
  }

  #lookingFor .resblock-area {
    height: 16px;
    color: #666;
    margin-top: 16px;
  }

  #lookingFor .resblock-tag {
    margin-top: 18px;
  }

  #lookingFor .resblock-price {
    position: relative;

    right: 0;
  }

  #lookingFor .number1 {
    font-family: Tahoma-Bold;
    font-size: 28px;
    line-height: 28px;
    color: red;
    vertical-align: bottom;
  }

  #lookingFor .desc {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #d44d38;
    vertical-align: bottom;
  }

  #lookingFor .resblock-tag span {

    display: inline-block;
    height: 30px;
    margin-right: 10px;
    padding: 0 12px;
    line-height: 30px;
    font-size: 12px;
    /*color: #849aae;*/
    /*background: rgba(132, 154, 174, .1)*/
  }

  #lookingFor {
    -webkit-font-smoothing: antialiased;
  }

  #lookingFor .buildingsPagincation {
    height: 2rem;
  }

</style>
