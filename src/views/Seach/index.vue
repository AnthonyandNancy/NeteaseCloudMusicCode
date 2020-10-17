<template>
  <div>
    <!--    默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合-->
    <el-tabs v-model="activeName" @tab-click="handleClick" class="mt-4 ml-2 ">
      <el-tab-pane label="单曲" name="first">
        <song />
      </el-tab-pane>
      <el-tab-pane label="专辑" name="second">专辑</el-tab-pane>
      <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">歌单</el-tab-pane>
      <el-tab-pane label="用户" name="five">用户</el-tab-pane>
      <el-tab-pane label="视频" name="six">视频</el-tab-pane>
      <el-tab-pane label="歌词" name="seven">歌词</el-tab-pane>
      <el-tab-pane label="电台" name="eight">电台</el-tab-pane>
    </el-tabs>






    <!--    <ul class="nav ">-->
    <!--      <li class="nav-item " @click="()=>{actived=1}" :class="{'activedLi':actived==1}">-->
    <!--        <div>-->
    <!--          <span>单曲</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==1">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=2}" :class="{'activedLi':actived==2}">-->
    <!--        <div>-->
    <!--          <span>专辑</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==2">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=3}" :class="{'activedLi':actived==3}">-->
    <!--        <div>-->
    <!--          <span>歌手</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->
    <!--        <div>-->
    <!--          <song  v-if="actived==3"/>-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=4}" :class="{'activedLi':actived==4}">-->
    <!--        <div>-->
    <!--          <span>歌单</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==4">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=5}" :class="{'activedLi':actived==5}">-->
    <!--        <div>-->
    <!--          <span>用户</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==5">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=6}" :class="{'activedLi':actived==6}">-->
    <!--        <div>-->
    <!--          <span>视频</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==6">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=7}" :class="{'activedLi':actived==7}">-->
    <!--        <div>-->
    <!--          <span>歌词</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==7">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--      <li class="nav-item " @click="()=>{actived=8}" :class="{'activedLi':actived==8}">-->
    <!--        <div >-->
    <!--          <span>电台</span>-->
    <!--          <el-divider></el-divider>-->
    <!--        </div>-->

    <!--        <div v-if="actived==8">-->
    <!--          <song />-->
    <!--        </div>-->
    <!--      </li>-->
    <!--    </ul>-->

  </div>

</template>

<script>
import Song from './Song'
export default {
  name: 'Index',
  components: {
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
    height: 84vh;
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
