<template>
  <div
    v-loading="loading"
    class="home"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <h5 class="ml-3 resultCount">搜索<span class="text-primary">"{{ keywords }}"</span>,共找到  {{ list.songCount }}  首单曲</h5>
    <div
      class="content   border-bottom border-top"
    >
      <!--      <el-row class="">-->
      <!--        <el-col :span="6" class="ml-5">-->
      <!--          <div class="   ">-->
      <!--            <h5 class="">音乐标题</h5>-->

      <!--          </div>-->
      <!--        </el-col>-->
      <!--        <el-col :span="6" class="ml-5">-->
      <!--          <div class="   ">-->
      <!--            <h5 class=" ">歌手</h5>-->
      <!--            <div class="" v-for="(item,index) in list.songs" :key="index">-->
      <!--              <h6 class="aliasContent ml-2" v-for="(aliasContent,index) in item.artists " :key="index"> {{aliasContent.name}}</h6>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </el-col>-->
      <!--        <el-col :span="6" class="ml-5">-->
      <!--          <div class="   ">-->
      <!--            <h5 class=" ">专辑</h5>-->
      <!--            <div>-->

      <!--            </div>-->
      <!--          </div>-->
      <!--        </el-col>-->
      <!--      </el-row>-->

      <div
        class="title border-left"
      >
        <h5 class=" border-right">音乐标题</h5>
        <h5 class=" border-right ">歌手</h5>
        <h5 class=" border-right ">专辑</h5>

        <div
          v-for="(item,index) in list.songs"
          :key="index"
          class="border-bottom border-top "
        >
          <el-row>
            <el-col :span="5">
              <div class=" border-right">
                <h6 class="name text-primary  "> {{ item.name }}</h6>
                <h6 v-for="(aliasContent,aliasindex) in item.alias " :key="aliasindex" class="aliasContent ml-2"> {{ aliasContent }}</h6>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="border-right">
                <div v-for="(artistsItem,artistsIndex) in item.artists" :key="artistsIndex" class="singer mr-auto ">
                  {{ artistsItem.name }}
                </div>
              </div>

            </el-col>
            <el-col :span="5">
              <div class="border-right">
                <div class="album ">
                  {{ item.album.name }}
                </div>
              </div>
            </el-col>
          </el-row>

        </div>

      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="list.songCount"
        class=" pagination"
        @current-change="hadelCurryPages"
      />
    </div>
  </div>
</template>

<script>
import { Seach } from '@/api/top'
export default {
  name: 'Song',
  data() {
    return {
      list: [],
      keywords: '',
      // 页码
      offset: 0,
      loading: true
    }
  },
  computed: {
    Song: function() {
      // `this` 指向 vm 实例
      return this.$store.getters.keywords
    }
  },
  watch: {
    Song() {
      this.feach()
    }
  },
  created() {
    // this.feach()
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
        type: 1,
        offset: this.offset
      }
      const { result } = await Seach.getSearchHotSong(option)
      this.list = result
      this.loading = false
      // console.log(result)
    },
    async hadelCurryPages(e) {
      const option = {
        keywords: this.keywords,
        type: 1,
        offset: e
      }
      const { result } = await Seach.getSearchHotSong(option)

      this.list = result
      this.loading = false
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
      width: 90%;
      padding: 0;
      margin: 0 auto;

  .title{
    width: 100%;
    text-align: start;
    margin: 0;
    padding: 0;

    h5{
      display: inline-block;
      width: 20.9%;
      line-height: 2vh;
    }
  }
      .name{
        color: #42b983;
      }
      .el-row:hover{
        background-color: rgba(64,158,255,0.1);
      }
        .album{
              color: #42b983;
            font-size: small;
           display: inline-block;
            }
      .aliasContent{
        display: inline-block;
       text-align: left;
        font-size: small;
        color: #42b983;
      }
      .singer{
        font-size: small;
        color: #42b983;
        display: inline-block;
      }
    }
    .pagination{
     margin: 0 auto;
    }
  }

</style>
