// 留言相关
import request from "@/utils/request"

// 许愿留言列表
export function wish(params) {
  return request ({
    method: 'GET',
    url: '/wish',
    params
  })
}