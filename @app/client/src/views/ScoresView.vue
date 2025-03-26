<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="flex flex-row layout">
            <div class="flex-grow bg-primary text-accent p-8 max-w-full h-full" v-if="!isloading">
                <FilterBar />
                <ScoreTable />
            </div>
            <div class="flex-grow bg-primary text-accent p-8 max-w-full h-full" v-else>
                Loading...
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import GeneralHeader from '../components/General/Header.vue'
    import ScoreTable from '../components/Admin/Scores/ScoreTable.vue'
    import FilterBar from '../components/Admin/Scores/FilterBar.vue'

    import { useScoresStore } from '../store/scores'

    export default {
        components: {
            GeneralHeader,
            ScoreTable,
            FilterBar
        },
        data() {
            return {
                store: useScoresStore()
            }
        },
        computed: {
            isloading () {
                return this.store.isloading
            }
        },
        async mounted() {
            await this.store.mountscores()
        },
        beforeUnmount() {
            this.store.unmount()
        }
    }
</script>

<style scoped>
    .layout {
        height: calc(100% - 4rem)
    }
</style>