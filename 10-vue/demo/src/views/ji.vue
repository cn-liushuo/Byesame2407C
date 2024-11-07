<template>
    <div>
        <h1>姬</h1>
        <el-button :disabled="ok" type="primary">主要按钮</el-button>
        <el-button type="primary" @click="handle" :loading="show">加载中</el-button>

        <el-radio v-model="radio" v-for="(item, index) in sex" :key="index" :label="item.value">{{ item.text }}
        </el-radio>

        <el-input v-model="input" placeholder="请输入内容" clearable show-password
            prefix-icon="el-icon-user-solid"></el-input>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="500px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ok: true,
            show: false,
            radio: 1,
            sex: [
                {
                    value: 0,
                    text: "男",
                },
                {
                    value: 1,
                    text: "女",
                },
                {
                    value: 2,
                    text: "未知",
                },
            ],
            input: "",
            ruleForm: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
                password: "",
            },
            rules: {
                name: [
                    // trigger 什么时候校验 blur 失去焦点校验 change 改变的时候校验
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur",
                    },
                ],
                region: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "change",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请选择活动区域",
                        trigger: "blur",
                    },
                ],
            },
        }
    },
    methods: {
        handle() {
            this.show = true
            // 模拟接口
            setTimeout(() => {
                this.show = false
            }, 2000)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 调接口
                    alert("submit!")
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    },
}
</script>

<style scoped lang="scss">
::v-deep input[aria-hidden="true"] {
    display: none !important;
}
</style>
