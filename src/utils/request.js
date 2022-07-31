// 引入axios
import axios from 'axios'
// 克隆一个axios(实例)
// const request = axios.create()
// request.defaults.baseURL = 'http://toutiao.itheima.net'
// request.timeout = 5000

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

export default request
