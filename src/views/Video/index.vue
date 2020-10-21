<template>
  <div>
    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="视频" name="first">
        <movie />
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <m-v />
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import MV from './MV'
import Movie from './Movie'
export default {
  name: 'Index',
  components: { MV, Movie },
  data() {
    return {
      activeName: 'second'

    }
  },
  methods: {
    handleClick() {}
  }

}
</script>

<style scoped>

</style>
