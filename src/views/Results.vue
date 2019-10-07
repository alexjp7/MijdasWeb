<template>
  <div id="studentsPage">
      <v-card color="primary">
        <v-card-title>
            <span id="pageBreakHeading">
                <h2 style="color:white;">MarkIt Student Dashboard</h2>
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
        <v-row>
        <v-col :cols="2">
            <v-card elevation="4" color="secondary" >
                <v-card-title >
                    <h4 style="padding-left:3%;" id="pageBreakHeading">Your Assessments</h4>
                </v-card-title>
            </v-card>
                <v-card elevation="4" id="drillDownCard" >
                    <v-treeview 
                        return-object
                        hoverable
                        activatable
                        color="secondary"
                        open-on-click=""
                        :items="tasks" 
                        :active="active"
                        transition
                        v-model="taskSelection"
                        @click:active="taskClicked">
                        <!-- slot for label click listener -->
                            <template slot="label" slot-scope="{ item }" >
                                <div v-if="item.type == 'child_node'">
                                        <v-btn block=""  @click="taskClicked(item)">
                                            {{ item.name}}
                                        </v-btn>
                                </div>
                                <div v-else-if="item.type == 'parent_node' ">
                                        {{ item.name}}
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
                            <br> 
                            to view your results!
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
                                <v-col :cols="4">
                                    <v-card >
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <tbody>
                                                    <tr>
                                                        <th> Overall:</th>
                                                        <td> <h3>{{markRecieved}}/{{markOutOf}}</h3></td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                        <!-- Overall Cohort Statistics -->
                                    </v-card>
                                    <br>
                                    <br>
                                    <h3>Cohort Statistics</h3>
                                    <hr>
                                    <br>
                                    <v-simple-table>
                                        <template v-slot:default>
                                            <tbody>
                                                <tr>
                                                    <th>Assessment  Average:</th>
                                                    <td><h3>{{averageMark}} / {{markOutOf}}</h3></td>
                                                </tr>
                                                <tr>
                                                <th> Cohort Best Attempted:</th>
                                                    <td><h3>{{bestCriterion.display_text}}</h3></td>
                                                </tr>
                                                <tr>
                                                    <th>Cohort Worst Attempted:</th>
                                                    <td><h3>{{worstCriterion.display_text}}</h3></td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table> 
                                </v-col>
                                <v-col>
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
                                                                <v-card elevation="3" style="font-weight:bold;">
                                                                    {{result.result}} / {{result.maxMark}}
                                                                </v-card>
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
                <br>
        <!-- Further stats -->
        <div v-if="selectedTaskName != null"  >
                <v-row>
                    <v-card color="secondary" id="drillDownHeading">
                        <v-card-title  id="pageBreakHeading">
                            <h3 >Cohort Averages</h3>
                        </v-card-title>
                    </v-card>
                    <v-card color="white" elevation="4" id ="drillDownCard">
                        <v-row>
                            <v-col :cols="3">
                                <v-card  color="accent" style="color:black;">
                                    <h4>{{selectedTaskName}} Criteria</h4>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card color="accent" style="color:black;">
                                    <h4>Your Mark</h4>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card color="accent" style="color:black;">
                                    <h4>Cohort Average</h4>
                                </v-card>
                            </v-col>
                            <v-col>
                                <v-card color="accent" style="color:black;">
                                    <h4>Your Mark Compared to Cohort Average</h4>
                                </v-card>
                            </v-col>
                        </v-row>
                            <!-- Performance comparison -->
                            <div v-for="(criterion) in cohortPerformance.slice().reverse()" v-bind:key="criterion">
                                <div v-if="criterion.index != 0">
                                    <v-card style="padding:1%;" >
                                        <v-row>
                                            <v-col :cols="3"> 
                                                <v-card color="trim" style="color:white;">
                                                    {{criterion.display_text}} 
                                                </v-card>
                                            </v-col>
                                            <v-col>
                                                <v-card elevation="3" style="font-weight:bold;">
                                                    {{criterion.student_mark}} / {{criterion.max_mark}}
                                                </v-card>
                                            </v-col>
                                            <v-col>
                                                <v-card elevation="3" style="font-weight:bold;">
                                                    {{criterion.average}} / {{criterion.max_mark}}
                                                </v-card>
                                            </v-col>
                                            <v-col>
                                                <v-card  elevation="3" style="font-weight:bold;" v-if="criterion.student_mark < criterion.average" >
                                                    <v-icon color="warning">mdi-chevron-down-box</v-icon>
                                                    {{Math.abs(((criterion.student_mark/criterion.max_mark) * 100) - ((criterion.average/criterion.max_mark) * 100)).toFixed(1)}}%
                                                </v-card>
                                                <v-card  elevation="3" style="font-weight:bold;" v-else>
                                                    <v-icon color="success">mdi-chevron-up-box</v-icon>
                                                    {{Math.abs(((criterion.student_mark/criterion.max_mark) * 100) - ((criterion.average/criterion.max_mark) * 100)).toFixed(1)}}%
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-card> 
                                </div>
                            </div>
                    </v-card>
                </v-row>
                <br>
                <v-row>
                    <!-- Distribution -->
                    <v-card color="secondary" id="drillDownHeading">
                        <v-card-title  id="pageBreakHeading">
                            <h3>Cohort Distribution</h3>
                        </v-card-title>
                    </v-card>
                    <v-card color="white" elevation="4" id = "drillDownCard">
                        <!-- Graph -->
                        <v-sparkline 
                        :fill="true"
                        :gradient="gradient"
                        :line-width="10"
                        :padding="8"
                        :value="cohortResults"
                        :labels ="labels"
                        :auto-draw="graphDraw"
                        :smooth="radius || true"
                        :type = "type"
                        label-size="4.5"
                        ></v-sparkline>
                    </v-card>   
                </v-row>
            <v-col >
            </v-col>
        </div>
                </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script>

/* graph colors */
 const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
import Session from "@/services/Session";
import { type } from 'os';
export default {
    data: () => ({
        //Graph attributes
        graphDraw:false,
        gradient: gradients[1],
        gradients,
        type:"bars",

        // Test Student
        student_id:"edward",
        //Rendered Values
        selectedSubject:"",
        averageMark:null,
        selectedTaskName:null,
        markRecieved:null,
        markOutOf:null,
        files: {task: "mdi-file-document-outline"},
        worstCriterion:{display_text:"null"},
        bestCriterion:{display_text:"null"},
        markBreakdown:[],
        tasks:[],
        labels:[],
        cohortPerformance:[],
    }),
    methods: {
        taskClicked(item) {
            //Only process click event if child node is pressed
            if(item.type !== "child_node") 
                return;
            this.graphDraw = false;
            this.selectedTaskName = item.name;
            this.getAssessmentData(item.id);
        },
        initialiseStudentData(studentData) {
            studentData.forEach(element => {
                this.markRecieved += element.result === null 
                                ? 0
                                : element.result;

                this.markOutOf += element.max_mark === null 
                                ? 0
                                : element.max_mark;
                this.markBreakdown.push({
                    "result":element.result,
                    "criteria":element.display_text,
                    "comment":element.comment,
                    "maxMark":element.max_mark
                    });
            });
        },
        processAggregates(assessmentData, cohortAverage) {
            //Derive performance values
            let highestPerformingCriterion = assessmentData[0];
            let lowestPerformingCriterion =  assessmentData[0];
            let lowestAverage = (assessmentData[0].average.toFixed(1) / (assessmentData[0].max_mark).toFixed(1)) * 100;
            let highestAverage = (assessmentData[0].average.toFixed(1) / (assessmentData[0].max_mark).toFixed(1)) * 100;
            
            //Claculate performance in percentage
            assessmentData.forEach(criterion => {
                let current = (criterion.average.toFixed(1) / criterion.max_mark.toFixed(1)) * 100 ;
                if(current < lowestAverage ) {
                    lowestAverage = current;
                    lowestPerformingCriterion = criterion;
                }
                if(current > highestAverage) {
                    highestAverage = current;
                    highestPerformingCriterion = criterion;
                }
            });
        
            let arraySize = this.markBreakdown.length;
            for (let i = 1; i < arraySize; i++) {

                this.cohortPerformance[i-1] = {
                    "display_text": assessmentData[i-1].display_text,
                    "average": (assessmentData[i-1].average).toFixed(1),
                    "student_mark": this.markBreakdown[i].result,
                    "max_mark": assessmentData[i-1].max_mark,
                };
            }
            
            console.table(this.cohortPerformance);
            this.averageMark = cohortAverage.toFixed(1);
            this.worstCriterion = lowestPerformingCriterion;
            this.bestCriterion = highestPerformingCriterion;
        },
        processCohortData(cohortData) {

            this.labels = [ "0 - "+ (this.markOutOf/4), (this.markOutOf/4) + "-" + this.markOutOf/2,  (this.markOutOf/2) + " - " + (this.markOutOf/4)*3, (this.markOutOf/4)*3 + " - " + this.markOutOf];
            this.cohortResults = cohortData;
            this.graphDraw = true;
        },
        clear() {
            //Reset values to prevent accumulation
            this.markBreakdown = [];
            this.markRecieved = 0;
            this.markOutOf = 0;
            this.averageMark = "null";
            this.worstCriterion = "null";
            this.bestCriterion = "null";
            this.cohortPerformance = [];
            this.cohortResults = []; 
            this.graphDraw = false;
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
                //Reset existing values, and initialise studentData and aggregated data
                this.clear();
                this.initialiseStudentData(response.data.student_results)
                this.processAggregates(response.data.criteria_performance, response.data.cohort_average);
                this.processCohortData(response.data.quartiles);
                
            }).catch(error=>console.log(error));
        },
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
    margin:auto;
    max-width: 100%;
    display: block;
}
div .v-treeview-node__root {
 font-weight: bold;
}


#drillDownCard {
    padding-top: 1%;
    min-width:100%;
    background-color: white;
}
#drillDownHeading {
    
    min-width:100%;
}
.row {
    margin:0 !important;
}
</style>