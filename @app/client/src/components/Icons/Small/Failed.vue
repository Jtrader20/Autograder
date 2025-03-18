<template>
    <div class="h-4 w-4 rounded-full bg-secondary-alt flex items-center justify-center">
        <SmallCross />
    </div>
</template>

<script>
    import SmallCross from '../../Shapes/Small/Cross.vue'
    export default {
        name: 'SmallFailed',
        components: {
            SmallCross
        }
    }
</script>