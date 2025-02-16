import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false } 
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: () => import('@/views/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Before each route navigation, checking if the user is authenticated
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
        name: 'LoginView',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    if (store.getters['auth/isAuthenticated'] && to.name === 'Login') {
      next({ name: 'DashboardView' })
    } else {
      next()
    }
  }
})

export default router