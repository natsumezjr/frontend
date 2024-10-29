//router/index.js
import { createWebHistory,  createRouter } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
//import NotFoundPage from '@/views/NotFoundPage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'
import StudentPage from '@/views/dashboard/StudentPage.vue'
import ProfilePage from '@/views/dashboard/ProfilePage.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },
    {
        path: '/register',
        name:'register',
        component: RegisterPage
    },
    {
        path: '/student',
        name:'student',
        component: StudentPage
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'not-found',
    //     component: NotFoundPage
    // }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router