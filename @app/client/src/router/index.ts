import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AuthenticateView from '../views/AuthenticateView.vue'
import UserView from '../views/UserView.vue'
import MetricsView from '../views/MetricsView.vue'
import GraderView from '../views/GraderView.vue'
import LogoutView from '../views/LogoutView.vue'
import ScoresView from '../views/ScoresView.vue'

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
            path: '/metrics',
            name: 'Metrics',
            component: MetricsView
        },
        {
            path: '/metrics/:id',
            name: 'MetricsID',
            component: MetricsView
        },
        {
            path: '/scores',
            name: 'Scores',
            component: ScoresView
        },
        {
            path: '/grader',
            name: 'Grader',
            component: GraderView
        }, 
        {
            path: '/grader/:id',
            name: 'GraderID',
            component: GraderView
        }
    ]
})

export default router