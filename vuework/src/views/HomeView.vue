<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';

</script>

<template>
  <main>
    <h1>Welcome to ShareCanvas</h1>
    <RouterLink  to="/signin">Log In / Sign Up</RouterLink><br>
    <RouterLink  to="/design">Design</RouterLink>

  </main>
</template>

<style scoped>
  main{
    text-align: center;
  }
  h1 {
    color: white;
  }

</style>
