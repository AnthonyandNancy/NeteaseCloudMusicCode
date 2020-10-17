import request from '../utils/request'

export const User = {
  sentCode: function(data) {
    return request({
      url: `captcha/sent?phone=${data}`,
      method: 'get'
    })
  }

}
