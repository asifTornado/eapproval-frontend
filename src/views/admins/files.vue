<template>




<div v-for="(file, fileCounter) in files" :key="fileCounter" class="w-52 h-32 mb-3 mt-5  inline-block  p-3">
   <a :href="globalUrl+'/uploads/'+file.fileName" target="_blank">

      <div class="text-end flex flex-col justify-center items-center"><img :src="getFileType(file.originalName)" alt="" srcset="" height="50" width="50"></div>
      <div class="text-xs mt-2 flex flex-col justify-center items-center">{{file.originalName}}</div>


    </a>
</div>
    



</template>


<script>

import axios from 'axios';

export default{
    data(){
        return{
            files:[]
        }
    },


    created(){
        this.loadFiles()

    },


    methods:{
            loadFiles(){
                var token = this.authStore.getToken
                var data = {
                    token
                }
                var vm = this;
                console.log(`the posted url is ${vm.globalUrl + 'getAllFiles'}`)
                axios.post(vm.globalUrl + 'getAllFiles', data).then((result)=>{vm.files = result.data}).catch((error)=> {console.log(error)})
            },

            getFileType(originalName){
                var vm = this;
                   var ext = originalName.slice(-3)
        if(ext == "pdf"){
            return vm.globalUrl + 'images/pdf.png'
        }else if(ext == "jpg" || ext == "peg"){
            return vm.globalUrl + 'images/jpg.png'
        }else if(ext == "doc" || ext == "docx" || ext == "odt"){
            return vm.globalUrl + 'images/doc.png'
        }else if(ext == "xlsx"){
            return vm.globalUrl + 'images/xlsx.png'
        }else if(ext == "txt"){
            return vm.globalUrl + 'images/txt.png'
        }else{
            return vm.globalUrl + 'images/folder.png'
        }
            }


        }



}


</script>