<template>
    <v-card id="staffLinker">
        <v-card-title id="pageBreakHeading">
            <h2>Teaching Staff</h2>
        </v-card-title>
        <hr>
        <div v-if = "teachingStaff == null">
         <v-card>
            <p>This subject doesn't have any staff assigned <br>
             Use the form below to add a Staff Member</p>
         </v-card>
        </div>
        <div v-else>
        <!-- Populate Existing Staff Members --> 
            <div  id = "staffCards" v-for="staff in teachingStaff" v-bind:key="staff">
                <v-card id="currentStaff">
                <v-icon>mdi-account</v-icon> <span class ="staffName"> {{staff}}</span>
                <v-spacer></v-spacer>
                <v-btn @click="removeStaff(staff)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                    
                </v-card>
            </div>    
        </div>
        <h3  id="pageBreakHeading" align="left" >Search By Username</h3>
        <div id="searchComponent">
            <v-text-field 
            label="Staff Username"
            class="components"   
            v-model="searchString"
            @keyup="onKey" 
            single-line 
            filled>
            </v-text-field>
            <v-btn  @click = "addStaff" class="components" color="secondary" >Add Staff</v-btn>
        </div>
            <div v-if = "hasQuery === true" >
                <div v-if = "hasMatch === true">
                    <div v-for="results in matchedResults" v-bind:key="results" >
                        <v-btn 
                        class ="searchResults" 
                        block 
                        color="secondary"
                         light @click="fillSearchBar(results)">
                        {{results}}
                        </v-btn>
                    </div>
                </div>
                <div v-else>
                    <v-card color="error">
                        <h1 style="color:white">No Matches Found</h1>
                    </v-card>
                </div>
            </div>
    </v-card>
</template>

<script>
import User from "@/services/User";
import Subject from "@/services/Subject";
export default {
    name: "StaffLinker",
    data:() => ({
        teachingStaff:null,
        searchString:"",
        matchedResults:[],
        hasMatch:false,
        hasQuery:false,
        staffSelection:"",
        subjectCode:1
    }),
    methods: {
        //Event Listener for handling keyboard input with searchbar
        onKey() { 
                /*************************************************
                 * A Query is only made after 2 characters entered, 
                 * in order to reduce server load
                ************************************************/
               if(this.searchString.length > 1){
                    this.hasQuery = true
                    this.queryMatchs().then(response =>{   
                        this.matchedResults = response.data;
                        this.hasMatch = true;
                    }).catch(error=> {
                        this.hasMatch = false;
                    });
                }
             else {
                this.hasQuery = false} 
        },
        //When matched user is clicked, their username value is appended to result
        fillSearchBar(value) {
            this.searchString = value;
            this.hasQuery= false;
        },
        //Async call to populate matched results from query string
        async queryMatchs() {
            return User.matchUser({
                request:"SEARCH_USER_PARTIAL",
                query_string:this.searchString
            });
        },
        //Takes the field from search bar, and adds that username
        async addStaff() {

            Subject.addStaffMember({
                "request":"ADD_TUTOR",
                "tutors": [this.searchString],
                "subject_id":this.subjectCode
            }).then().then(this.getStaff()).catch(error => console.log(response));
        },
        
        //Makes an asyncronous call to popualte linked staff members
        async getStaff() {
            Subject.getTutors({
            "request":"VIEW_TUTORS",
            "subject_id":this.subjectCode
            }).then(response =>{
                this.teachingStaff = response.data
            }).catch(error=>console.log(error));
        },
        //Removes Tutor from subject and display
        async removeStaff(staff) {
        
            Subject.removeStaff({
                "request": "REMOVE_TUTOR",
                "subject_id": this.subjectCode,
                "tutor_username": staff
            }).finally(this.getStaff()); 
    
      
        }
    },
    async mounted(){
        this.getStaff()
    }
}
</script>

<style>
    #pageBreakHeading {
        padding:1%;
    }
    #staffLinker {
        border:1px;
        padding:1%;
        max-width: 100%;
        display:block;
        margin-left: 10%;
        margin-right: 10%;
    }
    #searchComponent{
        display:inline-flex;
        width:100%;
        padding:1%;
    }
    
    .components {
        min-height:6.8vh !important;
    }
    .searchResults {
       padding:1%; 
       margin-bottom: 2%;
    }
    #currentStaff {
        text-align:left;
        margin: 1%;
        padding: 1%;
        border-style: solid;
        border-color: black;
        border-width: 1px;
        display: flex !important;
        max-width: 100%;
        
    }
    .staffName {
        padding-left: 1%;
        font-size: 15px !important;
        font-style: bold;
        max-width: 100%;
    }
    #staffCards {
     
        
    }
</style>
