<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import { SUPA } from '../JS/supa.js';
import sideBar from '../components/sideBar.vue'
import Stores from '../stores/counter';
import { Rectangle, Shape, ShapeImage, intF,setXY,Camera, Clump, Pi, Zero, Triangle, Polygon, Line,getShapeList } from "../JS/shape.js"
import { Animation, JointBasedAnimation, Joint, Transition} from "../JS/animate.js"
import Properties from '../components/Properties.vue';
import { storeToRefs } from 'pinia';
let UserStore = storeToRefs(Stores.User())
let user = UserStore.user._rawValue
let download = ref(false), CREATE
let mouse = [0,0]
let render = ref(true)
let id =  new URL(window.location).searchParams.get("id")
function pointLiesOnRectangle(x,y,top,left,bottom,right){
  return (x<=right && x>=left) && (y<=bottom && y>=top)
}
function constructPropertyArray(shape){

}

let canv
let hoveredShape, selectedShape = ref(false)
let xbb=0
function dot(){
   canv = document.getElementById("canv")
   if (!canv){return null}
  let ctx = canv.getContext("2d")
  let shapeList
  setInterval(() => { 
    if (canv){
     shapeList = getShapeList()
    intF(ctx)
    }
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
    }else if  (thing == "dashedLine"){
      new Line(0,0,100,100,4,[8,4],"#000")
    }else if (thing=="rectangle"){
        new Rectangle(20,20,125,70,"#000")
    }else if (thing=="triangle"){
      new Triangle(20,20,100,80,"#000",0,1,0.5,0,1,1)
    }
  }

  
  window.onmousemove= function(e){}/*
  mouse[0] = e.clientX
  mouse[1] = e.clientY
  if (canv){
   let prop = canv.getBoundingClientRect()
   mouse[0] -= prop.left
   mouse[1] -= prop.top
let newHoveredShape
    shapeList.forEach(s=>{
      if (s.shape == "Rectangle" || s.shape=="Triangle"){
        if(pointLiesOnRectangle(mouse[0],mouse[1],s.top,s.left,s.top + s.height, s.left +s.width)){
         newHoveredShape = s
        }
      }
    })
    if (hoveredShape && (!(pointLiesOnRectangle(mouse[0],mouse[1],hoveredShape.top,hoveredShape.left,hoveredShape.top + hoveredShape.height, hoveredShape.left +hoveredShape.width)) || hoveredShape!=newHoveredShape)){
      if (hoveredShape!= selectedShape){
      hoveredShape.setBorder("none")
      }
      hoveredShape = false
    } 
    if (newHoveredShape){
      if (newHoveredShape!=selectedShape.value){
      newHoveredShape.setBorder(4,[8,4],"#5AF")
      }
      hoveredShape = newHoveredShape
    }
  }
  
}*/
window.onclick = function(e){
  mouse[0] = e.clientX
  mouse[1] = e.clientY
  if (canv){
   let prop = canv.getBoundingClientRect()
   mouse[0] -= prop.left
   mouse[1] -= prop.top
   let newSelectedShape
   shapeList = getShapeList()
    shapeList.forEach(s=>{
      if (s.shape == "Rectangle" || s.shape=="Triangle"){
        if(pointLiesOnRectangle(mouse[0],mouse[1],s.top,s.left,s.top + s.height, s.left +s.width)){
          newSelectedShape = s
          console.log(newSelectedShape)
        }
      }
      else if (s.shape == "Line") {
        if(pointLiesOnRectangle(mouse[0],mouse[1],s.top,s.left,s.top + s.bottom, s.right)){
          newSelectedShape = s
          console.log(newSelectedShape)
        }
      }
    })
    if (newSelectedShape){
      if (selectedShape._rawValue && selectedShape._rawValue!=newSelectedShape){
        selectedShape._rawValue.setBorder("none")
        selectedShape.value = false
      } 
      if (newSelectedShape){
        newSelectedShape.setBorder(4,"solid","#ADF")
        selectedShape.value = newSelectedShape
      }
    }
    console.log(selectedShape._rawValue)

}
}

}
let title = ""
setTimeout(() => {
  dot()
  return "good"
}, 250);
setXY(400,400)
const saveToProfile = async function(){
  console.log(user)
  if(user){
    id = id || Date.now()
    let design = {
      canvas: {
        height:700,
        width:1250,
        title: (title.length <1 && "Canvas")|| title,
        id:id
      },
      drawing: getShapeList()
    }
    
    await SUPA.updateUserDesign(user.user_metadata.designs, design)
  }
}
</script>

<template>
  <main>
    <h1>Design Here</h1>
    <sideBar @_SolidLine="CREATE('solidLine')"  @_DashedLine="CREATE('dashedLine')"  @_Rectangle="CREATE('rectangle')" @_Triangle="CREATE('triangle')" v-if="download"> 
      <Properties v-if="(selectedShape && !selectedShape.UnEditable)" :propertyArray="[{Key:'Left',Value:selectedShape.left, Type:'number'},{Key:'Top',Value:selectedShape.top, Type:'number'},{Key:'Width',Value:selectedShape.width, Type:'number'},{Key:'Height',Value:selectedShape.height, Type:'number'},{Key:'Color',Value:selectedShape.color, Type:'color'}]" @adjust="(k,v)=>{selectedShape[k.toLowerCase()]=v; console.log(k,v)}"></Properties>
      <Properties v-else-if="(selectedShape && !selectedShape.UnEditable)" :propertyArray="[{Key:'Left',Value:selectedShape.left, Type:'number'},{Key:'Top',Value:selectedShape.top, Type:'number'},{Key:'Right',Value:selectedShape.right, Type:'number'},{Key:'Bottom',Value:selectedShape.bottom, Type:'number'},{Key:'Thickness',Value:selectedShape.thickness, Type:'number'},{Key:'Color',Value:selectedShape.color, Type:'color'}]" @adjust="(k,v)=>{selectedShape[k.toLowerCase()]=v; console.log(k,v)}"></Properties>
      <input placeholder="Title" v-model="title">

    </sideBar>
    <canvas width="1250" height="700" id="canv" @click="dot"></canvas><br>
    <label  v-if="download"><a @click="download()">Download</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label> <a @click="saveToProfile()">Save to Profile</a> <label>&nbsp;&nbsp;&nbsp;&nbsp;</label>  <a>Save as Video</a></label>
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

