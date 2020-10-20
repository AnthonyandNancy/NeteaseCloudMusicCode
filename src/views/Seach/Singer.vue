<template>
  <div v-loading="loading" class="home">
    <div class="content">
      <div v-for="(artistsItem,artistsIndex) in list.artists" :key="artistsIndex" class="artistsItem" @click="handelClick(artistsItem.id)">
        <img :src="artistsItem.picUrl" alt="" class="picUrl">

        <div style="display: block;" class="name">
          {{ artistsItem.name }}
          <div
            v-for="(aliasItem,aliasIndex) in artistsItem.alias"
            :key="aliasIndex"
            style="display: inline-block;color: #757575;"
          >({{ aliasItem }})</div>
        </div>

        <el-divider />
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="list.artistCount"
        @current-change="hadelCurryPages"
      />
    </div>
  </div>
</template>

<script>
import { Seach } from '../../api/top'
export default {
  name: 'Singer',
  data() {
    return {
      loading: true,
      offset: 0,
      keywords: '',
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
        type: 100,
        offset: this.offset
      }
      const { result } = await Seach.getSearchHotSong(option)
      this.list = result
      this.loading = false
      // console.log(result)
    },
    hadelCurryPages(e) {
      this.offset = e
      this.feach()
    },
    // 进入歌手详情
    handelClick(id) {
      this.$store.dispatch('app/chooseSinger', id)
      localStorage.setItem('SingerID', id)
      this.$router.push({
        path: '/seach/SingerContent'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .artistsItem{
    position: relative;
    .picUrl{
      position: absolute;
      width: 5vh;
      height: 5vh;
      left: 0;
    }
    .name{
      position: relative;
      text-align: left;
      left: 10%;
    }
  }
  .artistsItem:hover{
    background-color: rgba(64,158,255,0.1);
  }

</style>
