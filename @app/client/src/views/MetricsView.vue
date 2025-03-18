<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="flex flex-row layout">
            <div class="w-80 h-full bg-secondary text-accent pt-4 flex flex-col">
                <RouterLink 
                    v-for="(assignment, index) in store.Assignments"
                    :key="index"
                    :to="`/metrics/${assignment.id}`"
                    class="h-14 w-full flex items-center px-4"
                    :class="store.isActive(assignment.id) ? 'bg-primary' : 'bg-secondary hover:bg-primary'"
                >
                    <div>
                        {{ assignment.name }}
                    </div>
                </RouterLink>
            </div>
            <div class="flex-grow bg-primary text-accent p-8">
                <Metrics 
                    v-if="id"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import GeneralHeader from '../components/General/Header.vue'
    import Metrics from '../components/Admin/Metrics/Metrics.vue'
    import { useMetricsStore } from '../store/metrics'

    export default {
        components: {
            GeneralHeader,
            Metrics
        },
        data() {
            return {
                store: useMetricsStore(),
                id: null as null | string | string[]
            }
        },
        async mounted() {
            this.id = this.$route.params.id
            await this.store.requestAssignments()
            this.store.updateMetrics(this.id)
        },
        watch: {
            '$route.params.id' (value) {
                this.id = value
                this.store.updateMetrics(this.id)
            }
        }
    }

</script>

<style scoped>
    .layout {
        height: calc(100% - 4rem);
    }
</style>