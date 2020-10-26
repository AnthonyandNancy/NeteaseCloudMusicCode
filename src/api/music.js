import request from '../utils/request'

export const Song = {
//  获取歌曲的url  /song/url?id=33894312
  getSongUrl: function(params) {
    return request({
      url: `song/url?id=${params}`,
      method: 'get'
    })
  },
  // 获得歌词  /lyric?id=33894312
  getSongLyric: function(params) {
    return request({
      url: `lyric?id=${params}`,
      method: 'get'
    })
  },
  // 获得歌曲评论  /comment/music?id=186016&limit=1 对应晴天评论

  /* 可选参数 : limit: 取出评论数量 , 默认为 20

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
  * */
  getSongLCommentA: function(params) {
    return request({
      url: `/comment/music?id=${params.id}&limit=20&offset=${params.offset}`,
      method: 'get'
    })
  },
  getSongLCommentB: function(params) {
    return request({
      url: `/comment/music?id=${params.id}&limit=20&offset=${params.offset}&before=${params.before}`,
      method: 'get'
    })
  },

  // 获得相似单曲
  getSongSimis: function(params) {
    return request({
      url: `/simi/song?id=${params}`,
      method: 'get'
    })
  }
}

