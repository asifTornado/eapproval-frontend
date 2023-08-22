import './index.css'
import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { VueSignaturePad } from 'vue-signature-pad';



import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {fas} from '@fortawesome/free-solid-svg-icons'
import {mapStores} from 'pinia'
import {useAuthStore} from './stores/authentication'
import {useMainStore} from './stores/store'
import { useNotificationStore } from './stores/notification'
import Multiselect from 'vue-multiselect'

import ToastPlugin from 'vue-toast-notification';
import '../node_modules/vue-toast-notification/dist/theme-sugar.css'

library.add(fas)

const app = createApp(App) 
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layers-text', FontAwesomeLayersText)
app.component("VueSignaturePad", VueSignaturePad);
app.component('multiselect', Multiselect)

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(ToastPlugin)





app.mixin({

    data(){
        return{
          globalUrl:"http://localhost:5000/"
        }
    },

    mounted(){
        
      },


    computed:{
        ...mapStores(useAuthStore, useMainStore, useNotificationStore)
    },
    methods:{
        logout(){
            this.authStore.setUser(null);
            this.authStore.setToken(null);
            this.$router.push('/login')
        },

        loadCurrentRequests(notification){
            console.log("from inside loadCurrentRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
            axios.post(this.globalUrl+ "getCurrentRequests", data).then((result)=>{
          
              vm.mainStore.setRequests(result.data.requests);
                
              console.log(result.data);
              vm.$router.push('/currentRequests/view/' + notification.eventId)
  
              }
              ).catch((error)=>{console.log(error)})
        },

        loadAllRequests(notification){
            console.log("from inside loadAllRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
            
            axios.post(vm.globalUrl + "getCurrentRequestsForAdmin", data).then((result)=>{
            
                vm.mainStore.setRequests(result.data)
           
            }).catch((error)=>{
                console.log(error);

            })
        },

        loadMyRequests(notification){
            console.log("from inside loadMyRequests")
            var vm = this;
            var token = this.authStore.getToken;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(this.authStore.getUser))
          
			axios.post(vm.globalUrl + "getMyRequests", data).then(function(response){
	

          vm.mainStore.setRequests(response.data.myRequests)
				console.log(response.data);

            if(notification.event == "Approved"){
                vm.$router.push('/myRequests/notRejected/' + notification.eventId)
            }else if(notification.event == "Rejected"){
                vm.$router.push('/myRequests/Rejected/' + notification.eventId)

            }

                     
          
        }


        
				
			).catch(function(error){
			   console.log(error);
			});
        },


        getNotifications(){
            var token = this.authStore.getToken;
            var user = this.authStore.getUser;
            var data = {
              token, 
              user
            }
            console.log("from get notifications")
            var vm = this;
            axios.post(vm.globalUrl + 'getNotifications', data).then((result) =>{ vm.notificationStore.setNotifications(result.data);
            console.log("these are the data");
            console.log(result.data)
            console.log("this are the notifications")
            var notifications  = vm.notificationStore.getNotifications
             console.log(notifications)
        
        }).catch((error)=>console.log(error))
          },


    }
})


app.use(router)

app.mount('#app')
