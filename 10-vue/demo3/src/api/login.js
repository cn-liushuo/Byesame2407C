// 登录相关
import requese from "@/utils/request"

// 登录
export function login(data) {
  return requese({
    method: "post",
    url: "/login",
    data
  })
}