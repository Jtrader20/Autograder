<template>
    <div class="h-full w-48">
        <div class="max-h-1/2 h-1/2 items-center overflow-hidden">
            {{ assignmentname }}
        </div>
        <div class="h-1/2 w-full flex">
            <div class="h-full w-1/2 flex">
                <div class="w-3/4 h-full">
                    GD
                </div>
                <div class="w-1/4">
                    <UpTriangle @click="sort('assignment', 'ASC', id, 'gracedays')"/>
                    <DownTriangle @click="sort('assignment', 'DESC', id, 'gracedays')"/>
                </div>  
            </div>
            <div class="h-full w-1/2 flex">
                <div class="w-3/4 h-full">
                    Score
                </div>
                <div class="w-1/4">
                    <UpTriangle @click="sort('assignment', 'ASC', id, 'score')"/>
                    <DownTriangle @click="sort('assignment', 'DESC', id, 'score')"/>
                </div>  
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useScoresStore } from '../../../../../store/scores';
    import { AssignmentDTO } from "@autograder/shared";
    import { PropType } from 'vue'
    import UpTriangle from '../../../../Shapes/Small/UpTriangle.vue'
    import DownTriangle from '../../../../Shapes/Small/DownTriangle.vue'
    export default {
        props: {
            assignment: {
                type: Object as PropType<AssignmentDTO>
            }
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
        components: {
            UpTriangle,
            DownTriangle
        },
        computed: {
            assignmentname (): string {
                return this.assignment?.name || ''
            },
            id (): string {
                return this.assignment?.id || ''
            }
        }
    }
</script>