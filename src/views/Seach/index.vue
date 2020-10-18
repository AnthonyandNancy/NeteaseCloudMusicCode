<template>
  <div>
    <!--    默认为 1 即单曲 , 取值意义 : 1: 单曲, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合-->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="mt-4 ml-2 ">
      <el-tab-pane label="单曲" name="first">
        <song />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="second"><album></album></el-tab-pane>
      <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="用户" name="five">用户</el-tab-pane>
      <el-tab-pane label="视频" name="six">视频</el-tab-pane>
      <el-tab-pane label="歌词" name="seven">歌词</el-tab-pane>
      <el-tab-pane label="电台" name="eight">电台</el-tab-pane>
    </el-tabs>


  </div>

</template>

<script>
import Song from './Song'
import Album from "./Album";
export default {
  name: 'Index',
  components: {
    Album,
    Song
  },
  data() {
    return {
      activeName: 'first',
      actived: 1
    }
  },
  methods: {
    handleClick(tab, event) {

      // console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="scss">
  .el-tab-pane{
    width: 100%;
  }
  /*ul {*/
  /*  margin: 5% auto 0 auto;*/
  /*  width: 80%;*/
  /*  li{*/
  /*    width: 10%;*/
  /*    margin: 0;*/
  /*    padding: 0;*/
  /*}*/
  /*  div{*/
  /*    width: 95vh;*/
  /*  }*/
  /*  .activedLi{*/
  /*    color: red;*/
  /*    border-bottom: 1px;*/
  /*    border-bottom-color: red;*/
  /*  }*/
  /*}*/

</style>
