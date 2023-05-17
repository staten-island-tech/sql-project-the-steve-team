<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';

</script>

<template>
  <main>
    <h1>Welcome to ShareCanvas</h1>
    <RouterLink  to="/signin">Log In / Sign Up</RouterLink>
    <button>click</button>
  </main>
</template>

<style scoped>
  main{
    text-align: center;
  }
  h1 {
    color: white;
  }
  a {
    color: cyan
  }
  a:hover {
    color: magenta;
  }
</style>
