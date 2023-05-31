<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { SUPA } from '../JS/supa.js';
import Stores from '../stores/counter';
import { storeToRefs } from 'pinia';
let UserStore = storeToRefs(Stores.User())
console.log(UserStore.user._rawValue,UserStore.session._rawValue)
let user =UserStore.user._rawValue
function censorEmail(str){
  let splits = str.split("@")
  splits[0] = splits[0][0] + "****"+ splits[0][splits[0].length - 1]
  str = splits.join('@')
  return str
}
</script>
<template>
  <main>
    <div v-if="user">
      <h1>{{user.user_metadata.username}}</h1>
      <p class="red" v-if="!user.confirmed_at">You need to confirm your email ({{censorEmail(user.email)}})</p>
      <p class="green" v-else>Your email is confirmed!({{censorEmail(user.email)}})</p>
      <h3>Created On: {{user.created_at.split("T")[0]}}</h3>
    </div>
    <div v-else><br><h2><RouterLink to="/SignIn">Click to Sign Up/ Log in</RouterLink></h2></div>

  </main>
</template>

<style>
  main {
    color: white
  }
  h1 {
    margin-bottom: 0px;
  }
  .red {
    color: #C00;
    margin-bottom: 0px;
  }
  .green {
    color: #5FB;
    margin-bottom: 0px;
  }
  h3{
    margin: 5px 0px;
  }
</style>
