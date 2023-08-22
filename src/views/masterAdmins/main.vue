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
<div id="app" class="w-full h-2/4 overflow-y-scroll overflow-x-scroll  px-5 flex flex-col mt-2">


    

<table class="table   w-full text-sm border border-slate-500 border-solid overflow-x-scroll" id="table">
<thead class="bg-blue-500 text-white font-bold" >
    
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            Name
        </th>
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            Email
        </th>
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            Designation
        </th>
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            Department
        </th>
      
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            ID
        </th>
        <th class="sticky top-0 border border-slate-300 h-14 bg-blue-500 text-center pr-16 text-sm ">
            
        </th>
    

</thead>
<tbody>
<tr v-for="(admin, adminCounter) in filteredAdmins" :key="adminCounter" >
      
        <td class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
               <input type="text"  v-model="admins[adminCounter].empName" >
        </td>
        <td class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
               <input type="text"  v-model="admins[adminCounter].mailAddress" >
        </td>
        <td class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
              <input type="text"  v-model="admins[adminCounter].designation" >
        </td>
        <td class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
            <input type="text"  v-model="admins[adminCounter].department" >
     </td>
      
        <td class="border-2 border-solid  text-sm text-center border-slate-300  pr-16 ">
               <input type="text" v-model="admins[adminCounter]._id" >
        </td>
        <td class="border-2 border-solid  text-sm  border-slate-300 flex flex-row justify-around ">
              <button @click="updateAdmin(admin)" class="fa-solid fa-pen text-green-500"><font-awesome-icon icon="fa-solid fa-pen text-green-500"/> </button>
  
              <button @click="deleteAdmin(admin)" class="fa-solid fa-trash text-red-500"><font-awesome-icon icon="fa-solid fa-trash text-red-500"/>  </button>
        </td>
</tr>

</tbody>
</table>














</div>    
<div class="flex flex-row justify-end items-end"><button @click="addAdmin()" class="bg-blue-500 text-white rounded-md m-3 p-3 h-auto w-auto">Add Admin</button></div>



</template>


<script>
import axios from 'axios'


export default{
    data(){
        return{
            admins:null,
            filteredAdmins:null,
            filterName:null,
            filterMail:null,
		    filterId: null,
		    filterName: null,
        }
    },

    computed:{
        emailList(){
			var result = this.admins.map((user)=>user.mailAddress)
			return result
		},

		nameList(){
			var result = this.admins.map((user)=>user.empName)
			return result
		},

		idList(){
			var result = this.admins.map((user)=>user._id)
			return result
		}
	},


    created(){
        this.loadAdmins();
    },


    
    
    methods:{
        loadAdmins(){
            var vm = this;
            axios.get(vm.globalUrl + "getAdmins").then((result)=>{
                console.log(result.data);
                vm.admins = result.data;
                vm.filteredAdmins = result.data;
                vm.mainStore.setAdmins(result.data)
            }).catch((error)=>{
                console.log(error.message)
            })
        },
        addAdmin(){
            this.$router.push('/masterAdmin/add')
            
        },
        insertAdmin(event){
            var vm = this;
            var data = new FormData();
            var elements = event.target.elements;
            console.log("elements");
            console.log(elements.name.value)
            data.append("name", elements.name.value);
            data.append("email", elements.email.value);
            data.append("Id", elements.Id.value);
            data.append("designation", elements.designation.value);
            data.append("department", elements.department.value);
            data.append("zone", elements.zone.value);
            data.append("userType", "Admin");
            console.log("from form data")
            console.log(data.name)

            axios.post(vm.globalUrl + "insertUser", data,  {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((result)=>{
                console.log(result.data);
                var form = document.getElementById("form");
                var table = document.getElementById("table");
                table.classList.remove("blur");
                form.classList.remove("fixed");
                form.classList.add("hidden");
                vm.loadAdmins();
            }).catch((error)=>{
                console.log(error)
            })
        },
        closeForm(){
            var form = document.getElementById("form");
            var table = document.getElementById("table");
            table.classList.remove("blur");
            form.classList.remove("fixed");
            form.classList.add("hidden");
        },
        updateAdmin(admin){
            var vm = this;
            var id = admin._id;

            this.$router.push('/masterAdmin/update/' + id)
         
        },
        deleteAdmin(admin){
            var vm = this;
            var user = this.authStore.getUser;
            var token = this.authStore.getToken;
            var data = {
                user,
                token,
                user:admin
            }
           axios.post(vm.globalUrl + "deleteUser", data).then((result)=>{
            console.log(result);
            vm.loadAdmins()
           }).catch((error)=>{
            console.log(error.message)
           })

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



vm.filteredAdmins = vm.admins.filter((user)=>{
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