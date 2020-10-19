import request from '../utils/request'

// 专辑评论
/*
* 必选参数 : id: 专辑 id

可选参数 : limit: 取出评论数量 , 默认为 20

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
* 调用例子 : /comment/album?id=32311
* */

export const Comment = {

  getCommentAlbumA: function(params) {
    return request({
      url: `comment/album?id=${params.id}&offset=${params.offset}`,
      method: 'get'
    })
  },
  getCommentAlbumB: function(params) {
    return request({
      url: `comment/album?id=${params.id}&offset=${params.offset}&before=${params.before}`,
      method: 'get'
    })
  },
  // 获取热门评论  comment/hot?id=82523759&type=3
  /*
  * 必选参数 :

id : 资源 id

tpye: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型

0: 歌曲

1: mv

2: 歌单

3: 专辑

4: 电台

5: 视频
可选参数 : limit: 取出评论数量 , 默认为 20

offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)

接口地址 : /comment/hot

调用例子 : /comment/hot?id=186016&type=0
  * */
  getHotCommentListA: function(params) {
    return request({
      url: `comment/album?id=${params.id}&type=${params.type}&offset=${params.offset}`,
      method: 'get'
    })
  },
  getHotCommentListB: function(params) {
    return request({
      url: `comment/album?id=${params.id}&type=${params.type}&offset=${params.offset}&before=${params.before}`,
      method: 'get'
    })
  },
}
