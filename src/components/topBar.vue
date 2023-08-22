<template>
    
<div class="flex flex-row justify-between h-auto bg-gradient-to-r from-cyan-500 to-blue-500  text-xs border border-black border-solid shadow-sm shadow-black ">
<img src="../assets/logo.png" alt="" srcset="" height="120" class=" ml-5 hover:cursor-pointer shadow-md shadow-black mt-4 mb-4" width="120" @click="home()" >

 <div class="flex flex-row justify-between items-center ml-3 text-white border border-solid border-black px-2 py-2 my-2" v-if="this.authStore.getUser">
   <font-awesome-icon icon="fa-solid fa-user" class="text-white mr-3" size="2x"/>
   <div for="" class="mr-3"><label for="" class="text-white font-bold">Name:  </label>{{this.authStore.getUser.empName}}</div>
   <div for="" class="mr-3"><label for="" class="text-white font-bold">Email:  </label>{{this.authStore.getUser.mailAddress}}</div>
   <div for=""><label for="" class="text-white font-bold">Department:  </label>{{this.authStore.getUser.department}}</div>
 </div>

<notifications v-if="this.authStore.getUser" class="mt-2 ml-80"/>


<div class="flex flex-row mr-5 ">
     <div v-if="this.authStore.getToken != null" class="noprint text-white hover:cursor-pointer mr-2 text-lg flex flex-row justify-between items-center align-middle  " @click="logout()"><div class="bg-red-500 p-3 border border-black border-solid shadow-sm shadow-black">
                                                                                                                                                                                      <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="lg" class="mr-2"/> <span class="text-sm">Logout</span>
                                                                                                                                                                                  </div></div>
     <div class="mr-2 text-2xl text-white  flex flex-col justify-center item-center"  v-if="this.$route.path == '/admin/files'">|</div>
     <div v-if="this.$route.path == '/admin/files'" class="text-white hover:cursor-pointer text-lg flex flex-col justify-center item-center" @click="this.$router.push('/admin')">Back</div>    
</div>

</div>



</template>



<script>
import notifications from './notifications.vue'
export default {
  data(){
    return {

    }
  },

  components:{
    notifications
  },

  methods:{
    home(){
      var user = this.authStore.getUser;
    
      

      if(user) {
        if(user.userType == "Admin"){
                this.$router.push('/admin')
        }else if(user.userType == "Master Admin"){
          this.$router.push('/masterAdmin')
        }else if(user.userType == "Approver" || user.userType == "Requester" || user.userType == "Watcher"){
          this.$router.push('/user')
        }
      } else {
         this.$router.push('/login')
      }
    
    
    
    }

 
  }



}
</script>
