<template>
    
<div  class="w-full h-screen flex flex-col justify-start items-stretch">
<h1 class="text-2xl text-black font-semibold text-center my-5 underline">{{showRequestItem.requestType}}</h1>
<table class="mb-5">
 <tr class="border border-solid border-slate-300  bg-blue-500 text-white font-bold"><td colspan="2" class="text-center">Basic</td> </tr>
<tr><th  class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Request Type</th><td class="border text-sm text-center border-slate-300 border-solid h-14 pr-16">{{showRequestItem.requestType}}</td></tr>
<tr><th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Name</th><td class="border text-sm text-center border-slate-300 border-solid h-14 pr-16">{{showRequestItem.name}}</td></tr>
<tr><th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Designation</th><td class="border text-sm text-center border-slate-300 border-solid h-14 pr-16">{{showRequestItem.designation}}</td></tr>
<tr><th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Requester's Department</th><td class="border text-sm text-center border-slate-300 border-solid h-14 pr-16">{{showRequestItem.department}}</td></tr>


</table>


<h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10 w-full text-center" v-if="showRequestItem.infos && showRequestItem.infos.length > 0">Information</h1>
<table class="highlight mb-5 " id="show infos" v-if="showRequestItem.infos.length > 0 ">
 
   <tr v-for="(info, infocounter) in showRequestItem.infos" :key="infocounter"  >
    
  <template v-if="info.dataType != 'list' && info.dataType != 'file'">
    <th  class="border border-slate-300 border-solid text-start p-5"> {{info.name}}</th><td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16"> {{info.input}}</td>
  </template>
    <template v-else-if="info.dataType == 'file'">
          <th class="border border-slate-300 border-solid text-start p-5"> {{info.name}} </th>
          <td class="border border-slate-300 border-solid text-start pl-20">
                  <div v-for="(file, inputCounter) in info.input" :key="inputCounter" class="flex flex-row justify-between mb-1 p-1">
                     <a target="_blank" :href="globalUrl+'/uploads/'+file.fileName" class="text-blue-500 underline">{{file.originalName}}</a>
                   
                </div>  
          </td>
      </template>
  <td v-else colspan="2" class="border border-slate-300 border-solid text-start p-5">
        <label for="" class="lead font-weight-bold underline font-bold ">{{info.name}}</label>
 
     <table class="table-fixed w-full">
      <thead>
        
      <th v-for="(answer, answerCounter) in info.answerList" :key="answerCounter" class="border border-slate-300 border-solid text-start p-5">
         {{answer.label}}
      </th>
      </thead>
      <tbody>
         <tr v-for="(response, responsecounter) in info.responses" :key="responsecounter" >
           <td v-for="(value, key) in response" :key="key" class="border border-slate-300 border-solid text-start p-5">
            {{value}}
           </td>
         </tr>

      </tbody>
    
     </table>
  

  </td>
    
  </tr>
</table>


<h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10"  v-if="showRequestItem.extraInfos.length && showRequestItem.extraInfos.length > 0">Extra Information</h1>
<table class="highlight mb-5" id="show extra infos" v-if="showRequestItem.extraInfos.length > 0">
   
  <tr v-for="(info, infocounter) in showRequestItem.extraInfos" :key="infocounter" ><th  class="border-b text-sm text-center border-b-slate-100 h-14 pr-16"> {{info.name}}</th><td class="border-b text-sm text-center border-b-slate-100 h-14 pr-16"> {{info.input}}</td></tr>
</table>


<h1  class="border border-slate-300 border-solid bg-blue-500 text-white font-bold mt-10 w-full text-center"  v-if="showRequestItem.approvals.length != 0">Approvers</h1>
  <table v-if="showRequestItem.approvals.length != 0" class=" mb-4 text-xs table-fixed w-full mt-10">
    <thead>
        <tr>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Name</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Email</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Id</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Approver Designation</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Status</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Comment</th>
            <th class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">Relevant Files</th>
        </tr>
        
    </thead>
    <tbody>
        <tr v-for="(approver, counter) in showRequestItem.approvals" :key="counter">
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.name}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.name}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.email}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.id}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.designation}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.status}}</td>
            <td class="border border-solid text-sm text-center border-slate-300 h-14 pr-16">{{approver.comment}}</td>
            <td class="border border-solid border-slate-400">
              <div class="inline-block mb-3 text-xs" v-for="(file, fileCounter) in approver.fileNames" :key="fileCounter" v-if="approver.fileNames && approver.fileNames.length > 0">
                <a v-bind:href="globalUrl+'/uploads/'+file.fileName"  target="_blank" @click.prevent="showFile" class="text-blue-400 underline">{{file.originalName}}</a>
                  
                </div>
              </td>
        </tr>
    </tbody>
  </table>





  <h1 v-if="showRequestItem.approvals.length > 0" class="bg-blue-500 text-white text-center mb-2">Signatures</h1>
   <div class="flex flex-row">
  
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

           
   </div>
<div class="mt-3 flex flex-row items-end justify-end w-ful mb-10">
<button @click="this.$router.push('/admin/allRequests')" class="bg-gray-300 w-36 noprint  text-gray-500 font-bold text-md h-14  rounded-sm ml-96 mb-10"  > Back </button>

</div>


<discussions :messages='showRequestItem.messages || []' :showRequestItem="showRequestItem" />
</div>





</template>


<script>
import axios from 'axios';
import discussions from '../../../components/discussion.vue'


export default{
    data(){
        return {
       
        showRequestItem:null,
 
        }
    },


    components:{discussions},

    created(){
         var id = this.$route.params.id;
         var items = this.mainStore.getRequests;
         this.showRequestItem = items.filter((item)=> item._id == id)[0]

    },

    methods:{

         
    
          showFile(event){
              window.open(event.target.href, '_blank', 'height=600,width=800,resizable=yes,scrollbars=yes');
            },

            getFileType(fileName){
              if(fileName){
              var lastThree = fileName.slice(-3);
              var lastFour =  fileName.slice(-4);
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