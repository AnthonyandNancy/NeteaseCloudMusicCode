import request from '../utils/request'

export const User = {
  /* 发生验证码*/
  sentCode: function(data) {
    return request({
      url: `captcha/sent?phone=${data}`,
      method: 'get'
    })
  },
  /* 注册/修改密码*/
  // 示例/register/cellphone?phone=13xxx&password=xxxxx&captcha=1234&nickname=binary1345
  registerUser: function(data) {
    return request({
      url: `register/cellphone?phone=${data.phone}&password=${data.password}&captcha=${data.captcha}&nickname=${data.nickname}`,
      method: 'get'
    })
  },
  /* 登录*/
  // 调用例子 : /login/cellphone?phone=xxx&password=yyy    /login?email=xxx@163.com&password=yyy
  login: function(data) {
    return request({
      url: `/login/${data.type}?phone=${data.username}&password=${data.password}`,
      method: 'get'
    })
  }
}
