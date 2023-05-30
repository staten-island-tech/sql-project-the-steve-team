import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
const Stores = {
  User: defineStore('user',()=>{
    const user = ref(false)
    const session = ref(false)
    return {user,session}
  } )
  
}
export default Stores 
