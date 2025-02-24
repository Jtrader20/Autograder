<template>
    <form class="pt-4">
        <div class="flex items-center pb-4" v-if="!isLogin">
            <div class="w-24">
                First Name:
            </div>
            <input 
                type="text"
                class="bg-primary border-2 border-primary_alt rounded-md p-2 text-accent"
                v-model="firstName"
            >
        </div>
        <div class="flex items-center pb-4" v-if="!isLogin">
            <div class="w-24">
                Last Name:
            </div>
            <input 
                type="text"
                class="bg-primary border-2 border-primary_alt rounded-md p-2 text-accent"
                v-model="lastName"
            >
        </div>
        <div class="flex items-center pb-4">
            <div class="w-24">
                Alias:
            </div>
            <input 
                type="text"
                class="bg-primary border-2 border-primary_alt rounded-md p-2 text-accent"
                v-model="alias"
            >
        </div>
        <div class="flex items-center pb-4">
            <div class="w-24">
                Password:
            </div>
            <input 
                type="password"
                class="bg-primary border-2 border-primary_alt rounded-md p-2 text-accent"
                v-model="password"
            >
        </div>
        <div class="flex items-center justify-center pb-4">
            <div
                class="px-10 py-4 rounded-md w-48 flex justify-center items-center bg-success cursor-pointer"
                tabindex="0"
                @click="submit"
            >
                {{ buttonText }}
            </div>
        </div>
    </form>
</template>

<script lang="ts">
    import { useUserStore } from '../../store/user';


    export default {
        props: {
            isLogin: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                firstName: '',
                lastName: '',
                alias: '',
                password: '',
                store: useUserStore()
            }
        },
        computed: {
            buttonText(): string {
                return this.isLogin ? 'Login' : 'Register'
            }
        },
        methods: {
            submit() {
                if (this.isLogin) {
                    this.store.login(this.alias, this.password)
                } else {
                    this.store.register(this.firstName, this.lastName, this.alias, this.password)
                }
            },
            resetFields() {
                this.firstName = '',
                this.lastName = '',
                this.alias = '',
                this.password = ''
            }
        },
        watch: {
            isLogin() {
                this.resetFields()
            }
        }
    }

</script>