<template>
  <!--  10: 专辑,-->
  <div class="home">
    <h5 class="ml-3 resultCount">搜索<span class="text-primary">"{{ keywords }}"</span>,共找到  {{ list.albumCount }}  首专辑</h5>
    <div v-for="(item,index) in list.albums" :key="index" class="content border-bottom" @click="handelClickAlbum(item.id)">

      <img :src="item.picUrl" alt="" style="width: 4vh;height: 4vh;display: inline-block;" class="albumImg mt-1">
      <div class="name text-primary">{{ item.name }}</div>
      <!--      <div class="containedSong">{{ item.containedSong }}</div>-->
      <div v-for="(aliasIteem,aliasIndex) in item.alias" :key="aliasIndex" class="aliasIteem">{{ aliasIteem }}</div>
      <div class="artistname"> {{ item.artist.name }}</div>

    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="list.albumCount"
      class=" pagination"
      @current-change="hadelCurryPages"
    />
  </div>

</template>

<script>
import { Seach } from '@/api/top'
export default {
  name: 'Album',
  data() {
    return {
      keywords: '',
      offset: 0,
      list: []
    }
  },
  computed: {
    keyword() {
      return this.$store.getters.keywords
    }
  },
  watch: {
    keyword() {
      this.feach()
    }
  },
  mounted() {
    this.feach()
  },
  methods: {
    async feach() {
      const keywords = this.$store.getters.keywords
      if (!keywords) {
        this.keywords = localStorage.getItem('keywords')
      } else {
        this.keywords = this.$store.getters.keywords
      }

      const option = {
        keywords: this.keywords,
        type: 10,
        offset: this.offset
      }
      const { result } = await Seach.getSearchHotSong(option)
      this.list = result
      // console.log(result)
    },
    // 点击进入专辑
    handelClickAlbum(id) {
      // console.log(id)
      this.$store.dispatch('app/chooseAblum', id)
      localStorage.setItem('ablumID',id)
      this.$router.push({
        path: '/seach/AlbumContent'
      })
    },
    async hadelCurryPages(e) {
      const option = {
        keywords: this.keywords,
        type: 10,
        offset: e
      }
      const { result } = await Seach.getSearchHotSong(option)
      this.list = result
      // console.log(result)
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    .resultCount{
      text-align: left;
    }
    .content{
      height:4.5vh;
      position: relative;
      .artistname{
        display: inline-block;
        position: absolute;
        top: 2vh ;
        color: #757575;
      }
      .name{
        display: inline-block;
        position: absolute;
        left: 5vh;
      }
      .albumImg{
        position: absolute;
        left: 0;
      }
      .aliasIteem{
        display: inline-block;
        position: absolute;
        top: 2.5vh;
        left:5vh;
        color: #757575;
        font-size: small;
      }
    }
    .content:hover{
      background-color: rgba(88,170,255,0.1);
    }
  }

</style>
