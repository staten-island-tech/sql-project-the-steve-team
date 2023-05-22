<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';
import sideBar from '../components/sideBar.vue'
</script>

<template>
  <main>
    <h1>Design Here</h1>
    <sideBar />
    <canvas width="1250" height="700"></canvas><br>
    <a>Download</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label> <a>Save to Profile</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>  <a>Save as Video</a>
  </main>
</template>

<style scoped>
  main{
    text-align: center;
  }
  h1 {
    color: white;
  }
  canvas {
    background-image: url("https://img.freepik.com/premium-psd/transparent-background-checkered-wallpaper-photoshop-psd-4k-transparent-empty-grid-layout_691560-11.jpg?w=2000");
    background-size: cover;
    margin-left: 20vw;
  }
</style>
