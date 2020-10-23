<template>
  <div class="home">
    <div class="head">
      <img :src="playlist.coverImgUrl" alt="" class="coverImg">
      <p class="playlistgd">歌单</p>
      <p class="playlistname">{{ playlist.name }}</p>
      <p class="trackCount">歌曲数:{{ playlist.trackCount }}</p>
      <p class="playCount">播放数:{{ playlist.playCount }}</p>
      <!--      <p v-if="playlist.creator.expertTags" class="expertTags">标签: <span v-for="(item ,index) in playlist.creator.expertTags" :key="index">{{ item }}/</span></p>-->
      <div class="btnGroud ">
        <el-button type="danger" icon="el-icon-caret-right">播放全部</el-button>
        <el-button icon="el-icon-circle-plus-outline"><span v-if="playlist.isSub" style="display: inline-block;">已</span>收藏({{ playlist.subscribedCount }})</el-button>
        <el-button icon="el-icon-share">分享({{ playlist.shareCount }})</el-button>
      </div>
    </div>
    <div class="body">
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="first">
          <div
            class="title border-left"
          >
            <h5 class=" border-right">音乐标题</h5>
            <h5 class=" border-right ">歌手</h5>
            <h5 class=" border-right ">专辑</h5>

            <div
              v-for="(item,index) in playlist.tracks"
              :key="index"
              class="border-bottom border-top "
              @click="handleClick(item.id,index)"
            >
              <el-row>
                <el-col :span="5">
                  <div class=" border-right">
                    <h6 class="name text-primary  "> {{ item.name }}</h6>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="border-right">
                    <div v-for="(artistsItem,artistsIndex) in item.ar" :key="artistsIndex" class="singer mr-auto ">
                      {{ artistsItem.name }}
                    </div>
                  </div>

                </el-col>
                <el-col :span="5">
                  <div class="border-right">
                    <div class="album ">
                      {{ item.al.name }}
                    </div>
                  </div>
                </el-col>
              </el-row>

            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <div style="height: 10vh;">
            <el-input
              v-model="textarea"
              type="textarea"
              placeholder="请输入内容"
              maxlength="140"
              show-word-limit
            />
            <el-button class="mr-1 mt-1" style="display: block;float: right">发送</el-button>
          </div>
          <div v-if="commentList.hotComments" class="second">
            <h5 class="hot text-primary">精彩评论:</h5>
            <div v-for="(item,index) in commentList.hotComments " :key="index">

              <img :src="item.user.avatarUrl " alt="" class="hotimg">
              <div class="nickname "><span class="text-primary">{{ item.user.nickname }}</span>:{{ item.content }}<div class="time">{{ item.time | timeFordat }}</div></div>

              <el-divider />
            </div>

          </div>
          <div v-if="commentList.comments" class="second">
            <h5 class="hot text-primary">最新评论:</h5>
            <div v-for="(item,index) in commentList.comments " :key="index">

              <img :src="item.user.avatarUrl " alt="" class="hotimg">
              <div class="nickname "><span class="text-primary">{{ item.user.nickname }}</span>:{{ item.content }}<div class="time">{{ item.time | timeFordat }}</div></div>

              <el-divider />
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleChange"
            />
          </div>
        </el-tab-pane>
        <!--        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
      </el-tabs>
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
      privileges: [],
      /* tabs*/
      activeName: 'first',
      total: 0,
      offset: 0,
      before: 0,
      commentList: [],
      textarea: '',
      idList: []
    }
  },
  computed: {

  },
  watch: {

  },
  created() {
    this.playListId = this.$route.params.id
    this.feach(this.$route.params.id)
    this.getCommentList(this.$route.params.id)
  },
  methods: {
    async feach(val) {
      const { playlist, privileges } = await Home.getPlaylistInfo(val)
      this.playlist = playlist
      this.privileges = privileges
    },
    /* tabs*/
    handleClick(id, index) {
      this.idList = []
      this.$store.dispatch('app/setIndex', index)
      localStorage.setItem('songID', id)
      this.$store.dispatch('app/chooseSong', id)
      this.setIDLoop()
    },
    // 处理id数组
    setIDLoop() {
      this.playlist.tracks.map(val => {
        this.idList.push(val.id)
      })
      this.$store.dispatch('app/setIdList', this.idList)
      // console.log(this.idList)
    },
    // 评论详情
    async   getCommentList(e) {
      if (this.total > 5000) {
        const option = {
          id: e,
          offset: this.offset,
          before: this.before
        }
        const commentList = await Home.getCommentAlbumB(option)
        if (commentList.total > 5000) {
          this.before = this.commentList.comments[19].time
        }
        this.total = commentList.total
        this.commentList = commentList
      } else {
        const option = {
          id: e,
          offset: this.offset
        }
        const commentList = await Home.getCommentAlbumA(option)
        if (commentList.total > 5000) {
          this.before = this.commentList.comments[19].time
        }
        this.total = commentList.total
        this.commentList = commentList
      }
    },
    handleChange(e) {
      this.offset = e
      // console.log(this.offset)
      this.getCommentList(this.$route.params.id)
    }

  }
}
</script>

<style scoped lang="scss">
.head{
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
    top: 85%;
    left: 20%;
  }
  .trackCount{
    position: absolute;
    top: 40%;
    left: 20%;
    color: #42b983;
    width: 100px;
  }
  .playCount{
    position: absolute;
    top: 40%;
    left: 25%;
    color: #42b983;
    width:150px;
  }
  .expertTags{
    position: absolute;
    top: 40%;
    left: 35%;
    color: #42b983;
    width:150px;
  }

}
.body{
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
  .second{
    position: relative;
    .hot{
      display: block;
      position: relative;
      text-align: left;
    }
    .hotimg{
      position: absolute;
      left: 0%;
      width: 5vh;
      height: 5vh;
      border-radius: 50%;
    }
    .nickname{
      display: inline-block;
      position: relative;
      width: 95%;
      left: 1.4%;
      text-align: left;
    }
    .time{
      text-align: left;
      color: #757575;
    }
  }
  .description{
    width: 90%;
    text-align: left;
    white-space:pre
  }

}
</style>
