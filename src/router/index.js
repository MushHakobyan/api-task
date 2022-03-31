import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import guest from './middleware/guest'
import auth from './middleware/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Home',
    redirect: '/users',
    component: Home,
    meta: {
      middleware: [auth]
    },
    children: [
      {
        path: '/users',
        name: 'Users',
        meta: {
          middleware: [auth]
        },
        component: () => import('@/views/Users.vue')
      },
      {
        path: '/users/:id',
        name: 'User',
        meta: {
          middleware: [auth]
        },
        component: () => import('@/views/User.vue'),
        props: true
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }
  const middleware = to.meta.middleware

  const context = {
      to,
      from,
      next
  }
  return middleware[0]({
      ...context
  })
})

export default router
