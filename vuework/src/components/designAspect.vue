<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';
import {Shape,Rectangle,ShapeImage, Clump, intF,setXY, Camera,Pi,Zero, Triangle, Polygon, Line,getShapeList} from "../JS/shape.js"
let prop = defineProps(["canvas","designArray"])
let ar = prop.canvas.width/prop.canvas.height
let zoom = 300/prop.canvas.height
setTimeout(()=>{
    let canv = document.getElementById("canv")
    let ctx = canv.getContext("2d")
    
},500)
</script>

<template>
    <div>
        <canvas :style="`aspect-ratio:${ar}`" id="canv"></canvas>
        <h2><slot></slot></h2>
        <RouterLink :to="{name:'design',     query: {
      id: `${prop.canvas.id}`
    }}" > Edit/Save </RouterLink>
    </div>
</template>

<style scoped>
canvas {
    background-image: url("https://img.freepik.com/premium-psd/transparent-background-checkered-wallpaper-photoshop-psd-4k-transparent-empty-grid-layout_691560-11.jpg?w=2000");
    background-size: cover;
    margin-left: 20vw;
    height: 250px;
    margin: auto auto;
  }
  div {
    text-align: center;
    background-color: black;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid aquamarine;
  }
  a{
    margin-bottom: 2px;
  }
</style>