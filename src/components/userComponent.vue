<template>
    
    
    <div class="border border-solid border-black hover:cursor-pointer bg-gradient-to-b from-yellow-500 to-yellow-400  w-44 text-center  text-lg text-white font-bold h-32  hover:scale-125" @click="this.$router.push('/currentRequests')" >Current Requests <div ><font-awesome-icon icon="fa-solid fa-file-circle-question" size="3x" class="mt-3"/></div> </div>
    
    <div class="hover:cursor-pointer bg-gradient-to-b from-teal-500 to-teal-400 w-44 text-center rounded-sm text-white font-bold h-32   text-lg  border border-solid border-black hover:scale-125" @click="this.$router.push('/signature')">Signature <div ><font-awesome-icon icon="fa-solid fa-file-export" size="3x" class="mt-3"/></div></div>


</template>


<script>
export default{

}



</script>
