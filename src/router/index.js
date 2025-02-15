import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@views/Dashboard.vue'
import Login from '@views/Login.vue'
import store from '@/store'

const routes = [
    {
        path: '/',
        name: 'Welcome to Ecommerce Guru ',
        component: Login,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
        next('/')
    } else {
        next()
    }
})

export default router
