import request from '../utils/request'

export const Home = {
  // banner
  getHomeBanner: function(params) {
    return request({
      url: `/banner?type=0`,
      method: 'get'
    })
  },
  //   推荐歌单
  //   说明 : 调用此接口 , 可获取推荐歌单
  //
  //   可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
  //
  // 接口地址 : /personalized
  //
  // 调用例子 : /personalized?limit=1
  getRecommendedSongList: function(params) {
    return request({
      url: `/personalized?limit=14`,
      method: 'get'
    })
  },

  // 推荐新音乐
  // 说明 : 调用此接口 , 可获取推荐新音乐
  //
  // 接口地址 : /personalized/newsong
  //
  // 调用例子 : /personalized/newsong

  getRecommendedNewsong: function(params) {
    return request({
      url: `/personalized/newsong`,
      method: 'get'
    })
  },

  // 推荐电台
  // 说明 : 调用此接口 , 可获取推荐电台
  //
  // 接口地址 : /personalized/djprogram
  //
  // 调用例子 : /personalized/djprogram

  getRecommendedDjprogram: function(params) {
    return request({
      url: `/personalized/djprogram`,
      method: 'get'
    })
  },

  // 推荐节目
  // 说明 : 调用此接口 , 可获取推荐电台
  //
  // 接口地址 : /program/recommend
  //
  // 调用例子 : /program/recommend

  getRecommendedProgram: function(params) {
    return request({
      url: `/program/recommend`,
      method: 'get'
    })
  },
  //
  // 独家放送(入口列表)
  // 说明 : 调用此接口 , 可获取独家放送
  //
  // 接口地址 : /personalized/privatecontent
  //
  // 调用例子 : /personalized/privatecontent

  getPersonalizedPrivatecontent: function(params) {
    return request({
      url: `/personalized/privatecontent`,
      method: 'get'
    })
  }
//
}
