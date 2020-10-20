<template>
  <div class="home">
    <el-divider />
    <div class="vue_aplayer">
      <audio ref="audio" :src="music.src" autoplay />
      <img v-if="music.imgUrl" :src="music.imgUrl" class="img">
      <img v-if="!isPlay" class="start" :src="startIcon" @click="start">
      <img v-if="isPlay" class="start" :src="stopIcon" @click="stop">
      <div class="watchMusictime">{{ watchMusictime }}</div>
      <progress-bar bar-color="#dc720f" :val="progress" size="medium" class="vue-simple-progress" />
      <div class="musictime">  {{ musictime }}</div>
    </div>
  </div>

</template>

<script>
import { Footer } from '@/api/footer'
import ProgressBar from 'vue-simple-progress'

export default {
  name: 'FooTer',
  components: {
    ProgressBar
  },
  data() {
    return {
      id: null,
      isPlay: false,
      progress: '0',
      startIcon: require('@/assets/images/start.png'),
      stopIcon: require('@/assets/images/stop.png'),
      music: {
        title: '',
        subTitle: '',
        imgUrl: '',
        src: ''
      },
      musictime: '00:00',
      watchMusictime: '00:00'

    }
  },
  computed: {
    song() {
      return this.$store.getters.songId
    },
    watchmusictime() {
      return this.$store.getters.watchMusicTime
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
    }

  },
  mounted() {

  },
  methods: {
    async  feach() {
      const { data } = await Footer.getMusicUrl(this.id)
      const allow = await Footer.getMusicAllow(this.id)
      if (allow.success == true) {
        console.log(545444)
        data.map(e => {
          if (e.url) {
            this.music.src = e.url
          }
        })
      } else {
        console.log('5455')
        this.$message.error(allow.message)
      }
      // 获取音乐信息
      const { result } = await Footer.getMusicInfo(this.id)
      result.songs.map(val => {
        if (val.id = this.id) {
          this.music.title = val.name
          this.music.subTitle = val.album.artist.name
          this.music.imgUrl = val.artists[0].img1v1Url
        }
      })
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
      console.log('处理音乐时长', minutes + '：' + seconds)
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
      var musicMp3 = document.querySelector('audio')
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
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    height: 20vh;
  }
.vue_aplayer{
  .img{
    width:3%;
    height: 3%;
    position: relative;
    margin-top: -1%;
    left: -43%;
  }
  .start{
    width: 2%;
    height: 2%;
    display: inline-block;
    position: relative;
    margin-top: -1%;
    left: -42%;
  }

}
  .vue-simple-progress{
    width: 50%;
    margin-top: -1.3%;
    margin-left: auto;
    margin-right: auto;
  }
  .watchMusictime{
    display: inline-block;
    position: absolute;
   left: 20%;
  }
  .musictime{
    display: inline-block;
    position: relative;
    right: -30%;
    top: -1vh;
  }
</style>
