<template>
  <div class="home">

    <el-tabs v-model="activeName" stretch @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first">
        <personalized-recommendation />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="second">
        <song-sheet></song-sheet>
      </el-tab-pane>
<!--      <el-tab-pane label="主播电台" name="third">配置管理</el-tab-pane>-->
<!--      <el-tab-pane label="歌手" name="fourth">角色管理</el-tab-pane>-->
<!--      <el-tab-pane label="排行榜" name="five">定时任务补偿</el-tab-pane>-->
      <el-tab-pane label="最新音乐" name="six">最新音乐</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import PersonalizedRecommendation from '@/views/Home/PersonalizedRecommendation'
import SongSheet from "./Home/SongSheet";

export default {
  name: 'Home',
  components: {
    SongSheet,
    PersonalizedRecommendation
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {

  },
  methods: {
    handleClick() {}
  }
}
</script>
<style scoped lang="scss">
  .home{
    width: 100%;
    .el-tabs{
      margin: 0 auto;
    }
    .el-tabs__item.is-active {
      color: red !important;
    }
    .el-tabs__nav-scroll{
      width: 50%;
    }
  }

</style>
