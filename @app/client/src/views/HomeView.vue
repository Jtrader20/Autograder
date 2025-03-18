<template>
    <div class="h-full">
        <GeneralHeader />
        <div class="layout text-accent bg-primary flex justify-center items-center">
            <div>
                <div class="text-4xl text-center">
                    AutoGrader
                </div>
                <div>
                    Please login to access the grader
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GeneralHeader from '../components/General/Header.vue'

    export default {
        components: {
            GeneralHeader
        }
    }
</script>

<style scoped>
.layout {
    height: calc(100% - 4rem);
}
</style>