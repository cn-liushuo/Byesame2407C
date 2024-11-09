import axios from "axios"

let BASE_URL = ' http://wish.byesame.com/'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    if (token && config.url !== "/login") {
      config.headers = {
        "Content-Type": "application/json",
        token: token
      }
    }
    return config
  }
)

export default service