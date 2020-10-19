import request from '../utils/request'

export const Ablums = {
//  获取专辑内容
  getContent: function(params) {
    return request({
      url: `album?id=${params}`,
      method: 'get'
    })
  },
  // 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数    album/detail/dynamic?id=82523759
  getAblumsDetailDynamic: function(params) {
    return request({
      url: `album/detail/dynamic?id=${params}`,
      method: 'get'
    })
  },

}

