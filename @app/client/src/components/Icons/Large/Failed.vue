<template>
    <div class="h-6 w-6 rounded-full bg-danger flex items-center justify-center">
        <LargeCross />
    </div>
</template>

<script>
    import LargeCross from '../../Shapes/Large/Cross.vue'
    export default {
        name: 'LargeFailed',
        components: {
            LargeCross
        }
    }
</script>