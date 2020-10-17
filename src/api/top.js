import request from '../utils/request'

export const Seach = {
//  热搜列表(详细)
  getSearchHot: function() {
    return request({
      url: 'search/hot/detail',
      method: 'get'
    })
  },
  /* 搜索关键词*/

  getSearchHotSong: function(params) {
    return request({
      url: `search?keywords=${params.keywords}&type=${params.type}&offset=${params.offset}`,
      method: 'get'

    })
  },
  /**
   * 分类搜索
   * @param {String} keywords 关键词
   * @param {String} [type] 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
   * @param {Number} [limit] 默认为 30
   * @param {Number} [offset] 默认为 0
   */
  getSearchData: function(params) {
    return request({
      url: 'cloudsearch',
      method: 'get',
      data: params
    })
  },
  // 默认搜索关键词
  getDefaultSearchWord: function() {
    return request({
      url: 'search/default',
      method: 'get'
    })
  },
  /**
   * 搜索建议
   * @param {String} keywords 关键词
   * @param {String} [type] 如果传 'mobile' 则返回移动端数据
   */
  getSearchSuggest: function(params) {
    return request({
      url: 'search/suggest',
      method: 'get',
      data: params
    })
  },
  /**
   * 多重搜索
   * @param {String} keywords 关键词
   */
  getMultimatchSearchData: function(params) {
    return request({
      url: 'search/multimatch',
      method: 'get',
      data: params
    })
  }
}

