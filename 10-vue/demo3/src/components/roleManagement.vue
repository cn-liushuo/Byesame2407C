<template>
  <div>
    <!-- roleManagement -->
    <div class="controls">
      <div class="input">
        <el-input v-model="checkInfo.id"></el-input>
      </div>
      <div class="btn">
        <el-button @click="checkRole">查询角色</el-button>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" max-height="590">
        <el-table-column prop="id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="role" label="角色" align="center">
          <template v-slot="scoped">
            <el-tag v-if="scoped.row.role === 0">超级管理员</el-tag>
            <el-tag type="success" v-else-if="scoped.row.role === 1">管理员</el-tag>
            <el-tag type="info" v-else>普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="lastLoginAt" label="最后登录时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scoped">
            <el-button size="small" type="success" @click="editRole(scoped.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRole(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="id" prop="roleID" v-if="this.title === '编辑角色'">
            <el-input v-model="ruleForm.id" placeholder="请输入id" disabled></el-input>
          </el-form-item>
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
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm('ruleForm')">{{ title }}</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="pagination">
      <pagination :total="total" :page="queryInfo.page" :rows="queryInfo.rows" @setSize="setSize" @setPage="setPage">
      </pagination>
    </div>
  </div>
</template>

<script>
import { admin, addRole, checkRole, editRole, deleleRole } from '@/api/role'
import pagination from "@/components/pagination"
export default {
  data() {
    return {
      total: null,
      checkInfo: {
        id: null
      },
      queryInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      dialogVisible: false,
      title: '',
      ruleForm: {
        userName: '',
        passWord: '',
        name: '',
        role: null,
        id: null
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
    getList() {
      admin(this.queryInfo).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.count
        }
      })
    },
    addRole() {
      this.title = '添加角色'
      this.ruleForm.userName = ""
      this.ruleForm.passWord = ""
      this.ruleForm.name = ""
      this.ruleForm.role = null
      this.dialogVisible = true
    },
    deleteRole(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleleRole(id).then(res => {
          console.log(res)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editRole(ruleForm) {
      this.title = '编辑角色'
      this.dialogVisible = true
      this.ruleForm = ruleForm
    },
    checkRole() {
      checkRole(this.checkInfo.id).then(res => {
        this.tableData = []
        this.tableData.push(res.data.data)
      })
    },
    handleClose(done) {
      done()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          if (this.title === '添加角色') {
            addRole(this.ruleForm).then(res => {
              if (res.data.code === 200) {
                this.dialogVisible = false,
                  this.getList()
              }
            })
          } else {
            editRole(this.ruleForm).then(res => {
              if (res.data.code === 200) {
                this.dialogVisible = false,
                  this.getList()
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    setSize(val) {
      this.queryInfo.rows = val
      this.getList()
    },
    setPage(val) {
      this.queryInfo.page = val
      this.getList()
    }
  },
  created() {
    this.getList()
  },
  components: {
    pagination
  }
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;

  .input {
    padding-right: 10px;
  }
}

.table {
  padding-top: 20px;
}

.dialog {
  .el-select {
    width: 100%;
  }
}

.pagination {
  text-align: right;
  padding-top: 20px;
}
</style>