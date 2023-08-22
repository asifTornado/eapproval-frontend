<template>
    
    <div  class="flex flex-col text-xs bg-blue-100 border border-black border-solid mt-4 mb-4"> 



<div class="flex flex-row mb-5 mt-5 justify-center items-center ">




<label for="requestApprovalSelector" class="mr-2 font-semibold">Approval Status</label>
<select name="requestApprovalSelector" id="requestApprovalSelector" v-model="approval_status" class="mr-10 border border-black border-solid rounded-sm text-center w-24" type="text">
   
 
    <option value="Approved">Approved</option>
    <option value="Rejected">Rejected</option>
    <option value="Pending">Pending</option>
    <option value="All">All</option>
 
</select>






    

<label for="requestType" class="mr-2 font-semibold">Request Type</label>
<select type="text" v-model='requestType' id="requestType" class="mr-10 border border-black border-solid rounded-sm text-center w-24">
  <option value="All">All</option>
  <option :value="requestType" v-for="(requestType, requestTypeCounter) in requestTypes" :key="requestTypeCounter"> {{requestType}} </option>

</select>



<label for="id" class="mr-2 font-semibold">Id</label>
<input type="text" v-model='id' id="id" class="mr-10 border border-black border-solid rounded-sm text-center w-24">




<label for="email" class="mr-2 font-semibold">Email</label>
<select type="text" v-model='email' id="email" class="mr-10 border border-black border-solid rounded-sm text-center w-24">
  <option value="All">All</option>
  <option :value="email" v-for="(email, emailCounter) in emails" :key="emailCounter">{{email}}</option>
</select>




    
<label for="designation" class="mr-2 font-semibold">Designation</label>
<input type="text" v-model='designation' id="designation" class="mr-10 border border-black border-solid rounded-sm text-center w-24">




    
<label for="department" class="mr-2 font-semibold">Department</label>
  <select type="department" v-model='department' id="department" class="mr-10 border border-black border-solid rounded-sm text-center w-24">
  <option value="All">All</option>
  <option :value="department" v-for="(department, departmentCounter) in departments" :key="departmentCounter">{{department}}</option>
</select>



</div>

   
<div class="flex flex-row mb-10 mt-5">
   <label for="" class="mr-3 ml-20 font-semibold">Date</label>
   <select name="" id="" v-model="timeRange" class="mr-3 h-6 border-black border border-solid">
    <option value="All">All</option>
      <option value="on">On</option>
      <option value="after">After</option>
      <option value="before">Before</option>
      <option value="between">Between</option> 
   </select>

   <input type="date" v-if="timeRange == 'on'" class="mr-3 h-6" v-model="timeRangeOn"/>
   <input type="date" v-else-if="timeRange == 'after'" class="mr-3 h-6" v-model="timeRangeAfter"/>
   <input type="date" v-else-if="timeRange == 'before'" class="mr-3 h-6" v-model="timeRangeBefore"/>
   <div  v-else-if="timeRange == 'between'" class="flex flew-row mr-3 h-6">
    <input type="date" v-model="timeRangeBefore"/>
    <p class="font-semibold ml-5 mr-5 mt-1" for="">and</p>
    <input type="date" v-model="timeRangeAfter"/>
   </div>       

    <button @click="filter()" class="h-9 rounded-sm bg-amber-500 text-white font-bold px-4 absolute right-20">Filter</button>
</div>

</div>






<div class="w-full h-96 overflow-y-scroll overflow-x-scroll flex flex-col" >
    <table   style="font-size:x-small" class="px-10 text-xs">
<thead class="bg-blue-500 text-white font-bold text-xs">
    <tr class="z-50">
          <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Request Time
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Requester's Name
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Requester's Email
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Requester's Designation
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Requester's Department
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Request Type
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Number of Approvers
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Current Approver
        </th>
        <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Number of Approvers Left
        </th>
         <th class="border border-slate-300 bg-blue-500  text-center pr-16 h-14 sticky top-0 " scope="col">
            Approval Status
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="(request, requestCounter) in filteredRequests" :key="requestCounter" @click="this.$router.push('/admin/allRequests/view/'+request._id)" class="hover:cursor-pointer hover:bg-blue-200 z-10" scope="row" >
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.time}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.name}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.email}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.designation}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.department}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.requestType}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.number_of_approvers}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10"><template v-if="request.current_approver != null">{{request.current_approver.name}}</template></td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.approvers_left}}</td>
        <td class="border-2 border-solid  text-center border-slate-300 h-14 pr-16 z-10">{{request.approval_status}}</td>
        
    </tr>
</tbody>
</table>
</div>
<div class="flex flex-row justify-end items-end mt-4">

    <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm mr-3 ">Home</button>
</div>


</template>


<script>
import axios from 'axios';


export default{
    data(){
        return {
            requests:null,
        requestApprovalSelector:"",
        userType:"All",
        id:"All",
        email:"All",
        designation:"All",
        department:"All",
        requestType:"All",
        approval_status:"All",
        filteredRequests:null,
        showRequestCheck:false,
        showRequestItem:null,
        file:null,
        departments: [],
        emails: [],
        requestTypes: [],
        timeRange:null,
        timeRangeBefore:null,
        timeRangeAfter:null,
        timeRangeOn:null
        }
    },

    created(){
        this.loadRequests();
        this.loadFilterVariables();
    },

    methods:{
        loadRequests(){
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
            
            axios.post(vm.globalUrl + "getCurrentRequestsForAdmin", data).then((result)=>{
                console.log(result.data);
                vm.requests = result.data;
                vm.mainStore.setRequests(result.data)
                vm.filteredRequests = result.data;
            }).catch((error)=>{
                console.log(error);

            })
        },

      
        

            filter(){

                var vm = this;

                var filterList = [{name:"userType", value:this.userType}, {name:"id", value:this.id}, 
                {name:"department", value:this.department}, {name:"designation", value:this.designation}, 
                {name:"email", value:this.email}, {name:"approval_status", value:this.approval_status}, {name:"requestType", value:this.requestType}, {name:"time", value:this.timeRange}];


            





               console.log("filter request")
                console.log(filterList);
                var mappedFilterList = filterList.map((data)=>{
                    if(data.value != "All"){
                        return data
                    }else{
                        return null
                    }
                });

                console.log("mappedFilterList")
                console.log(mappedFilterList)
               

               this.filteredRequests = this.requests.filter(function(request){
                    console.log("entered main filter")
                   for(let x=0; x < mappedFilterList.length; x++){
                         console.log("value of mapped filter list")
                         console.log(mappedFilterList[x])
                         console.log(x)
                         console.log("entered first loop")
                 if(mappedFilterList[x] != null){
                       console.log("entered first if")
                    if(mappedFilterList[x].name != 'time'){
                        console.log("entered first mappedfilterList")
                        if((request[mappedFilterList[x].name] != mappedFilterList[x].value) ){
                        return false
                    }

                    }else{
                        console.log("entered second mappedfilterList")
                        if(mappedFilterList[x].value == 'on'){
                               console.log("entered on")
                             var request_Time = new Date(request[mappedFilterList[x].name]).toDateString()
                             var filter_Time = new Date(vm.timeRangeOn).toDateString()
                             
                             if(request_Time != filter_Time){
                                console.log("request time")
                                console.log(request_Time)
                                console.log("filtered time")
                                console.log(filter_Time)
                                return false
                             }

                        }else if(mappedFilterList[x].value == "after"){
                                   
                            if( new Date(request[mappedFilterList[x].name]).getTime() < new Date(vm.timeRangeAfter).getTime()){
                                return false
                             }

                        }else if(mappedFilterList[x].value == "before"){

                            if( new Date(request[mappedFilterList[x].name]).getTime() > new Date(vm.timeRangeBefore).getTime()){
                                return false
                             }

                        }else if(mappedFilterList[x].value == "between"){
                            if( (new Date(request[mappedFilterList[x].name]).getTime() > new Date(vm.timeRangeAfter).getTime()) && (new Date(request[mappedFilterList[x].name]).getTime() < new Date(vm.timeRangeBefore).getTime() )){
                                return false
                             }
 
                        }

                    }
                
                    }else{
                        console.log("entered else of first if")
                    
                    };
                   }

                   return true;

               })

       
            },
            loadFilterVariables(){
                var vm = this;
                var token = this.authStore.getToken;
                var data = {token}
                axios.post(vm.globalUrl + 'getDepartmentsAndApproversWithoutGroups', data).then((results)=>{
                    vm.departments = results.data.filter((result)=> result.email == null && result.name != "Requester's Own Department").map((result)=>result.name)
                    
                     vm.emails = results.data.filter((result)=>result.mailAddress != null).map((result)=>result.mailAddress)

                }).catch((error)=>console.log(error));

                axios.post(vm.globalUrl + 'getWorkflows', data).then((result)=>{
                    vm.requestTypes = result.data.map((workflow)=>{
                        return workflow.name
                    })
                }).catch((error)=>console.log(error))
            }
          
    }
}




</script>