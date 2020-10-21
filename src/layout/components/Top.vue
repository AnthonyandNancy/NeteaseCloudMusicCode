<template>
  <div class="nav mt--5">
    <img :src="require('@/assets/images/logo.png')" @click="GoHome">

    <div class="mt-3 go">
      <el-button icon="el-icon-arrow-left" @click="go(-1)" />
      <el-button icon="el-icon-arrow-right" @click="go(1)" />
    </div>
    <el-input
      v-model="seachValue"
      placeholder="音乐/视频/用户"
      class=" mt-3 mr-5 seach"
      @focus="houFocus"
      @blur="hotBlur"
      @change="handelChangeSeach"
    >
      <i slot="prefix" class="el-input__icon el-icon-search" />
    </el-input>

    <div class="ml-auto mt-3 mr-5 " @click="handelShowLogin">
      <el-button icon="el-icon-s-custom" />
      <span class="text-light">{{ loginStatus }}</span>
    </div>

    <!--    表的弹窗-->
    <div v-if="hotShow" class="popoverDiv">
      <!--  搜索列表-->

      <!--      热门列-->
      <div>
        <div class="popoverHot text-danger h5">搜索历史:</div>

        <div class="popoverHot text-danger h5">热搜榜:</div>

        <ul v-loading="hotloading" class=" popoverHotContent">
          <li v-for="(item,index) in hotList" :key="index" class="list-unstyled  hotLi" @click="handleClickHot(item.searchWord )">

            <span class="text-dark h4  " @click="handleClickHot(item.searchWord )">{{ index+1 }}</span>
            <div class="hotDiv" @click="handleClickHot(item.searchWord )">
              <div style="width: 100%;">
                <div class="hotsearchWord">{{ item.searchWord }}</div>
                <div class="hotscore">(  {{ item.score }}  )</div>
              </div>
              <div style="width: 100%;">
                <div class="hotcontent">{{ item.content }}</div>

                <img class="hotIcon" :src="item.iconUrl">
              </div>

            </div>

          </li>
        </ul>

      </div>

    </div>

    <!--    登录界面-->
    <el-dialog
      :title="loginTitle"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div v-if="showLogin" style="width: 100%;" class="dialogVisible">
        <div class="demo-input-suffix">
          手机号码/邮箱：
          <el-input
            v-model="userName"
            placeholder="请输入 手机号码/邮箱"
            suffix-icon="el-icon-user"
          />
        </div>
        <div class="demo-input-suffix">
          密码：
          <el-input
            v-model="passWord"
            placeholder="请输入密码"
            type="password"
            suffix-icon="el-icon-warning-outline"
          />
        </div>
        <div style="float: right;" class=" text-primary" @click="()=>{showLogin=false;loginTitle='注册';loginType=1}">
          注册
        </div>
        <div class="btnDiv">
          <button @click="handelCance">取消</button>
          <button @click="handelLogin">登录</button>
        </div>
      </div>
      <div v-if="!showLogin" style="width: 100%;" class="dialogVisible">
        <div class="demo-input-suffix">
          手机号码：
          <el-input
            v-model="userName"
            type="number"
            placeholder="请输入 手机号码"
            suffix-icon="el-icon-user"
          />
        </div>
        <div class="demo-input-suffix">
          昵称：
          <el-input
            v-model="nickname"
            type="number"
            placeholder="请输入昵称"
            suffix-icon="el-icon-user"
          />
        </div>
        <div class="demo-input-suffix">
          密码：
          <el-input
            v-model="passWord"
            placeholder="请输入密码"
            type="password"
            suffix-icon="el-icon-warning-outline"
            :disabled="codeStatus"
          />
        </div>
        <div class="row">
          <span style="width: 100%;text-align: left;" class="ml-3"> 验证码：</span>

          <el-input
            v-model="captcha"
            placeholder="请输入验证码"
            class="col-10 mt-2"
          />
          <button style="border: none;background-color: red;border-radius: 50vh; color: white;" :disabled="sendCodeStatus" @click="sendCode">
            {{ phoneCode }}
          </button>

        </div>
        <div style="float: right;" class=" text-primary mt-1" @click="()=>{showLogin=true;loginTitle='登录';loginType=0}">
          登录
        </div>
        <div class="btnDiv">
          <button @click="handelCance">取消</button>
          <button @click="handelLogin">{{ loginTitle }}</button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Seach } from '@/api/top'
// import { Song } from '@/api/music'
import { User } from '@/api/user'
import { setToken } from '@/utils/auth'
export default {
  name: 'Top',
  data() {
    return {
      seachValue: '',
      /* 热搜榜*/
      hotList: [],
      hotShow: false,
      hotloading: true,
      /* 登录*/
      showLogin: true,
      dialogVisible: false,
      loginTitle: '登录',
      userName: null,
      passWord: null,
      // 0是登录,1是注册
      captcha: null,
      nickname: null,
      loginType: 0,
      loginStatus: '未登录',
      phoneCode: '发送验证码',
      codeStatus: true,
      countDown: 60,
      sendCodeStatus: false
    }
  },
  created() {
  },
  methods: {
    /* logo*/
    GoHome() {
      this.$router.push({
        path: '/home'
      })
    },
    go(e) {
      this.$router.go(e)
    },

    /* 搜索框按下回车*/
    handelChangeSeach() {
      // console.log('搜索框按下回车')
      localStorage.setItem('keywords', this.seachValue)
      this.$router.push({
        path: '/seach'
      })
      this.$store.dispatch('app/chooseHotSong', this.seachValue)
      this.hotShow = false
    },

    /* 热搜榜*/
    async getHot() {
      const { data } = await Seach.getSearchHot()
      if (data) {
        this.hotloading = false
        // console.log(data)
        data.map(e => {
          if (e.iconUrl == null) {
            e.iconUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1602843601248&di=82658b6c03688e73fa61b792d52c718b&imgtype=0&src=http%3A%2F%2Fpic.16pic.com%2F00%2F26%2F38%2F16pic_2638652_b.jpg'
          }
        })
        this.hotList = data
      } else {
        this.hotloading = true
      }
    },
    houFocus() {
      this.getHot()
      this.hotShow = true
    },
    hotBlur() {
      setTimeout(() => {
        this.hotShow = false
      }, 500)
    },
    // 点击列表获得热门歌曲详细内容
    async handleClickHot(e) {
      // console.log(11)
      // console.log(e)
      localStorage.setItem('keywords', e)
      this.$router.push({
        path: '/seach'
      })
      this.$store.dispatch('app/chooseHotSong', e)
      // const keywords = e
      // const { result } = await Seach.getSearchHotSong(keywords)
      // console.log(result)
      // const id = result.songs[0].id
      // const { data } = await Song.getSongUrl(id)
      // console.log(data)
    },
    /* 登录*/
    handelShowLogin() {
      this.dialogVisible = true
    },
    handelCance() {
      this.dialogVisible = false
    },

    async handelLogin() {
      const status = this.loginType
      switch (status) {
        // 0是登录,1是注册
        case 0:
          if (this.userName != null && this.passWord != null) {
            const res = this.cheackPE(this.userName)
            if (res) {
              const option = {
                type: res,
                username: this.userName,
                password: this.password
              }
              const { message, cookie } = await User.login(option)
              this.$message({
                showClose: true,
                message: message,
                type: 'success'
              })
              if (cookie) {
                setToken(cookie)
                this.loginStatus = '登录成功'
              }
            }
          } else {
            this.$message({
              showClose: true,
              message: '请填写完整的手机号码/邮箱/密码',
              type: 'error'
            })
          }
          break
        case 1:
          if (this.userName != null && this.passWord != null && this.nickname != null && this.captcha != null) {
            this.cheackPE(this.userName)
          } else {
            this.$message({
              showClose: true,
              message: '请填写完整的手机号码/邮箱/密码',
              type: 'error'
            })
          }
          break
        default:
          console.log('登录错误')
      }
    },
    // 验证是邮箱还是手机号码
    cheackPE(e) {
      if (e.search('@') != -1) {
        // 调用验证规则
        const res = this.emailVerification(e)
        console.log('这是邮箱', res)
        return res
      } else {
        const res = this.phoneVerification(e)
        console.log('电话号码', res)
        return res
      }
    },

    // 验证手机号码是否正确
    phoneVerification(phone) {
      const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
      if (!reg.test(phone)) {
        this.$message({
          showClose: true,
          message: '手机号码有误，请重填',
          type: 'error'
        })
        return false
      } else {
        return 'cellphone'
      }
    },
    // 验证邮箱是否正确
    emailVerification(email) {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (reg.test(email)) {
        // alert('邮箱格式正确')
        return 'email'
      } else {
        this.$message({
          showClose: true,
          message: '邮箱格式不正确，请重填',
          type: 'error'
        })
        // alert('邮箱格式不正确')
        return false
      }
    },

    async sendCode() {
      // console.log(this.userName)
      if (this.userName) {
        const num = this.userName
        const { code } = await User.sentCode(num)

        if (code == 200) {
          this.sendCodeStatus = true
          this.codeStatus = false
          const time = setInterval(() => {
            if (this.countDown <= 0) {
              clearInterval(time)
              this.countDown = 60
              this.phoneCode = '发送验证码'
            }
            this.phoneCode = this.countDown - 1
            this.countDown = this.phoneCode
            // console.log(this.phoneCode)
          }, 1000)
        } else {
          this.$message({
            showClose: true,
            message: '请输入正确的手机号码',
            type: 'error'
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.nav{
    margin: 0;
    padding: 0;
    background-color: #242424;
    width: 100%;
    height: 64px;

    .seach{
      width: 10%;
      height: 1%;
      border-radius: 50px;
    }
  .go{
    .el-button{
      border-radius: 50%;
      background-color: rgba(36,36,36,0.1);
      border: none;
    }

  }

  .el-button{
    border-radius: 50%;
    background-color: rgba(36,36,36,0.1);
    border: none;
  }
  .popoverDiv{
    position: absolute;
    box-shadow: aliceblue;
    width: 16%;
    height: 50%;
    top: 8%;
    left: 13.7%;
    z-index: 9999;
    overflow: auto;
    border-top-left-radius: 2%;
    border-top-right-radius: 2%;
    border-bottom-left-radius: 2%;
    border-bottom-right-radius: 2%;
    background-color:white ;

    span{
     margin-left: -90%;
      display: inline;
    }
    li{
      /*border: #242424 solid 1px;*/
      height: 5vh;
    }
    li:hover{
      background-color: rgba(58,136,253,0.1);
    }
    .popoverHot {
      line-height: 5vh;
      text-align: left;
    }
      .popoverHotContent{
        margin: 0;
        padding: 0;
        .hotDiv{
          position: relative;
          margin-top: -10%;;
          padding: 0;
          .hotsearchWord{
            text-align: left;
            display: inline-block;
            float: left;
            margin-left: 11%;
          }
          .hotscore{
            display: inline-block;
            float: left;
            color: #757575;
            margin-top: 1%;
            margin-left: 1%;
            font-size: small;
          }
          .hotcontent{
            position: absolute;
            left: 3.5vh;
            top: 2.5vh;
            color: #757575;
            font-size: small;
          }
          .hotIcon{
            width: 2.5vh;
            height: 2.5vh;
            float: right;
          }
        }

      }

  }
  .popoverDiv::-webkit-scrollbar {/*滚动条整体样式*/
    width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
    border-radius: 5%;
    height: 1px;
  }

  .popoverDiv::-webkit-scrollbar-thumb{/*滚动条里面小方块*/
    border-radius: 5%;
    box-shadow: inset 0 0 5px rgba( 0, 0, 0, .1);
    background: #c20c0c;
  }

  .popoverDiv::-webkit-scrollbar-track{/*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba( 1, 1, 1, 0.1);
    border-radius: 2%;
    background: #EDEDED;
  }

  .dialogVisible{
    text-align: left;
    .btnDiv{
      width: 100%;
      button{
        border: none;
        background-color: #409eff;
        border-radius: 1vh;
        width: 10vh;
        height: 4vh;
        color: white;
        margin-top: 2vh;
        margin-left: 10vh;
      }
    }

  }
}
</style>
