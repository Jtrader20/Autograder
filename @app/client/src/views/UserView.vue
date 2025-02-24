<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="layout w-full bg-primary justify-center text-accent">
            <div class="w-full h-60 bg-primary-alt flex items-center justify-center">
                <div class="text-4xl">
                    User information
                </div>
            </div>
            <div class="flex w-full justify-center">
                <div class="width flex gap-20 py-8">
                    <div class="h-48 w-48 bg-secondary rounded-full negative flex justify-center items-center text-4xl">
                        {{ store.initials }}
                    </div>
                    <div class="flex flex-col flex-1">
                        <div class="flex gap-20 pb-4 w-full">
                            <div class="w-1/2">
                                Name:
                            </div>
                            <div class="w-1/2">
                                {{ store.fullName }}
                            </div>
                        </div>
                        <div class="flex gap-20 pb-4 w-full">
                            <div class="w-1/2">
                                Alias: 
                            </div>
                            <div class="w-1/2">
                                {{ store.alias }}
                            </div>
                        </div>
                        <div class="flex gap-20 pb-4 w-full">
                            <div class="w-1/2">
                                Grace Days Remaining:
                            </div>
                            <div class="w-1/2">
                                {{ store.graceDays }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import GeneralHeader from '../components/General/Header.vue'
    import { useUserStore  } from '../store/user';

    export default {
        components: {
            GeneralHeader
        },
        data () {
            return {
                store: useUserStore()
            }
        }
    }
</script>

<style scoped>
.layout {
    height: calc(100% - 4rem)
}
.width {
    width: 800px
}
.negative {
    margin-top: -100px;
}
</style>