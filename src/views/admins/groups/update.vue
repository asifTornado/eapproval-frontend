<template>
 <div class=" bg-white w-full h-full flex flex-col justify-center items-center" >
      <form @submit.prevent="updateGroup" class="flex flex-col w-96 h-auto shadow-2xl shadow-dark  justify-center  ">
        
        <h1 class="bg-blue-500 text-2xl font-bold text-white p-4 text-center">Update Group</h1>
        <div class="px-4 py-4">
            <label class="w-full text-xl">Name</label>
                    <input v-model="group.name" required class="h-8 w-full border border-gray-400 border-solid mb-3 hover:border hover:border-blue-500 hover:border-2">
                    <br>
                 <div class="flex flex-col items-center justify-center">  
                    <button type="submit" class="bg-blue-500 w-5/6 text-white font-bold text-xl h-8 rounded-sm hover:border mb-1 hover:border-blue hover:border-2">Update</button>
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
      group:null,
	  
    }
   },


   created(){
       var groups = this.mainStore.getGroups;
       var id = this.$route.params.id;
	   this.group = groups.filter((group)=>{
		return group._id == id
	   })[0];

   },


   methods:{
	
	
		
		updateGroup:function(){
			var vm = this;
			var token = this.authStore.getToken;
			var data = {
                group:this.group,
				token
			}
			axios.post(vm.globalUrl + 'updateGroup', data ).then((response)=>{
				console.log(response);
			    this.$router.push('/admin/groups')
			}, (error)=>{
				console.log(error);
			});
		},
	
	
	
	

	}

}


</script>