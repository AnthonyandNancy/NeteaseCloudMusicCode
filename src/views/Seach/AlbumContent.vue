<template>
  <div class="home">
    <img :src="list.album.blurPicUrl" alt="" style="width: 20vh;height:20vh;" class="ablumImg">
    <div class="text-white ablumWord">专辑</div>
    <div>{{list.album.name}}</div>
    <div v-for="(item,index) in list.album.alias" :key="index">{{item}}</div>

  </div>
</template>

<script>
import { Ablums } from '@/api/ablum'
export default {
  name: 'AlbumContent',
  data() {
    return {
      list: []

    }
  },
  computed: {
    ablumID() {
      return this.$store.getters.ablum
    }
  },
  created() {
    this.feach()
  },
  methods: {
    async feach() {
      const data = await Ablums.getContent(this.ablumID)
      this.list = data
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    .ablumImg{
      float: left;
      margin-top: 4vh;
      margin-left: 3vh;
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
    }
  }

</style>
