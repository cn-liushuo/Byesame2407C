// 角色管理相关
import request from "@/utils/request"

// 获取角色列表
export function admin(params) {
  return request({
    method: 'get',
    url: '/admin',
    params
  })
}

// 添加角色
export function addRole(data) {
  return request({
    method: "post",
    url: "/admin",
    data
  })
}

// 查询角色
export function checkRole(id) {
  return request({
    method: "get",
    url: `/admin/${id}`
  })
}

// 编辑角色
export function editRole(params) {
  return request({
    method: "put",
    url: '/admin',
    params
  })
}

// 删除角色
export function deleleRole(id) {
  return request({
    method: 'delete',
    url: `/admin${id}`
  })
}