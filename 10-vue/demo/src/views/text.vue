<template>
    <div class="text">
        <h1>text</h1>
        <div class="login">
            <h1>登陆</h1>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input show-password v-model="ruleForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// 导入 axios
// import axios from 'axios'
// import { login } from '@/api/login'

export default {
    data() {
        return {
            ruleForm: {
                userName: '',
                passWord: ''
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调接口
                    // axios.post('http://wish.byesame.com/login', this.ruleForm, {
                    //     headers: {
                    //         "Content-Type": "application/x-www-form-urlencoded"
                    //     },
                    //     timeout: 5000 // 设置超时时间
                    // }).then(res => {
                    //     console.log(res)
                    //     if (res.data.code === 200) {
                    //         this.$message({
                    //             message: '恭喜你登陆成功',
                    //             type: 'success'
                    //         })
                    //     }
                    // })

                    // login(this.ruleForm).then(res => {
                    //     console.log(res)

                    // })

                    // axios.get(url,params)

                    this.$store.dispatch('user/goLogin', this.ruleForm)
                    
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>

<style scoped lang="scss">
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: #fff;
    box-shadow: 1px 1px 5px #000;
    padding: 30px;
    padding-right: 40px;
}
</style>