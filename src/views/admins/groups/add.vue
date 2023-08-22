<template>
    <div  class=" bg-white w-full h-full flex flex-col justify-center items-center"  id="addDepartmentForm">
      <form @submit.prevent="addGroup" class="flex flex-col w-96 h-auto shadow-2xl shadow-dark  justify-center ">
		<h1 class="bg-blue-500 text-2xl font-bold text-white p-4 text-center">Add Group</h1>
 <div class="px-4 py-4">
            <label class="w-full text-xl">Name</label>
             <input v-model="group.name" required class="h-8 border border-gray-400 border-solid mb-3 hover:border w-full hover:border-blue-500 hover:border-2">
             
             <div class="flex flex-col items-center justify-center"><button type="submit" class="bg-blue-500 w-5/6 text-white font-bold text-xl h-8 rounded-sm hover:border mb-1 hover:border-blue hover:border-2">Add</button>
     		<button @click="this.$router.push('/admin/groups')" class="bg-gray-300 w-5/6 text-gray-500 font-bold text-xl h-8  rounded-sm ">Return</button></div>
 </div>
      </form>
    </div>




</template>



<script>

import axios from 'axios';

export default{
   data(){
    return { 
    group:{}
	}
   },




   methods:{
	
	
	
		addGroup:function(){
			var vm = this;
			var token = this.authStore.getToken
			var data = {
				group:this.group,
				token
			}
			axios.post(vm.globalUrl + 'insertGroup', data).then((response)=>{
				console.log(response);
				this.$router.push('/admin/groups')
		
			}, (error)=>{
				console.log(error);
			});
		},
	


	}

}



</script>