import request from '../utils/request'

export const MV = {
//  获取最新MV
  getfirstMV: function(params) {
    return request({
      url: `/mv/first?limit=6&area=${params}`,
      method: 'get'
    })
  },
  // 获得MV地址  /mv/url?id=5436712
  getMvUrl: function(params) {
    return request({
      url: `/mv/url?id=${params}`,
      method: 'get'
    })
  },
  // 获得MV数据  /mv/detail?mvid=5436712
  getMvInfo: function(params) {
    return request({
      url: `/mv/detail?mvid=${params}`,
      method: 'get'
    })
  },
  // 获得MV评论
  getMvCommonA: function(params) {
    return request({
      url: `/comment/mv?id=${params.id}&offset=${params.offset}&before=${params.before}`,
      method: 'get'
    })
  },
  getMvCommonB: function(params) {
    return request({
      url: `/comment/mv?id=${params.id}&offset=${params.offset}`,
      method: 'get'
    })
  },

  //   网易出品mv
  //   说明 : 调用此接口 , 可获取网易出品 mv
  //
  //   可选参数 : limit: 取出数量 , 默认为 30
  //
  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
  //
  // 接口地址 : /mv/exclusive/rcmd
  //
  // 调用例子 : /mv/exclusive/rcmd?limit=10

  getExclusiveMv: function(params) {
    return request({
      url: `/mv/exclusive/rcmd?limit=6`,
      method: 'get'
    })
  },
  // 推荐 mv
  // 说明 : 调用此接口 , 可获取推荐 mv
  //
  // 接口地址 : /personalized/mv
  //
  // 调用例子 : /personalized/mv
  getPersonalizedMv: function(params) {
    return request({
      url: `/personalized/mv`,
      method: 'get'
    })
  },

  //* mv 排行
  // 说明 : 调用此接口 , 可获取 mv 排行
  //
  // 可选参数 : limit: 取出数量 , 默认为 30
  //
  // area: 地区,可选值为内地,港台,欧美,日本,韩国,不填则为全部
  //
  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
  //
  // 接口地址 : /top/mv
  //
  // 调用例子 : /top/mv?limit=10
  getTopMv: function(params) {
    return request({
      url: `top/mv?limit=12&area=${params}`,
      method: 'get'
    })
  }

  /*
  * 全部 mv
说明 : 调用此接口 , 可获取全部 mv

可选参数 :
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部

order: 排序,可选值为上升最快,最热,最新,不填则为上升最快

limit: 取出数量 , 默认为 30

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0

接口地址 : /mv/all

调用例子 : /mv/all?area=港台

  * */

}

