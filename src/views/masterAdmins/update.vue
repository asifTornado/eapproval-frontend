<template>
    <div  class=" flex justify-center items-center">
	<div class="shadow-2xl hover:shadow-blue-600 w-1/2 h-auto  flex flex-col justify-center items-center bg-white ">

		<div class="flex flex-row justify-center items-start w-full mb-10 bg-blue-500 text-white p-3 "><span class="text-4xl font-bold ">Update User</span></div>
		
				<form @submit.prevent="updateUser" class="px-4">
			   
				
		<label  class="mb-20 font-bold">Email Address</label>
				<input v-model="user.mailAddress" required class=" w-full h-11 mb-4 border border-solid border-gray-200">
			
			 <label class="mb-20 font-bold mt-10">Department</label> 
			 <input list="departments" autocomplete="off" name="department" id="department" v-model="user.department" type="text" class=" mb-4 h-11 w-full  border r-solid border-gray-200" >
				<datalist id="departments" >
					
					<option v-for="(department, departmentCounter) in departments" :key="departmentCounter"  :value="department.name">{{department.name}}</option>
							 
				</datalist>


		<label class="mb-20 font-bold mt-10" >Groups</label>
        <input type="text" name="groups" id="updateGroups" v-bind:value="user.groups" class="mb-4 h-11 w-full  border border-solid border-gray-200" >
		
		
		
				  <br class="border border-solid border-black">
		
			   <button type="submit" class="w-full mt-8 h-11 bg-blue-500 rounded-md text-2xl text-white font-bold mb-2">Update</button> 
		
		
			   <button @click="this.$router.back()" class="w-full h-11 bg-gray-300 rounded-md text-2xl text-gray-500 font-bold mb-10">Return</button>
		
			  </form>
			</div>
		
    </div>






</template>


<script>

import axios from 'axios'
import Tagify from '@yaireo/tagify'
import '../../../node_modules/@yaireo/tagify/dist/tagify.css'

 export default{
    data(){
        return{
             user:null,
			 departments:null,
			 groups:null,
			 token:null,
			 groupTags:null,
			 updateUserCheck:false
        }
    },

    watch:{
     addUserCheck(newVal, oldVal){
           if(newVal == true){
		 this.$nextTick(() => {
          this.loadGroups();
        });
		   }
 	 },

	 updateUserCheck(newVal, oldVal){
		if(newVal == true){
			this.$nextTick(()=>{
				this.loadUpdateGroups();
			})
		}
	 }
	},


    created(){
	
     this.token = this.authStore.getToken;

      var users = this.mainStore.getAdmins;

      var id = this.$route.params.id;
   
	  this.user = users.filter((user)=>{
		return user._id == id
	  })[0];

	  console.log(`this is the user found: ${this.user.empName}`)
     
	  var departments = this.mainStore.getDepartments
	  console.log(`departments from the store: ${departments}`)
	  this.departments = departments.filter((department)=>{
		return department.email == null
	  })

	  this.groups = this.mainStore.getGroups

	  console.log(`departments from this instance: ${this.departments}`)
	  this.groups = this.mainStore.getGroups;
	  console.log(`this is from the groups inside update ${this.groups}`)
	  this.updateUserCheck = true;

	  this.token = this.authStore.getToken

	 console.log(`this is the token from update users: ${this.token}`)

    },



    methods:{
        
	

		updateUser:function(){
			var vm = this;
			
			this.user.groups = this.groupTags.value.map(function(item){
				return item.value
			})
            
          
        
			var data = {
				user:this.user,
				token:this.token
			}
		
			axios.post(vm.globalUrl + 'updateUser', data).then((response)=>{
				console.log(response);
				this.$router.push('/admin/users')
			}, (error)=>{
				console.log(error);
			});
		},
	

	
	

	loadGroups(){
    		
	var vm = this;
	var list = [];
	console.log("from tagify function")
    console.log(this.groups.length)

   for(let x of this.groups){
	list.push(x.name)
	console.log("inside for loop");
	console.log(x.name)
   }

	var input = document.querySelector("#groups")
	
	this.groupTags=  new Tagify(input, {
		whitelist:list,
		maxTags: 10,
		enforceWhitelist: true,
		dropdown: {
		maxItems: 20,  	           // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
      }
	})

	},



	loadUpdateGroups(){
    		
			var vm = this;
			var list = [];
			console.log("from tagify function")
			console.log(this.groups.length)
		
		   for(let x of this.groups){
			list.push(x.name)
			console.log("inside for loop");
			console.log(x.name)
		   }
		
			var input = document.querySelector("#updateGroups")
			
			this.groupTags=  new Tagify(input, {
				whitelist:list,
				maxTags: 10,
				enforceWhitelist: true,
				dropdown: {
				maxItems: 20,  	           // <- mixumum allowed rendered suggestions
				classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
				enabled: 0,             // <- show suggestions on focus
				closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
			  }
			})
		
			},


    }
 }





</script>