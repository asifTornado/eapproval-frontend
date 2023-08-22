<template>

<div  class="w-full text-sm flex flex-col items-stretch">
<h1 class="text-2xl text-black font-bold text-center my-4 underline">{{showRequestItem.requestType}}</h1>
<table >

<tr ><th  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Request Type</th><td class="border border-solid text-sm text-center border-slate-300">{{showRequestItem.requestType}}</td></tr>
<tr ><th  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Name</th><td class="border border-solid text-sm text-center border-slate-300">{{showRequestItem.name}}</td></tr>
<tr ><th  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Designation</th><td class="border border-solid text-sm text-center border-slate-300">{{showRequestItem.designation}}</td></tr>
<tr ><th  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Department</th><td class="border border-solid text-sm text-center border-slate-300">{{showRequestItem.department}}</td></tr>


</table>



<h1 class="mt-4 text-white font-bold bg-blue-500" v-if="showRequestItem.infos.length > 0">Information</h1>

<table  id="show infos" v-if="showRequestItem.infos.length > 0">

   <tr v-for="(info, infoCounter) in  showRequestItem.infos" :key="infoCounter">
    
  <template v-if="info.dataType != 'list' && info.dataType != 'file'">
    <th  class="border border-solid text-sm text-start border-slate-300 h-14 pr-16 p-5"> {{info.name}}</th><td  class="border border-solid text-sm text-start p-5 border-slate-300 h-14 pr-16">  <input :type="info.dataType" v-model="showRequestItem.infos[infoCounter].input"></td>
  </template>
   <template v-else-if="info.dataType == 'file'">
          <th class="border border-slate-300 border-solid text-start p-5 "> {{info.name}} </th>
          <td class="border border-slate-300 border-solid text-start p-5">
                    <div v-for="(file, inputCounter) in info.input" class="flex flex-row justify-between mb-1 p-1 text-start" :key="inputCounter">
                     <a target="_blank" :href="globalUrl + 'uploads/'+file.fileName">{{file.originalName}}</a>
                    
                </div>   
          </td>
      </template>
  <td v-else-if="info.dataType=='list' && info.responses.length > 0" colspan="2"  class="border border-slate-300 border-solid text-start p-5 bg-gray-100">
    <label class="font-bold" >{{info.name}}</label>
 
     <table class="table-fixed w-full">
      <thead>
      <th v-for="(answer, answerCounter) in info.answerList" :key="answerCounter"  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">
         {{answer.label}}
      </th>
      </thead>
      <tbody>
         <tr v-for="(response, responseCounter) in info.responses" :key="responseCounter" >
           <td v-for="(value, key) in response"  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16" :key="key">
            <input type="text" v-model="showRequestItem.infos[infoCounter].responses[responseCounter][key]">
           </td>
         </tr>

      </tbody>
    
     </table>
  

  </td>
    
  </tr>
</table>



<h1 class="text-2xl text-white bg-blue-500 font-bold mt-5" v-if="showRequestItem.extraInfos.length > 0">Extra Information</h1>
<table  id="show extra infos" v-if="showRequestItem.extraInfos">

  <tr v-for="(extraInfo, extraInfoCounter) in showRequestItem.extraInfos" :key="extraInfoCounter" ><th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16"> {{extraInfo.label}}</th><td class="border-b text-sm text-center border-b-slate-100 h-14 pr-16"><input :type="extraInfo.type" v-model="showRequestItem.extraInfos[extraInfoCounter].input"> </td></tr>
</table>



<h1 class="text-white bg-blue-500 font-bold mt-5" v-if="showRequestItem.approvals.length > 0">Approvals</h1>
  <table v-if="showRequestItem.approvals.length > 0" >
    <thead>
        <tr >
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Name</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Email</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Id</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Designation</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Status</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Comment</th>
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
              <div  v-for="(file, fileCounter) in approver.fileNames" :key="fileCounter" v-if="approver.fileNames && approver.fileNames.length > 0" class="mb-4" >
                <a v-bind:href="globalUrl + '/uploads/'+file.fileName"  target="_blank" @click.prevent="showFile" class="text-xs">{{file.originalName}}</a> 
               
              </div>
            </td>
        </tr>
    </tbody>
  </table>





  
  <h1 class="mt-5 text-white font-bold bg-blue-500" v-if="showRequestItem.approvals.length > 0 ">Signature</h1>
  <div class="flex flex-row">
       <template v-for="(approver, approverCounter) in showRequestItem.approvals" :key="approverCounter" v-if="showRequestItem.approvals.length > 0 ">
               
               <div  class="mr-3 inline-block justify-center items-center h-auto w-auto p-0 m-0" v-if="approver.status != 'rejected'">
             
                <svg :width="150" :height="120" class="flex flex-col just"  >
    <path :d="approver.drawnSignature.path" stroke="black" fill="transparent" transform="scale(0.4)" />
    
  </svg>
                           
                    <figcaption class="flex flex-col justify-center items-center"> {{approver.empName}}</figcaption>  
              
               
               
               </div>


               <!-- <figure>
                <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">
                <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
              </figure> -->
            
       
       
           </template>
           
   </div>
     


  
<div class="mt-10 relative mb-52">

<button @click="makeRequestAgain()"  class="bg-emerald-500 h-14 w-auto px-3 rounded-sm text-white font-bold text-lg absolute left-5 noprint"> Make Request Again </button>
<button @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm ml-96 mb-10 noprint absolute right-5" v-if="this.authStore.getUser.userType == 'Admin'"> Back </button>
<button @click="this.$router.push('/user')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm ml-96 mb-10 noprint absolute right-5" v-if="this.authStore.getUser.userType != 'Admin'"> Back </button>
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
            myRequests:null,
        myFilteredRequests:null,
        showRequestCheck:false,
        showRequestItem:null,
        requestTypeSelector:"",
        userType:"",
     
     
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
      var token = this.authStore.getToken
      var user = this.authStore.getUser
      var data = new FormData();
      for(let x of this.files){
           data.append("file", x)
      }
     
      data.append('user', JSON.stringify(user))
      data.append("item", JSON.stringify(this.showRequestItem));
      data.append("token", token)
      console.log("showRequestItem before being sent")
      console.log(this.showRequestItem)

      axios.post(vm.globalUrl + "makeRequestAgain", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((result)=>{
              console.log(result);
              vm.$router.push('/myRequests')
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



                
     
}


     
 

}



</script>