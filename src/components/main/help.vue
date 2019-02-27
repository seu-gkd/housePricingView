<template>
  <section class="app-section" id="help">
    <div>
      <div class="road">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>帮助</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding:20px 0;">
        <el-row :gutter="30">
          <el-col :span="10">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>常见问题</span>
                <el-tooltip class="item" effect="dark" placement="top-end">
                  <span slot="content">根据系统真实情况和用户反馈，<br>整理的一些常见问题</span>
                  <i class="el-icon-question" style="float:right;color:#aaa;cursor:pointer;"></i>
                </el-tooltip>
              </div>
              <div class="container-row" v-for="i in solutionList">
                <span class="row-title">{{i.title}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="14">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="color:#67C23A;">我要提问</span>
                <el-tooltip class="item" effect="dark" placement="top-end">
                  <span slot="content">如果常见问题列表中没有您的问题，<br>欢迎您向我们提交问题或建议</span>
                  <i class="el-icon-question" style="float:right;color:#aaa;cursor:pointer;"></i>
                </el-tooltip>
              </div>
              <div>
                <el-form :model="helpForm" :rules="helpRule" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                         size="small">
                  <el-form-item label="问题标题" prop="title">
                    <el-input v-model="helpForm.title"></el-input>
                  </el-form-item>
                  <el-form-item label="问题描述" prop="body">
                    <el-input type="textarea" v-model="helpForm.body" :rows="6" resize="none"></el-input>
                  </el-form-item>
                  <el-form-item label="问题截图">
                    <el-upload
                      :action="$store.state.uploadImgServer"
                      :headers="{'Authorization': $store.state.Authorization}"
                      list-type="picture-card"
                      :file-list="fileList"
                      :before-upload="beforePictureCardUpload"
                      :on-success="handlePictureCardSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" size="tiny" class="picture-preview">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <div style="display;flex;display:-webkit-flex;">
                      <el-select v-model="helpForm.contactWay" placeholder="请选择" style="width:100px;">
                        <el-option v-for="i in contactWays" :value="i.key" :key="i.key" :label="i.name">{{i.name}}
                        </el-option>
                      </el-select>
                      <el-input v-model="helpForm.contact" placeholder="欢迎留下您的联系方式"
                                style="flex:1;-webkit-flex:1;"></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="系统评价">
                    <el-rate
                      v-model="helpForm.rate"
                      show-text
                      :texts="['极差', '失望', '一般', '满意', '惊喜']"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                    <span style="line-height:12px;font-size:12px;color:#67C23A;">欢迎您对我们的系统评价打分！</span>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
  // import { Loading } from 'element-ui'

  export default {
    name: 'help',
    data: function () {
      return {
        helpForm: {
          title: '',
          body: '',
          pictureList: [],
          contactWay: 'mobile',
          contact: '',
          rate: null
        },
        fileList: [],
        helpRule: {
          title: [
            {required: true, message: '请填写问题标题', trigger: 'blur'}
          ],
          body: [
            {required: true, message: '请填写问题描述', trigger: 'blur'}
          ]
        },
        contactWays: [
          {
            key: 'mobile',
            name: '手机'
          },
          {
            key: 'phone',
            name: '电话'
          },
          {
            key: 'email',
            name: '邮箱'
          },
          {
            key: 'qq',
            name: 'QQ'
          },
          {
            key: 'wechat',
            name: '微信'
          }
        ],
        dialogVisible: false,
        dialogTitle: '',
        dialogImageUrl: '',
        solutionList: [
          {
            title: '如何修改账号密码？'
          },
          {
            title: '如何分配账号？'
          },
          {
            title: '怎么进行退款？'
          },
          {
            title: '怎么更新文章？'
          },
          {
            title: '如何添加或删除科室、医生？'
          },
          {
            title: '如何修改账号密码？'
          },
          {
            title: '修改了信息为什么在手机上不生效？'
          },
          {
            title: '智能机器人为什么不能回复链接？'
          }
        ]
      }
    },
    methods: {
      resetForm() {
        this.helpForm = {
          title: '',
          body: '',
          pictureList: [],
          contactWay: 'mobile',
          contact: '',
          rate: null
        }
        this.fileList = []
        this.$refs['ruleForm'].resetFields()
      },
      beforePictureCardUpload(file) {
        let _type = file.type
        if (_type !== 'image/png' && _type !== 'image/jpg' && _type !== 'image/jpeg') {
          this.$message.error('只能上传PNG/JPG/JPEG格式的图片文件')
          return false
        }
        let _size = file.size
        if (_size > 2097152) {
          this.$message.error('图片文件大小不能超过2M')
          return false
        }
      },
      handlePictureCardSuccess(res, file) {
        // console.log(file)
        if (res.code === 0) {
          this.helpForm.pictureList.push({
            url: this.$store.state.fileDIR + res.data,
            name: file.name,
            uid: file.uid
          })
        } else {
          this.$message.error('图片上传失败')
        }
      },
      handleRemove(file, fileList) {
        let self = this
        this.helpForm.pictureList.forEach((item, index) => {
          if (item.uid === file.uid) {
            self.helpForm.pictureList.splice(index, 1)
            return false
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogTitle = file.name
        this.dialogVisible = true
      }
    }
  }
</script>

<style>
  #help .el-header {
    padding: 0;
    height: auto !important;
  }

  #help .el-main {
    padding: 0;
  }

  #help .container-header {
    padding: 10px 20px;
    color: #fff;
  }

  #help .container-main {
    padding: 0;
  }

  #help .container-row {
    padding: 12px 0;
    border-top: solid 1px #e6ebf5;
    font-size: 14px;
    color: #777;
    display: flex;
    display: -webkit-flex;
  }

  #help .container-row:first-child {
    border-top: 0;
  }

  #help .row-title {
    flex: 1;
    -webkit-flex: 1;
    cursor: pointer;
  }

  #help .container-row .row-title:hover {
    text-decoration: underline;
  }

  #help .row-time {
    display: inline-block;
    padding-left: 30px;
    text-align: right;
  }

  #help .clearfix:before,
  #help .clearfix:after {
    display: table;
    content: "";
  }

  #help .clearfix:after {
    clear: both
  }

  #help .box-card {
    width: 100%;
  }

  #help .picture-preview .el-dialog__body {
    padding-top: 0;
  }
</style>
