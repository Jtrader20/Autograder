<template>
    <div class="h-full w-96 sticky left-0 flex z-1">
        <div class="h-full w-48 flex items-center px-4" :class="isEven ? 'bg-primary' : 'bg-secondary'">{{ fullname }}</div>
        <div class="h-full w-48 flex items-center px-4" :class="isEven ? 'bg-primary' : 'bg-secondary'">
            <CounterCell :alias/>
        </div>
    </div>
    <div v-for="(assignment, index) in assignments" :key="index" class="h-full w-48 flex items-center px-4 flex-shrink-0" :class="isEven ? 'bg-primary' : 'bg-secondary'">
        <BodyCell :assignment />
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue'
    import BodyCell from './BodyCell.vue'
    import CounterCell from './CounterCell.vue'
    export default {
        props: {
            index: {
                type: Number,
                default: 0
            },
            score: {
                type: Object as PropType<any>
            }
        },
        components: {
            BodyCell,
            CounterCell
        },
        computed: {
            isEven(): boolean {
                return this.index % 2 === 0
            },
            fullname(): string {
                return `${this.score!.firstname} ${this.score!.lastname}`
            },
            gracedays(): number {
                return this.score!.gracedays
            },
            assignments() {
                return this.score!.Assignments ?? ''
            },
            alias () {
                return this.score!.alias ?? ''
            }
        }
    }
</script>