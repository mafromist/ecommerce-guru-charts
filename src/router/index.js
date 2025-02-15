import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Before each route navigation, check if the user is authenticated
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (token && !store.state.auth.accessToken) {
    await store.dispatch('auth/initializeAuth')
  }

  if (to.meta.requiresAuth) {
    if (store.getters['auth/isAuthenticated']) {
      next() 
    } else {
      next({ 
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (store.getters['auth/isAuthenticated'] && to.name === 'Login') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router