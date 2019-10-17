<template>
  <div id="studentsPage">
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">MarkIt Student Dashboard</h2>
          <v-spacer></v-spacer>
          <v-card>
            <!-- Toolbar with search and refresh buttons -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="getStudents" color="secondary">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh</span>
            </v-tooltip>
          </v-card>
        </span>
      </v-card-title>
    </v-card>
    <!-- Validate whether site has been visited with student ID access string-->
  <div  v-if="hasValidStudentId == false">
     <v-dialog v-model="dialog" persistent max-width="700">
      <v-card>
        <v-card color="primary">
          <v-card-title  style="color:white;" class="headline">Results Unreachable</v-card-title>
        </v-card>
          <v-card color="accent">
        <v-row>
          <v-col :cols="2">
            <v-icon x-large  class="group pa-2" >mdi-lock-alert</v-icon>
          </v-col>
          <v-col>
            <h2>
                Whoops,
            </h2>
              <h3>
                 Please use the link that was emailed to you!
              </h3>
                If you're note sure about this
                 feature, contact your Subject Supervisor
          </v-col>

        </v-row>
          </v-card>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <v-card color="background">
      <v-row>
        <v-col :cols="2">
          <v-card elevation="4" color="secondary">
            <v-card-title>
              <h4 style="padding-left:3%;" id="pageBreakHeading">Your Tasks</h4>
            </v-card-title>
          </v-card>
          <v-card elevation="4" id="drillDownCard">
            <v-treeview
              return-object
              hoverable
              activatable
              color="secondary"
              open-on-click
              :items="tasks"
              :active="active"
              transition
              v-model="taskSelection"
              @click:active="taskClicked"
            >
              <!-- slot for label click listener -->
              <template slot="label" slot-scope="{ item }">
                <div v-if="item.type == 'child_node'">
                  <v-btn block @click="taskClicked(item)">{{ item.name}}</v-btn>
                </div>
                <div v-else-if="item.type == 'parent_node' ">{{ item.name}}</div>
              </template>
              <!-- adds open/close folder change -->
              <template v-slot:prepend="{ item, open }">
                <v-icon v-if="!item.file">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
                <v-icon v-else>{{ files[item.file] }}</v-icon>
              </template>
            </v-treeview>
          </v-card>
        </v-col>
        <v-col>
          <!-- Right side panel -->
          <div v-if="selectedTaskName == null">
            <v-card color="background">
              <p style="color:#3c5c77b5">
                Expand a subject and select a task
                <br />to view your results!
              </p>
            </v-card>
          </div>
          <div v-else>
            <v-card color="secondary">
              <v-card-title id="pageBreakHeading">
                <h3>{{selectedTaskName}}</h3>
              </v-card-title>
            </v-card>
            <v-card elevation="4">
              <hr />
              <v-row style="padding-left:1%;">
                <v-col :cols="4">
                  <v-card>
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <th>Overall:</th>
                            <td>
                              <h3>{{markRecieved}}/{{markOutOf}}</h3>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <!-- Overall Cohort Statistics -->
                  </v-card>
                  <br />
                  <br />
                  <h3>Cohort Statistics</h3>
                  <hr />
                  <br />
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th>Assessment Average:</th>
                          <td>
                            <h3>{{averageMark}} / {{markOutOf}}</h3>
                          </td>
                        </tr>
                        <tr>
                          <th>Cohort highest Average:</th>
                          <td>
                            <h3>{{bestCriterion.display_text}}</h3>
                          </td>
                        </tr>
                        <tr>
                          <th>Cohort Lowest Average:</th>
                          <td>
                            <h3>{{worstCriterion.display_text}}</h3>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col>
                  <!-- Mark Breakdown expansion panel -->
                  <v-card>
                    <h3>Result Breakdown</h3>
                    <br />

                    <div v-for="result in markBreakdown.slice().reverse()" v-bind:key="result">
                      <v-card>
                        <v-row>
                          <v-col :cols="3">
                            <v-card color="trim" style="color:white;">{{result.criteria}}</v-card>
                          </v-col>
                          <v-col v-if="result.comment == null">
                            <v-card
                              elevation="3"
                              style="font-weight:bold;"
                            >{{result.result}} / {{result.maxMark}}</v-card>
                          </v-col>
                          <v-col v-else>
                            <v-layout align-center>{{result.comment}}</v-layout>
                          </v-col>
                        </v-row>
                      </v-card>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <br />
          <!-- Further stats -->
          <div v-if="selectedTaskName != null">
            <v-row>
              <v-card color="secondary" id="drillDownHeading">
                <v-card-title id="pageBreakHeading">
                  <h3>Cohort Averages</h3>
                </v-card-title>
              </v-card>
              <v-card color="white" elevation="4" id="drillDownCard">
                <v-row>
                  <v-col :cols="3">
                    <v-card color="accent" style="color:black;">
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
                      <h4>Your Mark vs Cohort Average</h4>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Performance comparison -->
                <div
                  v-for="(criterion) in cohortPerformance.slice().reverse()"
                  v-bind:key="criterion"
                >
                  <div v-if="criterion.index != 0">
                    <v-card style="padding:1%;">
                      <v-row>
                        <v-col :cols="3">
                          <v-card color="trim" style="color:white;">{{criterion.display_text}}</v-card>
                        </v-col>
                        <v-col>
                          <v-card
                            elevation="3"
                            style="font-weight:bold;"
                          >{{criterion.student_mark}} / {{criterion.max_mark}}</v-card>
                        </v-col>
                        <v-col>
                          <v-card
                            elevation="3"
                            style="font-weight:bold;"
                          >{{criterion.average}} / {{criterion.max_mark}}</v-card>
                        </v-col>
                        <v-col>
                          <v-card
                            elevation="3"
                            style="font-weight:bold;"
                            v-if="criterion.student_mark < criterion.average"
                          >
                            <v-icon color="warning">mdi-chevron-down-box</v-icon>
                            {{Math.abs(((criterion.student_mark/criterion.max_mark) * 100) - ((criterion.average/criterion.max_mark) * 100)).toFixed(1)}}%
                          </v-card>
                          <v-card elevation="3" style="font-weight:bold;" v-else>
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
            <br />
            <v-row>
              <!-- Distribution -->
              <v-card color="secondary" id="drillDownHeading">
                <v-card-title id="pageBreakHeading">
                  <h3>Cohort Distribution</h3>
                </v-card-title>
              </v-card>
              <v-card color="white" elevation="4" id="drillDownCard">
                <!-- Graph -->
                <v-sparkline
                  :fill="true"
                  :gradient="gradient"
                  :line-width="10"
                  :padding="8"
                  :value="cohortResults"
                  :labels="labels"
                  :auto-draw="graphDraw"
                  :smooth="radius || true"
                  :type="type"
                  label-size="4.5"
                ></v-sparkline>
              </v-card>
            </v-row>
            <v-col></v-col>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
  </div>
</template>

<script>
/* graph colors */
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];
import Session from "@/services/Session";
import { type } from "os";
export default {
  data: () => ({
    //Graph attributes
    graphDraw: false,
    gradient: gradients[1],
    gradients,
    type: "bars",

    //dialog
    dialog:true,
    // Test Student
    student_id:null,
    //Rendered Values
    selectedSubject: "",
    averageMark: null,
    selectedTaskName: null,
    markRecieved: null,
    markOutOf: null,
    files: { task: "mdi-file-document-outline" },
    worstCriterion: { display_text: "null" },
    bestCriterion: { display_text: "null" },
    markBreakdown: [],
    tasks: [],
    labels: [],
    cohortPerformance: [],
    hasValidStudentId: true,
  }),
  methods: {
    taskClicked(item) {
      //Only process click event if child node is pressed
      if (item.type !== "child_node") return;
      this.graphDraw = false;
      this.selectedTaskName = item.name;
      this.getAssessmentData(item.id);
    },
    initialiseStudentData(studentData) {
      studentData.forEach(element => {
        this.markRecieved += element.result === null ? 0 : element.result;

        this.markOutOf += element.max_mark === null ? 0 : element.max_mark;
        this.markBreakdown.push({
          result: element.result,
          criteria: element.display_text,
          comment: element.comment,
          maxMark: element.max_mark
        });
      });
    },
    processAggregates(assessmentData, cohortAverage) {
      //Derive performance values
      let highestPerformingCriterion = assessmentData[0];
      let lowestPerformingCriterion = assessmentData[0];
      let lowestAverage =
        (assessmentData[0].average.toFixed(1) /
          assessmentData[0].max_mark.toFixed(1)) *
        100;
      let highestAverage =
        (assessmentData[0].average.toFixed(1) /
          assessmentData[0].max_mark.toFixed(1)) *
        100;

      //Claculate performance in percentage
      assessmentData.forEach(criterion => {
        let current =
          (criterion.average.toFixed(1) / criterion.max_mark.toFixed(1)) * 100;
        if (current < lowestAverage) {
          lowestAverage = current;
          lowestPerformingCriterion = criterion;
        }
        if (current > highestAverage) {
          highestAverage = current;
          highestPerformingCriterion = criterion;
        }
      });

      let arraySize = this.markBreakdown.length;
      for (let i = 1; i < arraySize; i++) {
        this.cohortPerformance[i - 1] = {
          display_text: assessmentData[i - 1].display_text,
          average: assessmentData[i - 1].average.toFixed(1),
          student_mark: this.markBreakdown[i].result,
          max_mark: assessmentData[i - 1].max_mark
        };
      }
      this.averageMark = cohortAverage.toFixed(1);
      this.worstCriterion = lowestPerformingCriterion;
      this.bestCriterion = highestPerformingCriterion;
    },
    processCohortData(cohortData) {
      this.labels = [
        "0 - " + this.markOutOf / 4,
        this.markOutOf / 4 + "-" + this.markOutOf / 2,
        this.markOutOf / 2 + " - " + (this.markOutOf / 4) * 3,
        (this.markOutOf / 4) * 3 + " - " + this.markOutOf
      ];
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
        request: "VIEW_STUDENT_ENROLMENT",
        student_id: this.student_id
      })
        .then(response => {
          this.tasks = response.data;
        }).catch(error => console.error(error));
    },
    async getAssessmentData(assessmentId) {
      Session.getStudentAssessmentData({
        request: "VIEW_RESULTS",
        assessment_id: assessmentId,
        student_id: this.student_id
      })
        .then(response => {
          //Reset existing values, and initialise studentData and aggregated data
          this.clear();
          this.initialiseStudentData(response.data.student_results);
          this.processAggregates(
            response.data.criteria_performance,
            response.data.cohort_average
          );
          this.processCohortData(response.data.quartiles);
          this.hasValidStudentId = true;
        }).catch(error => console.error(error));
    }
  },
  
  //Only retrieve student data if ID query parameter is set
  async mounted() {
    if(this.$route.query["id"]==null ){
      this.hasValidStudentId = false;
      return;
    }
    this.student_id = this.$route.query["id"];
    this.getTasks();
  }
};
</script>

<style scoped>
#pageBreakHeading {
  padding-left: 1%;
  padding-right: 1%;
  width: 100%;
  text-align: left;
  display: flex;
  color: white;
}

.taskTab {
  color: white !important;
}
#studentsPage {
  border: 1px;
  margin: auto;
  max-width: 100%;
  display: block;
}
div .v-treeview-node__root {
  font-weight: bold;
}

#drillDownCard {
  padding-top: 1%;
  min-width: 100%;
  background-color: white;
}
#drillDownHeading {
  min-width: 100%;
}
.row {
  margin: 0 !important;
}
</style>