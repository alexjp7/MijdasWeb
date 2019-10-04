<template>
  <div id="studentsPage">
      <v-card color="primary">
        <v-card-title>
            <span id="pageBreakHeading">
                <h2 style="color:white;">Student Dashboard</h2>
                <v-spacer></v-spacer>
                <v-card>
                <!-- Toolbar with search and refresh buttons -->
                <v-toolbar dense="true" flat color="primary">
                    <v-btn @click="getStudents" color="white" icon>
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>
                </v-toolbar>
                </v-card>
            </span>
        </v-card-title>
      </v-card>
    <v-card  color="background">
        <v-row >
            <v-card elevation="4" color="secondary" style="min-width:100%">
                <v-card-title >
                    <h4 style="padding-left:3%;" id="pageBreakHeading">Your Assessments</h4>
                </v-card-title>
            </v-card>
        </v-row>
        <v-row>
            <v-col :cols="3">
                <v-card elevation="4">
                    <v-treeview
                        return-object
                        hoverable
                        open-on-click=""
                        :items="tasks" 
                        :active="active"
                        transition
                        v-model="taskSelection"
                        @click:active="taskClicked">
                        <!-- slot for label click listener -->
                            <template slot="label" slot-scope="{ item }">
                                <div v-if="item.type == 'child_node'">
                                    <v-card>
                                        <v-btn block  @click="taskClicked(item)">
                                            {{ item.name}}
                                        </v-btn>
                                    </v-card>
                                </div>
                                <div v-else-if="item.type == 'parent_node' ">
                                    <v-card>
                                        {{ item.name}}
                                    </v-card>
                                </div>
                            </template>
                            <!-- adds open/close folder change -->
                            <template v-slot:prepend="{ item, open }">
                                <v-icon v-if="!item.file">
                                    {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                                </v-icon>
                                <v-icon v-else>
                                    {{ files[item.file] }}
                                </v-icon>
                            </template>
                    </v-treeview>
                </v-card>
            </v-col>
            <v-col>
                <!-- Right side panel -->
                <div v-if="selectedTaskName == null">
                <v-card color='background'>
                    <p style="color:#3c5c77b5"> Expand a subject and select a task
                        <br> to view your results!
                    </p>
                </v-card>
                </div>
                <div v-else>
                    <v-card color="secondary">
                        <v-card-title  id="pageBreakHeading">
                            <h3>{{selectedTaskName}}</h3>
                        </v-card-title>
                    </v-card>
                    <v-card elevation="4" >
                            <hr>
                            <v-row style="padding-left:1%;">
                                <v-col :cols="3">
                                    <v-card >
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th> Overall:</th>
                                                        <td>
                                                            <h3>{{markRecieved}}/{{markOutOf}}</h3>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <v-card>
                                        
                                        </v-card>
                                    </v-card>
                                    <br>
                                    <br>
                                    <h3>Assessment Statistics</h3>
                                    <hr>
                                    <br>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                                <tr>
                                                    <th> Average:</th>
                                                    <td>
                                                        <h3>12/{{markOutOf}}</h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Cohort Ranking:</th>
                                                    <td>
                                                        <h3>3rd</h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Best Attempted:</th>
                                                    <td>
                                                        <h3>Output</h3>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th> Worst Attempted:</th>
                                                    <td>
                                                        <h3>Style</h3>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                    
                                    
                                </v-col>
                                <v-col >
                                    <!-- Mark Breakdown expansion panel -->
                                    <v-card>
                                       <v-expansion-panels>
                                           <v-expansion-panel>
                                                <v-expansion-panel-header>
                                                    <h3>Result Breakdown</h3>
                                                </v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <div v-for="result in markBreakdown.slice().reverse()" v-bind:key="result">
                                                        <v-card >
                                                            <v-row>
                                                            <v-col :cols="3"> 
                                                                    <v-card color="trim" style="color:white;">
                                                                      {{result.criteria}}
                                                                    </v-card>
                                                            </v-col>
                                                            <v-col v-if="result.comment == null">
                                                                <v-layout align-center>
                                                                    {{result.result}}
                                                                </v-layout>
                                                            </v-col>
                                                            <v-col v-else>
                                                                <v-layout align-center>
                                                                    {{result.comment}}
                                                                </v-layout>
                                                            </v-col>
                                                            </v-row>
                                                        </v-card> 
                                                    </div>
                                                </v-expansion-panel-content>
                                           </v-expansion-panel>
                                       </v-expansion-panels>
                                    </v-card>
                                </v-col>
                            </v-row>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import Session from "@/services/Session";
export default {
    data: () => ({
        // Test Student
        selectedSubject:"",
        student_id:"alice",
        files: {
            task: "mdi-file-document-outline",
        },
        tasks:[],
        selectedTaskName:null,
        markRecieved:null,
        markOutOf:null,
        cohortResults:[],
        markBreakdown:[]
        
    }),
    methods: {
        taskClicked(item) {
            //Only process click event if child node is pressed
            if(item.type !== "child_node") 
                return;

            this.selectedTaskName = item.name;
            this.getAssessmentData(item.id);
        },

        async getTasks() {
            Session.getStudentSubjects({
                 request:"VIEW_STUDENT_ENROLMENT",
                 student_id:this.student_id
            }).then(response => {
                this.tasks = response.data;
            }).catch(error=>console.log(error));
        },
        async getAssessmentData(assessmentId) {
            Session.getStudentAssessmentData({
                request:"VIEW_RESULTS",
                assessment_id: assessmentId,
                student_id:this.student_id
            }).then(response => {
                //Reset existing values
                this.clear();
                //Aggregate criteria data to determine total result
                let studentData =  response.data[0].student_results;
                studentData.forEach(element => {
                    this.markRecieved += element.result === null 
                                    ? 0
                                    : parseFloat(element.result);

                    this.markOutOf += element.max_mark === null 
                                    ? 0
                                    : parseFloat(element.max_mark);
                    this.markBreakdown.push({
                        "result":element.result,
                        "criteria":element.display_text,
                        "comment":element.comment
                    });
                    this.cohortResults = response.data[1].cohort_results;
                });
            }).catch(error=>console.log(error));

        },
        clear() {
            //Reset values to prevent accumulation
            this.markBreakdown = [];
            this.markRecieved = 0;
            this.markOutOf = 0;
        }
    },
    async mounted() {
        this.getTasks();
    }
}
</script>

<style scoped>
#pageBreakHeading {
  padding-left: 1%;
  padding-right: 1%;
  width: 100%;
  text-align: left;
  display: flex;
  color:white;
}

.taskTab {
    color:white !important;

}
#studentsPage {
    border: 1px;
    max-width: 100%;
    display: block;
}


div .v-treeview-node__root {
 font-weight: bold;
}
.v-tab {
}

td {
}
</style>