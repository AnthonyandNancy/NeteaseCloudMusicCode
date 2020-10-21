<template>
  <div class="info">
    <!--    autoplay-->
    <video :src="src" controls  />
    <div class="introduce">
      <h5 class="border-bottom">
        MV介绍
      </h5>
      <div class="timeCount publishTime">发布时间:{{ info.publishTime }}</div>
      <div class="timeCount playCount">播放次数:{{ info.playCount }}</div>
      <div class="pre">
        {{ info.desc }}
      </div>
      <div class="getPersonalizedMv mt-5" v-if="getPersonalizedMvList">
        <div v-for="(item,index) in getPersonalizedMvList.result" @click="goMv(item.id)" :key="index" class="PersonalizedMv">
          <img :src="item.picUrl" alt="" >
          <img :src="mvpng" alt="" class="mvpng">
          <div class="playCount">{{item.playCount}}</div>
          <div>{{item.name}}</div>
        </div>
      </div>

    </div>
    <div class="tabs">
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
      <div v-if="commentList.hotComments " class="second">
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

    </div>
  </div>
</template>

<script>
import { MV } from '../../api/mv'

export default {
  name: 'MvInfo',
  data() {
    return {
      mvpng:require('@/assets/images/mv.png'),
      id: null,
      src: null,
      info: [],
      total: 0,
      offset: 0,
      before: 0,
      commentList: [],
      textarea: '',
      getPersonalizedMvList:[]

    }
  },
  created() {
    // console.log(this.$route.params)
    this.id = this.$route.params.id
    this.feach(this.$route.params.id)
  },
  methods: {
    goMv(id) {
      console.log(id)
      this.$router.push({
        path: `/mv/${id}`
      })
    },
    async feach(id) {
      const { data } = await MV.getMvUrl(id)
      this.src = data.url
      const info = await MV.getMvInfo(id)
      this.info = info.data
      this.getCommentList(id)
      const getPersonalizedMvList = await MV.getPersonalizedMv()
      this.getPersonalizedMvList=getPersonalizedMvList
    },
    // 评论详情
    async   getCommentList(e) {
      if (this.total > 5000) {
        const option = {
          id: e,
          offset: this.offset,
          before: this.before
        }
        const commentList = await MV.getMvCommonA(option)
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
        const commentList = await MV.getMvCommonB(option)
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
      this.getCommentList(this.id)
    }
  }
}
</script>

<style scoped lang="scss">
.info{
  width: 100%;
  height: 100%;
  video{
    display: inline-block;
    width: 40%;
    position: relative;
    top: 5%;
  }
  .introduce{
    width: 30%;
    display: inline-block;
    float: right;
    margin-right: 10%;
    margin-top: 2%;
    h5{
      width: 20%;
    }
    .pre{
      float: right;
      width: 100%;
      text-align: left;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:4;
      overflow:hidden;
      cursor:pointer;
    }
    .timeCount{
      display: inline-block;
      width: 50%;
      color: #5a6268;
    }
    .PersonalizedMv{
      float: left;
      width: 30%;
      height: 10%;
      margin-top: 2%;
      margin-left: 2%;
      position: relative;
      img{
        width: 100%;
      }
      .playCount{
        font-size: small;
        position: absolute;
        color: white;
        top: -1%;
        left: 16%;
      }
      .mvpng{
        width: 15%;
        height: 15%;
        position: absolute;
        top: -1%;
        left: 0;
      }
    }
  }

  .tabs{
    width: 97%;
  margin-top: 13%;
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
