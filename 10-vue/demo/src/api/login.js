// 登陆相关
import request from "@/utils/request"

export function login(data) {
    return request({
        method: 'POST',
        url: "/login",
        data
    })
}