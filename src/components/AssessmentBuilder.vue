<template>
  <!-- 0 == checkbox, 1 == slider, 2 == number box -->
  <div id="criteriaBuilder">
    <v-snackbar color="green" v-model="snackbarSuccess">
      <p style="color:white;">{{snackBarMessage}}</p>
    <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar color="error" v-model="snackbarError">
      <p style="color:white;">{{snackBarMessage}}</p>
    <v-btn color="red" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-card class="mx-auto" flat color="secondary">
      <!-- Title -->
      <v-card-title class="pageBreakHeading">
        <span id="teachingStaffHeading">
          <h2>Assessments</h2>
        </span>
        <v-spacer></v-spacer>
        <v-card>
          <!-- Toolbar with search and refresh buttons -->
          <v-toolbar dense="true" flat color="secondary">
            <v-btn  @click="addAssessment" color="white" icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="getAssessments" color="white" icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
    </v-card-title>
  </v-card>
  <!-- Add Assessment Card -->
  <v-card>
    <div v-if="addAssessmentClicked == true ">
      <v-card >
        <span style="display:flex;margin-left:10%;margin-right:10%;">
          <v-text-field  
            label="Task Name"
            :counter="20"
            v-model="newTaskName">
          </v-text-field>
          <v-spacer></v-spacer>
          <v-btn 
            @click="createAssessment" 
            color="secondary"
            style="height:5.6vh;min-width:40%;margin-top:1%;margin-bottom:1%;">
            Add Task
          </v-btn>
        </span>
      </v-card>
    </div>
    <!-- Current Assessment -->
<v-container id="assessmentContainer">
  <v-row id="splitPanel">
    <v-col  id="cols" :cols="4">
      <h1 style="padding:1%;">Selected</h1>
      <div v-if="hasSelected == false">
          <v-card color='background'>
            <p style="color:#3c5c77b5">No Task Selected 
              <br>
            Expand a task to view</p>
          </v-card>
      </div>
      <div v-else>
        <!-- Left side edit panel -->
            <v-form>
              <v-card >
                 <div style="display:flex;">
                   <!-- Lab task Name -->
                  <v-text-field 
                    v-on:onChange = "toggleActivation"
                    :class="`d-flex justify-1 mb-6`"
                    v-model="selectedTask.name"
                    label="Assessment Name"
                    class="pa-2"
                    :counter="20">
                  </v-text-field>
                  <v-spacer></v-spacer>
                  <!-- Activation Toggle -->
                  <v-switch 
                    @change="toggleActivation"
                    color="primary" 
                    v-model="isActive" 
                    :class="`d-flex justify-2 mb-6`"
                    class="pa-2"
                    label="active">
                  </v-switch>
                </div>
              </v-card>
            </v-form>
        <v-container >
          <!-- Criteria Display -->
          <v-card color="secondary"  style="display:flex;padding:1%;">
            <h2 style="color:white;">Assessment-Criteria</h2> 
            <v-spacer></v-spacer>
          <v-card>
          <!-- Toolbar with search and refresh buttons -->
          <v-toolbar dense="true" flat color="secondary">
            <v-btn  @click="addCriteriaClick" color="white" icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="refresh" color="white" icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
            <hr>
          </v-card>
            <div v-if="hasCriteria == false">
              <v-card color='background'>
                <p style="color:#3c5c77b5">No Criteria For this task
                    <br> Click the plus to create
                </p>
              </v-card>
            </div>
            <div v-else>
              <v-container>
                <!-- Criteria Display -->
                <!-- Add Criteria -->
                <div v-if="isAddCriteria == true">
                  <v-card style="padding:1%;">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <th> Display Text </th>
                            <td>
                              <v-text-field
                               v-model="displayTextInput"
                               label="Display Text" 
                              >
                              </v-text-field>
                            </td>
                          </tr>
                          <tr>
                            <th>Mark Out of</th>
                            <td>
                              <v-text-field
                              v-model="maxMarkInput"
                               label="Max-Mark">
                              </v-text-field>
                            </td>
                          </tr>
                          <tr>
                            <th>Type Of Criteria</th>
                            <td>
                              <v-radio-group v-model="elementSelected">
                                <v-radio
                                label="Slider"
                                :value="1"
                                ></v-radio>
                                <v-radio
                                label="Checkbox"
                                :value="0"
                                ></v-radio>
                                <v-radio
                                label="Num-Box"
                                :value="2"
                                ></v-radio>
                                <v-radio
                                label="TextBox"
                                :value="4"
                                ></v-radio>
                              </v-radio-group>
                            </td>
                          </tr>
                          <tr>
                            <td>
                            </td>
                            <td>
                                <v-btn @click="addCriteria" style="min-width:100%;height:5vh;" color="success">
                                  Submit Criteria
                                </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card>
                </div>
                <div v-else>
                  <v-card>

                  </v-card>
                </div>
                <div v-if="hasCriteria == false">
                  <v-card color="background">
                    <p style="color:#3c5c77b5">
                      No Criteria For this task
                      <br />Click the plus to create
                    </p>
                  </v-card>
                </div>
                <!-- Populate Criteria Items -->
                <div v-else>
                  <div v-for="criterion in criteria" v-bind:key="criterion">
                    <v-simple-table dense>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <th>Criteria</th>
                            <td>{{criterion.criteria}}</td>
                          </tr>
                          <tr>
                            <th>Available Marks</th>
                            <td v-if="criterion.maxMark === null">-</td>
                            <td v-else>{{criterion.maxMark}}</td>
                          </tr>
                          <tr>
                            <th>Type</th>
                            <td v-if="criterion.element == 0">Checkbox</td>
                            <td v-else-if="criterion.element == 1">Slider</td>
                            <td v-else-if="criterion.element == 2">Numbox</td>
                            <td v-else-if="criterion.element == 4">Text-area</td>
                          </tr>
                          <tr>
                            <th>Display Text</th>
                            <td>{{criterion.displayText}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <hr />
                  </div>
                </div>
              </v-container>
            </div>
        </v-container>
      </div>
    </v-col>
    <!-- Right side selector -->
    <v-col :cols="4" id="cols">
      <h1 style="padding:1%;"> Current Assessments</h1>
      <div v-if="hasAssessment == true">
        <v-expansion-panels>
        <v-expansion-panel  v-for="assessment in assessments" v-bind:key="assessment" >
          <!-- Task Name Header -->
          <v-expansion-panel-header  @click="taskClicked(assessment.id)" >
              <h2>{{assessment.name}}</h2>
          </v-expansion-panel-header>
          <!-- Assessment Contents -->
          <v-expansion-panel-content>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <th> Task Name</th>
                    <td>{{assessment.name}}</td>
                  </tr>
                  <tr>
                    <th> Assessment Number</th>
                    <td>{{assessment.a_number}}</td>
                  </tr>
                  <tr>
                    <th>Max Mark</th>
                    <td>{{assessment.max_mark}}</td>
                  </tr>
                  <tr>
                    <th>Active Status</th>
                    <td style="background-color:#4CAF50;color:white;" v-if="assessment.isActive == true">&nbsp;&nbsp;Active&nbsp;&nbsp;</td>
                    <td style="background-color:#FF5252;color:white;" v-else>Disabled</td>
                  </tr>
                </tbody>
                </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <div v-else>
          <v-card color='background'>
            <p style="color:#3c5c77b5">No Assessments Available 
            <br>
            Click the + button to add an assessment</p>
          </v-card>
      </div>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
</div>
</template>

<script>
import Assessment from "@/services/Assessment";
import Criteria from "@/services/Criteria";
export default {
  data() {
    return {
      request: "VIEW_ASSESSMENT",
      assessments: [],
      criteria:[],
      subjectID:null,
      hasCriteria:"",
      newTaskName:"",
      snackBarMessage: "",
      /* Flags */
      selectedTask:null,
      hasAssessment:false,
      coordinatorCheck: true,
      errored: false,
      hasSelected: false,
      isActive: false,
      snackbarSuccess: false,
      snackbarError: false,
      addAssessmentClicked: false,
      isAddCriteria:false,
      lastAssessmentId:null,
      elementSelected:null,
      maxMarkInput:null,
      displayTextInput:null,
    };
  },
  
  methods: {
    /* Return the value of the clicked assessment */
    taskClicked(id) {
      this.hasSelected = true;
      this.isAddCriteria = false;
      this.assessments.find(element => {
        if (element.id === id) {
          this.selectedTask = element;
        }
      });
      this.lastAssessmentId = id;
      this.isActive = parseInt(this.selectedTask.isActive);
      /* Populate Criteria if exists */
      this.getCriteria(id);
    },
    refresh() {
      this.isAddCriteria = false;  
      this.getCriteria(this.lastAssessmentId);
    },
    
    /* Event Handles the + button  for assessment*/
    addAssessment() {
      this.addAssessmentClicked = !this.addAssessmentClicked;
    },
    /* Event Handles the + button for assessment */
    addCriteriaClick() {
      this.isAddCriteria = !this.isAddCriteria;
    },

    /* Event handler for Add Task button */
    async createAssessment() {
      Assessment.createAssessments({
          request:"CREATE_ASSESSMENT",
          task_name:this.newTaskName,
          subject_id:this.subjectID
      }).then(response=> {
          this.getAssessments();
          this.snackBarMessage = "Assessment Created Successful!";
          this.snackbarSuccess = true;
      }).catch(error => {
          console.log(error);
      });
      this.newTaskName = "";
    },
    async addCriteria() {
      
       Criteria.createCriteria({
        request:"CREATE_CRITERIA",
        assessment_id:this.selectedTask.id,
        element:this.elementSelected,
        max_mark:this.maxMarkInput,
        display_text:this.displayTextInput
      }).then(respomse =>{
        this.refresh();
        this.snackBarMessage = "Criteria Created Successful!";

      }); 
      this.maxMarkInput="";
      this.displayTextInput="";
      this.elementSelected=null;  
    },
    /* Toggles of a subject the from v-swtich */
    async toggleActivation() {
    this.selectedTask.isActive = this.isActive;
    Assessment.toggleActivation({
      request:"TOGGLE_ACTIVATION",
      assessment_id: this.selectedTask.id
    }).then(response => {
        this.snackBarMessage = parseInt(this.isActive) ? this.selectedTask.name + " activated Succesfully !":  this.selectedTask.name + " de-activated Succesfully !";
        this.snackbarSuccess = true;
    }).catch(error =>{
        this.isActive = false;
        this.selectedTask.isActive = this.isActive;
        this.snackBarMessage = "Assessments need marking-criteria in order to be enabled";
        this.snackbarError = true;
    });
    },
    /* Get Criteria for selected assessment */
    async getCriteria(id) {
      Criteria.getCriteria({
        request: "VIEW_CRITERIA",
        assessment_id: id
      })
        .then(response => {
          this.criteria = response.data[0].records;
          this.hasCriteria = true;
       }).catch(error => {
          this.hasCriteria = false
          this.isAddCriteria = true;
         });
    },

    /* Populates assessment data */
    async getAssessments() {
      
        this.subjectID = this.$store.state.subjectID;
        const response = await Assessment.getAssessments({
            request: this.request,
            subject_id: this.subjectID,
            is_coordinator: this.coordinatorCheck
        }).then(response => {
            this.hasAssessment = true;
            this.assessments = response.data.records;
        }).catch(error => {
            this.hasAssessment = false;
            this.errored = true;
        });
    },
  async mounted() {

    }

  },
  async mounted() {
      this.getAssessments();
  }
}
</script>
<style scoped>
#criteriaBuilder {
  border: 1px;
  max-width: 100%;
  display: block;
  margin-left: 10%;
  margin-right: 10%;
}
.pageBreakHeading {
  padding: 1%;
  display: flex;
  color: white;
}
#splitPanel {
  min-width: 100% !important;
}

#assessmentContainer {
}

#cols {
  min-width: 50%;
}
</style>>

