<template>
 <div  class=" bg-white w-full h-full flex flex-col justify-center items-center" >
      <form @submit.prevent="updateDepartment" class="flex flex-col w-96 h-auto shadow-2xl shadow-dark  justify-center ">
		<div class="text-2xl text-white font-bold w-full bg-blue-500 p-4">Update Department</div>
       <div class="px-4 py-4">
            <label class="w-full text-xl mr-3">Name</label>
                   <input required class="h-8 border border-gray-400 border-solid mb-3 hover:border-blue-500 hover:border-2 w-full" v-model="item.name" >
                   <br>
                <div class="flex flex-col items-center justify-center">  
                   <button type="submit" class="bg-blue-500 w-5/6 text-white font-bold text-xl h-8 rounded-sm  mb-1 hover:border-blue hover:border-2">Update</button>
           		<button  class="bg-gray-300 w-5/6 text-gray-500 font-bold text-xl h-8  rounded-sm " @click="this.router.back()">Return</button></div>
       </div>
      </form>
    </div>
    





</template>


<script>
import axios from 'axios'



export default{
  data(){
    return{
      item:null,
	  id:null,
	  token:null,
    }
  },

  created(){
	this.token = this.authStore.getToken
    this.id = this.$route.params.id
	var departments = this.mainStore.getDepartments;
	this.item = departments.filter((department)=> department._id == this.id)[0]
  },

  methods:{
  
		updateDepartment(){
			var vm = this;
			var data = {
				department:this.item,
				token:this.token
			}
			axios.post(vm.globalUrl + 'updateDepartment', data).then((response)=>{
				console.log(response);
				this.$router.push('/admin/departments')
			}, (error)=>{
				console.log(error);
			});	
		}

		

		
  }
}


</script>