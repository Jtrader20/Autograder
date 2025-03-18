<template>
    <div class="flex flex-row h-full w-full">
        <div class="flex items-center h-full w-1/2">
            {{ gracedays }}
        </div>
        <div class="flex items-center h-full w-1/2">
            {{ percentage }}
        </div>
    </div>
</template>

<script lang="ts">
    import { PropType } from 'vue'

    export default {
        props: {
            assignment: {
                type: Object as PropType<any>
            }
        },
        computed: {
            percentage() {
                if (!this.assignment?.scoreearned) return '--'
                const percentage = ((this.assignment?.scoreearned / this.assignment?.maxscore) * 100).toFixed(2)
                return `${percentage}%`
            },
            gracedays() {
                if ((!this.assignment?.gracedaysearned && !this.assignment?.gracedaysused) && (this.assignment?.scoreearned)) return '0'
                if (!this.assignment?.gracedaysearned && !this.assignment?.gracedaysused) return '--'
                if (this.assignment.gracedaysearned) return `+${this.assignment.gracedaysearned}`
                return `-${this.assignment.gracedaysused}`
            }
        }
    }
</script>