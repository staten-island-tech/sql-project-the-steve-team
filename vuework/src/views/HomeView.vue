<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';
import Stores from '../stores/counter';
import { storeToRefs } from 'pinia';
let UserStore = storeToRefs(Stores.User())
console.log(UserStore.user._rawValue,UserStore.session._rawValue)
</script>

<template>
  <main>
    <h1>Welcome to ShareCanvas</h1>
    <RouterLink  to="/signin">Log In / Sign Up</RouterLink><br>
    <RouterLink  to="/design">Design</RouterLink><br>
    <RouterLink  to="/profile">Profile</RouterLink>

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
