<template>
    <div  class="flex flex-col px-10">


<div class="flex flex-row  mt-5 bg-blue-100 pt-4 px-4 mb-4 border border-black border-solid">
  <label for="" class="mr-2 text-md font-semibold">Approval Status</label>
    <select  id="requestApprovalSelector" v-model="approval_status" class="mr-3 border border-black border-solid rounded-sm text-center h-6">
       
     
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Pending">Pending</option>
        <option value="All">All</option>
     
    </select>

  

    
    
    
    
        
     <label for="requestType" class="mr-2 text-md font-semibold">Request Type</label>
    <select type="text" v-model='requestType' id="requestType" class="mr-10 border h-6 border-black border-solid rounded-sm text-center w-24">
      <option value="All">All</option>
      <option :value="requestType" v-for="(requestType, requestTypeCounter) in requestTypes" :key="requestTypeCounter"> {{requestType}} </option>

    </select>
   
  
    
  
    <label for="id" class="mr-2 text-md font-semibold">Id</label>
    <input type="text" v-model='id' class="border border-black border-solid rounded-sm text-center h-6">

    <div class="flex flex-row mb-10 ml-3">
       <label for="" class="mr-3 font-semibold text-md">Date</label>
       <select name="" id="" v-model="timeRange" class="mr-10 border h-6 border-black border-solid rounded-sm text-center w-24">
        <option value="All">All</option>
          <option value="on">On</option>
          <option value="after">After</option>
          <option value="before">Before</option>
          <option value="between">Between</option> 
       </select>
    
       <input type="date" v-if="timeRange == 'on'" class="mr-10 border h-6 border-black border-solid rounded-sm text-center w-30" v-model="timeRangeOn"/>
       <input type="date" v-else-if="timeRange == 'after'" class="mr-10 border h-6 border-black border-solid rounded-sm text-center w-30" v-model="timeRangeAfter"/>
       <input type="date" v-else-if="timeRange == 'before'" class="mr-10 border h-6 border-black border-solid rounded-sm text-center w-30" v-model="timeRangeBefore"/>
       <div type="date" v-else-if="timeRange == 'between'"  class="flex flex-row justify-between mr-10 border h-6 border-black border-solid rounded-sm text-center w-full ">
        <input type="date" v-model="timeRangeBefore" class="mr-4 border h-6 border-black border-solid rounded-sm text-center w-1/2"/>
        <p class="font-semibold mr-4 mt-1" for="">and</p>
        <input type="date" v-model="timeRangeAfter" class=" border h-6 border-black border-solid rounded-sm text-center w-1/2 "/>
       </div>       
    
        <button @click="filter()" class="h-9 rounded-sm bg-amber-500 text-white font-bold px-4 absolute right-20 mr-2">Filter</button>
</div>
  
    </div>
  
 
    
    
    

    
    



<div class="w-full h-96 overflow-x-scroll overflow-y-scroll "><table  v-if="showRequestCheck==false" class="w-full text-start text-sm display" > 
   
        <thead ><tr class="bg-blue-500 text-white font-bold"><th class="border border-slate-300 border-solid text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Request Type</th> 
        <th class="border border-slate-300 border-solid  text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Request Date</th> 
        <th class="border border-slate-300 border-solid  text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Number of Approvers</th> 
        <th class="border border-slate-300 border-solid  text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Current Approver</th> 
        <th class="border border-slate-300 border-solid  text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Approvers Left</th> 
        <th class="border border-slate-300 border-solid  text-center pr-16 text-sm h-14 bg-blue-500 sticky top-0 text-white">Approval Status</th>
        </tr></thead>
  
        

     <tbody>  <tr v-for="(request, requestCounter) in myFilteredRequests" :key="requestCounter" style="cursor:pointer" @click="getRequiredView(request)"  class="hover:cursor-pointer hover:bg-blue-200">
         <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">{{request.time}}</td>
         <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">{{request.requestType}}</td> 
         <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">{{request.number_of_approvers}}</td> 
         <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">
          <template v-if="request.current_approver != null">{{getApprover(request.current_approver)}}</template></td> 
          <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">{{request.approvers_left}}</td> 
          <td class="border-2 border-solid border-slate-300 text-sm text-center h-14 pr-16">{{request.approval_status}}</td>
        
       </tr></tbody>
  </table>
</div>



<div class="flex flex-row justify-end items-end mt-4">
	
    <button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm mr-3 " v-if="this.authStore.getUser.userType == 'Admin'">Home</button>
    <button @click="this.$router.push('/user')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm mr-3 " v-if="this.authStore.getUser.userType != 'Admin'">Home</button>
</div>













</div>




</template>



<script>
import axios from 'axios';


export default {
     data(){
        return {
            myRequests:null,
        myFilteredRequests:null,
        showRequestCheck:false,
        showRequestItem:null,
        requestTypeSelector:"",
        userType:"",
        id:"All",
        email:null,
        designation:null,
        department:"All",
        requestType:"All",
        approval_status:"All",
        showRequestCheck:false,
 
        files:[],
        requestTypes:[],
        timeRange:null,
        timeRangeBefore:null,
        timeRangeAfter:null,
        timeRangeOn:null
        }
     },


     created(){
        this.loadMyRequests();
        this.loadFilterVariables();
     },


     methods:{
        loadMyRequests(){
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
          
			axios.post(vm.globalUrl + "getMyRequests", data).then(function(response){
			    vm.myRequests = response.data.myRequests;
          vm.myFilteredRequests = response.data.myRequests;
          vm.userType = response.data.userType;
          vm.mainStore.setRequests(vm.myRequests)
				console.log(response.data);
            
          
        }


        
				
			).catch(function(error){
			   console.log(error);
			});
        },
        loadWorkFlows(){

        },
        showRequest(request){
            this.showRequestCheck = true;
            this.showRequestItem = request;
            this.messages = this.showRequestItem.messages || [];
           
        },
        rReturn(){
            this.showRequestCheck = false;
            this.showRequestItem = null;
        },
        showFile(event){
          
             window.open(event.target.href, '_blank', 'height=600,width=800,resizable=yes,scrollbars=yes');
        },

        reUpload(event, counter){
          console.log(event.target.files[0])
          console.log(counter)
          if(this.showRequestItem.infos[counter].input.newOriginalName){ 
            console.log("from if")    
                this.showRequestItem.infos[counter].input.newOriginalName = event.target.files[0].name;
                this.files.push(event.target.files[0])
          }else{
            console.log("from else")
            this.$set(this.showRequestItem.infos[counter].input, "newOriginalName", event.target.files[0].name);
             this.files.push(event.target.files[0])
          }
        
      

    },
    makeRequestAgain(){
      var vm = this;
      var token = this.authStore.getToken;

      var data = new FormData();
      for(let x of this.files){
           data.append("file", x)
      }

      data.append('token', token)
     
      data.append("item", JSON.stringify(this.showRequestItem));
      console.log("showRequestItem before being sent")
      console.log(this.showRequestItem)

      axios.post(vm.globalUrl + "makeRequestAgain", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((result)=>{
              console.log(result);
              vm.loadMyRequests();
              vm.showRequestCheck = false;
              vm.showRequestItem = null
            }).catch((error)=>{
              console.log(error)
            })
    },

         getFileType(fileName){
              if(fileName){
              var lastThree = fileName.slice(-3);
              var lastFour = fileName.slice(-4);
                   if(lastThree == "pdf"){
                    return "pdf"
                   }else if(lastThree == "png" || lastFour == "jpeg" || lastThree == "jpg" || lastThree == "JPG"){
                    return "image"                    
                   }

              }else{
                return false
              }
              
             
            },


            filter(){

                var vm = this;

                var filterList = [ {name:"id", value:this.id}, {name:"approval_status", value:this.approval_status}, {name:"requestType", value:this.requestType}, {name:"time", value:this.timeRange}];


            





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
               

               this.myFilteredRequests = this.myRequests.filter(function(request){
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
                axios.post(vm.globalUrl + 'getWorkflows', data).then((result)=>{
                    vm.requestTypes = result.data.map((workflow)=>{
                        return workflow.name
                    })
                }).catch((error)=>console.log(error))
            },

            getRequiredView(request){
              var status = request.approval_status;
              var id = request._id;
              if(status == "Rejected"){
                this.$router.push('/myRequests/rejected/' + id)
              }else if(status != "Rejected"){
                this.$router.push('/myRequests/notRejected/' + id)
              }
            },

            getApprover(approver){
              if(approver.email == null){
                return approver.name
              }else{
                return approver.email
              }
            }
}


     
 

}




</script>