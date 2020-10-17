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
        path: 'home',
        name: 'home',
        component: () => import('../views/Home'),
        meta: { title: '首页' }
      },
      {
        path: 'seach/songList',
        name: 'songList',
        component: () => import('../views/appMain/SeachSongList')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
