<template>
  <div class="home">


      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="(item,index) in bannersList" :key="index">
            <img :src="item.imageUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="getRecommendedSongList">
        <div class="content">
          <h5 style="text-align: left;">推荐歌单</h5>
          <el-divider />
          <div v-for="(item,index) in songList" :key="index" class="songList">
            <img :src="item.picUrl" alt="">
            <p class="name">{{ item.name }}</p>
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
import { Home } from '../api/home'

export default {
  name: 'Home',
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
          height: 20%;
          position: relative;
          display: inline-block;
          margin-left: 2%;
          margin-top: 2%;
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
  }

</style>
