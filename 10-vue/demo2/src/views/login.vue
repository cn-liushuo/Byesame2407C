<template>
  <div>
    <div class="text" id="login"></div>
    <div class="box">
      <h1>登录</h1>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Particle } from "jparticles";
import { login } from "@/api/login";
export default {
  mounted() {
    new Particle("#login", {
        color: '#25bfff',
    lineShape: 'cube',
    range: 2000,
    proximity: 100,
    // 开启视差效果
    parallax: true,
    });
  },
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "admin123",
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        // 如果表单校验通过
        if (valid) {
          // 调接口 登录api
          // login(this.ruleForm).then(res => {
          //     console.log(res);
          //         如果成功
          //     if (res.code == 200) {
          // 存token
          //         localStorage.setItem('token', res.token)
          //         // 跳转到首页
          //         this.$router.push({
          //             path: "/home"
          //         })
          //     }
          // })
          // 调用vuex中 封装好的登录方法goLogin，并传参
          try{
             await this.$store.dispatch("user/goLogin", this.ruleForm);
          } catch (err){
            console.log(err)
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
#login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  box-shadow: 1px 3px 10px 1px rgba(0, 0, 0, 0.8);
  background-color: #fff;
  padding-right: 40px;
  border-radius: 5%;
  z-index: 99;
  h1 {
    padding: 40px 0 30px;
  }
}
</style>