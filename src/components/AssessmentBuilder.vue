<template>
  <!-- 0 == checkbox, 1 == slider, 2 == number box -->
  <div id="criteriaBuilder">
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
            <v-btn @click="addClicked" color="white" icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="getStudents" color="white" icon>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-card-title>
    </v-card>
    <v-card>
      <!-- Current Assessment -->
      <v-container id="assessmentContainer">
        <v-row id="splitPanel">
          <v-col id="cols" :cols="4">
            <h1 style="padding:1%;">Selected</h1>
            <div v-if="hasSelected == false">
              <v-card color="background">
                <p style="color:#3c5c77b5">
                  No Task Selected
                  <br />Expand a task to view
                </p>
              </v-card>
            </div>
            <div v-else>
              <!-- Left side edit panel -->
              <v-form>
                <v-card>
                  <div style="display:flex;">
                    <!-- Lab task Name -->
                    <v-text-field
                      :class="`d-flex justify-1 mb-6`"
                      v-model="selectedTask.name"
                      label="Assessment Name"
                      class="pa-2"
                      :counter="20"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <!-- Activation Toggle -->
                    <v-switch
                      color="primary"
                      v-model="selectedTask.isActive"
                      :class="`d-flex justify-2 mb-6`"
                      class="pa-2"
                      label="active"
                    ></v-switch>
                  </div>
                </v-card>
              </v-form>
              <v-container>
                <!-- Criteria Display -->
                <v-card color="secondary">
                  <h2 style="color:white;">Assessment-Criteria</h2>
                  <hr />
                </v-card>
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
                            <td v-else-if="criterion.element == 2">TextField</td>
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
          </v-col>
          <!-- Right side selector -->
          <v-col :cols="4" id="cols">
            <h1 style="padding:1%;">Current Assessments</h1>
            <v-expansion-panels>
              <v-expansion-panel v-for="assessment in assessments" v-bind:key="assessment">
                <!-- Task Name Header -->
                <v-expansion-panel-header @click="taskClicked(assessment.id)">
                  <h2>{{assessment.name}}</h2>
                </v-expansion-panel-header>
                <!-- Assessment Contents -->
                <v-expansion-panel-content>
                  <hr />
                  <v-simple-table>
                    <template v-slot:default>
                      <tbody>
                        <tr>
                          <th>Task Name</th>
                          <td>{{assessment.name}}</td>
                        </tr>
                        <tr>
                          <th>Assessment Number</th>
                          <td>{{assessment.a_number}}</td>
                        </tr>
                        <tr>
                          <th>Max Mark</th>
                          <td>{{assessment.max_mark}}</td>
                        </tr>
                        <tr>
                          <th>Active Status</th>
                          <td
                            style="background-color:#4CAF50;color:white;"
                            v-if="assessment.isActive == true"
                          >&nbsp;&nbsp;Active&nbsp;&nbsp;</td>
                          <td style="background-color:#FF5252;color:white;" v-else>Disabled</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
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
      criteria: [],
      subjectID: "",
      selectedTask: "",
      hasCriteria: "",
      coordinatorCheck: true,
      errored: false,
      hasSelected: false
    };
  },

  methods: {
    /* Return the value of the clicked assessment */
    taskClicked(id) {
      this.hasSelected = true;
      this.assessments.find(element => {
        if (element.id === id) {
          this.selectedTask = element;
        }
      });
      /* Populate Criteria if exists */
      this.getCriteria(id);
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
        })
        .catch(error => console.log(error));
    }
  },
  /*  props: {
    subjectID: String
  }, */
  async mounted() {
    this.subjectID = this.$store.state.subjectID;
    const response = await Assessment.getAssessments({
      request: this.request,
      subject_id: this.subjectID,
      is_coordinator: this.coordinatorCheck
    })
      .then(response => {
        this.assessments = response.data.records;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  }
};
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

