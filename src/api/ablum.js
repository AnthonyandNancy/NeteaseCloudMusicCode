import request from '../utils/request'

export const Ablums = {
//  获取专辑内容
  getContent: function(params) {
    return request({
      url: `album?id=${params}`,
      method: 'get'
    })
  }

}

