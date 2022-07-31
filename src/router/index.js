import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 懒加载
// 优化首屏加载速度
const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    // 如果子路由的path 没有/， 那么会把父亲path和儿子path拼接
    // 如果子路由的path 有/， 不会拼接
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/qa',
        component: () => import('@/views/QA')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/profile',
    component: () => import('@/views/profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
