import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return { 
        users: null,
        departments: null,
        groups: null,
        requests:null,
        workflows:null,
        bounceUrl:null,
        admins:null 
    };
  },
  actions: {
    setUsers(value) {
      this.$patch((state)=>{
        state.users=value
      })
    },

    setBounceUrl(value){
      this.$patch((state)=>{
        state.bounceUrl = value
      })
    },

    setDepartments(value){
        this.$patch((state)=>{
          state.departments = value
        })
    },

    setGroups(value){
        this.$patch((state)=>{
          state.groups = value
        })
    },

    
    setRequests(value){
        this.$patch((state)=>{
          state.requests = value
        })
    },

    setWorkflows(value){
        this.$patch((state)=>{
            state.workflows = value
        })
    },

    
    setAdmins(value){
      this.$patch((state)=>{
          state.admins = value
      })
  },

  },
  getters: {
    getUsers(state){
      return state.users;
    },
    getGroups(state) {
      return state.groups;
    },
    getDepartments(state){
        return state.departments
    },
    
    getWorkflows(state){
        return state.workflows
    },

    getRequests(state){
      return state.requests
    },

    getBounceUrl(state){
      return state.bounceUrl
    },


    getAdmins(state){
      return state.admins
    }
  },

  persist: true,
});