<template>
  <div class="home">
    <div class="head" v-if="artistsList.artist">
      <img :src="artistsList.artist.img1v1Url" alt="" class="img">
      <div class="name">
        <div style="background-color: red;display: inline-block;color: white;border-radius: 2px;">歌手</div>
        {{artistsList.artist.name}}
      </div>
      <div v-for="(item,index) in artistsList.artist.alias" :key="index" class="content">{{item}}</div>
      <div class="count">
        <div class="musicSize">单曲数:{{artistsList.artist.musicSize}}</div>
        <div class="albumSize">专辑数:{{artistsList.artist.albumSize}}</div>
        <div class="mvSize">MV数:{{artistsList.artist.mvSize}}</div>
      </div>

    </div>

  </div>
</template>

<script>
import { Singer } from '@/api/singer'
export default {
  name: 'SingerContent',
  data() {
    return {
      artistsList: [],
      mvList: [],
      ablumList: [],
      singerInfo: [],
      likeSinger: []
    }
  },
  computed: {
    singer() {
      return this.$store.getters.singerID
    }
  },
  created() {
    this.feach()
  },
  methods: {
    async feach() {
      // 获取歌手单曲
      const artistsList = await Singer.getArtists(this.singer)
      this.artistsList = artistsList
      // 获取歌手 mv
      const mvList = await Singer.getSingerMv(this.singer)
      this.mvList = mvList
      // 获取歌手专辑
      const ablumList = await Singer.getSingerAlbum(this.singer)
      this.ablumList = ablumList
      // 获取歌手描述
      const singerInfo = await Singer.getSingerInfo(this.singer)
      this.singerInfo = singerInfo
      // 获取相似歌手
      // const likeSinger = await Singer.getLikeSinger(this.singer)
      // this.likeSinger = likeSinger
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  .head{
    position: relative;
    width: 100%;
    height: 35vh;
    .img{
      width:20%;
      height: 90%;
      position: absolute;
      left: 2%;
      top: 5%;
    }
    .name{
      font-size: 2.5vh;
      position: absolute;
      left: 23%;
      top: 5%;
    }
    .content{
      font-size: 2.5vh;
      position: absolute;
      left: 23%;
      top: 15%;
    }
    .count{
      width: 10vh;
      height: 10vh;
      display: inline-block;
      position: absolute;
      left: 23%;
      top: 40%;
    }
  }
}
</style>
