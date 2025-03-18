<template>
    <div class="h-48 w-full bg-secondary rounded-sm flex flex-col p-2">
        <div class="flex-80 flex items-center justify-center">
            <h1 class="text-3xl font-bold">{{ maindisplay }}</h1>
        </div>
        <div class="flex-20 flex items-center justify-center text-center">
            {{ title }}
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            title: {
                type: String,
                default: 'Test'
            },
            maindisplay: {
                type: String,
                default: 'Test'
            }
        }
    }
</script>

<style scoped>

.flex-80 {
    flex: 80
}

.flex-20 {
    flex: 20
}

.h-85 {
    height: 85%
}
</style>