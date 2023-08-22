<template>

<div class="flex flex-row items-center justify-between  bg-blue-100 h-14 mt-3">

<div class="flex flex-row justify-around ml-10">
    	
    <div> 
     <label for="" class="mr-2 ml-2">Email:</label>
     <input type="email" list="emailList" v-model="filterMail" class="h-7 rounded-sm border border-black border-solid">
     <datalist id="emailList"> 
    	<option :value="email" v-for="(email, emailCounter) in emailList" :key="emailCounter">
              {{email}}
    	</option>
     </datalist>
    </div>
    
    
     <div>
     <label for="" class="mr-2 ml-10">Name</label>
     <input type="text" list="nameList" class="h-7 rounded-sm border border-black border-solid" v-model="filterName">
     <datalist id="nameList"> 
    	<option :value="name" v-for="(name, nameCounter) in nameList" :key="nameCounter">
                 {{name}}
    	</option>
     </datalist>
    </div>
    
    <div>
     <label for="" class="mr-2 ml-10">ID:</label>
     <input type="text" list="idList" class="h-7 rounded-sm border border-black border-solid" v-model="filterId">
     <datalist id="idList"> 
    	<option :value="id" v-for="(id, idCounter) in idList" :key="idCounter">
            {{id}}  
    	</option>
     </datalist>
    </div>
    

	
    
</div>


<button @click="filter()" class="h-9 rounded-sm bg-amber-500 text-white font-bold px-4 mr-4">Filter</button>



</div>	
 <div class="w-full h-2/4 overflow-y-scroll  px-5 flex flex-col mt-2">
        <table  >
     	<thead class="bg-blue-500 text-white font-bold" >
     		<tr >
     			<th scope="col" class="border border-slate-300 h-14 bg-gradient-to-b from-blue-500 to-blue-400 text-center pr-16 text-sm sticky top-0">Email  <button>filter</button></th>
     			<th scope="col" class="border border-slate-300 h-14 bg-gradient-to-b from-blue-500 to-blue-400 text-center pr-16 text-sm sticky top-0">Department</th>
     			<th scope="col" class="border border-slate-300 h-14 bg-gradient-to-b from-blue-500 to-blue-400 text-center pr-16 text-sm sticky top-0">Designation</th>
     			<th scope="col" class="border border-slate-300 h-14 bg-gradient-to-b from-blue-500 to-blue-400 text-center pr-16 text-sm sticky top-0">User Type</th>
     			<th scope="col" class="border border-slate-300 h-14 bg-gradient-to-b from-blue-500 to-blue-400 text-center pr-16 text-sm sticky top-0"></th>
     		
     		</tr>
     	</thead>
     	<tbody>
     		<tr v-for="(user, userCounter) in filteredUsers" :key="userCounter" scope="row" class="hover:bg-blue-200" >
               <td   class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
     			 {{user.empName}}  
     		</td>
     		  <td   class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
     			{{user.department}}
     
     		  </td>
     		  <td   class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 ">
     		{{user.designation}}
    
     		  </td>
     		  <td   class="border-2 border-solid  text-sm text-center border-slate-300 pr-16 ">
     			{{user.userType}}
     
     		  </td>
     		  <td class="border-2 border-solid p-4 text-sm text-center border-slate-300  pr-16 mb-10"><button @click="this.$router.push('/admin/users/update/' + user._id)" class="h-8 rounded-md text-green-500  font-bold"><font-awesome-icon icon="fa-solid fa-pen" /></button>
     		  <button @click="deleteUser(user)"  class="h-8 ml-10  rounded-md text-rose-500 font-bold"><font-awesome-icon icon="fa-solid fa-trash"/></button>
     		</td>
     
     		</tr>
     	</tbody>
     </table>
     
 </div>


<div class="flex flex-row justify-end items-end mt-4">
	
    <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-12  rounded-sm mr-3 ">Home</button>
</div>

</template>


<script>

import axios from 'axios'
 export default{
    data(){
        return{
        update:false,
		users:[],
		departments:null,
		groups:null,
		groupTags:null,
		updateUserGroupTags:null,
		token:null,
		filterMail:null,
		filterId: null,
		filterName: null,
		filteredUsers:null
        }
    },


	computed:{
        emailList(){
			var result = this.users.map((user)=>user.mailAddress)
			return result
		},

		nameList(){
			var result = this.users.map((user)=>user.empName)
			return result
		},

		idList(){
			var result = this.users.map((user)=>user._id)
			return result
		}
	},




    created(){
		this.token = this.authStore.getToken
        this.loadUsers();
    },

    methods:{
        loadUsers:function(){
			
			var vm = this;

			var data = {
				token:this.token
			}



			axios.post(vm.globalUrl + 'getUsers', data).then(function(response){
			    vm.users = response.data;
				vm.filteredUsers = response.data;
				vm.mainStore.setUsers(response.data)
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});

			  axios.post(vm.globalUrl + "getDepartmentsAndApproversWithoutGroups", data).then(function(response){
			    vm.mainStore.setDepartments(response.data)
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});



			  axios.post(vm.globalUrl + "getGroups", data).then(function(response){
			    vm.mainStore.setGroups(response.data);
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});
		},


		deleteUser:function(user){ 
			var vm = this;
			var data = {
				token:this.token,
				user
			}
			axios.post(vm.globalUrl + 'deleteUser', data).then((response) => {console.log(response);
	        this.loadUsers();
		}, (error) => {console.log(error);});
		},


		filter(){

			var vm = this;
			var filterVars = [this.filterMail, this.filterId, this.filterName]

			var filterVars2 = filterVars.map((item)=>{
				if(item == null || item == ""){
					return "All"
				}

				return item
			})


			var filterVars3 = [{name:'mailAddress', value:filterVars2[0]}, {name:'_id', value:filterVars2[1]}, {name:'empName', value:filterVars2[2]}]

			

			vm.filteredUsers = vm.users.filter((user)=>{
				for(var x of filterVars3){
					if(x.value != "All" ){
					        if(user[x.name] != x.value){
								return false
							}
					}
				}
				return true
			})
		}

	
	
	





    }
 }




</script>