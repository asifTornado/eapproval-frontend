<template>
  
 <div  class=" bg-white w-full h-full flex flex-col justify-center items-center"  id="addDepartmentForm">
 
      <form @submit.prevent="addDepartment" class="flex flex-col w-96 h-auto shadow-2xl shadow-dark  justify-center ">
        <h1 class="text-2xl font-bold   w-full bg-blue-500 text-white p-3  ">Add Department</h1>
      
  <div class="px-5 py-5">
            <label class="w-full text-xl mr-3">Name</label>
              <input v-model="department" required class="h-8 w-full border border-gray-400 border-solid mb-3 hover:border hover:border-blue-500 hover:border-2">
              
              <div class="flex flex-col items-center justify-center"><button type="submit" class="bg-blue-500 w-5/6 text-white font-bold text-xl h-8 rounded-sm hover:border mb-1 hover:border-blue hover:border-2">Add</button>
      		<button @click="this.$router.back()" class="bg-gray-300 w-5/6 text-gray-500 font-bold text-xl h-8  rounded-sm ">Return</button></div>
  </div>
      </form>
    </div>



</template>


<script>

import axios from 'axios'

export default{
  data(){
    return{
      department:null,
	  token:null
		
    }
  },

  created(){
     this.token = this.authStore.getToken
  },

  methods:{
   
		addDepartment:function(){
			var vm = this;
			var data = {
				department:this.department,
				token:this.token
			}
			axios.post(vm.globalUrl+'insertDepartment', data).then((response)=>{
				console.log(response);
				vm.$router.push('/admin/departments')
			
			}, (error)=>{
				console.log(error);
			});
		},
	
  }
}




</script>