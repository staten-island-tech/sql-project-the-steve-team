<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <RouterLink  to="/" style="z-index: 1;">Home</RouterLink>

  <RouterView />
</template>

<style>
  body {
    background-color: #333;
  }
  a {
    color: cyan
  }
  a:hover {
    color: magenta;
  }
  
</style>
