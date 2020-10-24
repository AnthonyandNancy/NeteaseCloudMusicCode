import request from '../utils/request'

export const Song = {
//  获取歌曲的url  /song/url?id=33894312
  getSongUrl: function(params) {
    return request({
      url: `song/url?id=${params}`,
      method: 'get'
    })
  },
  //获得歌词  /lyric?id=33894312
  getSongLyric: function(params) {
    return request({
      url: `lyric?id=${params}`,
      method: 'get'
    })
  },

}

