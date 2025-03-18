<template>
    <div class="h-4 w-4 rounded-full bg-secondary-alt flex items-center justify-center">
        <SmallCheck/>
    </div>
</template>

<script>
    import SmallCheck from '../../Shapes/Small/Check.vue'
    export default {
        name: 'SmallSuccess',
        components: {
            SmallCheck
        }
    }
</script>