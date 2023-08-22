<template>
    
    <div class="w-75 h-75 mx-auto text-align-center flex flex-col justify-center items-center">
<!-- <div class="flex flex-col justify-center items-center bg-slate-500 pb-5 w-auto px-10 py-8 mt-10">
<h1 class="text-lg font-bold text-white">Current Signature</h1>
<img class="h-52 w-52" v-bind:src="globalUrl + '/uploads/'+signature" alt="image not available" >
</div>

<div class="mb-3">
<input type="file" name="file" @change="uploadSignatureFile($event)" ref="file">
</div> -->



<div class="bg-rose-200 p-4" v-if="hasSignature == false" >
    <h1 class="text-center font-bold text-black">Warning!!</h1>
    <p>You can only set your signature once. So, make sure your signature is correct before hitting the save button. Hit the undo button to erase if you feel your signature is wrong.</p>
</div>



<div v-if="hasSignature == false" >
   
    <div class="mb-2 flex flex-col justify-end mt-10">
<!-- <button @click="upload" class="bg-blue-500 w-36   text-white font-bold text-md h-14 ml-3 rounded-sm mr-2">Upload</button> -->

<h1 class="text-center text-lg font-bold">Your Signature</h1>
<div class="border border-black border-solid h-auto w-auto">
    
    <VueSignaturePad width="400px" class="border border-solid border-black hover:cursor-crosshair"  height="300px" ref="signaturePad"  />
</div>



<!-- <button v-if="userType != 'Admin'" @click="this.$router.push('/user')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm "> Return </button>
<button v-else @click="this.$router.push('/admin')" class="bg-gray-300 w-36   text-gray-500 font-bold text-md h-14  rounded-sm "> Return</button> -->
</div>
<button @click="saveSignature" class="h-12 bg-blue-500 text-white rounded-sm p-3">Save Signature</button>
<button @click="undo" class="h-12 bg-gray-300 text-black p-3 ml-2 font-bold">Undo</button>
<button @click="this.$router.back()" class="h-12 p-3 bg-gray-300 text-black font-bold  ml-2">Return</button></div>
<div v-else>  
        <h1 class="text-center text-lg font-bold">Your Signature</h1>
    <svg width="400px" height="300px" class="border-black border-solid border-2 ">
    <path :d="path" stroke="black" fill="transparent" stroke-width="3" />
  </svg>
<button @click="this.$router.back()" class="h-12 p-4 bg-gray-300 text-black font-bold mt-2 ml-10">Return</button>

</div>

</div>



</template>


<script>
import axios from 'axios'
import SingaturePad from 'signature_pad'



export default{
    data(){
        return{
           signature:null,
           file:null,
           userType:null,
           hasSignature:false,
           path:null,
        }
    },



    created(){
        this.getSignature();
        this.checkSignature();
   
     
    },

    mounted(){
   
    },

    methods:{
        getSignature(){
            var vm = this;
            var token = this.authStore.getToken
            var user = this.authStore.getUser;
            var data = new FormData();
            data.append('token', token);
            data.append('user', JSON.stringify(user))
            axios.post(vm.globalUrl + "getSignature", data).then((result)=>{
                console.log("result from inside of get signature")
                console.log(result);
                vm.signature = result.data.signature;
                vm.userType = result.data.userType;
            }).catch((error)=>{
                console.log(error.message)
            })
        },
        uploadSignatureFile(event){
            
            this.file = event.target.files[0]
            console.log("this is the file")
            console.log(this.file)
        },

        upload(){
            var vm = this;
            var token  = this.authStore.getToken;
            var user = this.authStore.getUser;
            var data = new FormData()
            data.append("file", this.file)
            data.append("token", token)
            data.append('user', JSON.stringify(user))
             
            axios.post(vm.globalUrl + "uploadSignature", data, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }).then((result)=>{
                console.log(result);
                vm.signature = result.data.signature;
                console.log(result.data)
                console.log(vm.signature);
                vm.authStore.setUser(result.data);
            }).catch((error)=>{
                console.log(error.message)
            })
        },


        saveSignature() {

            this.$toast.open({type:'info', message:'Saving Signature.....', duration:0})
    const signaturePad = this.$refs.signaturePad;
    const signaturePadWidth = this.$refs.signaturePad.$el.offsetWidth;
const signaturePadHeight = this.$refs.signaturePad.$el.offsetHeight;

    // Get the signature as an array of points
    const signatureData = signaturePad.saveSignature('image/svg+xml');



  

// Extract the base64-encoded SVG data
const base64Data = signatureData.data.split(',')[1];

// Decode the base64 data
const decodedData = atob(base64Data);

// Create a new DOM parser
const parser = new DOMParser();

// Parse the decoded SVG data
const svgDoc = parser.parseFromString(decodedData, 'image/svg+xml');

// Extract the path element from the SVG
const pathElements = svgDoc.querySelectorAll('path');

// Combine the paths into one big SVG path string
let combinedPathString = '';
pathElements.forEach((pathElement) => {
  const pathString = pathElement.getAttribute('d');
  combinedPathString += pathString;
});

console.log(combinedPathString);



var data = new FormData();

data.append('path', combinedPathString)
data.append('id', this.authStore.getUser._id)
data.append('token', this.authStore.getToken)
data.append('width', signaturePadWidth);
data.append('height', signaturePadHeight);

var vm = this;

axios.post(vm.globalUrl + 'svg', data).then((result)=>{console.log(result);
vm.$toast.clear()
vm.$toast.success('Signature Saved')
var user = vm.authStore.getUser;
user.drawnSignature = {};
user.drawnSignature.path = combinedPathString;
user.drawnSignature.width = signaturePadWidth;
user.drawnSignature.height = signaturePadHeight;
vm.authStore.setUser(user);

 }).catch((error)=>console.log(error))








    // Convert the signature data to an SVG path string
    // const svgPath = this.convertToSvgPath(signatureData);

    // Do something with the SVG path (e.g., send it to the server, store it in a variable, etc.)
    
  },

  convertToSvgPath(signatureData) {
  // Convert an array of points to an SVG path string
  const svgPath = signatureData
    .map((point, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command} ${point.x} ${point.y}`;
    })
    .join(' ');

  return svgPath;
},

checkSignature(){
    var vm = this;
    var id = this.authStore.getUser._id
    var data = {
        id
    }
    axios.post(vm.globalUrl+'checksvg', data).then((result)=>{
        console.log("from checkSignature")
        console.log(result.data)
        if(result.data.hasSignature == true){
            vm.hasSignature = true;
            vm.path = result.data.file
        }
    })
},

undo(){
    this.$refs.signaturePad.undoSignature();
}
    }

    


    
}




</script>