import { User, AuthToken, Role } from '@autograder/shared'
import { defineStore } from 'pinia'
import { UserService } from '../service/UserService'
import router from '../router'



export const useUserStore = defineStore('User', {
    state: () => ({
        userservice: new UserService(),
        firstName: '',
        lastName: '',
        alias: '',
        roles: [''],
        authToken: '',
        graceDays: 0,

    }),
    actions: {
        async login(alias: string, password: string) {
            try {
                const [user, auth, role]: [User, AuthToken, Role] = await this.userservice.login(alias, password)
                this.setFields(user, auth, role)
                router.push('/user')
            } catch (error) {
                alert('Login failed')
            }
        },
        async register(firstName: string, lastName: string, alias: string, password: string) {
            try {
                const [user, auth, role]:  [User, AuthToken, Role] = await this.userservice.register(firstName, lastName, alias, password)
                this.setFields(user, auth, role)
                router.push('/user')
            } catch (error) {
                alert('Regiseted failed')
            }
        },

        async logout() {
            try {
                await this.userservice.logout(this.authToken)
                this.resetFields()
                router.push('/')
            } catch (error) {
                alert('Logout failed')
            }
        },

        setFields(user: User, auth: AuthToken, role: Role) {
            this.firstName = user.firstName
            this.lastName = user.lastName
            this.alias = user.alias
            this.graceDays = user.graceDays

            this.authToken = auth.token,
            this.roles = role.roles

        },
        resetFields() {
            this.firstName = ''
            this.lastName = ''
            this.alias = ''
            this.graceDays = 0

            this.authToken = '',
            this.roles = ['']
        }
    },
    getters: {
        isLoggedIn: (state) => {
            return !!state.authToken
        },
        isAdmin: (state) => {
            return state.roles.some(role => role === "ADMIN")
        },
        fullName: (state) => {
            return `${state.firstName} ${state.lastName}`
        },
        initials: (state) => {
            
            const firstInitial = state.firstName ? state.firstName[0].toUpperCase() : ''
            const lastIniital = state.lastName ? state.lastName[0].toUpperCase() : ''
            return `${firstInitial}${lastIniital}`
        }
    }
})