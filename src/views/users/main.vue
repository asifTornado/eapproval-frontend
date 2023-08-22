






<template>
    

    <div class="h-1/2  w-auto  grid grid-rows-1 gap-0 md:grid-cols-4 md:grid-rows-1 sm:grid-cols-2 sm:grid-rows-2   text-lg border border-black  px-24   bg-gradient-to-b from-blue-200 to-blue-100  justify-center items-center mt-16" style="height:250px" id="app">
    
    
    
 

    

    
    <div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-lime-500 to-lime-400  w-44 text-center  text-lg text-white font-bold h-32  hover:scale-125" @click="this.$router.push('/makeRequest')" >Make Requests <div ><font-awesome-icon icon="fa-solid fa-file-circle-question" size="3x" class="mt-3"/></div> </div>
    
    <div class="hover:cursor-pointer bg-gradient-to-b from-blue-500 to-blue-400  w-44 text-center rounded-sm text-white font-bold h-32   text-lg  border border-solid border-black hover:scale-125" @click="this.$router.push('/myRequests')">My Requests <div ><font-awesome-icon icon="fa-solid fa-file-export" size="3x" class="mt-3"/></div></div>
    
 

      <UserComponent v-if="getUserType()"/>

 



    </div>





</template>



<script>
import UserComponent from '../../components/userComponent.vue'


export default{
    components: {UserComponent},
    methods:{
        getUserType(){
            var user = this.authStore.getUser;
            var userType = user.userType;

            // if(userType == "Approver"){
            //     return true
            // }else{
            //     return false
            // }

            return true
        }
    }
}



</script>
