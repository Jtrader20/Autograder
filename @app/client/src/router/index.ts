import { createWebHistory, createRouter } from 'vue-router'
import { useUserStore } from '../store/user'

import HomeView from '../views/HomeView.vue'
import AuthenticateView from '../views/AuthenticateView.vue'
import UserView from '../views/UserView.vue'
import MetricsView from '../views/MetricsView.vue'
import GraderView from '../views/GraderView.vue'
import LogoutView from '../views/LogoutView.vue'
import ScoresView from '../views/ScoresView.vue'
import AssignmentsView from '../views/AssignmentsView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            meta: {
                logout: true
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: AuthenticateView,
            meta: {
                logout: true
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: AuthenticateView,
            meta: {
                logout: true
            }
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutView
        },
        {
            path: '/user',
            name: 'User',
            component: UserView,
            meta: {
                admin: true,
                user: true
            }
        },
        {
            path: '/metrics',
            name: 'Metrics',
            component: MetricsView,
            meta: {
                admin: true
            }
        },
        {
            path: '/metrics/:id',
            name: 'MetricsID',
            component: MetricsView,
            meta: {
                admin: true
            }
        },
        {
            path: '/scores',
            name: 'Scores',
            component: ScoresView,
            meta: {
                admin: true
            }
        },
        {
            path: '/grader',
            name: 'Grader',
            component: GraderView,
            meta: {
                admin: true,
                user: true
            }
        }, 
        {
            path: '/grader/:id',
            name: 'GraderID',
            component: GraderView,
            meta: {
                admin: true,
                user: true
            }
        }
    ]
})


export default router