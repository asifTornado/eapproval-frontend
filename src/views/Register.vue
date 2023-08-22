<template>
    
    <div class="w-full h-full  flex flex-col  items-center pt-32">



	



<form method="post" @submit.prevent="handleSubmit($event)"  class="w-1/3 h-auto flex flex-col items-center  bg-white rounded-sm border border-black  shadow shadow-black shadow-2xl ">

     <h1 class="text-white font-bold text-4xl mb-5 bg-gradient-to-r from-blue-500 to-blue-400 p-4 w-full">Register</h1>
        
        <!-- <select type="email" v-model="mailAddress" class="shadow appearance-none border  rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="email" placeholder="Enter email" name="email">
            <option :value="email"  v-for="(email, emailCounter) in emails" :key="emailCounter" >{{ email }}</option>
            <option value="asif_hacker@gmail.com">Hacker@gmail.com</option>
        </select> -->

        <div class="w-3/4 mb-3 rounded-sm shadow" ><multiselect v-model="mailAddress" :options="emails" placeholder="Select Email"></multiselect>
</div>        
        <input type="password" v-model="password" class="w-3/4 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 h-12" id="password" placeholder="Password" name="password">

    <button type="submit" class="bg-blue-500 h-12 text-white font-bold rounded-sm w-3/4">Submit</button>

    <div @click="this.$router.push('/login')" class="text-blue-500 underline flex flex-row justify-center mt-10 hover:cursor-pointer mb-5">Login</div>
</form>

</div>






</template>


<script>
import axios from 'axios'

export default{
    data(){
        return {
            emails:[],
            mailAddress:null,
            password:null,
            users:null

        }
    },

    created(){
       this.loadEmails()
    },

    methods:{
       loadEmails(){
          var vm = this;
          this.$toast.open({type:"info", message:"Loading User Emails...", position:"bottom-right", duration:0})
          axios.get(vm.globalUrl + 'api/getUsers').then((results)=>{
            vm.users = results.data;
            vm.emails = results.data.map((result)=>{
                
                if(result.mailAddress != ""){
                    return result.mailAddress
                }
            
            })
            vm.$toast.clear()
            vm.$toast.open({type:"success", message:"User Emails Loaded", position:"bottom-right", duration:500})
          })
       },

       handleSubmit($event){
           var vm = this;
          
            this.$toast.open({message:"Registering...", duration:0, type:'info'})

            var user = vm.users.filter((user)=>user.mailAddress == this.mailAddress)[0]
            
            console.log("this is the found user")
            console.log(user)
            if(!user){
                this.$toast.clear()
                this.$toast.warning("This user is not authorized")
                return
            }else{
                var data = {
                mailAddress:this.mailAddress,
                password:this.password,
                user
            }

            axios.post(vm.globalUrl + 'register', data).then((result)=>{
                console.log('entered post request')
                if(result.data.registered){
                    vm.$toast.clear();
                    vm.$toast.open({type:'success', message:result.data.message})
                    if(result.data.userType == 'normal'){
                        vm.$router.push('/user')
                    }else if(result.data.userType == 'admin'){
                        vm.$router.push('/admin')
                    }
                }else if(result.data.registered == false){
                    vm.$toast.clear();
                    console.log(result.data)
                    vm.$toast.open({type:'warning', message:result.data.message})
                }
            })
         
            }
            
          

       }
    }
}




</script>