import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 重定向
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'roleManagement',
        name: 'roleManagement',
        component: () => import('@/components/roleManagement.vue')
      },
      {
        path: 'wishingManagement',
        name: 'wishingManagement',
        component: () => import('@/components/wishingManagement.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  // 如果登录 放行
  if (to.path === '/login') {
    return next()
  } else if (!token) {
    // 没有登录 送去登录
    next('/login')
  } else {
    next()
  }
})

export default router
