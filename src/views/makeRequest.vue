<template>

    <div id="app" class="w-full h-full  p-5">

 
<h1 class="font-weight-bold text-2xl">Please Make A Request</h1>

<div class="flex flex-row w-full justify-center items-center mb-2">
  
  <label class="text-lg font-bold text-black mr-5" >Request Type</label>
  <select name="requestType" v-model="requestType" required  @change="onChange($event)" id="requestType" class="w-1/3 h-9 text-lg font-bold text-black border border-solid border-black">
              
              <option v-for="(workflow, workflowcounter) in workflows" :key="workflowcounter"  > {{workflow.name}} </option>
              <option>custom</option>
                       <label for="requestType">Request Type</label>
  </select>
</div>







<div class="border p-3 w-full mb-4 " v-if="infos.length > 0">
<h1 class="mb-3 text-xl">Information</h1>
  <div v-for="(info, counter) in infos" :key="counter" class="border p-3">


  <div class="w-full h-auto bg-gray-100 pb-6 flex-col flex items-start justify-center pt-6 px-3" v-if="info.dataType != 'header 1' && info.dataType != 'header 2'">
    <label v-bind:for="counter + 1" class="mb-6">{{infos[counter].name}}</label>
  <input v-if="infos[counter].dataType != 'selection' && infos[counter].dataType != 'list' && infos[counter].dataType != 'file' && infos[counter].dataType != 'textArea' && infos[counter].dataType != 'approver'" v-bind:id="counter + 1" v-model="infos[counter].input" v-bind:type="infos[counter].dataType" class="appearance-none hover:outline-none w-full h-10 bg-transparent border-b-solid border-b-black border-b" required>
  <select v-else-if="infos[counter].dataType == 'selection'" v-model="infos[counter].input" class="w-full h-10" style="font-size:15px;" required>
    <option v-for="(option, optionCounter) in infos[counter].options" :key="optionCounter">{{option}}</option>
  </select>
  <div v-else-if="infos[counter].dataType == 'file'" class="flex flex-col justify-center items-center h-full w-full">

  <input type="file" @change="setFile($event, counter)" multiple>
   <div v-for="(file, fileCounter) in infos[counter].input" :key="fileCounter" class="flex flex-row justify-between h-full w-full mt-4 border border-solid border-black p-2"><label class="  text-sm">{{file}}</label> <font-awesome-icon icon="fa-solid fa-circle-minus" size="2x" class="hover:cursor-pointer" @click="removeFile(infos, counter, fileCounter)"/></div>
  </div>
  
  
  
  
  
  <div v-else-if="infos[counter].dataType == 'list'" class="px-5  w-full flex flex-col" >
              
  
  
  
 <div class="px-5 overflow-x-scroll w-full ">
      <table class=" w-full ">
           <thead>
             
         <th v-for="(answer, answerCounter) in infos[counter].answerList" :key="answerCounter" class="border border-solid border-black w-11 ">
         
         
         <label for="" >{{answer.label}}</label>
         
         
         
         
         
         </th>
     
        
         
         </thead>
         <tbody>
         
         <tr v-for="(response, responseCounter) in infos[counter].responses" :key="responseCounter" class="p-3 border">
         
         <td v-for="(value, key) in response" :key="key" class="border border-solid border-black w-11"  >
         <input type="text" v-model="infos[counter].responses[responseCounter][key]" required class=" hover:outline-none bg-transparent w-full text-center ">
         
         </td>
     
       
               
       
        
         </tr>
         </tbody> 
         </table>
 </div>


<div class="flex flex-row items-end justify-end mt-10 mb-5">
  
    <button @click="addResponses(counter)" class=" btn btn-sm  mr-2"><font-awesome-icon icon="fa-solid fa-circle-plus"/></button>
   <button @click="removeResponses(counter)" class=" btn btn-sm  "><font-awesome-icon icon="fa-solid fa-circle-minus"/> </button>
</div>


  </div>

  <div v-else-if="infos[counter].dataType == 'textArea'">
     <textarea cols="150" class="p-2"  v-model="infos[counter].input" required>


     </textarea>
  </div>

  <div v-else-if="infos[counter].dataType == 'approver'" class="w-full">
   <!-- <select  v-model="infos[counter].input"  class="appearance-none hover:outline-none w-full bg-transparent border-b-solid border-b-black border-b">
     <option value="Not Required" v-if="infos[counter].optional && infos[counter].optional == true">Not Required</option>
     <option :value="email" v-for="(email, emailCounter) in userEmails" :key="emailCounter">{{email}}</option>
   </select> -->


   
 <div class="w-5/6  py-4 mb-2  inline-block ">
     <multiselect  :options="computedUserEmails1" v-if="infos[counter].optional && infos[counter].optional == true"   placeholder="Select Approver"  v-model="infos[counter].input" class="border border-solid border-black" ></multiselect>
     <multiselect v-else  :options="computedUserEmails2"    placeholder="Select Approver"  v-model="infos[counter].input" class="border border-solid border-black" ></multiselect>
 </div>

  </div>




  </div>

  <div v-else-if="info.dataType == 'header 1'">
    <label class="text-xl underline font-bold w-full">{{ info.name }}:</label>
  </div>

  <div v-else-if="info.dataType == 'header 2'">
    <label class="text-lg underline font-bold w-full">{{ info.name }}:</label>
  </div>


  <div v-else-if="info.dataType == 'header 3'">
    <label class="text-md underline font-bold w-full">{{ info.name }}:</label>
  </div>
  
  
 
  
  
  </div>
</div>








<div class="border p-3 w-full">
    <h1 class="mb-3 text-xl">Extra Information</h1>
  <div v-for="(info, counter) in extraInfos" :key="counter" class="mb-5 border border-black">

 <div class="w-full h-20 bg-gray-100 pb-6 flex items-center justify-center pt-6 px-3 "> 
  <label v-bind:for="counter + 1" class="mr-3">EI {{counter + 1}}</label>

  <input v-bind:id="counter + 1" v-model="extraInfos[counter].name" class="text-center w-1/4 h-10 border-solid border-black border rounded-sm" placeholder="Information Title" >


     <select name="dataType" v-model="extraInfos[counter].dataType" id="dataType"  class="text-center h-10 w-1/4 border-solid border-black border">
              <option value="" selected disabled>Data Type</option>
              <option value="text">   text   </option>
              <option value="number"> number </option>
              <option value="date">   date   </option>
              <option value="time">   time   </option>
             
                       
  </select>

  <input v-bind:id="counter + 1" v-model="extraInfos[counter].input" v-bind:type="extraInfos[counter].dataType" class="text-center w-1/4 h-10 border-solid border-black border rounded-sm" placeholder="Value">


  <button @click="removeExtraInformation(counter)" class="ml-4"><font-awesome-icon icon="fa-solid fa-circle-minus"/> </button>
  </div>
  
  

  


  
  
  

  
  
  
  
  </div>
   <div class="flex flex-row justify-center items-center h-36 mt-10 bg-gray-100 border">
    <button @click="addInfo()" class="bg-green-500 w-52 h-16 text-white font-extrabold">Add Information</button>
  </div>
  
</div>


<div class="border p-3 w-full mt-3 bg-amber-200" v-if="instructions && instructions.length > 0">
    <h1 class="mb-3 text-xl">  <u>Instructions</u></h1>
<div class="bg-amber-200 px-10">
   <ol class="list-disc">
    <li v-for="(instruction, instructionCounter) in instructions" :key="instructionCounter" class="text-lg">{{instruction}}</li>
    
  </ol> 
</div>
  
</div>

<div v-if="requestType === 'custom'" class="mb-3 w-full p-3 border ">

<h1>Approvers</h1>


<div v-for="(approver, approverCounter) in approvers" :key="approverCounter" class="  mb-5 w-full flex flex-row">




  <div  v-bind:id="'approvers' + approverCounter " class="w-full bg-gray-200 pt-4 border border-solid border-black"> 

<label for="" class="mr-5 ml-5">A{{approverCounter + 1}} </label>
<select name="" id="" v-model="approvers[approverCounter].name" class=" mb-2 h-10 w-5/6  border-solid border-black border">
<option value="Requester's Own Department" disabled selected hidden>Approver</option>
<option v-for="(department, departmentCounter) in departments" :key="departmentCounter" :value="getNameOrEmail(department)" >
{{getNameOrEmail(department)}}
</option>



</select>

<button @click="removeApprover(approverCounter)" class="ml-5"><font-awesome-icon icon=" fa-solid fa-circle-minus"/></button>
</div>

</div>















<div class="flex flex-row justify-center items-center h-36 mt-10 bg-gray-100"><button @click="addApprover()" class="bg-blue-500 w-52 h-16 text-white font-extrabold">Add Approver</button></div>

</div>
 
<div class="flex flex-row justify-end items-end w-full mr-5 mt-10">
      
  <button @click="makeRequest()" class="bg-blue-500 w-36   text-white font-bold text-md h-14 mr-3 rounded-sm" v-if="requestType != 'custom'">Make Request</button>
  <button @click="makeCustomRequest()" class="bg-blue-500 w-36   text-white font-bold text-md h-14 mr-3 rounded-sm" v-else>Make Custom Request</button>
  
  
  <button v-if="userType != 'admin'" @click="this.$router.push('/user')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm "> Home</button>
  <button v-else @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm "> Home</button>
  
  
</div>

</div>















</template>





<script>
import axios from 'axios'


export default {
    data(){
        return {
            requestType:null,
      extraInfos:[],   
      workflows:null,
      userType:"",
      infos:[],
      approvers:[],
      departments:null,
      dataType:null,
      dataTypeExtra:null,
      files:[],
      message:"",
      fileNames:[],
      instructions:[],
      userEmails:null
        }
    },


    created(){
        this.loadWorkFlows();
        this.userType = this.authStore.getUser.userType;
        this.getUserEmails()
    },

    computed:{
      computedUserEmails1(){
        var result = this.userEmails.slice();
        result.push("Not Required")
        return result
      },

      computedUserEmails2(){
        var result = this.userEmails;
        return result
      }


    },


 
    

    methods:{
        loadWorkFlows(){
			
			var vm = this;
      var token = this.authStore.getToken;
      var data = {
        token
      }
			axios.post(vm.globalUrl + "getWorkFlows", data).then(function(response){
			    vm.workflows = response.data;
       
          vm.mainStore.setWorkflows(vm.workflows)
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});



         axios.post(vm.globalUrl + "getDepartmentsAndApprovers", data).then(function(response){
			    var departments = response.data;
          vm.departments = departments;
          vm.mainStore.setDepartments(departments)
          
				console.log(response.data)}
				
			).catch(function(error){
			   console.log(error);
			});
    },
    addInfo(){
        var newInfo = {input:"", dataType:"text", name:""}
        this.extraInfos.push(newInfo);
        console.log(newInfo);
    },

    makeRequest(){
      var vm = this;
      var token = this.authStore.getToken;
      var data = new FormData();
      var infosString = JSON.stringify(this.infos);
      var extraInfosString = JSON.stringify(this.extraInfos);

      data.append("infos", infosString);
      data.append("extraInfos", extraInfosString);
      data.append("requestType", this.requestType);
      data.append('token', token)
      data.append('user', JSON.stringify(this.authStore.getUser))
      for(let x = 0; x < this.files.length; x++){
           
                data.append("file", this.files[x]);

      }
   




        
      axios.post(vm.globalUrl + "makeRequest", data,  {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((result)=>{
        console.log(result)
        vm.infos = [];
        vm.requestType = " ";
        vm.extraInfos = [];
        vm.files = [];
        vm.getNotifications();
      //   vm.$toast.success("Request Made", {
      //     duration:600,
      //     position:'bottom-left',
      //     queue:true
      // })

      }, (error)=>{
        console.log(error)
      })
    },
    onChange(event){
     var vm = this;


     if(event.target.value != "custom"){
      function getIndexFromWorkFlows(workflow){
        return workflow.name == vm.requestType;
      }
      console.log(event.target.value);
      var workflows = this.workflows;
      console.log(workflows);
      var result = workflows.findIndex(getIndexFromWorkFlows);
      console.log("from on change function" + result);
      this.infos = workflows[result].infos;
      this.instructions = workflows[result].instructions;
     }else{
      console.log("custom");
      this.infos = [];
      this.instructions = [];
      
     }
      

    },
    addApprover(){
      this.approvers.push({conditions:[{ info: "",
          logic: "",
          link: "",
          compareValue: "",
          dataType: ""}], name:"Requester's Own Department"})
    },
    onChangeApprover(event){
      
      console.log("from on change " + event.target.value);
      function findIndexType(info){
        return info.label == event.target.value;
       }
       var infos = this.extraInfos;
       var result = infos.findIndex(findIndexType);
       console.log("this is the result" + result);
       this.dataTypeExtra =  infos[result].dataType;
       this.infoCounter = result;
      
    },
  
    makeCustomRequest(){
      var vm = this;
      var token = this.authStore.getToken;
      var requestItem = {requestType:this.requestType, infos:this.infos, extraInfos:this.extraInfos, approvers:this.approvers}
      var requestItemString = JSON.stringify(requestItem);
      var data = new FormData();
      data.append("item", requestItemString);
      data.append('token', token)
      data.append('user', JSON.stringify(this.authStore.getUser))


      this.populateFiles(data, this.files);
      console.log("this is the request item")
      console.log(requestItem);
      axios.post(vm.globalUrl + "makeCustomRequest", data, {
        headers:{
           "Content-Type": "multipart/form-data",
        }
      }).then((result)=>{
        console.log(result);
        vm.extraInfos = [];
        vm.approvers = [];
        vm.infos = [];
        vm.requestType = null;
        vm.getNotifications();
        vm.$toast.success("Request Made", {
          duration:600,
          position:'bottom-left',
          queue:true
      })
      }).catch((error)=>{
        console.log(error)
      })
    },
     wDelete(counter){
         this.approvers.splice(counter, 1);
    },
    uploadFile(event){
      for(let x=0; x < event.target.files.length; x++){
        this.files.push(event.target.files[x])
      }
    },
    bindResponse(event, label, counter){
      console.log("from bind response")
      var response = {}
      for(var x=0; x < this.infos[counter].answerList; x++){
        response[this.infos[counter].answerList[x].label] = ""
      }
      response[label] = event.target.value;
      this.infos[counter].responses.push(response);
      console.log("final response values");
      console.log(this.infos[counter].responses)

    },
    setResponses(counter){
       var response = {};
      for(var x=0; x < this.infos[counter].answerList; x++){
            response[this.infos[counter].answerList[x].label] = ""
      }
               this.infos[counter].responses.push(response);
      },
      addResponses(counter){
        console.log("from add response")
          var response = {};
      for(var x=0; x < this.infos[counter].answerList.length; x++){
            response[this.infos[counter].answerList[x].label] = ""
      }
            if(this.infos[counter].responses){
               this.infos[counter].responses.push(response)
               console.log("Final json");
               console.log(response)
            }else{
                this.infos[counter].responses = []
                this.infos[counter].responses.push(response)
            }
      },
      removeResponses(counter){
        console.log("from remove responses")
     
               this.infos[counter].responses.splice(-1, 1)
               

      },

      removeExtraInformation(counter){
        this.extraInfos.splice(counter, 1)
      },

      removeApprover(approverCounter){
        this.approvers.splice(approverCounter, 1)
      },

      removeFile(info, counter, fileCounter){
        this.infos[counter].input.splice(fileCounter, 1)
      },
      populateFiles(data, filesList){
        for(let x=0; x < filesList.length; x++){
          data.append("file", filesList[x])
        }

      },

      setFile(event, counter){
   
       
        this.infos[counter].input = [];
        
        for(let x of event.target.files){
          this.files.push(x);
          this.infos[counter].input.push(x.name)
        }


      },
       getNameOrEmail(department){
               if(!department.mailAddress){
                return department.name
               }else{
                return department.mailAddress
               }
      },


      
      getUserEmails(){
        console.log('inside computed function')
        var token = this.authStore.getToken;
        var data = {token}
        var vm = this;
        var mailList = []
        axios.post(vm.globalUrl + 'getUsers', data).then((result)=>{
          console.log(result)
          var newMailList = result.data.map((item)=>item.mailAddress)
          vm.$toast.info(newMailList)
           vm.userEmails = newMailList
          
        }).catch((error)=>vm.$toast.warning(error))
     
      
      },


   

      

      

    }
}





</script>