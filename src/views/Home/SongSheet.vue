<template>

  <div class="songsheet">
    <div class="head">
      <div style="float: left;">
        <el-dropdown placement="top-end">
          <span class="el-dropdown-link">
            {{ chooseTags }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <div style="width: 50vh;height: 20vh;" />
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <ul v-for="(item ,index) in hotPlayList.tags" :key="index" class="hotPlayListUl">
        <li class="list-unstyled hotPlayListLi" :class="{isLiactive:hotLi == index}" @click="handalPlayHotList(index)">
          {{ item.name }}
        </li>
      </ul>
    </div>

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
      catlistPlaylist:[]
    }
  },
  created() {
    this.feach()
  },
  methods: {
    async feach() {
      const hotPlayList = await Home.getPlaylistHot()
      this.hotPlayList = hotPlayList
      const catlistPlaylist = await Home.getPlaylistCatlist()
      this.catlistPlaylist = catlistPlaylist
    },
    // 点击热门标签
    handalPlayHotList(index) {
      this.hotLi = index
    }
  }
}
</script>

<style scoped lang="scss">
  .songsheet{
    .hotPlayListUl{
      width: 100%;
      .hotPlayListLi{
        width: 5%;
        height: 10%;
        float: left;
        color: #757575;
      }
      .isLiactive{
        color: black;
      }
    }

  }

</style>
