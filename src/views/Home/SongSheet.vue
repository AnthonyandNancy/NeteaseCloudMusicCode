<template>

  <div class="songsheet">
    <div class="head">
      <div style="float: left;">
        <el-dropdown placement="top">
          <span class="el-dropdown-link">
            {{ chooseTags }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="width:80vh;height:40vh;">
              <el-button style="width: 100%;" @click="handalChooseSongSheet('全部')">全部歌单</el-button>
              <div v-for="(item ,index) in catlistPlaylist.categories" :key="index" class="catlistPlaylist">
                <p class="text-danger" style="text-align: left;">{{ item }}</p>
                <ul>
                  <li v-for="(subitem ,subindex) in catlistPlaylist.sub" v-if="subitem.category==index" :key="subindex" class="list-unstyled subitem" @click="handalChooseSongSheet(subitem.name)">
                    {{ subitem.name }}
                  </li>
                </ul>
              </div>

            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <ul class="hotPlayListUl">
        <li v-for="(item ,index) in hotPlayList.tags" :key="index" class="list-unstyled hotPlayListLi" :class="{isLiactive:hotLi == index}" @click="handalPlayHotList(index,item.name)">
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="palyLists">
      <div v-for="(item,index) in playlists" :key="index" class="sheet " @click="handalGoPlayListInfo(item.id)">
        <img :src="item.coverImgUrl" alt="" style="width: 90%;height: 90%;display: inline-block;">
        <p>{{ item.name }}</p>
        <p class="playCount"> {{ item.playCount }}</p>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handalChange"
    />
  </div>

</template>

<script>
import { Home } from '../../api/home'

export default {
  name: 'SongSheet',
  data() {
    return {
      hotPlayList: [],
      hotLi: null,
      chooseTags: '全部',
      catlistPlaylist: [],
      offset: 0,
      playlists: [],
      total: 0
    }
  },
  created() {
    this.feach()
    this.getPlayList(this.chooseTags)
  },
  methods: {
    async feach() {
      const hotPlayList = await Home.getPlaylistHot()
      this.hotPlayList = hotPlayList
      const catlistPlaylist = await Home.getPlaylistCatlist()
      this.catlistPlaylist = catlistPlaylist
    },
    // 点击热门标签
    handalPlayHotList(index, name) {
      // console.log(name)
      this.getPlayList(name)
      this.hotLi = index
    },
    handalChooseSongSheet(val) {
      this.chooseTags = val
      this.getPlayList(val)
    },
    async getPlayList(name) {
      this.chooseTags = name
      const option = {
        cat: name,
        offset: this.offset
      }
      const { playlists, total } = await Home.getPlaylist(option)
      this.playlists = playlists
      this.total = total
    },
    async handalChange(val) {
      const option = {
        cat: this.chooseTags,
        offset: val
      }
      const { playlists, total } = await Home.getPlaylist(option)
      this.playlists = playlists
      this.total = total
    },
    handalGoPlayListInfo(val) {
      this.$router.push({
        path: `/SongSheetInfo/${val}`
      })
      // const data=await Home.getPlaylistInfo(val)
      // console.log(data)
    }

  }
}
</script>

<style scoped lang="scss">
  .songsheet{
    width: 95%;
    margin: 0 auto;

  }
  .head{
    display: block;
    .hotPlayListUl{
      position: relative;
      display: block;
      .hotPlayListLi{
        width: 5%;
        float: left;
        height: 5%;
        color: #757575;
      }
      .isLiactive{
        color: black;
      }
    }

  }
  .catlistPlaylist{
    width: 100%;
    height: 38%;
    display: block;
    .subitem{
      width: 10%;
      height: 10%;
      float: left;
      color: #757575;
    }
    .subitem:hover{
      color: red;
    }
  }
  .palyLists{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .sheet{
      width:18%;
      height:18%;
      margin-top: 2%;
      margin-left:auto;
      margin-right: auto;
      position: relative;
    }
    .playCount{
      position: absolute;
      top: 0;
      right: 5%;
      background-color:rgba(1,1,1,0.5);
      color: white;
    }
  }

</style>
