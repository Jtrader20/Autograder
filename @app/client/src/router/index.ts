import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AuthenticateView from '../views/AuthenticateView.vue'
import UserView from '../views/UserView.vue'
import AdminView from '../views/AdminView.vue'
import GraderView from '../views/GraderView.vue'
import LogoutView from '../views/LogoutView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'Login',
            component: AuthenticateView
        },
        {
            path: '/register',
            name: 'Register',
            component: AuthenticateView
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutView
        },
        {
            path: '/user',
            name: 'User',
            component: UserView
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminView
        },
        {
            path: '/grader',
            name: 'Grader',
            component: GraderView
        }
    ]
})

export default router