<template>
  <div class="home">
    <div class="head">
      <img :src="playlist.coverImgUrl" alt="" class="coverImg">
      <p class="playlistgd">歌单</p>
      <p class="playlistname">{{playlist.name}}</p>
      <div class="btnGroud">
        <el-button type="danger" icon="el-icon-caret-right">播放全部</el-button>
        <el-button icon="el-icon-circle-plus-outline"><span v-if="playlist.isSub" style="display: inline-block;">已</span>收藏({{ playlist.subscribedCount }})</el-button>
        <el-button icon="el-icon-share">分享({{ playlist.shareCount }})</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { Home } from '../api/home'
export default {
  name: 'SongSheet',
  data() {
    return {
      playListId: null,
      playlist: [],
      privileges: []
    }
  },
  created() {
    this.playListId = this.$route.params.id
    this.feach(this.$route.params.id)
  },
  methods: {
    async feach(val) {
      const { playlist, privileges } = await Home.getPlaylistInfo(val)
      this.playlist = playlist
      this.privileges = privileges
    }
  }
}
</script>

<style scoped lang="scss">
.head{
  background-color: #409eff;
  position: relative;
  height: 15%;
  display: block;
  .coverImg{
    width: 15%;
    height: 15%;
    margin-left: -80%;
    margin-top: 2%;
  }
  .playlistgd{
    display: inline-block;
    position: absolute;
    top: 15%;
    background-color: red;
    color: white;
    left: 20%;
    border-radius: 2px;
  }
  .playlistname{
    display: inline-block;
    position: absolute;
    top: 11%;
    left: 22%;
    font-size: 3vh;
  }
  .btnGroud{
    position: absolute;
    top: 50%;
    left: 20%;
  }
}
</style>
