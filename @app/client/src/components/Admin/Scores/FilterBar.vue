<template>
    <div class="h-12 w-full flex flex-row">
        <div class="h-full flex items-center pr-8">
            Filter
        </div>
        <input 
            type="text"
            class="bg-primary border-2 border-primary_alt rounded-md p-2 text-accent w-full"
            v-model="filter"
            @input="updateFilter"
        >
    </div>
</template>

<script lang="ts">
    import { useScoresStore } from '../../../store/scores';
    export default {
        data() {
            return {
                filter: '',
                store: useScoresStore()
            }
        },
        methods: {
            updateFilter(event: Event) {
                this.store.setFilterCriteria((event.target as HTMLInputElement).value)
            }
        }
    }
</script>