<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="layout text-accent bg-primary flex justify-center items-center">
            <div class="px-48 py-48 rounded-md shadow-xl flex flex-col">
                <div class="text-center text-2xl py-4">
                    {{ title }}
                </div>
                <AuthForm :isLogin="isLogin"/>
                <div class="text-center">
                    <div>
                        {{ routeTitleText }}
                    </div>
                    <RouterLink
                        :to="route"
                        class="underline"
                    >
                        {{ routeText }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import GeneralHeader from '../components/General/Header.vue'
    import AuthForm from '../components/Authenticate/AuthForm.vue';

    export default {
        components: {
            GeneralHeader,
            AuthForm
        },
        data() {
            return {
                slug: ''
            }
        },
        computed: {
            isLogin(): boolean {
                return this.slug === '/login'
            },
            isRegister(): boolean {
                return this.slug === '/register'
            },
            title(): string {
                return this.isLogin ? 'Login' : 'Register'
            },
            route(): string {
                return this.isLogin ? '/register' : '/login'
            },
            routeText(): string {
                return this.isLogin ? 'Register' : 'Login'
            },
            routeTitleText(): string {
                return this.isLogin ? 'Not already a user?' : 'Already a user?'
            }
        },
        methods: {

        },
        watch: {
            '$route.fullPath'(slug: string) {
                this.slug = slug
            } 
        },
        created() {
            this.slug = this.$route.fullPath
        }
    }
</script>

<style scoped>
.layout {
    height: calc(100% - 4rem)
}
</style>