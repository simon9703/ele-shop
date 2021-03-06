import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIMEOUT
})

service.interceptors.request.use(
  config => {
    config.headers['x-token'] = '7777777' // 自定义请求头
    if (process.env.NODE_ENV === 'development') {
      config.baseURL = window.location.origin // 默认使用本地代理启动时，地址：localhost ===> 改为当前访问(如手机)地址，如192.168.0.1
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    let res = response.data
    if (!res.code) {
      // 处理返回时，不符合设计的code。
      return Promise.reject(new Error('code not receive!'))
    }
    return response
  },
  error => {
    // todo: 处理全局系统错误：404、500、超时等
    return Promise.reject(error)
  }
)

export default service
