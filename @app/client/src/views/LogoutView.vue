<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="layout text-accent bg-primary flex justify-center items-center">
        </div>
    </div>
</template>

<script>
    import GeneralHeader from '../components/General/Header.vue'

    import { useUserStore } from '../store/user'

    export default {
        components: {
            GeneralHeader,
        },
        data() {
            return {
                store: useUserStore()
            }
        },
        async mounted() {
            await this.store.logout()
        }
    }
</script>

<style scoped>
.layout {
    height: calc(100% - 4rem);
}
</style>