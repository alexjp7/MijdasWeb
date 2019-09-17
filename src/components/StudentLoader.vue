<template>
<div id="StudentLoader">
    <v-card color="background">
        <v-card-title>
            <h2 id="studentHeading">Students</h2>
        </v-card-title>
        <v-card-actions>
        <div id="uploader" >
            <upload-btn icon @file-update="readFileInput">
                <template slot="icon">
                    <v-icon >add</v-icon>
                </template>
            </upload-btn>
            <h2>Click To Upload</h2>
        </div>
        </v-card-actions>
        <v-card>
            <span id="fileName">{{fileName}}</span>
        </v-card>
        <div v-if = "hasValidFile == true">
           <v-btn block @click="submitStudents" color="secondary" >Submit</v-btn>
        </div>
        <div v-else>

        </div>
    </v-card>      
</div>
</template>



<script>
  import UploadButton from 'vuetify-upload-button'
export default {

    data:() => ({
        fileName:"",
        students:[],
        hasValidFile:false,
    }),
    components: {
        'upload-btn': UploadButton
    },
    methods:{
        readFileInput(file) {
            const reader = new FileReader();
            reader.onload = e => this.students = (e.target.result).split(",");
            reader.readAsText(file);

            this.fileName = file.name;
            this.hasValidFile = true;
        },
        submitStudents() {
           
        }
    }
}
</script>

<style scoped>
    #uploader{
        height:10%;
        width:100%;
        display: inline-flex;
    }  

    #StudentLoader {

        margin-right: 10% !important;
        padding:2% !important;
        max-width:50%;  
    }
    #fileName{
        color:blue;
        font-weight: bold;
        text-align: center !important;
        font-style: italic;
    }
</style>