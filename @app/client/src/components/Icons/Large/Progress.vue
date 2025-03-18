<template>
    <div class="relative flex items-center justify-center">
      <div class="rotating-border"></div>
      <div class="h-6 w-6 rounded-full bg-warning flex items-center justify-center">
        <LargeBar />
      </div>
    </div>
  </template>
  
  <script>
  import LargeBar from '../../Shapes/Large/Bar.vue'
  
  export default {
    name: 'LargeProgress',
    components: {
        LargeBar
    }
  }
  </script>
  
  <style scoped>
  .rotating-border {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--color-warning);
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
  