import request from '../utils/request'
export const Singer = {
//  获取歌手单曲
  getArtists: function(params) {
    return request({
      url: `artists?id=${params}`,
      method: 'get'
    })
  },
  // 获取歌手 mv
  getSingerMv: function(params) {
    return request({
      url: `artist/mv?id=${params}`,
      method: 'get'
    })
  },
  // 获取歌手专辑
  /*
  * 可选参数 : limit: 取出数量 , 默认为 50

offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
  * */
  getSingerAlbum: function(params) {
    return request({
      url: `artist/mv?id=${params}`,
      method: 'get'
    })
  },
  // 获取歌手描述
  getSingerInfo: function(params) {
    return request({
      url: `artist/desc?id=${params}`,
      method: 'get'
    })
  },
  // 获取相似歌手
  getLikeSinger: function(params) {
    return request({
      url: `simi/artist?id=${params}`,
      method: 'get'
    })
  }
}
