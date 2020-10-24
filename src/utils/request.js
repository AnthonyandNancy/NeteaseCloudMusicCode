import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'
import el from 'element-ui/src/locale/lang/el'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})

// eslint-disable-next-line no-unused-vars
let loadingInstance, options
// request interceptor
service.interceptors.request.use(
  config => {
    // loadingInstance = Loading.service({ background: 'rgba(0,0,0, 0.3)' })
    return config
  },
  error => {
    // do something with request error
    console.log('do something with request error', error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code = 200) {
      return res
    } else {
      Message.error(res.msg)
    }

    // }
  },
  error => {
    const { data } = error.response
    console.log(data)
    Message.error(data.message)
    return Promise.reject(data)
  }
)

export default service
