<script setup>
import {SUPA} from "../JS/supa.js"
async function grabAndSignup(){
  let username =  document.getElementById("SUU").value
  let email =  document.getElementById("SUE").value
  let password =  document.getElementById("SUP").value
  SUPA.userSignUp(username,email,password)
}
async function grabAndLogin(){
  let email =  document.getElementById("LIE").value
  let password =  document.getElementById("LIP").value
  console.log( await SUPA.userLogIn(email,password))
}
</script>

<template>
      <RouterLink  to="/">Home</RouterLink>
 <div class="container">
    <div class="box">
      <input type="text" placeholder="Email" id="LIE"/> <br>
      <input type="password" placeholder="Password" id="LIP" /> <br>
      <button @click="grabAndLogin">Log In</button>
    </div>
    <div class="box">
      <input type="text" placeholder="Email" id="SUE"/> <br>
      <input type="text" placeholder="Username"  id="SUU"/> <br>
      <input type="password" placeholder="Password"  id="SUP"/> <br>
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
</style>
