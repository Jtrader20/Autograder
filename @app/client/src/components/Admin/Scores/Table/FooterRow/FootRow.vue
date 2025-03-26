<template>
    <div class="h-16 sticky bottom-0 w-full z-10">
        <div class="h-full w-max flex bg-primary">
            <div class="h-full w-96 sticky left-0 flex z-20 bg-primary-alt border-t-2">
                <div class="w-3/4">

                </div>
                <div class="w-1/4">

                </div>
            </div>
            <div v-for="(assignment, index) in assignments" :key="index" class="w-48 h-full flex items-center flex-shrink-0 px-2 bg-primary-alt border-t-2">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useScoresStore } from '../../../../../store/scores'

    export default {
        components: {

        },
        data() {
            return {
                store: useScoresStore()
            }
        },
        methods: {

        },
        computed: {
            assignments () {
                return this.store.Assignments
            }
        }
    }
</script>