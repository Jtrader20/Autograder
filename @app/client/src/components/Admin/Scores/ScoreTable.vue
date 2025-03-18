<template>
    <div class="overflow-hidden py-4">
        <div class="w-full h-auto max-h-192 overflow-auto scrollbar">
            <HeadRow />
            <div v-for="(score, index) in scores" :key="index" class="h-10 w-max flex">
                <BodyRow :index :score/>
            </div>
        </div>
    </div>
</template>
  
  
<script lang="ts">
    import HeadRow from './Table/HeaderRow/HeadRow.vue'
    import BodyRow from './Table/BodyRow/BodyRow.vue'

    import { useScoresStore } from '../../../store/scores';
  
    export default {
        components: { 
            HeadRow,
            BodyRow
        },
        data() {
            return {
                store: useScoresStore()
            }
        },
        computed: {
            scores() {
                return this.store.filteredscores ?? ''
            },
            assignments() {
                return this.store.Assignments
            }
        },
        async mounted() {
            await this.store.mountscores()
        }
    }
</script>

<style scoped>
.h-192 {
    height: 48rem
}
.max-h-192 {
    max-height: 48rem
}
</style>
  
