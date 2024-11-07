import axios from "axios"
import Qs from "qs"

let BASE_URL = 'http://wish.byesame.com/'

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
    console.log(config, '123')

    // 设置请求头
    config.headers = {
        "Content-Type": "application/json"
    }

    // get请求参数默认放 params 里  post 默认放 data 里
    if (config.method == "GET") {
        // 序列化参数
        config.paramsSerializer = function (params) {
            return Qs.stringify(params)
        }
    }

    return config
}), (err) => {
    return Promise.reject(err)
}

// 响应拦截器
service.interceptors.response.use((res) => {
    if (res.status === 200 && res.data.code === 200) {
        return res.data
    }
    // console.log(res)
})

export default service