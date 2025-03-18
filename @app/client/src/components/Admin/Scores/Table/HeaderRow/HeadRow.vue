<template>
    <div class="h-16 sticky top-0 w-full z-10">
        <div class="h-full w-max flex bg-primary">
            <div class="h-full w-96 sticky left-0 flex z-20 bg-primary-alt border-b-2">
                <div class="h-full w-48 flex items-center px-4 bg-primary-alt">
                    <div class="w-3/4">
                        Name
                    </div>
                    <div class="w-1/4">
                        <UpTriangle @click="sort('name', 'ASC', null, null)"/>
                        <DownTriangle @click="sort('name', 'DESC', null, null)"/>
                    </div>    
                </div>
                <div class="h-full w-48 flex items-center px-4 bg-primary-alt">
                    <div class="w-3/4">
                        # Grace Days
                    </div>
                    <div class="w-1/4">
                        <UpTriangle @click="sort('gracedays', 'ASC', null, null)"/>
                        <DownTriangle @click="sort('gracedays', 'DESC', null, null)"/>
                    </div>    
                </div>
            </div>
            <div v-for="(assignment, index) in assignments" :key="index" class="w-48 h-full flex items-center flex-shrink-0 px-2 bg-primary-alt border-b-2">
               <HeadCell :assignment/>
            </div>
        </div>
      </div>
</template>

<script lang="ts">
    import { useScoresStore } from '../../../../../store/scores';
    import HeadCell from './HeadCell.vue'
    import UpTriangle from '../../../../Shapes/Small/UpTriangle.vue'
    import DownTriangle from '../../../../Shapes/Small/DownTriangle.vue'

    export default {
        components: {
            HeadCell,
            UpTriangle,
            DownTriangle
        },
        data() {
            return {
                store: useScoresStore()
            }
        },
        methods: {
            sort(category: string, direction: string, assignment: null | string, assignmentcategory: null | string) {
                this.store.setSort(category, direction, assignment, assignmentcategory)
            }
        },
        computed: {
            assignments () {
                return this.store.Assignments
            }
        }
    }
</script>
