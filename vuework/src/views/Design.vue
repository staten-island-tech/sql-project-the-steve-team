<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { SUPA } from '../JS/supa.js';
import sideBar from '../components/sideBar.vue'
import { Rectangle, Shape, ShapeImage, intF,setXY,Camera, Clump, Pi, Zero, Triangle, Polygon, Line } from "../JS/shape.js"
import { Animation, JointBasedAnimation, Joint, Transition} from "../JS/animate.js"
import Properties from '../components/Properties.vue';
let download = ref(false), CREATE
function dot(){
  let cam = new Camera(0,0,1)
  let canv = document.getElementById("canv")
  let ctx = canv.getContext("2d")
  setInterval(() => { 
    cam.perspective(ctx, intF)
  }, 1000/60);

  download.value = function(){
    let url = canv.toDataURL()
    let link = document.createElement("a")
    link.href = url
    link.download = "canvas.png"
      link.click();
    }
  CREATE = function(thing) {
    if (thing == "solidLine"){
      new Line(0,0,100,100,4,"solid","#000")
    }else (thing == "dashedLine")[
      new Line(0,0,100,100,4,[8,4],"#000")
    ]
  }
}
setTimeout(() => {
  dot()
}, 200);
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
    <sideBar @_SolidLine="CREATE('solidLine')"  @_DashedLine="CREATE('dashedLine')"   v-if="download"/>
    <canvas width="1250" height="700" id="canv" @click="dot"></canvas><br>
    <label  v-if="download"><a @click="download()">Download</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label> <a>Save to Profile</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>  <a>Save as Video</a></label>
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

