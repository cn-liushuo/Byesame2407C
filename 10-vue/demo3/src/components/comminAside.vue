<template>
  <div>
    <!-- -->
    <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
      <el-menu-item index="/home/roleManagement">
        <i class="el-icon-menu"></i>
        <span slot="title">角色管理</span>
      </el-menu-item>
      <el-menu-item index="/home/wishingManagement">
        <i class="el-icon-menu"></i>
        <span slot="title">许愿留言管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Byesame2407CMenu',

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
}
</script>