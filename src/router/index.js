import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/authentication'
import { useMainStore } from '../stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue'),
      
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },

    {
      path: '/signature',
      name: 'signature',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/signature.vue')
    },


    {
      path: '/admin/files',
      name: 'files',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/files.vue')
    },


    {
      path: '/admin',
      name: 'adminMain',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/adminMain.vue')
    },


    {
      path: '/user',
      name: 'userMain',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/users/main.vue')
    },


    {
      path: '/masterAdmin',
      name: 'masterAdminMain',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/masterAdmins/main.vue')
    },


    {
      path: '/masterAdmin/add',
      name: 'masterAdminAdd',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/masterAdmins/add.vue')
    },


    {
      path: '/masterAdmin/update/:id',
      name: 'masterAdminUpdate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/masterAdmins/update.vue')
    },


    {
      path: '/admin/workflows',
      name: 'workflowMain',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/workflows/workflowMain.vue')
    },
    {
      path: '/admin/workflows/add',
      name: 'workflowAdd',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/workflows/addWorkflow.vue')
    },
    {
      path: '/admin/workflows/update/:id',
      name: 'workflowupdate',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/workflows/update.vue')
    },
    {
      path: '/admin/users/add',
      name: 'addUser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/users/add.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/admin/users/update/:id',
      name: 'updateUser',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/users/update.vue')
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/users/main.vue')
    },
    {
      path: '/admin/departments',
      name: 'departments',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/departments/main.vue')
    },
    {
      path: '/admin/departments/add',
      name: 'addDepartment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/departments/add.vue')
    },
    {
      path: '/admin/departments/update/:id',
      name: 'updateDepartment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/departments/update.vue')
    },
    {
      path: '/admin/allRequests',
      name: 'allRequests',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/allRequests/main.vue')
    },
    {
      path: '/admin/allRequests/view/:id',
      name: 'allRequestsView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/allRequests/view.vue')
    },

    {
      path: '/currentRequests',
      name: 'currentRequests',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/currentRequests/main.vue')
    },


    
    {
      path: '/currentRequests/view/:id',
      name: 'currentRequestsView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/currentRequests/view.vue')
    },


    {
      path: '/email/currentRequests/view/:id',
      name: 'currentRequestsViewEmail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/currentRequests/view.vue')
    },

    {
      path: '/admin/groups',
      name: 'groups',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/groups/main.vue')
    },

    {
      path: '/admin/groups/add',
      name: 'addGroup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/groups/add.vue')
    },

    {
      path: '/admin/groups/update/:id',
      name: 'updateGroup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admins/groups/update.vue')
    },


    {
      path: '/makeRequest',
      name: 'makeRequest',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/makeRequest.vue')
    },

     {
      path: '/myRequests',
      name: 'myRequests',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/myRequests/main.vue')
    },

    
     {
      path: '/myRequests/rejected/:id',
      name: 'myRequestsRejected',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/myRequests/rejected.vue')
    },



    {
      path: '/email/myRequests/rejected/:id',
      name: 'myRequestsRejectedEmail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/myRequests/rejected.vue')
    },
     
     

    
     {
      path: '/myRequests/notRejected/:id',
      name: 'myRequestsNotRejected',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/myRequests/notRejected.vue')
    },


      
    {
      path: '/email/myRequests/notRejected/:id',
      name: 'myRequestsNotRejectedEmail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/myRequests/notRejected.vue')
    },

  ]
})



router.beforeEach((to, from) => {
  var store = useAuthStore();
  var mainStore = useMainStore();
  var user = store.getUser
  var path = to.path;
  var root = path.split('/').at(1);
  var userTypesWithoutAdmin = ["Approver", "Watcher", "Requester"]
  var adminPaths = ["/admin/allRequests", "/admin/files", "/admin/users", "/admin/users/add", "/admin/users/update", "/admin/workflows", "/admin/workflows/add", "/admin/departments", "/admin/departments/add", "/admin/departments/update", "/admin/groups", "/admin/groups/add", "/admin/groups/update", "/admin"]
  var mutualPaths = ["/makeRequest", "/myRequests"];
  var approverAndAdminPaths = ["/currentRequests", "/signature"]
  var userTypes = ["Admin", "Approver", "Requester", "Watcher", "Master Admin"]
  var adminAndApprover = ["Admin", "Approver"]
  var allWatchers = ["Admin", "Watcher", "Approver"]
  var nonUserPaths = ['/login', '/register']
  var emailPaths = ['/email/currentRequests/view/:id', '/email/myRequests/notRejected/:id', '/email/myRequests/rejected/:id']
  console.log(`this is the path ${path}`)
  console.log(`this is the user ${user}`)
  // console.log(`this is the user type ${user.userType}`)
  console.log(`this is the root ${root}`)


  // if(!user && root=='email'){
  //   mainStore.setBounceUrl(path);
  //   return {path:'/login'}
  // }
  

  // if(!user && root!='email'){
  //   if(!nonUserPaths.includes(path)){
  //     return {path:'/login'}
  //   }
  // }



  
  
  // if(!user && !nonUserPaths.includes(path) ){
  //   return {path:'/login'} 
  // }
  



  // if(user){

  //   if(adminPaths.includes(to.path) && user.userType != "Admin"){
      
  //                        if(user.userType == 'Master Admin'){
  //                          return {path:'/masterAdmin'}
  //                        }else{
  //                          return {path:'/user'}
  //                        }
    
  //   }else if(
  //       mutualPaths.includes(to.path) && !userTypes.includes(user.userType)){
  //       return {path:'/login'}
  //   }else if(approverAndAdminPaths.includes(to.path) && !adminAndApprover.includes(user.userType)){
    
  //                       if(user.userType == "Requester" || user.userType == "Watcher"){
  //                        return {path: '/user'}
  //                       }else if(user.userType == "Master Admin"){
  //                        return {path: '/masterAdmin'}
  //                       }
  //   }else if(to.path == "/currentRequests" && !allWatchers.includes(user.userType)){
  //                        if(userTypesWithoutAdmin.includes(user.userType)){
  //                        return {path: '/user'}
  //                        }else if(user.userType == "Master Admin"){
  //                        return {path: '/masterADmin'}
  //                        }
        
  //   }else if(to.path == "/user" && !userTypesWithoutAdmin.includes(user.userType)){
  //               if(user.userType == 'admin'){
  //                     return {path:'/admin'}
  //               }else if(user.userType == 'Master Admin'){
  //                     return {path:'/masterAdmin'}
  //                   }
               
  //   }else if(to.path == '/'){
  //     if(userTypesWithoutAdmin.includes(user.userType)){
        
  //       return {path: '/user'}
  //     }else if(user.userType == "Admin"){
  //       return {path:'/admin'}
  //     }else if(user.userType == 'Master Admin'){
  //       return {path:'/masterAdmin'}
  //     }
  //   }else if(to.path == ''){
  //     if(userTypesWithoutAdmin.includes(user.userType)){
        
  //       return {path: '/user'}
  //     }else if(user.userType == "Admin"){
  //       return {path:'/admin'}
  //     }else if(user.userType == 'Master Admin'){
  //       return {path:'/masterAdmin'}
  //     }
  //   }else if(nonUserPaths.includes(to.path)){
  //     if(userTypesWithoutAdmin.includes(user.userType)){
  //       return {path:'/user'}
  //     }else if(user.userType == 'Admin'){
  //       return {path:'/admin'}
  //     }else if(user.userType == 'Master Admin'){
  //       return {path:'/masterAdmin'}
  //     }
  //   }
      
    
  
  
  // }



})

export default router
