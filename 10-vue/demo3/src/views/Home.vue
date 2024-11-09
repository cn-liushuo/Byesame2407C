<template>
  <div>
    <!-- home -->
    <el-container>
      <el-header style="height: 10vh;">Header</el-header>
      <el-container style="height: 90vh;">
        <el-aside width="200px">
          <commin-aside></commin-aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import comminAside from '@/components/comminAside'
export default {
  name: 'Byesame2407CHome',

  components: {
    comminAside
  },

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  },
}
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 80px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>