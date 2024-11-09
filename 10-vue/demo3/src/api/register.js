// 注册相关
import request from "@/utils/request"

// 注册
export function register(data) {
  return request({
    method: "post",
    url: '/register',
    data
  })
}