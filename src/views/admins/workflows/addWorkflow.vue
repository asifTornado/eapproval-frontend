<template>
  <div class="w-full h-full p-5">


<input v-model="addWorkFlowItem.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" placeholder="Name Of The Request"/>



<div class="information border p-3 ">

  <h4>Informations</h4>

<div v-for="(info, infoCounter) in infos" :key="infoCounter" class="mb-5 border border-black " >

<div class="w-full h-20 bg-gray-100 pb-6 flex items-center justify-center pt-6 ">
  <label for="" class="mr-10 ml-3"> Q {{infoCounter + 1}}</label>
<input type="text" class="w-1/2 h-10 border-solid border-black border rounded-sm px-2"  v-model="infos[infoCounter].name" v-bind:placeholder="'Label ' +  (infoCounter + 1)" />


<select v-model="infos[infoCounter].dataType" class="h-10 w-1/4  border-solid border-black border" @change="selectionChanged($event, infoCounter)">
<option value="" disabled selected>Select Data Type</option>
<option value="text">text</option>
<option value="number">number</option>
<option value="date">date</option>
<option value="email">email</option>
<option value="selection">selection</option>
<option value="list">list</option>
<option value="time">time</option>
<option value="file">file</option>
<option value="textArea">text area</option>
<option value="approver">approver</option>
<option value="header 1">header 1</option>
<option value="header 2">header 2</option>
<option value="header 3">header 3</option>
</select>
<div  v-if="infos[infoCounter].dataType=='approver'" class="ml-2 flex flex-row"><label for="checkbox" class="text-large ml-4 text-center" style="font-size: 15px;">Optional</label>
<input type="checkbox" name="" id="checkbox" v-model="infos[infoCounter].optional"  class="ml-2 mr-3 rounded-lg" style="width:20px; height:20px" /></div>
<button @click="removeInformation(infoCounter)" class=" ml-4"><font-awesome-icon icon="fa-solid fa-circle-minus" size="2x"/></button>
</div>





<div v-if="infos[infoCounter].dataType=='selection'" class="flex flex-col w-full pt-8 bg-gray-100 ">

    <div  v-for="(option, optionCounter) in infos[infoCounter].options" :key="optionCounter" class="flex flex-col w-full h-full bg-gray-100 mb-1">



<div class="flex flex-row w-full h-full mb-2">
         <label for="" class="mr-5 ml-5 text-xl">{{optionCounter + 1}}</label>
         <input type="text" v-model="infos[infoCounter].options[optionCounter]" class="w-5/6 h-9 rounded-sm mr-5">
  
         <button @click="addOption(optionCounter, infoCounter)" class=" btn-sm mb-2 mt-2 mr-3 "><font-awesome-icon icon="fa-solid fa-circle-plus"/></button>
         <button @click="removeOption(optionCounter, infoCounter)" class="btn btn-small  mr-3 "><font-awesome-icon icon="fa-solid fa-circle-minus"/></button></div>
    
     </div>
    
 
   </div>

   <div v-else-if="infos[infoCounter].dataType=='list'" class="flex flex-col w-full pt-8 bg-gray-100">
    <div  v-for="(answer, answerCounter) in infos[infoCounter].answerList" :key="answerCounter" class="flex flex-col w-full h-full bg-gray-100 mb-5">
    
    

 <div class="flex flex-row w-full h-full mb-2">   

    <label for="dataTypeText" class="mr-5 ml-5 text-xl">{{answerCounter + 1}}</label>
    <input type="text"  v-model="infos[infoCounter].answerList[answerCounter].label" id="dataTypeText" class="w-5/6 h-9 rounded-sm mr-5">
    
    

    
    <button @click="addAnswersListLabel(answerCounter, infoCounter)" class=" btn btn-sm mr-3 "><font-awesome-icon icon="fa-solid fa-circle-plus"/></button>
    <button @click="removeAnswersListLabel(infoCounter, answerCounter)" class=" btn btn-sm mr-3 "><font-awesome-icon icon="fa-solid fa-circle-minus"/> </button>
  
  </div>
    
    </div>    
    
    
    </div>

     
    </div>  
    
   
    <div class="flex flex-row justify-center items-center h-36 mt-10 bg-gray-100">
      <button @click="addInformation()" class="bg-green-500 w-52 h-16 text-white font-extrabold">Add Information</button>
    </div>
    
    </div>















<!-- Approver Area -->


<div class="approvers border p-3 mt-5">
<h4>Approvers</h4>

<div v-for="(approver, approverCounter) in approvers" :key="approverCounter" class="border relative mb-5">

  
  <div class=" w-full bg-white h-11 flex flex-row items-start justify-end">  
    <button class="bg-white text-gray-600 font-bold w-20 h-full" style="color:lime; border-bottom: solid thick lime;" @click="edit(approverCounter)" :id="'edit'+approverCounter">Edit</button>
    <button class="bg-green-white font-bold text-gray-600 w-20 h-full" @click="logic(approverCounter)" :id="'logic'+approverCounter">Logic</button>
</div>

<div v-bind:id="'conditions' + approverCounter"  class=" bg-gray-200 hidden pt-6 ">



  <!-- conditions Tab -->
<div v-for="(condition, conditionCounter) in conditionsList[approverCounter]" :key="conditionCounter" class="flex flex-col justify-between mb-5 px-5 border-b-2 border-black border-solid pt-5" >


<div class="flex flex-row justify-center">  <label v-if="condition.link=='And'" for="" class="text-purple-400 text-2xl mr-5 align-middle font-bold " >{{condition.link}}</label> <label v-else for="" class="text-orange-400 text-2xl mr-5 align-middle font-bold" >{{condition.link}}</label>



<select type="text" v-model="conditionsList[approverCounter][conditionCounter].info" @change="setDataType($event, approverCounter, conditionCounter)" class="w-1/3 h-11 mb-2 border border-black border-solid">
  <option value="" disabled selected hidden>Condition Info</option>
<option :value="info.name" v-for="(info, infoCounter) in infos"  :key="infoCounter">{{info.name}}</option>
<option value="Any">Any</option>
</select>



<select v-if="conditionsList[approverCounter][conditionCounter].dataType == 'text'" v-model="conditionsList[approverCounter][conditionCounter].logic" class="w-1/3 h-11 mb-2 border border-black border-solid">
     <option value="" disabled selected hidden>Condition Logic</option>
   <option value="Is Equals To">Is Equals To</option>
   <option value="Is Not Equals To">Is Not Equals To</option>
   <option value="Any">Any</option>
</select>
<select v-else-if="conditionsList[approverCounter][conditionCounter].dataType == 'selection' || conditionsList[approverCounter][conditionCounter].dataType == 'file'" v-model="conditionsList[approverCounter][conditionCounter].logic" class="w-1/3 h-11 mb-2 border border-black border-solid">
    <option value="" disabled selected hidden>Condition Logic</option>
   <option value="Is Equals To">Is Equals To</option>
   <option value="Is Not Equals To">Is Not Equals To</option>
   <option value="Any">Any</option>
</select>
<select v-else-if="conditionsList[approverCounter][conditionCounter].dataType == 'email'" v-model="conditionsList[approverCounter][conditionCounter].logic" class="w-1/3 h-11 mb-2 border border-black border-solid">
    <option value="" disabled selected hidden>Condition Logic</option>
   <option value="Is Equals To">Is Equals To</option>
   <option value="Is Not Equals To">Is Not Equals To</option>
   <option value="Any">Any</option>
</select>
<select v-else v-model="conditionsList[approverCounter][conditionCounter].logic" class="w-1/3 h-11 mb-2 border border-black border-solid">
    <option value="" disabled selected hidden>Condition Logic</option>
  <option value="Is Equals To">Is Equals To</option>
  <option value="Is Not Equals To">Is Not Equals To</option>
  <option value="Is Greater Than">Is Greater Than</option>
  <option value="Is Less Than">Is Less Than</option>
  <option value="Any">Any</option>
</select>

<div v-if="conditionsList[approverCounter][conditionCounter].dataType == 'selection'"  class="w-1/3 h-11 inline-block border border-black border-solid">
<select  v-model="conditionsList[approverCounter][conditionCounter].compareValue" class=" border border-solid border-black w-full h-11  mb-2">
   <option value="" disabled selected hidden> Compare Value </option>
  <option :value="option" v-for="(option, optionCounter) in conditionsList[approverCounter][conditionCounter].options" :key="optionCounter">{{option}}</option>
  <option value="Any">Any</option>
</select>
</div>
<div v-else-if="conditionsList[approverCounter][conditionCounter].dataType == 'file'" class="w-1/3 h-11 inline-block border border-black border-solid">
   <input type="text" placeholder="Compare Value" v-model="conditionsList[approverCounter][conditionCounter].compareValue" class=" border border-solid border-black w-full h-11  mb-2" /> 
</div>
<div v-else class="inline-blockborder border-solid border-black w-1/3 h-11">
  <input v-model="conditionsList[approverCounter][conditionCounter].compareValue" v-bind:type="conditionsList[approverCounter][conditionCounter].dataType"  class="w-full h-11 text-dark mb-2 border border-solid border-black text-black" placeholder="Compare Value" value="Any" :key="conditionsList[approverCounter][conditionCounter].dataType"/>
</div>


<button @click="removeCondition(approverCounter, conditionCounter)" class="ml-5 " v-if="conditionCounter > 0"><font-awesome-icon icon="fa-solid fa-circle-minus"/></button>
</div>


<div class="flex flex-row justify-center mb-3">
<button @click="addLink('And', approverCounter, conditionCounter)" class="w-auto h-auto bg-emerald-400 text-sm p-2 text-white rounded-lg border border-black border-solid hover:border-blue-600 hover:border-2 ">And</button>
<button @click="addLink('Or', approverCounter, conditionCounter)" class="w-auto h-auto  text-sm p-2 text-white rounded-lg border border-black border-solid ml-2 hover:border-blue-600 hover:border-2" style="background-color:rgb(69, 60, 115);">Or</button>
</div>



</div>

</div>

<!-- approvers tab -->
<div  v-bind:id="'approvers' + approverCounter " class="w-full bg-gray-200 pt-4"> 

  <label for="" class="mr-5 ml-5">A{{approverCounter + 1}} </label>
  <!-- <select class=" mb-2 h-10 w-5/6  border-solid border-black border" v-model="approvers[approverCounter].name">
 
  <option value="Requester's Own Department" disabled selected hidden>Approver</option>
 <option v-for="(department, counter) in departments" :key="counter" :value="getDepartmentEmailOrName(department)"  >
 {{getDepartmentEmailOrName(department)}}
 </option> -->

 <div class="w-5/6  py-4 mb-2  inline-block ">
     <multiselect  :options="approverDataTypes" placeholder="Select Approver"  v-model="approvers[approverCounter].name" class="border border-solid border-black" ></multiselect>
 </div>

 

<!-- </select> -->
 

 <button @click="removeApprover(approverCounter)" class="ml-5  fa-2xl"><font-awesome-icon icon="fa-solid fa-circle-minus" size="sm"/></button>
</div>




</div>


<div class="flex flex-row justify-center items-center h-36 mt-10 bg-gray-100"><button @click="addApprover()" class="bg-blue-500 w-52 h-16 text-white font-extrabold">Add Approver</button></div>







</div>




<!-- instructions -->
<div class="border p-3 mt-5 ">
  <h4>Instructions</h4>
     <div v-for="(instruction, instructionCounter) in instructions" :key="instructionCounter" class="flex justify-center items-center pb-6 pt-6 mb-5 border border-black w-full bg-gray-200 h-20">
         <label for="" class="mr-10">I {{instructionCounter+1}}</label>
         <input type="text"  :placeholder="instruction" v-model="instructions[instructionCounter]" class="w-5/6 h-10 border border-solid border-black rounded-sm">
         <button @click="removeInstruction(instructionCounter)" class="ml-5 "><font-awesome-icon icon="fa-solid fa-circle-minus" size="2x"/></button>

     </div>
  <div class="flex flex-row justify-center items-center h-36 mt-10 bg-gray-100"><button @click="addInstruction()" class="bg-amber-500 w-52 h-16 text-white font-extrabold">Add Instruction</button></div>

</div>



<div class="flex flex-row justify-end mr-5 mt-5">
  
  <button @click="addNewWorkFlow()" class="bg-blue-500 w-36   text-white font-bold text-md h-14 ml-3 rounded-sm mr-2">Add New WorkFlow</button>
  <button @click="this.$router.push('/admin/workflows')" class=" bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm ">Back</button>
</div>



</div>



</template>


<script>
import axios from 'axios'

export default{
  data(){
    return {
          workflows: [],
          userType:"",
          selectedWorkFlowCheck: false,
          departments: [],
          addWorkFlowCheck: false,
          addWorkFlowItem:{name:"", approvers:[], infos:[], instructions:[]},
          approvers:[],
          conditionsList:[[{info:"", logic:"", link:"", compareValue:"", dataType:""}]],
          infos:[],
          adder:0,
          showWorkFlow:null,
          instructions:[],
          
        }
  },

  created:function(){
    this.loadWorkFlows();
  },

  computed:{
      approverDataTypes(){
        var vm = this;
         var result = this.infos.filter((info)=> info.dataType == "approver")
         var departments = this.departments.map((department)=>vm.getDepartmentEmailOrName(department))
         var combinedResult = result.concat(departments)
         console.log(combinedResult)
         return combinedResult
      }
  },
  

methods: {


 loadWorkFlows() {
  var token = this.authStore.getToken;
  var vm = this;
  var data = {token}
  axios.post(vm.globalUrl + "getWorkFlows", data).then(function (response) {
    vm.workflows = response.data;
    console.log(response.data)
  }

  ).catch(function (error) {
    console.log(error);
  });

  axios.post(vm.globalUrl + "getDepartmentsAndApprovers", data).then(function (response) {
    vm.departments = response.data;
    console.log(response.data)
  }

  ).catch(function (error) {
    console.log(error);
  });
},


showAddWorkFlowSection(){
this.addWorkFlowCheck = true;
},


addApprover(){
this.approvers.push({name:"Requester's Own Department", conditions:[]});
this.conditionsList.push([{info:"", logic:"", link:"", compareValue:"", dataType:"", options:[]}])
},

addLink(linker, approverCounter, conditionCounter){
var newCondition = {link:linker, info:"", logic:"", compareValue:"", dataType:"", options:[]}
this.conditionsList[approverCounter].splice(conditionCounter + 1, 0, newCondition);

},


addNewWorkFlow(){

  this.$toast.open({type:'info', duration:0, message:'Adding Workflow...'})

var vm=this;

for(var x=0; x < this.approvers.length; x++){
this.approvers[x].conditions = this.conditionsList[x]
}
this.addWorkFlowItem.approvers = this.approvers;
this.addWorkFlowItem.infos = this.infos;
this.addWorkFlowItem.instructions = this.instructions;

var token = this.authStore.getToken;
var data = {
  workflow:this.addWorkFlowItem,
  token
}

axios.post(vm.globalUrl + "insertWorkFlow", data).then((result)=>{
  
console.log(result)
vm.$toast.clear()
vm.$toast.open({type:'success', message:'Workflow Added', duration:1000, queue:true})
vm.$router.push('/admin/workflows')



}).catch((error)=>{console.log(error.message)});
},

addInformation(){
var newInfo = {name:"", dataType:"", options:[]};
this.infos.push(newInfo);

},

setDataType(event, approverCounter, conditionCounter){
console.log(`this is the value: ${event.target.value}`)
function getIndex(info){
return info.name == event.target.value;
}


var result = this.infos.findIndex(getIndex);

if(result == undefined){
  this.conditionsList[approverCounter][conditionCounter].dataType = "text";
this.conditionsList[approverCounter][conditionCounter].options = options;

}else{
var dataType = this.infos[result].dataType;
var options = this.infos[result].options;
var name = this.infos[result].name;
console.log("there are the options")
console.log(options)
this.conditionsList[approverCounter][conditionCounter].dataType = dataType;
this.conditionsList[approverCounter][conditionCounter].options = options;


}


},

addOption(optionCounter, infoCounter){
var newOption = "";
this.infos[infoCounter].options.splice(optionCounter + 1, 0, newOption)
// this.infos[infoCounter].options.push(newOption);
},

back(){
this.addWorkFlowCheck = false;
},

removeOption(optionCounter, infoCounter){
this.infos[infoCounter].options.splice(optionCounter, 1);
},

removeInformation(informationCounter){
this.infos.splice(informationCounter, 1);
},

removeApprover(approverCounter){
this.approvers.splice(approverCounter, 1);
this.conditionsList.splice(approverCounter, 1)
},

removeCondition(approverCounter, conditionCounter){
this.conditionsList[approverCounter].splice(conditionCounter, 1);
},
wDeleteWorkFlow(workflow){
var vm = this;
console.log(workflow)
var token = this.authStore.getToken;
var data = {
  token,
  workflow
}
axios.post(vm.globalUrl + 'deleteWorkFlow', data).then((response) => {console.log(response);
vm.loadWorkFlows();
vm.selectedWorkFlow = null;
vm.selectedWorkFlowCheck = false;
}, (error) => {console.log(error);})

},

addAnswersListLabel(answerCounter, infoCounter){
console.log("from answer list label")

if(this.infos[infoCounter].answerList){
this.infos[infoCounter].answerList.splice(answerCounter + 1, 0, {label:""});
}else{
this.infos[infoCounter].answerList = [];
this.infos[infoCounter].responses = [];
this.infos[infoCounter].answerList.push(answerCounter + 1, 0, {label:""});
}

},

removeAnswersListLabel(infoCounter, answerCounter){
this.infos[infoCounter].answerList.splice(answerCounter, 1);
},

selectionChanged(event, infoCounter){

var value = event.target.value

if(value == "selection"){


if(this.infos[infoCounter].options.length > 0){
return
}else{
this.infos[infoCounter].options.push("")
}

}else if(value == "list"){

if(this.infos[infoCounter].answerList){
return
}else{
this.infos[infoCounter].answerList = [{label:""}];

}

}

},

logic(approverCounter){

var logic = document.getElementById("conditions" + approverCounter);
var edit = document.getElementById("approvers" + approverCounter);
var logicButton = document.getElementById("logic"+approverCounter);
var editButton = document.getElementById("edit"+approverCounter)
console.log(logic)
console.log(edit)
logicButton.style.borderBottom = "thick solid lime"
logicButton.style.color = "lime"
editButton.style.borderBottom = ""
editButton.style.color = "black"
edit.style.display = "none"
logic.style.display = "block"
},

edit(approverCounter){

var logic = document.getElementById("conditions" + approverCounter);
var edit = document.getElementById("approvers" + approverCounter);
var logicButton = document.getElementById("logic"+approverCounter);
var editButton = document.getElementById("edit"+approverCounter)
console.log(logic)
console.log(edit)
logicButton.style.borderBottom = ""
logicButton.style.color = "black"
editButton.style.borderBottom = "thick solid lime"
editButton.style.color = "lime"
edit.style.display = "block"
logic.style.display = "none"

},

addInstruction(){
this.instructions.push(" ")
},

removeInstruction(counter){
this.instructions.splice(counter, 1)
},


getDepartmentEmailOrName(department){
  if(!department.mailAddress){
    return department.name
  }else{
    return department.mailAddress
  }
}


}, 

  
}


</script>
