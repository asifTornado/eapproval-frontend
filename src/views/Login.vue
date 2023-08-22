<template>
  
  <div class="bg-white w-full h-full  justify-center flex ">
 

<div class="w-96 h-80 shadow-2xl shadow-black   hover:shadow-blue-500 mt-20">

<form @submit.prevent="login"    class="bg-white shadow-md rounded   pb-8 mb-4 h-96 border border-black border-solid" id="form">



  <div class="w-full bg-gradient-to-r from-blue-500 to-blue-400  text-white font-bold text-start pl-5 p-4 text-4xl">Login</div>
         
<div class="mb-4 px-4 py-4">
   <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email address</label>

   <input type="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="Enter email" name="email" v-model="email">
</div>


<div class="mb-6 px-4">
   <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>

   <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Password" name="password" >
</div>

 <div class="flex items-center px-4 justify-between"><button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Submit</button></div>

             <div @click="this.$router.push('/register')" class="text-blue-500 underline flex flex-row justify-center mt-2 hover:cursor-pointer">Register</div>
</form>





</div>
   </div>
</template>


<script>
import axios from 'axios'
import {mapStores} from 'pinia'
import {useAuthStore} from '../stores/authentication'

export default {
  data(){
    return {
    email:"",
    password:""
  }
  },

  // computed:{
  //   ...mapStores(useAuthStore)
  // },

  methods:{
    login(){
      console.log("from the login page")
      console.log(this.globalUrl);
      var bounceUrl = this.mainStore.getBounceUrl;
      console.log(`this is the bounceUrl ${bounceUrl}`)
      var vm = this;
      axios.post(vm.globalUrl + 'login', {email:this.email, password:this.password}).then((result)=>{

        if(result.data.success == false){
          this.$toast.warning(result.data.message)
          return
        }
        vm.authStore.setUser(result.data.result);
        vm.authStore.setToken(result.data.token);
        console.log(result.data)
        var user = vm.authStore.getUser;
        console.log("this is the user");
        console.log(user)

       if(bounceUrl){
        console.log('inside if bounce')
        vm.mainStore.setBounceUrl(null);
        console.log(bounceUrl)
        vm.$router.push(bounceUrl)
        return
       }


        if(user.userType == "admin"){
          vm.$router.push('/admin')
        }else if(user.userType != "admin" || user.userType != "Master Admin"){
          vm.$router.push('/user')
        }else if(user.userType == "Master Admin"){
          vm.$router.push('/masterAdmin')
        }
        
      }).catch((error)=>console.log(error))

     

    }
  }



}



</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
