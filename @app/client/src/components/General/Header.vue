<template>
    <div class="h-16 w-full flex justify-between items-center shadow-2xl bg-primary text-white px-4 z-50">
        <div>
            AutoGrader
        </div>
        <div class="flex justify-around h-full">
            <RouterLink 
                to="/"
                class="flex items-center justify-center px-4 h-full"
                v-if="!store.isLoggedIn"
            >
                <div>
                    Home
                </div>
            </RouterLink>
            <RouterLink 
                to="/grader"
                class="flex items-center justify-center px-4 h-full"
                v-if="store.isLoggedIn"
            >
                <div>
                    Grader
                </div>
            </RouterLink>
            <RouterLink 
                to="/scores"
                class="flex items-center justify-center px-4 h-full"
                v-if="store.isAdmin"
            >
                <div>
                    Scores
                </div>
            </RouterLink>
            <RouterLink 
                to="/metrics"
                class="flex items-center justify-center px-4 h-full"
                v-if="store.isAdmin"
            >
                <div>
                    Metrics
                </div>
            </RouterLink>
            <RouterLink
                to="/login"
                class="flex items-center justify-center px-4 h-full"
                v-if="!store.isLoggedIn"
            >
            <div>
                Login
            </div>
            </RouterLink>
            <RouterLink
                to="/logout"
                class="flex items-center justify-center px-4 h-full"
                v-if="store.isLoggedIn"
            >
                <div>
                    Logout
                </div>
            </RouterLink>
            <RouterLink 
                to="/user"
                class="flex items-center justify-center px-4 h-full"
                v-if="store.isLoggedIn"
            >
                <div class="h-10 w-10 rounded-full bg-primary-alt flex items-center justify-center">
                    {{ store.initials }}
                </div>
        </RouterLink>
        </div>
    </div>
</template>

<script lang="ts">
import { useUserStore } from '../../store/user';


    export default {
        name: 'GeneralHeader',
        data() {
            return {
                store: useUserStore()
            }
        }
    }
</script>