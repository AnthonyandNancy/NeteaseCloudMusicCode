<template>
  <div class="index">
    <div v-if="!show">
      <top />
      <side-bar class="sidebar" />
      <app-mian class="appmain" />
    </div>

    <transition name="el-zoom-in-bottom">
      <div v-if="show" class="transition-box">
        <div class="transition-boxHead">
          <img :src=" songInfo.al.picUrl" alt="" class="songInfoImg">

          <h2 class="songTitle">{{ songInfo.name }}
            <span style="border-radius: 2px;width: 20px;color: white;background-color: red;">全损音质</span>
            <span v-for="(item,index) in songInfo.ar" :key="index" style="display:inline-block;color: black;font-size: small;">{{ item.name }}<span v-if="songInfo.ar.length>1" style="display: inline-block;">/</span>    </span>
          </h2>

          <ul ref="overflowLrc" class="overflowLrc">
            <br>  <br>  <br>
            <li v-for="(item,index) in lrc" :key="index" ref="lrc_ul" class="list-unstyled lrcLi" :class="{'isLrcAcived':resolveTime(lrctime)==item.time}" style="overflow:auto">
              <!--               <li v-for="(item,index) in lrc" :key="index" class="list-unstyled">-->
              {{ item.content }}

            </li>
          </ul>
        </div>
        <div class="transition-boxBody">
          <div class="commtent">
            <div>
              <el-input
                v-model="textarea"
                type="textarea"
                placeholder="请输入内容"
                maxlength="140"
                show-word-limit
              />
              <el-button class="mr-1 mt-1" style="display: block;float: right">发送</el-button>
            </div>
            <h5 v-if="!commentList.hotComments">暂无评论</h5>
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
          </div>
        </div>
      </div>
    </transition>

    <foo-ter class="footer" />
  </div>
</template>

<script>
import appMian from './components/AppMain'
import fooTer from './components/FooTer'
import sideBar from './components/SideBar'
import top from './components/Top'
import { Song } from '../api/music'
import { Footer } from '../api/footer'

export default {
  name: 'Index',
  components: {
    appMian,
    fooTer,
    sideBar,
    top
  },
  data() {
    return {
      show: false,
      id: null,
      lrc: {},
      lrctime: null,
      idnex: 0,
      songInfo: [],
      offset: 0,
      before: 0,
      total: 0,
      commentList: [],
      textarea: ''

    }
  },
  computed: {
    showLfcStatus() {
      return this.$store.getters.showStatus
    },
    songID() {
      return this.$store.getters.songId
    },
    getMusictime() {
      return this.$store.getters.LrcTime
    }
  },
  watch: {
    showLfcStatus() {
      this.show = this.showLfcStatus
      // this.musicInfo()
    },
    songID() {
      this.id = this.songID
      this.feach(this.songID)
    },
    getMusictime() {
      const second = (this.getMusictime) % 60
      const seconds = Math.round(second)
      this.lrctime = seconds
      this.resolveTime(seconds)
      // console.log(this.lrctime)
    }
  },
  created() {
    if (this.id) {
      this.feach(this.songID)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.resolvescrollTop)
  },

  methods: {
    async feach(id) {
      const { lrc } = await Song.getSongLyric(id)
      this.lrc = []
      // console.log(lrc.lyric)
      this.processingLyrics(lrc.lyric)
      //相似歌曲
      const simitSong=await Song.getSongSimis(id)
      console.log(simitSong)

      const { songs } = await Footer.getMusicInfo(id)
      this.songInfo = songs[0]
      this.getCommentList(id)
      // console.log(songs)
    },
    // 评论详情
    async   getCommentList(e) {
      if (this.total > 5000) {
        const option = {
          id: e,
          offset: this.offset,
          before: this.before
        }

        const commentList = await Song.getSongLCommentB(option)
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
        const commentList = await Song.getSongLCommentA(option)
        if (commentList.total > 5000) {
          const length = commentList.comments.length - 1
          this.before = commentList.comments[length].time
        }
        this.total = commentList.total
        this.commentList = commentList
      }
    },
    handleChange(e) {
      this.offset = e
      // console.log(this.offset)
      this.getCommentList(this.id)
    },
    // 处理歌词
    processingLyrics(lrc) {
      const lyrics = lrc.split('\n')
      const lrcObj = []
      for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i])
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        const content = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          const t = timeRegExpArr[k]
          const min = Number(String(t.match(/\[\d*/i)).slice(1))
          const sec = Number(String(t.match(/:\d*/i)).slice(1))
          const time = min * 60 + sec
          if (content !== '') {
            lrcObj.push({ time: time, content })
          }
        }
      }
      this.lrc = lrcObj
      console.log(lrcObj)
      // return lrcObj;
    },
    resolveTime(seconds) {
      const obj = this.lrc
      for (let i = 0; i < obj.length; i++) {
        if ((i - 1) > 0 && !(i + 1) < obj.length) {
          if (obj[i - 1].time < seconds && seconds < obj[i + 1].time) {
            // console.log('1>>', i)
            this.$nextTick(() => {
              this.resolvescrollTop(i)
            })

            return obj[i].time
          }
        }
      }
    },
    // 处理滚动条
    resolvescrollTop(i) {
      const lyricList = this.$refs.overflowLrc
      // const child = document.querySelector('.isLrcAcived')
      const haschild = lyricList.children
      if (haschild) {
        const child = lyricList.children[i]
        // console.log(child)
        const top = child.offsetTop - lyricList.clientHeight / 2
        // console.log(top)
        lyricList.scrollTo({
          top,
          behavior: 'smooth'
        })
      }
    }

  }

}
</script>

<style scoped lang="scss">

  .transition-box {
    width: 100%;
    margin: 0 auto;
    .transition-boxHead{
      height: 50%;
      pre{
        height: 50vh;
        white-space:pre-line;
        color: #42b983;
      }
      .overflowLrc::-webkit-scrollbar{
        display: none;
      }
      .overflowLrc{
        overflow-y: scroll;
        height: 60vh;
        margin: 1% auto 0 35% ;
        width: 50%;
        color: #42b983;
      }
      .isLrcAcived{
        color: red;
      }
      .songTitle{
        display: inline-block;
        margin-bottom: 0;
        margin-top:4% ;
      }
      .songInfoImg{
        width: 20%;
        height: 80%;
        border-radius: 50%;
        display: inline-block;
        margin-top: 10%;float: left;
        margin-left: 15%;
        animation: rotate 10s linear infinite;
      }
    }
    .transition-boxBody{
        overflow: auto;

  }
    .commtent{
      width: 50%;
      position: relative;
      margin-left: 1.5%;
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
        left: 2.5%;
        text-align: left;
      }
      .time{
        text-align: left;
        color: #757575;
      }
    }

  }
  .index{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80vh;
  .sidebar{
    width: 13.7%;
    height: 80vh;
    float: left;
  }
  .appmain{
    width: 86.3%;
    height: 84vh;
    float: left;
    overflow: auto;
  }
    .appmain::-webkit-scrollbar {/*滚动条整体样式*/
      width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
      border-radius: 5%;
      height: 1px;
    }

    .appmain::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
      border-radius: 5%;
      box-shadow: inset 0 0 5px rgba( 0, 0, 0, .1);
      background: #c20c0c;
    }

    .appmain::-webkit-scrollbar-track{/*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba( 1, 1, 1, 0.1);
      border-radius: 2%;
      background: #EDEDED;
    }

  .footer{
    width: 100%;
    height: 8.2vh;
    float: left;
  }

  }

</style>
