<template>
  <div class="home">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in bannersList" :key="index">
          <img :src="item.imageUrl" alt="" @click="getMusic(item.targetId)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="getRecommendedSongList">
      <div class="content">
        <h5 style="text-align: left;">推荐歌单</h5>
        <el-divider />
        <div v-for="(item,index) in songList" :key="index" class="songList" @click="handalGoPlayListInfo(item.id)">
          <img :src="item.picUrl" alt="">
          <p class="name">{{ item.name }}</p>
          <p class="playCount">{{ item.playCount }}</p>
        </div>
      </div>
    </div>
    <div class="djprogramList">
      <h5 style="text-align: left;">推荐电台</h5>
      <el-divider />
      <div v-for="(item,index) in djprogramList" :key="index" class="songList">
        <img :src="item.program.blurCoverUrl" alt="">
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Home } from '../../api/home'

export default {
  name: 'PersonalizedRecommendation',
  components: {

  },
  data() {
    return {
      bannersList: [],
      songList: [],
      djprogramList: []
    }
  },
  created() {
    this.feach()
  },
  methods: {
    async feach() {
      const { banners } = await Home.getHomeBanner()
      this.bannersList = banners

      // 推荐歌单
      const { result } = await Home.getRecommendedSongList()
      this.songList = result

      // 推荐电台
      const data = await Home.getRecommendedDjprogram()
      this.djprogramList = data.result
    },
    getMusic(id) {
      // console.log('轮播音乐',id)
      this.$store.dispatch('app/chooseSong', id)
    },
    // 跳转到歌单页面
    async handalGoPlayListInfo(val) {
      this.$router.push({
        path: `/SongSheetInfo/${val}`
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    .carousel{
      width: 95%;
      margin: 0 auto;
    }
    .getRecommendedSongList{
      width: 100%;
      margin: 0 auto;
      .content{
        width: 95%;
        margin: 0 auto;
        .songList{
          width: 12%;
          height: 25%;
          flex-wrap: wrap;
          display: inline-block;
          margin-left: 2%;
          margin-top: 2%;
          text-align: left;
          img{
            width: 100%;
            height: 80%;
            border-radius: 2%;
            margin: 0 auto;
            display: inline-block;
          }
          .name{
            display: inline-block;
          }

        }

      }

    }
    .djprogramList{
      margin-top: 2%;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      .songList{
        width: 12%;
        height: 20%;
        display: inline-block;
        margin-left: 4%;
        img{
          width: 100%;
          height: 80%;
          border-radius: 2%;
          margin: 0 auto;
          display: inline-block;
        }
        .name{
          display: inline-block;
        }

      }

    }
    .playCount{
      background-color: rgba(1,1,1,0.5);
      position: absolute;
      color: white;
      right: 0;
      top: 0;
    }
  }

</style>

