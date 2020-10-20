import request from '../utils/request'

export const Footer = {
//  获取音乐URl
  getMusicUrl: function(params) {
    return request({
      url: `/song/url?id=${params}`,
      method: 'get'
    })
  },
  // 获取音乐信息
  getMusicInfo: function(params) {
    return request({
      url: `/search?keywords=${params}&type=1`,
      method: 'get'
    })
  },
  // 音乐是否可播放
  getMusicAllow: function(params) {
    return request({
      url: `/check/music?id=${params}`,
      method: 'get'
    })
  },
  // 音乐歌词
  getMusicIFC: function(params) {
    return request({
      url: `/lyric?id=${params}`,
      method: 'get'
    })
  }

}

