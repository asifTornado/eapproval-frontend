<template>
<div  class="h-full w-full p-2">
<h1 class="font-bold text-2xl text-center m-4">{{showRequestItem.requestType}}</h1>
<table class="table-fixed w-full" >
 <tr class="border border-slate-300 border-solid bg-blue-500 text-white font-bold"><td colspan="2" >Basic</td> </tr>
 <tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Request Id </th><td class="text-start pl-20" >{{showRequestItem._id}}</td></tr>
<tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Request Time</th><td class="text-start pl-20" >{{showRequestItem.time}}</td></tr>
<tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Request Type</th><td class="text-start pl-20" >{{showRequestItem.requestType}}</td></tr>
<tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Requester's Name</th><td class="text-start pl-20" >{{showRequestItem.name}}</td></tr>
<tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Requester's Designation</th><td class="text-start pl-20" >{{showRequestItem.designation}}</td></tr>
<tr class="border border-slate-300 border-solid"><th class="border border-slate-300 border-solid text-start pl-20">Requester's Department</th><td class="text-start pl-20" >{{showRequestItem.department}}</td></tr>



</table>


<table class="table-fixed w-full mt-10" id="show infos" v-if="showRequestItem.infos">
    <tr><td colspan="2" class="border border-slate-300 border-solid bg-blue-500 text-white font-bold">Information </td> </tr>
  <tr v-for="(info, infocounter) in showRequestItem.infos" :key="infocounter" v-if="showRequestItem.infos.length > 0"  >
    
  <template v-if="info.dataType != 'list' && info.dataType != 'file'">
    <th class="border border-slate-300 border-solid text-start p-5"> {{info.name}}</th><td class="border border-slate-300 border-solid text-start pl-20"> {{info.input}}</td>
  </template>
      <template v-else-if="info.dataType == 'file'">
          <th class="border border-slate-300 border-solid text-start p-5"> {{info.name}} </th>
          <td class="border border-slate-300 border-solid text-start ">


                <div v-for="(file, inputCounter) in info.input" :key="inputCounter" class="mb-1 p-1">
                     <a target="_blank" :href="globalUrl + 'uploads/'+file.fileName" class="text-xs text-blue-500 underline">{{file.originalName}}</a>
                     <a target="_blank" :href="globalUrl + 'pdf/'+file.fileName + '/' + this.authStore.getToken + '/' + this.authStore.getUser._id" v-if="getFileType(file.fileName) == 'pdf'" class="p-1 ml-5 h-3 w-auto text-xs bg-green-500 text-white border border-black border-solid noprint">Edit PDF </a>
                   
                </div>    
          </td>
      </template>
  <td v-else-if="info.dataType == 'list' && info.responses" colspan="2" class="border border-slate-300 bg-gray-50 border-solid text-start p-5" >
    <label for="" class="lead font-bold text-xl m-2 pb-2">{{info.name}}</label>
 
     <table class="table-fixed w-full">
      <thead>
      <th v-for="(answer, answercounter) in info.answerList" :key="answercounter" class="border border-slate-300 border-solid text-start p-5">
         {{answer.label}}
      </th>
      </thead>
      <tbody>
         <tr v-for="(response, responsecounter) in info.responses" :key="responsecounter">
           <td v-for="(value, key) in response" :key="key" class="border border-slate-300 border-solid text-start p-5">
            {{value}}
           </td>
         </tr>

      </tbody>
    
     </table>
  

  </td>
    
  </tr>
</table>



  <div  v-for="(info, infocounter) in showRequestItem.infos" :key="infocounter" class="m-5">
    <div class="col-md-12 font-weight-bold lead">
     {{info.label}}
    </div>
    <div class="col-md-12 ">
       
    </div>
  </div> 

<table class="table-fixed w-full mt-10" id="show extra infos" v-if="showRequestItem.extraInfos.length > 0">
    <tr><td colspan="2"  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold">Extra Information</td> </tr>
  <tr v-for="(info, infocounter) in showRequestItem.extraInfos" :key="infocounter"><th  class="border border-slate-300 border-solid text-start p-5"> {{info.name}}</th><td  class="border border-slate-300 border-solid text-start p-5"> {{info.input}}</td></tr>
</table>




  <div class="flex flex-row noprint w-full mt-10">
    <div class=" font-weight-bold h-20 border border-slate-300 border-solid bg-blue-500 text-white font-bold w-1/6 flex flex-col justify-center items-center">
     Comment
    </div>
    <div class="w-5/6 ">
     <textarea  v-model="showRequestItem.comment" class="w-full h-20 border-2 border-solid border-slate-300" rows="3" maxlength="500" >
    </textarea>
    </div>
  </div>


   <div class="row noprint flex flex-row mt-10">
    <div class="font-weight-bold border border-slate-300 border-solid bg-blue-500 text-white font-bold w-1/6 flex flex-col justify-center items-center">
     Upload Relevant Files
    </div>
    <div class="col-md-10 ">
    <input type="file" class="form-control mb-2" placeholder="Upload Relevant File" ref="file" @change="uploadFile($event)" name="file"  id="file" multiple   />

    <div v-for="(file, fileCounter) in files" :key="fileCounter" class="flex flex-row justify-between items-center">
            <label for="" class="ml-3">{{file.name}}</label>
            <label  @click="removeFile(fileCounter)" class="hover:cursor-pointer"><font-awesome-icon icon="fa-solid fa-circle-minus" size="2x"></font-awesome-icon></label>
    </div>
    </div>
  </div>



  <table v-if="showRequestItem.deferrals" class="table-fixed w-full mt-10">
    <thead>
        <tr class="border border-slate-300 border-solid bg-blue-500 text-white">
            <th class="border border-slate-300 border-solid text-start p-5">Deferred By</th>
            <th class="border border-slate-300 border-solid text-start p-5">Deferred To</th>
            <th class="border border-slate-300 border-solid text-start p-5">Comment</th>
         
        </tr>
        
    </thead>
    <tbody>
        <tr v-for="(deferrer, counter) in showRequestItem.deferrals" :key="counter" class="border border-slate-300 border-solid">
            <td class="border border-slate-300 border-solid text-start p-5">{{deferrer.deferredByEmail}}</td>
            <td class="border border-slate-300 border-solid text-start p-5">{{deferrer.deferredTo}}</td>
             <td class="border border-slate-300 border-solid text-start p-5">{{deferrer.deferrerComment}}</td>
        </tr>
    </tbody>
  </table>

  <table v-if="showRequestItem.approvals.length != 0" class="table w-full mt-10">
    <thead>
        <tr class="bg-blue-500 text-white font-bold">
            
            <th class="border border-slate-400 border-solid">Approver Name</th>
            <th class="border border-slate-400 border-solid">Approver Email</th>
            <th class="border border-slate-400 border-solid">Approver Id</th>
            <th class="border border-slate-400 border-solid">Approver Designation</th>
            <th class="border border-slate-400 border-solid">Status</th>
            <th class="border border-slate-400 border-solid">Comment</th>
            <th class="border border-slate-400 border-solid">Relevant Files</th>

        </tr>
        
    </thead>
    <tbody>
        <tr v-for="(approver, counter) in showRequestItem.approvals" :key="counter">
      
            <td class="border border-solid border-slate-400">{{approver.name}}</td>
            <td class="border border-solid border-slate-400">{{approver.email}}</td>
            <td class="border border-solid border-slate-400">{{approver.id}}</td>
            <td class="border border-solid border-slate-400">{{approver.designation}}</td>
            <td class="border border-solid border-slate-400">{{approver.status}}</td>
            <td class="border border-solid border-slate-400">{{approver.comment}}</td>
            <td class="border border-solid border-slate-400">
              <div class="inline-block" v-for="(file, fileCounter) in approver.fileNames" v-if="approver.fileNames && approver.fileNames.length > 0" :key="fileCounter">
                <a v-bind:href="globalUrl + 'uploads/'+file.fileName"  target="_blank" @click.prevent="showFile" class="underline text-blue-500">{{file.originalName}}</a> 
                <a :href="globalUrl + 'pdf/'+file.fileName + '/' + this.authStore.getToken + '/' + this.authStore.getUser._id" class="h-auto px-2 bg-green-400  border border-black border-solid mr-3 text-xs text-white noprint" v-if="getFileType(file.fileName) == 'pdf'"  target="_blank" rel="noopener noreferrer">Edit Pdf</a> 
              </div>
            </td>
        </tr>
    </tbody>
  </table>




  <h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10" v-if="showRequestItem.approvals.length && showRequestItem.approvals.length > 0  " >Signatures</h1>

  <template v-for="(approver, approverCounter) in showRequestItem.approvals" :key="approverCounter" v-if="showRequestItem.approvals.length > 0 ">
               
               <div  class="mr-3 inline-block justify-center items-center h-auto w-auto p-0 m-0" v-if="approver.status != 'rejected'">
             
                <svg :width="150" :height="120" class="flex flex-col just"  v-if="approver.drawnSignature">
    <path :d="approver.drawnSignature.path" v-if="approver.drawnSignature.path" stroke="black" fill="transparent" transform="scale(0.4)" />
    
  </svg>
                           
                    <figcaption class="flex flex-col justify-center items-center"> {{approver.name}}</figcaption>  
              
               
               
               </div>


               <!-- <figure>
                <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">
                <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
              </figure> -->
            
       
       
           </template>





    <div class="flex flex-row" v-if="deferralsCheck == true">
      <div class="bg-blue-500 text-white font-bold w-1/6 flex flex-col justify-center items-center">
       Defer To
      </div>
      <div class="border border-black border-solid w-5/6">
         <input type="text"  class="w-full" list="deferrers" v-model="deferredTo">
          <datalist name="dataType"  required id="deferrers" >
              
              <option  v-for="(deferrer, defferercounter) in deferrals" :key="defferercounter"> {{deferrer.mailAddress}} </option>
              
                       
          </datalist>
      </div>
    </div>
 


<div v-if="userType == 'leader' || userType == 'Admin' || userType == 'support' " class="mb-3 mt-3 noprint">
<button @click="approve(showRequestItem)" class="mr-1 bg-emerald-500 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg" v-if="deferralsCheck==false">Approve</button>
<button @click="reject(showRequestItem)" v-if="deferralsCheck==false" class="mr-1 bg-rose-500 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg">Reject</button>
<button @click="addDeferral()" v-if="deferralsCheck==false" class="mr-1 bg-yellow-500 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg">Add Deferral</button>
<button @click="defer(showRequestItem)" v-if="deferralsCheck==true" class="mr-1 bg-red-500 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg">Deferr</button>
<button @click="dBack()" v-if="deferralsCheck==true" class="mr-1 bg-slate-400 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg">Back</button>
<button @click="this.$router.push('/currentRequests')"  class="mr-1 bg-slate-400 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg noprint absolute right-20">Return </button>
</div>
<div v-else-if="userType == 'power'" class="mb-3 mt-3 noprint">
<button @click="dBack()" v-if="deferralsCheck==true" class="bg-slate-400 h-9 w-auto px-3 rounded-sm text-white font-bold text-lg">Back</button>
</div>




<discussions :messages='showRequestItem.messages || []' :showRequestItem="showRequestItem" />





</div>    




</template>



<script>
import axios from 'axios';
import discussions from '../../components/discussion.vue'


export default{
    data(){
        return{
     
    
            showRequestItem:null,
            userType:null,
            deferrals:null,
            deferredTo:"",
            deferralsCheck:false,
            files:[],
       

          
     
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

         axios.post(this.globalUrl + 'getCurrentRequests', data).then((result)=>{
          vm.mainStore.setRequests(result.data.requests);
          var requests = vm.mainStore.getRequests;
          console.log(`these are the requests: ${requests}`)
          vm.showRequestItem = requests.filter((request)=>request._id == id)[0]
          console.log(`this is the show Request Item: ${vm.showRequestItem}`)
         })

      }else{
        
       var id = this.$route.params.id;
       var requests = this.mainStore.getRequests;
       this.showRequestItem = requests.filter((request)=>request._id == id)[0]
       this.userType = this.authStore.getUser.userType;

        
      }
              
    },

 



    methods:{
            
         
            approve(item){
                var vm = this;
                item.deferrals = null;
                var data = new FormData();
                var token = this.authStore.getToken;

                for(let x = 0; x < this.files.length; x++){
                     data.append("file", this.files[x])
                }

                data.append('token', token)
                data.append('user', JSON.stringify(this.authStore.getUser))
                
                var itemString = JSON.stringify(item);
                data.append("item", itemString)
                console.log(item.deferrals)
                console.log(data)
                axios.post(vm.globalUrl + "approve", data, { headers: {
                "Content-Type": "multipart/form-data",
              },}).then(async (result)=>{console.log(result); 
                vm.getNotifications();
                vm.$router.push('/currentRequests'); }, (error)=>{console.log(error)});
              
                this.showRequestCheck = false;

            },
            reject(item){
                var vm = this;
                var token = this.authStore.getToken;
                console.log("reject function activated");
                item.deferrals = null;
                var data = new FormData();
                data.append('token', token);
                data.append('item', JSON.stringify(item));
                data.append('user', JSON.stringify(this.authStore.getUser))
                
                axios.post(vm.globalUrl + "reject", data).then((result)=>{
                  console.log(result.data);
                  vm.getNotifications(); 
                  vm.$router.push('/currentRequests'); this.showRequestCheck = false;}, (error)=>{console.log(error)});

            },
            addDeferral(){
                var vm = this;
                var token = this.authStore.getToken;
                this.deferralsCheck = true;
                var data = new FormData();
                data.append('token', token);
                data.append('user', JSON.stringify(this.authStore.getUser))
                console.log("from deferral");
                axios.post(vm.globalUrl + "getDeferredToUsers", data).then((result)=>{console.log(result.data); vm.deferrals = result.data;   vm.getNotifications();}).catch((error)=>{console.log(error)})

            },
            dBack(){
                this.deferralsCheck = false;
            },
            defer(requestItem){
                var vm = this;
                var user = this.authStore.getUser;
                var item = {item:requestItem, deferredEmail:this.deferredTo};
                var token = this.authStore.getToken;
                var data = {token, item, user}
                axios.post(vm.globalUrl + "defer", data).then((result)=>{
                  console.log(result); 
                  vm.getNotifications();
                  vm.$router.push('/currentRequests')
                }).catch((error)=>{console.log(error)});
      
            },
            showFile(event){
              window.open(event.target.href, '_blank', 'height=600,width=800,resizable=yes,scrollbars=yes');
            },
            uploadFile(){
              for(let x = 0; x < this.$refs.file.files.length; x++){
                this.files.push(this.$refs.file.files[x])
              }
            
            },
            getFileType(fileName){
              if(fileName){
              var lastThree = fileName.slice(-3);
              var lastFour = fileName.slice(-4);
                   if(lastThree == "pdf"){
                    return "pdf"
                   }

              }else{
                return false
              }
              
             
            },

            removeFile(fileCounter){
              this.files.splice(fileCounter, 1);
              var fileElem = document.getElementById('file');
              fileElem.value = this.files.length + " from aasdfa asdffiles"
              },

                  
        


           
         
        }

    
}





</script>