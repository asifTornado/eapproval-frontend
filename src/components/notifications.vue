<template>
    
<div class="relative justify-center items-center  h-auto w-32 px-3 hover:cursor-pointer noprint" v-cloak  id="notifications" @mouseover ="notificationsCheck=true" @mouseleave="notificationsCheck=false" >
   <div class=" text-white absolute top-5"> <font-awesome-icon icon="fa-solid fa-bell" size="3x"/> </div>
   <div class=" text-red-500 absolute top-6 left-7 " v-if="notificationStore.getNotifications.length > 0"><font-awesome-layers  ><font-awesome-icon icon="fa-solid fa-square"  size="2x"/><font-awesome-layers-text :value="notificationStore.getNotifications.length"  class="text-white text-md  pl-2"/></font-awesome-layers></div>
    <div v-show="notificationsCheck" v-cloak class="absolute top-12 right-5  w-96 h-12 " id="notificationDropDown"  >
      <ol class=" text-xs">
         <li class="border border-black border-solid bg-white px-2 py-1 text-black text-center relative w-full h-full" v-for="(notification, notificationCounter) in notificationStore.getNotifications" :key="notificationCounter" @click="getToSource($event, notification)">
            <p v-if = "notification.event =='Request'"  >  You have received a new {{ notification.requestType }} request from {{ notification.userName }}   </p>
            <p v-if = "notification.event =='Rejected'"  > Your {{ notification.requestType }} request with the Id: {{ notification.eventId }} has been rejected by {{ notification.userName }}     </p>
            <p v-if = "notification.event =='Approved'"  > You {{ notification.requestType }} request with the Id: {{ notification.eventId }} has been approved     </p>
            <p v-if = "notification.event =='Defer'"  >    {{ notification.userName }} deferred a {{notification.requestType  }} request to you </p>
          

         </li>
         
      </ol>
    </div>
</div>





</template>




<script>
import axios from 'axios'
export default {

data(){
    return {
        // notifications:[],
        notificationsCheck:false
    }
},


created(){
    this.getNotifications()
},


methods:{
    // getNotifications(){
    //       var token = this.authStore.getToken;
    //       var user = this.authStore.getUser;
    //       var data = {
    //         token, 
    //         user
    //       }
    //       console.log("from get notifications")
    //       var vm = this;
    //       axios.post(vm.globalUrl + '/getNotifications', data).then((result) =>{ vm.notifications = result.data}).catch((error)=>console.log(error))
    //     },


        getToSource(event, notification){
          
          var vm = this;
          var token = this.authStore.getToken;
          var user = this.authStore.getUser;
          var id = notification._id

          var data = {
            token,
            user,
            id
          }
          
          
          axios.post(vm.globalUrl + 'deleteNotification', data).then((result)=>{
            console.log(result)
          
            vm.getNotifications();
                 
            switch (notification.event) {
            case 'Request':
              vm.loadCurrentRequests(notification)
          
            
              
              break;

            case 'Approved':
            vm.loadMyRequests(notification);
       
              break;

            case 'Rejected':
            vm.loadMyRequests(notification);
         
              break;


            case 'Defer':
            console.log('case is defer')
            vm.loadCurrentRequests(notification);
          
              break;
          
            default:
              break;
          }
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          }).catch((error)=>{console.log(error)})

         
         
         
  

        },


    

    

    
}



}





</script>