import request from '../utils/request'

export const Home = {
  /* 个性推荐*/
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

  getPersonalizedPrivatecontent: function() {
    return request({
      url: `/personalized/privatecontent`,
      method: 'get'
    })
  },
  /* 歌单tabs*/
  // 歌单分类
  getPlaylistCatlist: function() {
    return request({
      url: `/playlist/catlist`,
      method: 'get'
    })
  },
  // 热门歌单分类
  getPlaylistHot: function() {
    return request({
      url: `/playlist/hot`,
      method: 'get'
    })
  },
  /*
 * 歌单 ( 网友精选碟 )
说明 : 调用此接口 , 可获取网友精选碟歌单

可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'

cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)

limit: 取出歌单数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值

接口地址 : /top/playlist

调用例子 : /top/playlist?limit=10&order=new
 * */

  getPlaylist: function(params) {
    return request({
      url: `/top/playlist?order=hot&cat=${params.cat}&offset=${params.offset}`,
      method: 'get'
    })
  }
}
