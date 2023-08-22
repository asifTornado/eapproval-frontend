<template>
    <div  class="w-full  flex flex-col items-stretch">
<h1 class="text-2xl text-black font-bold underlines mx-8  text-center m-4">{{showRequestItem.requestType}}</h1>
<table class="mb-5">
 <tr class="border border-slate-300 border-solid bg-blue-500 text-white font-bold"><td colspan="2" >Basic</td> </tr>
<tr ><th  class="border border-slate-300 border-solid text-sm text-center  h-14 pr-16">Request Type</th><td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{showRequestItem.requestType}}</td></tr>
<tr ><th class="border border-slate-300 border-solid text-sm text-center  h-14 pr-16">Requester's Name</th><td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{showRequestItem.name}}</td></tr>
<tr ><th class="border border-slate-300 border-solid text-sm text-center  h-14 pr-16">Requester's Designation</th><td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{showRequestItem.designation}}</td></tr>
<tr ><th class="border border-slate-300 border-solid text-sm text-center  h-14 pr-16">Requester's Department</th><td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{showRequestItem.department}}</td></tr>


</table>


<h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10" v-if="showRequestItem.infos.length > 0">Information</h1>
<table class="highlight mb-5 " id="show infos" v-if="showRequestItem.infos">
 
   <tr v-for="(info, infocounter) in showRequestItem.infos" :key="infocounter"  >
    
  <template v-if="info.dataType != 'list' && info.dataType != 'file'">
    <th  class="border border-slate-300 border-solid text-start p-5"> {{info.name}}</th><td class="border border-slate-300 border-solid text-start pl-20"> {{info.input}}</td>
  </template>
   <template v-else-if="info.dataType == 'file'">
          <th class="border border-slate-300 border-solid text-start p-5"> {{info.name}} </th>
          <td class="border border-slate-300 border-solid text-start pl-20">
                   
                <div v-for="(file, inputCounter) in info.input" :key="inputCounter" class="flex flex-row justify-between mb-1 p-1">
                     <a target="_blank" :href="globalUrl + '/uploads/'+file.fileName" class="underline text-blue-500">{{file.originalName}}</a>
                   
                </div>   
          </td>
      </template>
  <td  colspan="2" class="border border-slate-300 border-solid text-start p-5 bg-gray-100" v-if="info.responses">
         <label for="" class="font-bold">{{info.name}}</label>
 
     <table class="table-fixed w-full">
      <thead>
        
      <th v-for="(answer, answercounter) in info.answerList" :key="answercounter" class="border border-slate-300 border-solid text-start p-5 font-bold">
         {{answer.label}}
      </th>
      </thead>
      <tbody>
         <tr v-for="(response, responsecounter) in info.responses" :key="responsecounter">
           <td v-for="(value, key) in response" :key="key" class="border border-slate-300 border-solid text-start p-5" >
            {{value}}
           </td>
         </tr>

      </tbody>
    
     </table>
  

  </td>
    
  </tr>
</table>


<h1 class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10"  v-if="showRequestItem.extraInfos.length > 0">Extra Information</h1>
<table class="highlight mb-5" id="show extra infos" v-if="showRequestItem.extraInfos.length > 0">

  <tr v-for="(info, infocounter) in showRequestItem.extraInfos" :key="infocounter" ><th  class="border-b text-sm text-center border-b-slate-100 h-14 pr-16"> {{info.name}}</th><td class="border-b text-sm text-center border-b-slate-100 h-14 pr-16"> {{info.input}}</td></tr>
</table>


<h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10"  v-if="showRequestItem.approvals.length != 0">Approvers</h1>
  <table v-if="showRequestItem.approvals.length > 0" class="table-auto">
    <thead >
        <tr >
          
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Approver Name</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Approver Email</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Approver Id</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Approver Designation</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Status</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 ">Comment</th>
              <th class="border text-sm text-center border-slate-300 border-solid  h-14">Relevant Files</th>
        </tr>
        
    </thead>
    <tbody>
        <tr v-for="(approver, counter) in showRequestItem.approvals" :key="counter" >
     
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.name}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.email}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.id}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.designation}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.status}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.comment}}</td>
             <td class="border border-solid border-slate-300">
              <div  v-for="(file, fileCounter) in approver.fileNames" :key="fileCounter" v-if="approver.fileNames && approver.fileNames.length > 0" class="mb-4 text-blue-500 underline" >
                <a v-bind:href="globalUrl + '/uploads/'+file.fileName"  target="_blank" @click.prevent="showFile" class="text-xs">{{file.originalName}}</a> 
               
              </div>
            </td>
        </tr>
    </tbody>
  </table>





  <h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10" v-if="showRequestItem.approvals.length > 0">Signatures</h1>
   <div class="flex flex-row">
       <template v-for="(approver, approverCounter) in showRequestItem.approvals" :key="approverCounter" v-if="showRequestItem.approvals.length > 0 ">
               
               <div  class="mr-3 inline-block justify-center items-center h-auto w-auto p-0 m-0" v-if="approver.status != 'rejected'">
             
                <svg :width="150" :height="120" class="flex flex-col just"  v-if="approver.drawnSignature" alt="no signature">
    <path :d="approver.drawnSignature.path" v-if="approver.drawnSignature.path" stroke="black" fill="transparent" transform="scale(0.4)" />
    
  </svg><div v-else class="auto"><img src="" width="150" height="120" alt="No Signature" class="text-center" srcset=""></div>
                           
                    <figcaption class="flex flex-col justify-center items-center "> {{approver.name}}</figcaption>  
              
               
               
               </div>


               <!-- <figure>
                <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">
                <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
              </figure> -->
            
       
       
           </template>
           
   </div>

   <div v-if="showRequestItem.holdData" class="flex flex-col justify-center items-center mt-20 border border-solid border-black p-4">
      <h1 class="text-rose-500 text-4xl font-bold">This request is on hold</h1>
      <div><label class="mr-2 text-lg underline">Reason:</label><label class="text-lg">{{ showRequestItem.holdData.reason }}</label></div>
  
     <div class="flex flex-row justify-end items-end  w-full"><button @click="resume()" class="bg-blue-500 w-36 p-3   text-white font-bold text-md h-auto rounded-sm ml-2 noprint"> Resume</button></div>
   </div>
<div class="mt-3 flex flex-row items-end justify-end w-full mb-10 h-auto" ref="container">

  <div v-if="containerOpen" @click="openHoldContainer($event)" class=" px-4 bg-gray-300 w-full flex flex-row justify-center items-center   text-white font-bold text-md h-auto py-4 rounded-sm mr-2 mb-10 noprint">
  <label for="" class="text-black">Reason For Holding</label>
  <input type="text" v-model="holdVar" class="w-full text-black p-3"/>
  <button @click="hold()" class="bg-rose-500 w-36   text-white font-bold text-md h-14 rounded-sm ml-2 noprint">Hold</button>
  </div>
<button @click="openHoldContainer($event)" v-if="showRequestItem.approval_status == 'Approved' && !showRequestItem.holdData" class="bg-yellow-500 w-36   text-white font-bold text-md h-14 rounded-sm mr-2 mb-10 noprint">Hold Request</button>
<button @click="this.$router.push('/myRequests')"  class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm  mb-10 noprint" >Return </button>
</div>


<discussions :messages='showRequestItem.messages || []' :showRequestItem="showRequestItem" />

</div>



</template>



<script>
import axios from 'axios';
import discussions from '../../components/discussion.vue'

export default {
     data(){
        return {
    
        holdVar:"",
        containerOpen: false,
        showRequestItem:null,
        requestTypeSelector:"",
        userType:"",
        email:null,
        designation:null,
        files:[],
        requestTypes:[],
    
        }
     },

     components:{discussions},


     created(){
      var vm = this;
      var path = this.$route.path;
      console.log(`This is the path: ${path}`)
      var pathRoot = path.split('/')[1];
      var id = this.$route.params.id;
      console.log(`this is the id that i got ${id}`)
      if(pathRoot == "email"){
         var user = this.authStore.getUser;
         var token = this.authStore.getToken;
         var userString = JSON.stringify(user);
         var data = new FormData();
         data.append('token', token);
         data.append('user', userString);

         axios.post(this.globalUrl + 'getMyRequests', data).then((result)=>{
          vm.mainStore.setRequests(result.data.myRequests);
          var requests = vm.mainStore.getRequests;
          console.log(`these are the requests: ${requests}`)
          vm.showRequestItem = requests.filter((request)=>request._id == id)[0]
          console.log(`this is the show Request Item: ${vm.showRequestItem}`)
         })

      }else{
         
         
         var requests = this.mainStore.getRequests
         this.showRequestItem = requests.filter((request)=>request._id == id)[0]
         
  }
    },


     methods:{
          
   
     
   
        showFile(event){
          
             window.open(event.target.href, '_blank', 'height=600,width=800,resizable=yes,scrollbars=yes');
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


            openHoldContainer(){
                this.containerOpen = true
            },

            hold(){
              this.$toast.info("Holding...")
              var vm = this;
              var data = new FormData();
              var token = this.authStore.getToken;
              var user = this.authStore.getUser;
              data.append("token", token)
              data.append("user", JSON.stringify(user))
              data.append("item", JSON.stringify(this.showRequestItem))
              data.append("reason", vm.holdVar)

              axios.post(vm.globalUrl + "hold", data).then((result)=>{
               
                var requests = vm.mainStore.getRequests;
                console.log('this is the result')
                console.log(result.data)
                vm.showRequestItem = result.data;
                vm.$toast.clear()
                vm.$toast.success("Request Held")
                vm.containerOpen = false
                var mappedRequests = requests.map((request)=>{
                  if(request._id == vm.showRequestItem._id){
                     request = vm.showRequestItem;
                     return request
                  }else{
                    return request
                  }
                })

                vm.mainStore.setRequests(mappedRequests)
              }).catch((error)=>vm.$toast.warning(error))

            },




            resume(){
              this.$toast.info("Resuming...")
              var vm = this;
              var data = new FormData();
              var token = this.authStore.getToken;
              var user = this.authStore.getUser;
              data.append("token", token)
              data.append("item", JSON.stringify(this.showRequestItem))
           

              axios.post(vm.globalUrl + "resume", data).then((result)=>{
               
                var requests = vm.mainStore.getRequests;
                console.log('this is the result')
                console.log(result.data)
                vm.showRequestItem = result.data;
                vm.$toast.clear()
                vm.$toast.success("Request Resumed")
                vm.containerOpen = false
                var mappedRequests = requests.map((request)=>{
                  if(request._id == vm.showRequestItem._id){
                     request = vm.showRequestItem;
                     return request
                  }else{
                    return request
                  }
                })

                vm.mainStore.setRequests(mappedRequests)
              }).catch((error)=>vm.$toast.warning(error))

            }


         
              

                
          
}


     
 

}


</script>