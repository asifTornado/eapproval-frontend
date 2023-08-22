<template>
<div class="flex flex-row items-center justify-between  bg-blue-100 h-14 mt-3">

<div class="flex flex-row justify-around ml-10">
    	
    <div> 
     <label for="" class="mr-2 ml-2">Name:</label>
     <input type="text" list="nameList" v-model="filterName" class="h-7 rounded-sm border border-black border-solid">
     <datalist id="nameList"> 
    	<option :value="name" v-for="(name, nameCounter) in nameList" :key="nameCounter">
              {{name}}
    	</option>
     </datalist>
    </div>
    

	
    
</div>


<button @click="filter()" class="h-9 rounded-sm bg-amber-500 text-white font-bold px-4 mr-4">Filter</button>



</div>


  
      <div class="overflow-y-scroll h-80 mt-10  w-full relative px-5 flex flex-col " > 
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
    <thead>
      <tr>
        <th scope="col" class="border border-slate-400 h-14 text-center pr-16 text-sm bg-blue-500 sticky top-0 text-white">Name</th>
        <th scope="col" class="border border-slate-400 h-14 text-center pr-16 text-sm bg-blue-500 sticky top-0 text-white">Number of Approvers</th>
        <th scope="col" class="border border-slate-400 h-14 text-center pr-16 text-sm bg-blue-500 sticky top-0 text-white"></th>
      </tr>
    </thead>
    <tbody> 
      <tr v-for="(workflow, workflowCounter) in filteredWorkflows" :key="workflowCounter" style="cursor:pointer" class="hover:bg-blue-200"  >
        <td class="border-2 border-solid text-sm text-center border-slate-300 h-14 px-20">{{workflow.name}}</td>
        <td class="border-2 border-solid text-sm text-center border-slate-300 h-14 px-20">{{workflow.number_of_approvers}}</td>
        <td class="border-2 border-solid border-slate-300 text-center">
          <button @click="updateWorkFlow(workflow)" class="h-8 w-20 rounded-md  font-bold   fa-lg text-emerald-500"><font-awesome-icon icon="fa-solid fa-pen"/></button>
          <button @click="deleteWorkFlow(workflow)" class="h-8 w-20 rounded-md  font-bold   fa-lg text-rose-500"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
  
      </tr>
    </tbody>
  </table></div>
 



<div class="w-full flex flex-row items-end justify-end fixed bottom-20 right-10"> <button   class="bg-blue-500 w-36   text-white font-bold text-md h-14 ml-3 rounded-sm mr-3" @click="this.$router.push('/admin/workflows/add')"> Add WorkFlow </button>
  <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm  "> Admin Home </button></div>




</template>


<script >

import axios from 'axios'


export default{
  data(){
    return {
         workflows:[],
         filteredWorkflows:[],
         filterName:null
    }
  },


  computed:{
       nameList(){
        var result = this.workflows.map((workflow)=>workflow.name);
        return result
       }
  },

  created(){
    this.loadWorkFlows()
  },

  methods:{
    loadWorkFlows(){
      var vm = this;
      var token = this.authStore.getToken;
      var data = {
        token
      };

      axios.post(vm.globalUrl + 'getWorkFlows', data).then((result)=>{
        vm.workflows = result.data,
        vm.filteredWorkflows = result.data,
        vm.mainStore.setWorkflows(result.data)
      })

    },

    deleteWorkFlow(workflow){
      this.$toast.open({message:'Deleting Workflow...', type:'info'})
      var vm = this;
      var token = this.authStore.getToken;
      var data = {
        token,
        workflow
      };

      axios.post(vm.globalUrl + 'deleteWorkFlow', data).then((result)=>{
        console.log(result.data)
        vm.$toast.clear()
        vm.$toast.open({message:'Workflow Deleted', type:'success', duration:300, queue:true})
        vm.loadWorkFlows();
      }).catch((error)=>{console.log(error)})
    },

    updateWorkFlow(workflow){
      var url = '/admin/workflows/update/' + workflow._id;
      this.$router.push(url);
      
      
    },


    filter(){

var vm = this;


if(this.filterName == "" || this.filterName == null){
	vm.filteredWorkflows = vm.workflows;
}else{
	vm.filteredWorkflows = vm.workflows.filter((workflow)=>workflow.name == this.filterName)
}



}

  }

}



</script>