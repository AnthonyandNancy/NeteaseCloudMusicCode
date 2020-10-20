<template>
  <div class="sidebar">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :router="true"
      active-text-color="red"
    >
      <div style="text-align: left;color: #42b983;font-size: small;" class="ml-2">推荐</div>
      <el-menu-item route="/home" index="1">
        <i class="el-icon-headset" />
        <span slot="title">发现</span>
      </el-menu-item>

      <el-menu-item route="/video" index="2">
        <i class="el-icon-video-camera" />
        <span slot="title">视频</span>
      </el-menu-item>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      Rindex: 1
    }
  },
  created() {
    this.routesMatch
  },
  methods: {
    routesMatch() {
      const route = this.$route
      console.log(route)
      if (route.fullPath == '/home') {
        this.Rindex = 1
      } else {
        this.Rindex = 2
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar{
}
</style>
