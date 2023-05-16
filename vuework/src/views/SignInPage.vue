<script setup>
</script>

<template>
 <div class="container">
    <div class="box">
      <input type="text" placeholder="Email" /> <br>
      <input type="text" placeholder="Username" /> <br>
      <input type="text" placeholder="Password" /> <br>
      <button>Log In</button>
    </div>
    <div class="box">
      <button>Create Account</button>
    </div>
 </div>
</template>

<style>
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
