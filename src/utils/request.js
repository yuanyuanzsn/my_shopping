import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
// 创建axios实例 将来对创建出来的axios实例进行自定义配置
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 自定义实例 请求/响应拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  Toast.loading({
  // 在发送请求之前做些什么
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    duration: 0 // 不会自动消失
  })
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  const res = response.data
  if (res.status !== 200) {
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 清除 loading 中的效果
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出配置好的实例
export default instance
