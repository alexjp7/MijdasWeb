<!--
--  Authors: Alex
-->

<template>
  <div id="studentsPage">
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Student Results</h2>
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
    <v-card color="background">
          <v-card elevation="4" color="secondary">
            <v-card-title>
              <h4  id="pageBreakHeading">Assessments</h4>
            </v-card-title>
          </v-card>
          <v-card elevation="4" id="drillDownCard">
            <v-tabs
            fixed-tabs>
            <div v-for="task in tasks" v-bind:key="task">
              <v-tab @click="taskClicked(task)" >
                  {{task.name}}
              </v-tab>
            </div>
            </v-tabs>
          </v-card>
          <!-- Right side panel -->
          <div v-if="selectedTask == null">
            <v-card color="background">
              <p style="color:#3c5c77b5">
                Click  a task to view <br/>your students results  
              </p>
            </v-card>
          </div>
          <div v-else>
            <v-card color="trim">
              <v-card-title id="pageBreakHeading">
                <h3>{{selectedTask.name}}</h3>
              </v-card-title>
            </v-card>
            <v-card elevation="4">
              <hr />
              <v-row style="padding-left:1%;">
                  <h3>Cohort Statistics</h3>
                  <hr/>
                  <br/>
              </v-row>
              <v-row>
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th>Assessment Average:</th>
                          <td>
                            <h3>{{averageMark}} / {{selectedTask.max_mark}}</h3>
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
                    </v-row>
            </v-card>
          <br />
          <!-- Further stats -->
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
                      <h4>Cohort Average</h4>
                    </v-card>
                  </v-col>
                </v-row>
                <!-- Performance comparison -->
                <div
                  v-for="(criterion) in assessmentData.slice().reverse()"
                  v-bind:key="criterion">
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
                          >{{criterion.average.toFixed(1)}} / {{criterion.max_mark}}</v-card>
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
    </v-card>
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
import Subject from "@/services/Subject";
import Assessment from "@/services/Assessment";
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
    selectedTask: null,
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
    assessmentData:[],
    grow: true,
  }),
  methods: {
    taskClicked(item) {
      //Only process click event if child node is pressed
      this.graphDraw = false;
      this.selectedTask = item;
      this.getAssessmentData(item.id);
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

      this.assessmentData = assessmentData;
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
      Assessment.getAssessments({
        request: "VIEW_ASSESSMENT",
        subject_id: this.$store.state.subjectID,
        is_coordinator: false
      }).then(response => {
          this.tasks = response.data["records"];
        }).catch(error => console.error(error));
    },
    async getAssessmentData(assessmentId) {
      Session.getStudentAssessmentData({
        request: "VIEW_COHORT_RESULTS",
        assessment_id: assessmentId
      })
        .then(response => {
          //Reset existing values, and initialise studentData and aggregated data
          this.clear();
          this.processAggregates(response.data.criteria_performance,response.data.cohort_average);
          this.processCohortData(response.data.quartiles);
          this.hasValidStudentId = true;
        }).catch(error => console.error(error));
    }
  },
  
  //Only retrieve student data if ID query parameter is set
  async mounted() {
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