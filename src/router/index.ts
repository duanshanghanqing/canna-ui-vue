import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'system',
        name: 'HomeSystem',
        component: () => import(/* webpackChunkName: "system" */ '../views/home/system/index.vue'),
        children: [
          {
            path: 'user',
            name: 'HomeSystemUser',
            component: () => import(/* webpackChunkName: "user" */ '../views/home/system/user.vue'),
          },
          {
            path: 'menu',
            name: 'HomeSystemMenu',
            component: () => import(/* webpackChunkName: "menu" */ '../views/home/system/menu.vue'),
          }
        ]
      },
      {
        path: 'form',
        name: 'HomeSystemForm',
        component: () => import(/* webpackChunkName: "form" */ '../views/home/form.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue'),
    children: [
      {
        path: 'my',
        name: 'AboutMy',
        component: () => import(/* webpackChunkName: "my" */ '../views/about/my/index.vue'),
        children: [
          {
            path: 'own',
            name: 'AboutMyOwn',
            component: () => import(/* webpackChunkName: "own" */ '../views/about/my/own/index.vue'),
          },
          {
            path: 'team',
            name: 'AboutMyTeam',
            component: () => import(/* webpackChunkName: "team" */ '../views/about/my/team/index.vue'),
          },
          {
            path: 'company',
            name: 'AboutMyCompany',
            component: () => import(/* webpackChunkName: "company" */ '../views/about/my/company/index.vue'),
          }
        ]
      },
      {
        path: 'culture',
        name: 'AboutCulture',
        component: () => import(/* webpackChunkName: "culture" */ '../views/about/culture/index.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/canna-web/'),
  routes
})

export default router
