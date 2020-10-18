<template>
  <div class="home">
    <img :src="list.album.blurPicUrl" alt="" style="width: 20vh;height:20vh;" class="ablumImg">
    <div class="text-white ablumWord">专辑</div>
    <div class="albumname">{{ list.album.name }}</div>
    <div v-for="(item,index) in list.album.alias" :key="index" class="albumalias">({{ item }})</div>
    <div class="btnGroud">
      <el-button type="danger" icon="el-icon-caret-right">播放全部</el-button>
      <el-button icon="el-icon-circle-plus-outline"><span style="display: inline-block;" v-if="dynamicCount.isSub">已</span>收藏({{dynamicCount.subCount}})</el-button>
      <el-button icon="el-icon-share">分享({{ dynamicCount.shareCount }})</el-button>
    </div>
    <div>歌手:{{ list.album.artist.name }}</div>
    <div>评论数{{dynamicCount.commentCount}}</div>
  </div>
</template>

<script>
import { Ablums } from '@/api/ablum'
export default {
  name: 'AlbumContent',
  data() {
    return {
      list: [],
      ID: null,
      dynamicCount: null

    }
  },
  computed: {
    ablumID() {
      return this.$store.getters.ablum
    }
  },
  created() {
    this.feach()
  },
  methods: {
    async feach() {
      const ablumID = this.$store.getters.ablum
      if (!ablumID) {
        const ablumID = localStorage.getItem('ablumID')
        const data = await Ablums.getContent(ablumID)
        const dynamicCount = await Ablums.getAblumsDetailDynamic(ablumID)
        this.dynamicCount = dynamicCount
        this.list = data
      } else {
        const data = await Ablums.getContent(this.ablumID)
        const dynamicCount = await Ablums.getAblumsDetailDynamic(ablumID)
        this.dynamicCount = dynamicCount
        this.list = data
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    width: 100%;
    height: 80vh;
    .ablumImg{
      float: left;
      margin-top: 2%;
      margin-left: 2%;
    }
    .ablumWord{
      width: 5vh;
      height: 2.5vh;
      display: inline-block;
      background-color: red;
      font-size: small;
      border-radius: 0.2vh;
      text-align: center;
      line-height: 2.5vh;
      position: relative;
      left: -15%;
      top: 2.4vh;
    }
    .albumname{
      display: inline-block;
      font-size: 3vh;
      position: relative;
      left: -14%;
      top:3vh;
    }
    .albumalias{
      display: inline-block;
      font-size: 3vh;
      position: relative;
      left: -14%;
      top: 3vh;
      color: #757575;
    }
    .btnGroud{
      display: inline-block;
      position: relative;
      left: -37%;
      top: 10vh;
      color: #757575;
      .el-button{
        width: 13vh;
      }
    }
  }

</style>
