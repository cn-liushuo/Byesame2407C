<template>
  <div class="login">
    <!-- Register -->
    <h1>注册</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="ruleForm.passWord" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="管理员姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入管理员姓名"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="ruleForm.role" placeholder="请选择角色">
          <el-option v-for="(item, index) in role" :key="index" :label="item.role" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button type="primary" @click="toLogin">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from "@/api/register"
export default {
  data() {
    return {
      ruleForm: {
        userName: '',
        passWord: '',
        name: '',
        role: null
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        passWord: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '管理员姓名不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ]
      },
      role: [
        {
          role: '超级管理员',
          value: 1
        },
        {
          role: '管理员',
          value: 2
        },
        {
          role: '普通用户',
          value: 3
        }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          register(this.ruleForm).then(res => {
            console.log(res,'res')
          }).catch(err => {
            console.log(err,'err')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 去登录页
    toLogin() {
      this.$router.push('/login')
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

    .el-select {
      width: 100%;
    }
  }
}
</style>