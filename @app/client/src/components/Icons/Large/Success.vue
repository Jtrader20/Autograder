<template>
    <div class="h-6 w-6 rounded-full bg-success flex items-center justify-center">
        <LargeCheck/>
    </div>
</template>

<script>
    import LargeCheck from '../../Shapes/Large/Check.vue'
    export default {
        name: 'LargeSuccess',
        components: {
            LargeCheck
        }
    }
</script>