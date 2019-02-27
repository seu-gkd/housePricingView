<template>
  <div id="changePass">
    <div class="road">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="my-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="100px">
        <el-form-item label="原密码" prop="old_password">
          <el-input v-model="ruleForm.old_password" placeholder="请输入原密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input v-model="ruleForm.new_password" placeholder="请输入新密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码" prop="renew_password">
          <el-input v-model="ruleForm.renew_password" placeholder="请重复输入新密码" type="password"
                    @blur="validateNewPass()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePass()">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  import jQuery from 'jquery'
  import md5 from 'md5'

  export default {
    name: 'changePass',
    data: function () {
      return {
        ruleForm: {
          old_password: '',
          new_password: '',
          renew_password: ''
        },
        rules: {
          old_password: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          new_password: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          renew_password: [
            {required: true, message: '请重复输入新密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      validateNewPass() {
        var newPassword = this.ruleForm.new_password
        var renewPassword = this.ruleForm.renew_password
        if (newPassword !== renewPassword) {
          this.$message({
            message: '两次输入的新密码不一致！',
            type: 'warning'
          })
        }
      },
      changePass() {
        var oldPassword = this.ruleForm.old_password
        var newPassword = this.ruleForm.new_password
        var renewPassword = this.ruleForm.renew_password
        if (oldPassword.replace(/\s/g, '') === '') {
          this.$message({
            message: '请输入原密码，或原密码中存在非法字符！',
            type: 'warning'
          })
          return
        }
        if (newPassword.replace(/\s/g, '') === '') {
          this.$message({
            message: '请输入新密码，或新密码中存在非法字符！',
            type: 'warning'
          })
          return
        }
        if (newPassword !== renewPassword) {
          this.$message({
            message: '两次输入的新密码不一致！',
            type: 'warning'
          })
          return
        }
        let self = this
        this.$confirm('是否确定修改密码？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let loadingInstance = Loading.service({fullscreen: true})
          jQuery.ajax({
            type: 'POST',
            url: this.$store.state.INTERFACE.CHANGEPASS,
            data: {
              newPassword: md5(newPassword),
              username: JSON.parse(document.cookie).username,
              oldPassword: md5(oldPassword),
              hospital: this.$store.state.hospital
            },
            success: function (res) {
              loadingInstance.close()
              if (res.code === 0) {
                self.$message({
                  message: '修改密码成功！',
                  type: 'success'
                })
              } else {
                self.$message({
                  message: '修改密码失败：' + res.message + '！',
                  type: 'error'
                })
              }
            },
            error: function (res) {
              loadingInstance.close()
              self.$message({
                message: '修改密码失败！',
                type: 'error'
              })
            }
          })
        })
      },
      reset() {
        this.ruleForm.old_password = ''
        this.ruleForm.new_password = ''
        this.ruleForm.renew_password = ''
      }
    }
  }
</script>

<style>
  #changePass {
    padding: 20px 20px;
  }

  #changePass .el-form-item__content {
    width: 50%;
    min-width: 200px;
  }
</style>
