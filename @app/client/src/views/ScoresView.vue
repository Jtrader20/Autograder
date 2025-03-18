<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="flex flex-row layout">
            <div class="flex-grow bg-primary text-accent p-8 max-w-full h-full">
                <FilterBar />
                <ScoreTable />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import GeneralHeader from '../components/General/Header.vue'
    import ScoreTable from '../components/Admin/Scores/ScoreTable.vue'
    import FilterBar from '../components/Admin/Scores/FilterBar.vue'

    export default {
        components: {
            GeneralHeader,
            ScoreTable,
            FilterBar
        }
    }
</script>

<style scoped>
    .layout {
        height: calc(100% - 4rem)
    }
</style>