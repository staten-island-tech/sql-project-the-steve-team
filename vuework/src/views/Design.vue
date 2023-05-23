<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';
import sideBar from '../components/sideBar.vue'
import { Rectangle, Shape, ShapeImage, intF,setXY,Camera, Clump, Pi, Zero, Triangle, Polygon } from "../JS/shape.js"
import { Animation, JointBasedAnimation, Joint, Transition} from "../JS/animate.js"
function dot(){
let cam = new Camera(0,0,1)
let canv = document.getElementById("canv")
let ctx = canv.getContext("2d")
setInterval(() => { 
    cam.perspective(ctx, intF)
}, 1000/60);
}
setTimeout(() => {
  dot()
}, 1000);
window.onkeyup = function(e){
    console.log(e.key)
    if (e.key == " "){
        player.cy +=10
        player.cy %= 400
        ts = Date.now()
    } 
}
setXY(400,400)
</script>

<template>
  <main>
    <h1>Design Here</h1>
    <sideBar />
    <canvas width="1250" height="700" id="canv" @click="dot"></canvas><br>
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

