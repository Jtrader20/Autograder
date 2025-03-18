<template>
    <div class="relative flex items-center justify-center">
        <div class="rotating-border" />
        <div class="h-4 w-4 rounded-full bg-secondary-alt flex items-center justify-center">
            <SmallBar />
        </div>
    </div>
</template>

<script>
    import SmallBar from '../../Shapes/Small/Bar.vue'
    export default {
        name: 'SmallProgress',
        components: {
            SmallBar
        }
    }
</script>

<style scoped>
.rotating-border {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--color-secondary-alt);
  animation: spin 1s linear infinite;
  position: absolute;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>