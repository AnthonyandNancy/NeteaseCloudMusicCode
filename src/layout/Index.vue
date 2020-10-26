<template>
  <div class="index">
    <div v-if="!show">
      <top />
      <side-bar class="sidebar" />
      <app-mian class="appmain" />
    </div>

    <transition name="el-zoom-in-bottom">
      <div v-if="show" class="transition-box">

        <br>  <br>  <br>

        <ul ref="overflowLrc" class="overflowLrc">
          <li v-for="(item,index) in lrc" :key="index" ref="lrc_ul" class="list-unstyled lrcLi" :class="{'isLrcAcived':resolveTime(lrctime)==item.time}" style="overflow:auto">
            <!--               <li v-for="(item,index) in lrc" :key="index" class="list-unstyled">-->
            {{ item.content }}

          </li>
        </ul>

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
      idnex: 0
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
    },
    songID() {
      this.id = this.songID
      this.feach(this.songID)
    },
    getMusictime() {
      const second = (this.getMusictime) % 60
      const seconds = Math.round(second)
      this.lrctime = seconds
      // this.resolveTime(seconds)
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
            this.resolvescrollTop(i)
            return obj[i].time
          }
        }
      }
    },
    // 处理滚动条
    resolvescrollTop(i) {
      const lyricList = this.$refs.overflowLrc
      // const child = document.querySelector('.isLrcAcived')
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
</script>

<style scoped lang="scss">
  .overflowLrc::-webkit-scrollbar{
    display: none;
  }
  .overflowLrc{
    overflow:auto;
    height: 60vh;
    margin: 1% auto;
    width: 50%;
    color: #42b983;
  }
.isLrcAcived{
  color: red;
}
  .transition-box {
    width: 100%;
    height: 70vh;
    margin: 0 auto;
    pre{
      height: 50vh;
      white-space:pre-line;
      color: #42b983;
    }
  }
  .index{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
  .sidebar{
    width: 13.7%;
    height: 80vh;
    float: left;
  }
  .appmain{
    width: 86.3%;
    height: 85vh;
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
    position: fixed;
    bottom: 0;
  }

  }

</style>
