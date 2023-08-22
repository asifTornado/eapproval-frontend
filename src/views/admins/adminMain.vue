<template>
    
<div class="lg:grid bg-gradient-to-b from-blue-200 to-blue-100  lg:grid-cols-5 lg:grid-rows-2 lg:gap-2 sm:grid sm:grid-cols-2 sm:grid-rows-5 text-lg mt-20 px-24 py-10 bg-blue-100 border border-black" id="app" style="height:auto; width:auto" >

    
    <div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-emerald-500 to-emerald-400 w-44  text-center text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/admin/workflows')" id="workflows">Workflows <div ><font-awesome-icon icon="fa-solid fa-arrows-turn-to-dots" size="3x" class="mt-3"/></div></div>
    <div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-lime-500 to-lime-400 w-44 text-center  text-lg text-white font-bold h-32  hover:scale-125" @click="this.$router.push('/admin/users')" id="users"> Users <div > <font-awesome-icon icon="fa-solid fa-user-astronaut" size="3x" class="mt-3"/> </div> </div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/admin/departments')" id="departments">Departments <div > <font-awesome-icon icon="fa-solid fa-sitemap" size="3x" class="mt-3"/>    </div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-cyan-500 to-cyan-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/admin/groups')" id="groups">Groups <div > <font-awesome-icon icon="fa-solid fa-people-group" size="3x" class="mt-3"/></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-purple-500 to-purple-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/admin/allRequests')" id="all_requests">All Requests <div ><font-awesome-icon icon="fa-solid fa-folder-open " size="3x" class="mt-3" /></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-amber-500 to-amber-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/makeRequest')" id="make_requests" >Make Requests<div ><font-awesome-icon icon="fa-solid fa-file-circle-question" class="mt-3" size="3x"/></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-blue-500 to-blue-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/myRequests')" id="my_requests">My Requests<div ><font-awesome-icon icon="fa-solid fa-file-export" size="3x" class="mt-3"/></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-yellow-500 to-yellow-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/currentRequests')" id="current_requests">Current Requests<div ><font-awesome-icon icon="fa-solid fa-file-import" size="3x" class="mt-3"/></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-rose-500 to-rose-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/admin/files')" id="files">All Uploaded Files<div ><font-awesome-icon icon="fa-solid fa-folder-tree" size="3x" class="mt-3"/></div></div>

<div class="border  border-solid border-black hover:cursor-pointer bg-gradient-to-b from-teal-500 to-teal-400 w-44 text-center   text-lg rounded-sm text-white font-bold h-32 hover:scale-125" @click="this.$router.push('/signature')" id="signature">Signature<div ><font-awesome-icon icon="fa-solid fa-signature" size="3x" class="mt-3" /></div></div>


<Loader v-if="isLoading"/>




</div>





</template>


<script >


export default{
    data(){
        return {
        
        }
    },



}




</script>