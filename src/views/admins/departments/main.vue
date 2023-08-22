<template>
	
<div class="flex flex-row items-center justify-between  bg-blue-100 h-14 mt-3">

<div class="flex flex-row justify-around ml-10">
    	
    <div> 
     <label for="" class="mr-2 ml-2">Department:</label>
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
       <div class="overflow-y-scroll h-2/4 w-full relative px-5 mt-2" ><table   id="table" class="w-full text-start text-sm table-auto overflow-y-scroll  h-1/3 relative" >
	<thead>
		<tr class="bg-blue-500 text-white">
			<th scope="col" class="border-b border-b-slate-100  font-bold h-14 text-center mr-10 text-sm bg-blue-500 sticky top-0 text-white  z-10">Name</th>
			<th class="bg-blue-500 sticky top-0 text-white"></th>
			<th class="bg-blue-500 sticky top-0 text-white"></th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="(department, departmentCounter) in filteredDepartments"  :key="departmentCounter" scope="row" class="hover:bg-blue-200"  > 
          <td class="border-2 border-solid text-sm text-center px-32 border-slate-300 h-14 mr-10">{{department.name}}</td>
		
		  <td class="border-2 border-solid  text-sm text-center border-slate-300   mb-10"> <button @click="this.$router.push('/admin/departments/update/' + department._id)" style="cursor:pointer" class=" rounded-md  font-bold text-emerald-500 text-center"><font-awesome-icon icon="fa-solid fa-pen"/></button>
		 <button @click="deleteDepartment(department)"  style="cursor:pointer" class="rounded-md  font-bold text-center text-rose-500 ml-10 mr-5"><font-awesome-icon icon="fa-solid fa-trash"/></button></td>
		</tr>
</tbody>
</table>

</div>





<div class="flex flex-row justify-end items-end mt-4">
	<button @click="this.$router.push('/admin/departments/add')" class="bg-blue-500 w-36   text-white font-bold text-md h-12 ml-3 rounded-sm mr-1">Add New Department</button>

    <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-12  rounded-sm mr-3 ">Home</button>
</div>




</template>


<script>
import axios from 'axios'


export default{
  data(){
    return{
      update:false,
		status:[],
		updateItem:null,
		addCheck:false,
		addDepartmentItem:{name:null, email:null},
		addButton:true,
		addDepartmentCheck:false,
		updateItemCheck:false,
		user:null,
		token:null,
		filterName:null,
		departments:[],
		filteredDepartments:[]
		
    }
  },

  computed:{
        nameList(){
			var result = this.departments.map((item)=>item.name)
			return result
		}
  },

  created(){
	
	this.token = this.authStore.getToken;
    this.loadQuote();
  },

  methods:{
    loadQuote:function(){
			var data = {
				token:this.token
			}

			console.log(`this is the date being sent ${this.token}`)
			var vm = this;
			axios.post(vm.globalUrl + "getDepartments", data).then(function(response){
			    var filteredResult = response.data;

				vm.departments = filteredResult;
				vm.filteredDepartments = filteredResult

				vm.mainStore.setDepartments(filteredResult)
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			})
		},
		deleteDepartment:function(department){ 
			var vm = this;
			axios.post(vm.globalUrl + 'deleteDepartment', {department, token:this.token}).then((response) => {console.log(response);
		vm.loadQuote();
		}, (error) => {console.log(error);});
		},

		$update:function(item){
			this.updateItem = Object.assign({}, item);
			this.updateItemCheck = true;
		

		},
		updateDepartment:function(){
			var vm = this;
			axios.post(vm.globalUrl + 'updateDepartment', vm.updateItem ).then((response)=>{
				console.log(response);
				vm.loadQuote();
				vm.updateItem = null;
				vm.addButton = true;
				vm.updateItemCheck = false;
			}, (error)=>{
				console.log(error);
			});
		},
		add:function(){
		  this.addDepartmentItem = {name:null}
		  this.addDepartmentCheck = true
            
		},
		addDepartment:function(){
			var vm = this;
			axios.post(vm.globalUrl + 'insertDepartment', vm.addDepartmentItem).then((response)=>{
				console.log(response);
				vm.loadQuote();
				vm.addDepartmentItem = null;
				vm.addButton = true;
				vm.addDepartmentCheck = false;
			}, (error)=>{
				console.log(error);
			});
		},
		reset:function(){
			this.updateItem = null;
			this.addButton = true;
			this.addDepartmentItem = null
		},
		dReturn(){
		  this.addDepartmentCheck = false;
		  this.updateItemCheck = false;
		},


		
		filter(){

var vm = this;


if(this.filterName == "" || this.filterName == null){
	vm.filteredDepartments = vm.departments;
}else{
	vm.filteredDepartments = vm.departments.filter((department)=>department.name == this.filterName)
}



}
  }
}




</script>