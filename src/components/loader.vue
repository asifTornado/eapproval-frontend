<template>
    

<div class="flex flex-col justify-center items-center fixed z-50 h-3/4 w-3/4 top-14 left-0">
    <img :src="globalUrl + 'images/loader.gif'" alt="this is the gif" class="h-full fixed w-full ">
</div>



</template>


<script>
export default{
    data(){
        return {

        }
    }
}



</script>


<style scoped>

img{
    display:'fixed';
    width:'100%';
    height:'100%';

}


</style>