<template>
  <div v-if="list.album !=undefined" v-loading="loading" class="home">
    <div class="head">
      <img :src="list.album.blurPicUrl" alt="" style="width: 20vh;height:20vh;" class="ablumImg">
      <div class="text-white ablumWord">专辑</div>
      <div class="albumname">{{ list.album.name }}</div>
      <div v-for="(item,index) in list.album.alias" :key="index" class="albumalias">({{ item }})</div>
      <div class="btnGroud">
        <el-button type="danger" icon="el-icon-caret-right">播放全部</el-button>
        <el-button icon="el-icon-circle-plus-outline"><span v-if="dynamicCount.isSub" style="display: inline-block;">已</span>收藏({{ dynamicCount.subCount }})</el-button>
        <el-button icon="el-icon-share">分享({{ dynamicCount.shareCount }})</el-button>
      </div>
      <div class="singer">歌手:<span style="display: inline-block;color: grey;">{{ list.album.artist.name }}</span></div>
      <div>评论数{{ dynamicCount.commentCount }}</div>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName" class="ml-4" >
        <el-tab-pane label="歌曲列表" name="first">
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
              @click="handleClick(item.id)"
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
          <!--          <el-pagination-->
          <!--            background-->
          <!--            layout="prev, pager, next"-->
          <!--            :total="list.songCount"-->
          <!--            class=" pagination"-->
          <!--            @current-change="hadelCurryPages"-->
          <!--          />-->
        </el-tab-pane>
        <el-tab-pane :label="commentCount" name="second">
          <div style="height: 10vh;">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="140"
              show-word-limit
            >
            </el-input>
            <el-button class="mr-1 mt-1" style="display: block;float: right">发送</el-button>
          </div>
          <div v-if="commentList.hotComments.length>0" class="second">
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
        <el-tab-pane label="专辑详情" name="third">
          <h5 class="text-primary" style="text-align: left;">专辑介绍:</h5>
          <per class="description">
            {{list.album.description}}
          </per>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { Ablums } from '@/api/ablum'
import { Comment } from '@/api/comment'
export default {
  name: 'AlbumContent',
  data() {
    return {
      textarea:'',
      id:null,
      loading: true,
      list: [],
      ID: null,
      dynamicCount: null,
      imgSrc: '',
      name: '',
      alias: [],
      isSub: null,
      // tabs栏
      activeName: 'first',
      commentCount: '',
      songList: [],
      offset: 0,
      before: 0,
      commentList: [],
      total: 0

    }
  },
  computed: {
    ablumID() {
      return this.$store.getters.ablum
    }
  },
  created() {
    this.$nextTick(function() {
      this.feach()
    })
  },
  mounted() {
    this.id=this.ablumID
  },
  methods: {
    async feach() {
      const ablumID = this.$store.getters.ablum
      if (!ablumID) {
        const ablumID = localStorage.getItem('ablumID')
        this.id=ablumID
        const data = await Ablums.getContent(ablumID)
        const dynamicCount = await Ablums.getAblumsDetailDynamic(ablumID)
        this.getCommentList(ablumID)
        // this.getHotCommentList(ablumID)
        this.dynamicCount = dynamicCount
        this.commentCount = '评论' + '(' + dynamicCount.commentCount + ')'
        this.list = data
        this.songList = data.songs
        this.loading = false
      } else {
        const data = await Ablums.getContent(this.ablumID)
        const dynamicCount = await Ablums.getAblumsDetailDynamic(ablumID)
        this.getCommentList(ablumID)
        // this.getHotCommentList(ablumID)
        this.dynamicCount = dynamicCount
        this.commentCount = '评论' + '(' + dynamicCount.commentCount + ')'
        this.list = data
        this.songList = data.songs
        this.loading = false
      }
    },
    // 评论详情
    async   getCommentList(e) {
      if (this.total > 5000) {
        const option = {
          id: e,
          offset: this.offset,
          before: this.before
        }
        const commentList = await Comment.getCommentAlbumB(option)
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
        const commentList = await Comment.getCommentAlbumA(option)
        if (commentList.total > 5000) {
          this.before = this.commentList.comments[19].time
        }
        this.total = commentList.total
        this.commentList = commentList
      }
    },

    // 热门评论
    // async  getHotCommentList(e) {
    //   if (this.total > 5000) {
    //     const option = {
    //       id: e,
    //       offset: this.offset,
    //       before: this.before
    //     }
    //     const commentList = await Comment.getHotCommentListA(option)
    //     if (commentList.total > 5000) {
    //       this.before = this.commentList.comments[19].time
    //     }
    //     this.total = commentList.total
    //     this.commentList = commentList
    //   } else {
    //     const option = {
    //       id: e,
    //       offset: this.offset
    //     }
    //     const commentList = await Comment.getHotCommentListB(option)
    //     if (commentList.total > 5000) {
    //       this.before = this.commentList.comments[19].time
    //     }
    //     this.total = commentList.total
    //     this.commentList = commentList
    //   }
    // },

    /* tabs*/
    handleClick(id) {
      localStorage.setItem('songID',id)
      this.$store.dispatch('app/chooseSong',id)
    },
    handleChange(e) {
      this.offset = e
      // console.log(this.offset)
      this.getCommentList(this.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    width: 100%;
    height: 80vh;
    .head{
      width: 100%;
      height: 30vh;
      position: relative;
      .ablumImg{
        float: left;
        margin-top: 2%;
        margin-left: 2%;
      }
      .ablumWord{
        width: 5vh;
        height: 2.5vh;
        display: inline-block;
        background-color: red;
        font-size: small;
        border-radius: 0.2vh;
        text-align: center;
        line-height: 2.5vh;
        position: absolute;
        left: 15%;
        top: 20%;
      }
      .albumname{
        display: inline-block;
        font-size: 3vh;
        position: absolute;
        left: 18.5%;
        top: 16%;
      }
      .albumalias{
        display: inline-block;
        font-size: 3vh;
        position: relative;
        left:-22%;
        top: 4vh;
        color: #757575;
      }
      .btnGroud{
        display: inline-block;
        position: absolute;
        left: 14.8%;
        top: 35%;
        color: #757575;
        .el-button{
          width: 13vh;
        }
      }
      .singer{
        display: inline-block;
        position: absolute;
        left: 14.8%;
        top:53%;
      }
    }

    .tabs{
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
    .pagination{
      margin: 0 auto;
    }

  }

</style>
