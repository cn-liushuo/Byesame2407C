<template>
  <div>
    <!-- -->
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[5, 10, 15, 20]" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Byesame2407CPagination',
  props: {
    total: {
      type: Number,
    },
    page: {
      type: Number
    },
    rows: {
      type: Number
    }
  },

  data() {
    return {

    }
  },

  methods: {
    handleSizeChange(val) {
      this.$emit("setSize", val)
    },
    handleCurrentChange(val) {
      this.$emit("setPage", val)
    }
  },
}
</script>