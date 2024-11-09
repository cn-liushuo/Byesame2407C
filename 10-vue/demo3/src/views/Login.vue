<template>
  <div class="login">
    <!-- Login -->
    <h1>登录</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="ruleForm.passWord" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button type="primary" @click="torRegister">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/login"
export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          login(this.ruleForm).then(res => {
            if (res.data.code === 200) {
              localStorage.setItem('token', res.data.data.token)
              this.$router.push({
                path: '/home/roleManagement'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 去注册页
    torRegister() {
      this.$router.push('/register')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .el-form {
    padding-right: 100px;
  }
}
</style>