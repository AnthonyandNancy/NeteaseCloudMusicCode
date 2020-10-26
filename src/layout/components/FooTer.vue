<template>
  <div class="home">
    <el-divider />
    <div class="vue_aplayer">

      <audio ref="audio" :src="music.src" autoplay />
      <transition name="el-zoom-in-center">
        <img v-if="!showSongInfo &&id" :src="inMore" alt="" class="inMore border" @click="showSong(true)">
        <img v-if="showSongInfo &&id" :src="outMore" alt="" class="inMore border" @click="showSong(false)">
      </transition>

      <div class="music">
        <p style="display: inline-block;float: left;margin-left: 2%;margin-top: 5%;width: 20%">{{ music.title }}</p>
        <img v-if="music.imgUrl" :src="music.imgUrl" class="img">
        <img v-if="!isPlay && music.imgUrl" class="start" :src="startIcon" @click="start">
        <img v-if="isPlay" class="start" :src="stopIcon" @click="stop">
      </div>

      <div class="watchMusictime">{{ watchMusictime }}</div>
      <progress-bar bar-color="#dc720f" :val="progress" size="medium" class="vue-simple-progress" />
      <div class="musictime">  {{ musictime }}</div>
      <div class="voice">
        <img :src="voice" alt="" class="voiceimg">
        <el-slider v-model="voiclValue" @input="voiclSliderChange" />

      </div>
      <el-popover
        placement="right"
        width="400"
        trigger="click"
      >
        <div>
          <ul>
            <li v-for="(item,index) in playlist" :key="index" class="list-unstyled mb-2" style="display: flex;flex-wrap: wrap;" :class="{'songIsAcyived':songIndex==index}" @click="handalClickGoSong(item.id,index)">
              <div style="width: 40%;">   {{ item.name }}</div>

              <div v-for="(ar,arindex) in item.ar" :key="arindex" style=" display:inline-block;text-align: right;">
                <div v-if="item.ar.length>1" style="display:inline-block;">/</div>{{ ar.name }}
              </div>
            </li>
          </ul>
        </div>
        <img slot="reference" :src="more" alt="" style="margin-top: -10px;margin-left: -20px;">
      </el-popover>

    </div>
  </div>

</template>

<script>
import { Footer } from '@/api/footer'
import ProgressBar from 'vue-simple-progress'
import { Home } from '../../api/home'

export default {
  name: 'FooTer',
  components: {
    ProgressBar
  },
  data() {
    return {
      id: null,
      isPlay: false,
      startIcon: require('@/assets/images/start.png'),
      stopIcon: require('@/assets/images/stop.png'),
      music: {
        title: '',
        subTitle: '',
        imgUrl: '',
        src: ''
      },
      musictime: '00:00',
      watchMusictime: '00:00',
      voiclValue: 50,
      voice: require('@/assets/images/voice.png'),
      more: require('@/assets/images/more.png'),
      progress: 0,
      idList: [],
      index: 0,
      playlist: [],
      privileges: [],
      inMore: require('@/assets/images/large.png'),
      outMore: require('@/assets/images/small.png'),
      showSongInfo: false
    }
  },
  computed: {
    song() {
      return this.$store.getters.songId
    },
    watchmusictime() {
      return this.$store.getters.watchMusicTime
    },
    songIndex() {
      return this.$store.getters.idindex
    },
    idlist() {
      return this.$store.getters.idList
    },
    songSheetId() {
      return this.$store.getters.songSheetID
    }
  },
  watch: {
    song() {
      this.id = this.song
      // console.log(this.id)
      this.feach()
    },
    watchmusictime() {
      this.watchMusictime = this.watchmusictime
    },
    songIndex() {
      this.index = this.songIndex
      // console.log(this.index)
    },
    progress() {
      if (this.progress == 100) {
        this.nextSong(this.index)
      }
      // console.log(this.songIndex)
    },
    songSheetId() {
      // console.log(this.songSheetId)
      this.getSongSheetID(this.songSheetId)
    }

  },
  mounted() {
    this.getSongSheetID(this.songSheetId)
  },
  methods: {
    // 左下角按钮
    showSong(val) {
      // console.log(val)
      this.showSongInfo = val
      this.$store.dispatch('app/setShowStatus', val)
    },
    async  feach() {
      localStorage.setItem('songID', this.id)
      this.$store.dispatch('app/chooseSong', this.id)

      const { data } = await Footer.getMusicUrl(this.id)
      const allow = await Footer.getMusicAllow(this.id)
      if (allow.success == true) {
        data.map(e => {
          if (e.url) {
            this.music.src = e.url
          }
        })
      } else {
        this.$message.error(allow.message)
      }
      // 获取音乐信息
      const { songs } = await Footer.getMusicInfo(this.id)
      // console.log('获取音乐信息', this.id)
      this.music.title = songs[0].name
      this.music.subTitle = '网抑云,你最好的歌声'
      this.music.imgUrl = songs[0].al.picUrl
      // result.songs.map(val => {
      //   if (val.id = this.id) {
      //
      //   }
      // })
      const irc = await Footer.getMusicIFC(this.id)
      this.music.lrc = irc.lrc.lyric
      this.musicTime()
      this.changeProgress()
      this.watchMusicTime()
    },
    musicTime() {
      var audio = document.querySelector('audio')
      this.isPlay = true
      audio.play()
      // 处理时长
      var time = audio.duration
      // 分钟
      var minute = time / 60
      var minutes = parseInt(minute)
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      // 秒
      var second = time % 60
      var seconds = Math.round(second)
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      this.musictime = minutes + '：' + seconds
      // console.log('处理音乐时长', minutes + '：' + seconds)
    },

    // 监听音乐实时播放的时间
    watchMusicTime() {
      const _this = this
      // 监听播放时间
      const musicDom = document.getElementsByTagName('audio')[0]// 获取Audio的DOM节点
      // 使用事件监听方式捕捉事件
      musicDom.addEventListener('timeupdate', function() { // 监听音频播放的实时时间事件
        let timeDisplay
        // 用秒数来显示当前播放进度
        timeDisplay = Math.floor(musicDom.currentTime)// 获取实时时间
        // console.log(timeDisplay)
        // 处理时间
        // 分钟
        const minute = timeDisplay / 60
        let minutes = parseInt(minute)
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        // 秒
        const second = timeDisplay % 60
        let seconds = Math.round(second)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        const time = minutes + ':' + seconds
        _this.$store.dispatch('app/setLrcTime', seconds)// 将实时时间存储到vuex中
        _this.$store.dispatch('app/watchMusicTime', time)// 将实时时间存储到vuex中
        // console.log(minutes + ':' + seconds)
      }, false)
    },

    start() {
      this.isPlay = true
      var audio = document.querySelector('audio')
      audio.play()
    },
    stop() {
      this.isPlay = false
      var audio = document.querySelector('audio')
      audio.pause()
    },
    changeProgress() {
      const musicMp3 = document.querySelector('audio')

      const timer = setInterval(() => {
        const numbers = musicMp3.currentTime / musicMp3.duration
        const perNumber = (numbers * 100).toFixed(2)
        if (perNumber >= 100) {
          this.isStore = true
          this.progress = 0
          clearInterval(timer)
        }

        // perNumber += '%'
        this.progress = perNumber
      }, 30)
    },
    voiclSliderChange(val) {
      const musicMp3 = document.querySelector('audio')
      musicMp3.volume = val / 100
      // console.log(musicMp3.volume)
    },

    // 下一首歌
    nextSong(index) {
      if (index + 1 == this.idlist.length) {
        // console.log('走了了上面',  this.idlist[0])
        this.id = this.idlist[0]
        this.index = 0
        this.feach()
      } else {
        // console.log('走了了下面', index, this.idlist.length)
        this.id = this.idlist[index + 1]
        this.index = index + 1
        this.feach()
      }
    },
    // 底部歌单目录
    async getSongSheetID(id) {
      const { playlist } = await Home.getPlaylistInfo(id)
      // console.log(playlist.tracks,'----------')
      this.playlist = playlist.tracks
    },
    handalClickGoSong(id, index) {
      this.$store.dispatch('app/setIndex', index)
      localStorage.setItem('songID', id)
      this.$store.dispatch('app/chooseSong', id)
      this.setIDLoop()
    },
    // 处理id数组
    setIDLoop() {
      this.idList = []
      this.playlist.tracks.map(val => {
        this.idList.push(val.id)
      })
      this.$store.dispatch('app/setIdList', this.idList)
      // console.log(this.idList)
    }
  }
}
</script>

<style scoped lang="scss">
  .inMore{
    width: 4vh;
    height: 4vh;
    position: relative;
    top: -1.5vh;
    left: 2%;
  }
  .songIsAcyived{
    color: red;
  }
  .home{
    height: 20vh;
  }
.vue_aplayer{
  margin: 0;
  padding: 0;
 display: flex;
  flex-wrap: inherit;
}
.music{
  position: fixed;
  width: 30vh;
  height: 10vh;
  top: 50vh;
  left: 1vh;
  img{
    width:30%;
    height: 100%;
    z-index: 99999;
  }
  .start{
    width: 30%;
    height: 100%;
  }

}
  .vue-simple-progress{
    width: 40%;
    margin-top: 0.1%;
  }
  .watchMusictime{
    width: 100px;
    width: 100px;
    margin-top: -0.2%;
    margin-left: 10%;
  }
  .musictime{
    width: 100px;
    margin-top: -0.2%;
    margin-left: 0%;
  }
  .voice{
    margin-top: -2vh;
    .el-slider{
      display: inline-block;
      width: 30%;
      margin-left: 3vh;
      margin-top: 0.5vh;
    }
    .voiceimg{
      width:5% ;
      height: 50%;
      margin-top: -3vh;
    }
  }

</style>
