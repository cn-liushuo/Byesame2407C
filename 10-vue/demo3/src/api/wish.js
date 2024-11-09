// 许愿留言相关
import request from '@/utils/request'

// 许愿留言列表
export function list(params) {
  return request({
    method: 'get',
    url: '/wish',
    params
  })
}

// 添加许愿留言
export function addWish(data) {
  return request({
    method: 'post',
    url: '/wish',
    data
  })
}

// 查询许愿留言
export function checkWish(params) {
  return request({
    method: 'get',
    url: `/wish/${params}`
  })
}

// 编辑
export function editWish(id) {
  return request({
    method: 'put',
    url: `/wish/:${id}`
  })
}

// 删除
export function deleteWish(id) {
  return request({
    method: 'delete',
    url: `/wish/${id}`
  })
}