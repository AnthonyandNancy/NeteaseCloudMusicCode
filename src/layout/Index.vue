<template>
    <div class="index">
        <top></top>
        <side-bar class="sidebar"></side-bar>
        <app-mian class="appmain"></app-mian>
        <foo-ter class="footer"></foo-ter>
    </div>
</template>

<script>
import appMian from './components/AppMain'
import fooTer from './components/FooTer'
import sideBar from './components/SideBar'
import top from './components/Top'

export default {
  name: 'Index',
  components: {
    appMian,
    fooTer,
    sideBar,
    top
  }
}
</script>

<style scoped lang="scss">
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
    float: left;
  }
  }

</style>
