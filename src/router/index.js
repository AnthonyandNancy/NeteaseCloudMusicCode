import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home'),
        meta: { title: '首页' }
      },
      {
        path: '/seach',
        name: 'seach',
        component: () => import('../views/Seach/index')
      },
      {
        path: '/seach/AlbumContent',
        name: 'AlbumContent',
        component: () => import('../views/Seach/AlbumContent')
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
