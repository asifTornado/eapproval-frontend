<template>

<div class="flex flex-row items-center justify-between  bg-blue-100 h-14 mt-3">

<div class="flex flex-row justify-around ml-10">
    	
    <div> 
     <label for="" class="mr-2 ml-2">Group:</label>
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
    <div class="overflow-y-scroll h-2/4 w-full relative px-5 mt-3" ><table   id="table" class=" text-start text-sm table-auto overflow-y-scroll w-full h-1/3" >
	<thead class=" shadow-gray-300 ">
		<tr class="bg-blue-500 text-white">
			<th scope="col" class="border-b border-b-slate-100  font-bold h-14 text-center mr-10 text-sm bg-blue-500 sticky top-0 text-white">Name</th>
			<th class="bg-blue-500 sticky top-0 text-white"></th>
			<th class="bg-blue-500 sticky top-0 text-white"></th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="(group, groupCounter) in filteredGroups" :key="groupCounter"  scope="row" class="hover:bg-blue-200" > 
          <td class="border-2 border-solid text-sm text-center border-slate-300 h-14 mr-10 px-44">{{group.name}}</td>
		  
		  <td class="border-2 border-solid  text-sm text-center border-slate-300   mb-10"> <button @click="this.$router.push('/admin/groups/update/' + group._id)" style="cursor:pointer" class=" rounded-md  font-bold text-emerald-500 text-center"><font-awesome-icon icon="fa-solid fa-pen"/></button>
		<button @click="deleteGroup(group)" style="cursor:pointer" class="fa-solid fa-trash rounded-md  font-bold text-center text-rose-500 ml-10 mr-5"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
		</tr>
</tbody>
</table></div>



<div class="flex flex-row justify-end items-end mt-4">
	<button @click="this.$router.push('/admin/groups/add')" class="bg-blue-500 w-36   text-white font-bold text-md h-12 ml-3 rounded-sm mr-1">Add Group</button>
    <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-12  rounded-sm mr-3 ">Home</button>
</div>

</template>



<script>
import axios from 'axios';

export default{
   data(){
    return {
		groups:[],
		filteredGroups:[],
		filterName:null
	
    }
   },


   created(){
	this.loadGroups();
   },


   computed:{
	nameList(){
		var result = this.groups.map((group)=>group.name)
		return result
	}
   },


   methods:{
		loadGroups:function(){
			var token = this.authStore.getToken;
			var data = {token}
			var vm = this;
			axios.post(vm.globalUrl + "getGroups", data).then(function(response){
			    vm.groups = response.data;
				vm.filteredGroups = response.data;
				vm.mainStore.setGroups(response.data);
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			})
		},

		deleteGroup:function(group){ 
			var vm = this;
			var token = this.authStore.getToken;
	        var data = {
				token,
				group
			}
			axios.post(vm.globalUrl + 'deleteGroup', data).then((response) => {console.log(response);
		vm.loadGroups();
		}, (error) => {console.log(error);});
		},



		filter(){

var vm = this;


if(this.filterName == "" || this.filterName == null){
	vm.filteredGroups = vm.groups;
}else{
	vm.filteredGroups = vm.groups.filter((group)=>group.name == this.filterName)
}



}

	
	
	


	}

}




</script>