<template>
  <div id="StudentLoader">
    <v-card color="secondary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students</h2>
          <v-spacer></v-spacer>
          <v-text-field v-model="studentSearch" class="searchBar" label="Search Student"></v-text-field>
          <v-card-action>
            <v-btn @click="getStudents" color="secondary">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-card-action>
        </span>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="5"
        :search="studentSearch"
        class="elevation-1"
        id="studentTable"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import Subject from "@/services/Session";
export default {
  data: () => ({
    subject_id: 1,
    students: [],
    headers: [],
    studentSearch: ""
  }),
  methods: {
    //Returns the API response of student data per subject
    async getStudents() {
      Subject.getStudents({
        //Popualte students
        request: "VIEW_STUDENTS_BY_SUBJECT",
        subject_id: this.subject_id
      })
        .then(response => {
          //Reset values of students and headers, in the case of repeated calls (through refresh)
          this.students = [];
          this.headers = [];
          //Bind head for student ID
          this.students = response.data;
          this.headers.push({
            text: "Student ID",
            value: "student_id",
            align: "left",
            sortable: true
          });
          //Populate Assessment Tasks and student results if exists
          let tasks = this.students[0].tasks;
          if (tasks !== null) {
            let tasksLength = tasks.length;
            for (let i = 0; i < tasksLength; i++) {
              this.headers.push({
                text: tasks[i].task_name,
                value: "tasks[" + i + "].result",
                sortable: true
              });
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  //On Page mount, populate table with student data
  async mounted() {
    this.getStudents();
  }
};
</script>

<style  scoped>
#pageBreakHeading {
  padding: 1%;
  width: 100%;
  text-align: left;
  display: flex;
}
#StudentLoader {
  margin-left: 10%;
  margin-right: 10%;
  max-width: 100%;
  display: block;
}
.v-data-footer {
  background-color: #2196f3 !important;
}
.searchBar {
  padding: 1%;
  max-width: 25%;
  background-color: white;
  height: 3.2vh;
}
</style>
