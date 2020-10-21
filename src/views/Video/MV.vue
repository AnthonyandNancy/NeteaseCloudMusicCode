<template>
  <div class="MV">
    <div class="new">
      <h5 class="">最新MV</h5>
      <ul>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActive==1}" @click="handelGetNewMv(1)">内地</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActive==2}" @click="handelGetNewMv(2)">港台</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActive==3}" @click="handelGetNewMv(3)">欧美</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActive==4}" @click="handelGetNewMv(4)">日本</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActive==5}" @click="handelGetNewMv(5)">韩国</li>
      </ul>
      <div style="width: 10%;float: right;color: #5a6268" @click="goAllMv">更多</div>
      <div class="mt-5">
        <div v-for="(item,index) in mvList.data" :key="index" class="newMv" @click="goMv(item.id)">

          <img :src="item.cover" alt="">
          <div class="name">{{ item.name }}</div>
          <div class="artistName ">{{ item.artistName }}</div>

        </div>
      </div>
    </div>

    <div class="hot mt-5">
      <h5 class="">热播MV</h5>
      <div style="width: 10%;float: right;color: #5a6268" @click="goAllMv">更多</div>
      <div class="mt-5">
        <div v-for="(item,index) in exclusiveMvList" :key="index" class="newMv" @click="goMv(item.id)">

          <img :src="item.cover" alt="">
          <div class="name">{{ item.name }}</div>
          <div class="artistName ">{{ item.artistName }}</div>

        </div>
      </div>
    </div>

    <div class="top mt-5">
      <h5 class="">最新MV</h5>
      <ul>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActiveTop==1}" @click="handelGetTopMv(1)">内地</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActiveTop==2}" @click="handelGetTopMv(2)">港台</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActiveTop==3}" @click="handelGetTopMv(3)">欧美</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActiveTop==4}" @click="handelGetTopMv(4)">日本</li>
        <li class="list-unstyled area" :class="{areaIsactived:areaisActiveTop==5}" @click="handelGetTopMv(5)">韩国</li>
      </ul>
      <div style="width: 10%;float: right;color: #5a6268" @click="goAllMv">更多</div>
      <div class="mt-5">
        <div v-for="(item,index) in topMvList.data" :key="index" class="newMv" @click="goMv(item.id)">

          <img :src="item.cover" alt="">
          <div class="name">{{ item.name }}</div>
          <div class="artistName ">{{ item.artistName }}</div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { MV } from '../../api/mv'

export default {
  name: 'MV',
  data() {
    return {
      areaisActive: 1,
      areaisActiveTop: 1,
      mvList: [],
      topMvList: [],
      exclusiveMvList: []
    }
  },
  created() {
    this.handelGetNewMv(1)
    this.handelGetTopMv(1)
    this.feach()
  },
  methods: {
    async feach() {
      const { data } = await MV.getExclusiveMv()
      this.exclusiveMvList = data
    },

    handelGetNewMv(val) {
      this.areaisActive = val
      switch (val) {
        case 1:
          this.getNewMV('内地')
          break
        case 2:
          this.getNewMV('港台')
          break
        case 3:
          this.getNewMV('欧美')
          break
        case 4:
          this.getNewMV('日本')
          break
        case 5:
          this.getNewMV('韩国')
          break
      }
    },
    handelGetTopMv(val) {
      this.areaisActiveTop = val
      switch (val) {
        case 1:
          this.getTopMV('内地')
          break
        case 2:
          this.getTopMV('港台')
          break
        case 3:
          this.getTopMV('欧美')
          break
        case 4:
          this.getTopMV('日本')
          break
        case 5:
          this.getTopMV('韩国')
          break
      }
    },
    async getTopMV(val) {
      const topMvList = await MV.getTopMv(val)
      this.topMvList = topMvList
    },
    async getNewMV(val) {
      const mvList = await MV.getfirstMV(val)
      this.mvList = mvList
    },
    goMv(id) {
      this.$router.push({
        path: `/mv/${id}`
      })
    },
    goAllMv() {
      this.$router.push({
        name: 'MVAll'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .MV{
    height: 100%;
    width: 100%;
    position: relative;
    h5{
      text-align: left;
      width: 100px;
      position: relative;
      margin-left: 1%;
    }
    .area{
      width: 50px;
      float: left;
      color: #5a6268;

    }
    .areaIsactived{
      color: black;
    }
    .newMv{
      width: 28%;
      margin-left: 2%;
      margin-right: 2%;
      margin-top: 1%;
      display: inline-block;
      img{
        width: 100%;
        height: 25vh;
        display: inline-block;
      }
      .name, .artistName{
        width: 50rem;
        text-align: left;
      }
      .artistName{
        color: #5a6268;
      }
    }
  }

</style>
