<template>
  
  
 <h1>{{name}}</h1> 

<section class="bg-gray-200 dark:bg-gray-900 py-8 lg:py-16  mt-10 noprint z-10">
  <div class="max-w-2xl mx-auto px-4 border-b border-solid border-slate-400">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussions {{componentMessages.length}}</h2>
    </div>
    <form class="mb-6" @submit.prevent="messageSubmit()">
        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea id="comment" rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required v-model="messageText"></textarea>
        </div>
        <button type="submit"
            class="inline-flex items-center py-3 px-4 text-xs font-medium text-center text-white bg-blue-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
    <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 border border-slate-400 border-solid" v-for="(message, messageCounter) in componentMessages" :id="messageCounter + 'parent'" :key="messageCounter" >
        <footer class="flex flex-row mb-2 ">
            <div class="flex flew-row w-full">
                <div class=" items-center mr-3 text-sm text-gray-900 dark:text-white" :id="messageCounter+'name'">{{message.messengerName}}</div>
                <div class="text-xs text-gray-600 dark:text-gray-400 ml-5"><time pubdate datetime="2022-02-08" :id="messageCounter+'time'"
                        title="February 8th, 2022">{{message.time}}</time></div>
            </div>
          
            <div class="flex flex-row  w-1/4 justify-end">  <button
                class="  p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button" @click="messageEdit(messageCounter, componentItem._id, message.id)">
               <font-awesome-icon icon="fa-solid fa-pen"/>            </button>
              <button 
                class="fa-solid fa-trash  p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button" @click="messageDelete(message.id, messageCounter)">
                <font-awesome-icon icon="fa-solid fa-trash"/>
            </button></div>
            <!-- Dropdown menu -->
         
        </footer>
        <p v-if="message.replyingTo" class="text-blue-500">{{ message.replyingTo }}</p>
        <p class="text-gray-500 dark:text-gray-400" v-bind:ref="message.messengerName" :id="messageCounter">
            {{message.message}}
        </p>
        <!-- <div class="flex items-center mt-4 space-x-4">
            <button type="button" @click="reply(messageCounter, componentItem._id, message.messengerName)"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                Reply
            </button>
        </div> -->
    </article>
    
  </div>
</section>





</template>



<script>
import axios from 'axios'
export default{
  props:['messages', 'showRequestItem'],

  data(){
    return {
      messageText:"",
      messageCounter:null,
      componentMessages:null,
      componentItem:null,
      editingMessage:false
      
    }
  },


 created(){
    this.componentItem = this.showRequestItem;
    this.componentMessages = this.messages;
 },


  methods:{
        update(elem, counter, id, approval_status, messengerId, parent, div){
          var token = this.authStore.getToken
          var user = this.authStore.getUser
          
          if(user._id != messengerId){
            return
          }else{

            var vm = this;
               var newMessage = elem.innerText;
               console.log("new message");
               console.log(newMessage);
               var timeElem = document.getElementById(counter+"time");
               var nameElem = document.getElementById(counter+"name");
               
              
               var data = {id:id, message:newMessage, counter:counter, approval_status:approval_status, token, user, messengerId}

               axios.post(vm.globalUrl + "messageEdit", data).then((result)=>{
                console.log(result);
                // elem.innerText = result.data.message;
                // timeElem.innerText = result.data.time;
                // nameElem.innerText = result.data.messengerName; 

                vm.messages[counter] = result.data;

                elem.contentEditable = false;
               parent.removeChild(div); 
               vm.editingMessage = false;
              
              }).catch((error)=>console.log(error.message))

          }
          
             
        },

        cancel(parent, div, elem){
          var vm = this;
          console.log("cancel");
          
          elem.contentEditable = false;
          parent.removeChild(div);
          vm.editingMessage = false;
       
          
        },
        messageSubmit() {
            var token = this.authStore.getToken
            var user = this.authStore.getUser
       var data = {
        message:this.messageText,
        requestId:this.componentItem._id,
        approvalStatus:this.componentItem.approval_status,
        token,
        user,
        reply:false
       }
          
              
          
          var vm = this;
          console.log("from the data");
          console.log(data);
            axios.post(vm.globalUrl + "submitMessage", data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              }, 
            }).then((result)=>{
              vm.componentMessages = result.data;
              console.log("result");
              console.log(result)
              console.log(result.data)
              if(vm.componentItem.messages){
                vm.componentItem.messages = result.data;
              }else{
                console.log("entered else of getting message")
                vm.componentItem["messages"] = result.data
              }
            }).catch((error)=>{
              console.log(error)
            })
          },
        
        messageDelete(messengerId, messageCounter){
          var vm = this;
          console.log("entered message delete")
          var user = this.authStore.getUser
          var token = this.authStore.getToken
               var data = {
                messengerId: messengerId,
                messageCounter:messageCounter,
                requestId:this.componentItem._id,
                approval_status:this.componentItem.approval_status,
                token,
                user
               }
               console.log(data)
               axios.post(vm.globalUrl + "deleteMessage", data).then((result)=>{
                if(result.data.message==false){
                  console.log(result)
                  
                }else{
                console.log(result);
                vm.componentItem = result.data.value;
                vm.componentMessages = result.data.value.messages;
                }
               }).catch((error)=>{
                console.log(error)
               })
        },
        messageEdit(counter, id, messengerId){
          var user = this.authStore.getUser;
          var vm = this;
        

          if(this.editingMessage == false) {
            if(user._id != messengerId){
              return
            }else{
  
              this.messageCounter = counter;
            var elem = document.getElementById(counter);
            elem.contentEditable = true;
            elem.focus();
            var parent = document.getElementById(counter+"parent");
            var div = document.createElement("div")
            div.id = counter+"child"
            var update = document.createElement('button');
            var cancel = document.createElement('button');
            div.className = "w-full text-white flex flex-row justify-end h-11 mt-2"
            update.innerText = "Update"
            cancel.innerText = "Cancel"
            update.className = "mr-1 bg-blue-400 text-xs p-3 rounded-sm text-white"
            cancel.className = "mr-5 bg-slate-500 text-xs p-3 rounded-sm text-white"
            update.addEventListener('click', (event) => this.update(elem, counter, this.componentItem._id, this.componentItem.approval_status, messengerId, parent, div));
            cancel.addEventListener('click', (event)=> this.cancel(parent, div, elem))
            div.appendChild(update);
            div.appendChild(cancel);
            parent.appendChild(div)
            vm.editingMessage = true;
  
            }
          } else {
            return
          }



        


        },

        reply(counter, id, name){

            var token = this.authStore.getToken
            var user = this.authStore.getUser
       var data = {
        message:this.messageText,
        requestId:this.componentItem._id,
        approvalStatus:this.componentItem.approval_status,
        token,
        user,
        counter,
        id,
        name,
        reply:true
       }
          
              
          
          var vm = this;
          console.log("from the data");
          console.log(data);
            axios.post(vm.globalUrl + "submitMessage", data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              }, 
            }).then((result)=>{
              vm.componentMessages = result.data;
              console.log("result");
              console.log(result)
              console.log(result.data)
              if(vm.componentItem.messages){
                vm.componentItem.messages = result.data;
              }else{
                console.log("entered else of getting message")
                vm.componentItem["messages"] = result.data
              }
            }).catch((error)=>{
              console.log(error)
            })

        }
     


    }


}



</script>