<template>
  <div>
    <!-- wishingManagement -->
    <div class="btn">
      <el-input style="width: 30%;" v-model="checkID" placeholder="请输入查询id"></el-input>
      <el-button @click="checkWish">查询</el-button>
      <el-button type="primary" @click="addWish">添加</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" max-height="590">
        <el-table-column prop="id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="content" label="内容" align="center">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scoped">
            <el-button size="small" type="success" @click="editWish(scoped.row)" disabled>编辑</el-button>
            <el-button size="small" type="danger" @click="deleteWish(scoped.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog :title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="id" prop="id">
            <el-input v-model="ruleForm.id" placeholder="请输入id" v-if="title === '编辑'" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input v-model="ruleForm.content" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role" v-if="title === '添加'">
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
      <pagination :total="total" :page="listInfo.page" :rows="listInfo.rows" @setSize="setSize" @setPage="setPage">
      </pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination.vue'
import { list, addWish, checkWish,editWish, deleteWish } from '@/api/wish.js'
export default {
  name: 'Byesame2407CWishingManagement',

  data() {
    return {
      listInfo: {
        page: 1,
        rows: 10
      },
      tableData: [],
      total: null,
      dialogVisible: false,
      ruleForm: {
        name: "",
        content: "",
        role: null,
        id: null
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
      ],
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '角色不能为空', trigger: 'blur' }
        ]
      },
      title: '',
      checkID: null
    }
  },

  created() {
    this.getList()
  },

  methods: {
    getList() {
      list(this.listInfo).then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data.list
          this.total = res.data.data.count
        }
      })
    },
    addWish() {
      this.title = '添加'
      this.dialogVisible = true
      this.ruleForm = {}
    },
    deleteWish(id) {
      deleteWish(id).then(res => {
        if(res.data.code === 200) {
          console.log(res);

        }
      })
    },
    editWish(row) {
      this.title = '编辑'
      this.dialogVisible = true
      this.ruleForm = row
    },
    checkWish() {
      if (this.checkID) {
        checkWish(this.checkID).then(res => {
          if (res.data.code === 200) {
            this.tableData = []
            this.tableData.push(res.data.data)
          }
        })
      } else {
        this.getList()
      }
    },
    handleClose(done) {
      done()
    },
    setSize(val) {
      this.listInfo.rows = val
      this.getList()
    },
    setPage(val) {
      this.listInfo.page = val
      this.getList()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          if (this.title === '添加') {
            addWish(this.ruleForm).then(res => {
              if (res.data.code === 200) {
                this.getList()
                this.dialogVisible = false
              }
            })
          } else if (this.title === '编辑') {
            editWish(this.ruleForm.id).then(res => {
              console.log(res);
            })
          } else {
            return
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
  },

  components: {
    pagination
  }
}
</script>

<style lang="scss" scoped>
.table {
  padding-top: 20px;
}

::v-deep .el-select {
  width: 100%;
}

.pagination {
  text-align: right;
  padding-top: 20px;
}
</style>