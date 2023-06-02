<script setup>
import {SUPA} from "../JS/supa.js"
import {ref} from "vue"
let disp = ref("")
let disp2 = ref("")
import Stores from '../stores/counter'
import { storeToRefs } from 'pinia'
let UserStore = storeToRefs(Stores.User())
console.log(UserStore.user._rawValue,UserStore.session._rawValue)
async function grabAndSignup(){
  let username =  document.getElementById("SUU").value
  let email =  document.getElementById("SUE").value
  let password =  document.getElementById("SUP").value
  let x = (await SUPA.userSignUp(username,email,password))
  console.log(x)
  if (!x.error){
    document.getElementById("SUU").value = ""
    document.getElementById("SUE").value = ""
    document.getElementById("SUP").value = ""
    disp.value = "Please check your email for confirmation."
    UserStore.user.value = x.data.user
    UserStore.session.value = x.data.session
  }else{
    disp.value = x.error.message
  }
}
async function grabAndLogin(){
  let email =  document.getElementById("LIE").value
  let password =  document.getElementById("LIP").value
  let x =  await SUPA.userLogIn(email,password)
  if (!x.error){
    UserStore.user.value = x.data.user
    UserStore.session.value = x.data.session
    console.log("bozo")
    router.push({path:"/"})
  }
  disp2.value = x.error.message
}
</script>

<template>
 <div class="container">
    <h2><p v-if="UserStore.user._rawValue"><h2>You are already logged in. Attempting to log in or sign up will automatically log you out.</h2></p></h2>
    <div class="box">
      <input type="text" placeholder="Email" id="LIE"/> <br>
      <input type="password" placeholder="Password" id="LIP" /> <br>
      <p v-if="disp2.length >=1">{{ disp2 }}</p>
      <button @click="grabAndLogin">Log In</button>
    </div>
    <div class="box">
      <input type="text" placeholder="Email" id="SUE"/> <br>
      <input type="text" placeholder="Username"  id="SUU"/> <br>
      <input type="password" placeholder="Password"  id="SUP"/> <br>
      <p v-if="disp.length >=1">{{ disp }}</p>
      <button @click="grabAndSignup">Create Account</button>
    </div>
 </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.box {
  height: 400px;
  width: 400px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  background-color: black;
  border-radius: 10px;
  border-width: 3px;
  border-style: solid;
  border-color: #4CAF50;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
}
p {
  color: #C00;
}
h2 {
  width: 100vw;
  text-align: center;
}
</style>
