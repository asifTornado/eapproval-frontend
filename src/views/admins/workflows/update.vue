<template>
    




</template>


<script>
export default{
   data(){
    return {
         workFlowItem:null
    }
   },


   created(){
    var id = this.$route.params.id;
    var workflows = this.mainStore.getWorkflows;
    this.workFlowItem = workflows.filter((workflow)=> workflow._id == id)[0];
   }
 

    
}



</script>