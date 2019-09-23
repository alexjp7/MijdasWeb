<template>
  <div id="StudentLoader">
    <v-card color="secondary">
      <!-- Header -->
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students</h2>
          <v-spacer></v-spacer>
          <v-card>
            <!-- Toolbar with search and refresh buttons -->
            <v-toolbar dense="true" flat color="secondary">
              <v-btn icon @click="searchClicked">
                <v-icon color="white">mdi-magnify</v-icon>
              </v-btn>
              <v-btn @click="addClicked" color="white" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn @click="getStudents" color="white" icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </span>
      </v-card-title>
      <!-- Search Bar -->
      <v-card v-if="hasClickedSearch == true">
        <v-text-field
          solo
          autofocus="true"
          refs="search"
          flat="true"
          outlined="true"
          clearable="true"
          v-model="studentSearch"
          prepend-inner-icon="mdi-magnify"
          class="searchBar"
          label="Search"
        ></v-text-field>
      </v-card>
      <!-- Upload Tool -->
      <v-card v-if="hasClickedAdd == true">
        <v-card>
          <v-card-actions>
            <div id="uploader">
              <upload-btn id="uploadButton" icon @file-update="readFileInput">
                <template slot="icon">
                  <v-icon color="white">mdi-cloud-upload</v-icon>&nbsp;
                  <h3>Upload Students</h3>
                </template>
              </upload-btn>
            </div>
          </v-card-actions>
          <v-card id="fileName" color="white">{{fileName}}</v-card>
          <div v-if="hasValidFile == true">
            <v-card-actions>
              <v-btn
                block
                @click="submitStudents"
                style="color:black;font-weight:bold;"
                color="accent"
              >Submit</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-card>
      <v-snackbar color="green" v-model="snackbar">
        <p style="color:white;">{{snackBarMessage}}</p>
        <v-btn color="red" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- Student Table -->
      <v-data-table
        :headers="headers"
        :items="studentsRetrieved"
        :items-per-page="5"
        :search="studentSearch"
        class="elevation-1"
        id="studentTable"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import Sesssion from "@/services/Session";
import Subject from "@/services/Subject";
import UploadButton from "vuetify-upload-button";
export default {
  data: () => ({
    snackBarMessage: "",
    snackbar: false,
    subject_id: "",
    /* Request arrays */
    studentsUploaded: [],
    studentsRetrieved: [],
    /* Table populators */
    headers: [],
    studentSearch: "",
    fileName: "",
    /* Flags */
    hasClickedSearch: false,
    hasValidFile: false,
    hasClickedAdd: false
  }),
  components: {
    "upload-btn": UploadButton
  },

  methods: {
    /* File Uplaoder Tool */
    readFileInput(file) {
      const reader = new FileReader();
      reader.onload = e => (this.studentsUploaded = e.target.result.split(","));
      reader.readAsText(file);

      this.fileName = file.name;
      this.hasValidFile = true;
    },
    /* API Handler for submiting student data */
    async submitStudents() {
      this.subject_id = this.$store.state.subject;
      const response = await Subject.addStudents({
        request: "ADD_STUDENTS",
        students: this.studentsUploaded,
        subject_id: this.subject_id
      }).then(response => {
        this.snackBarMessage = "Upload Succesful!";
        this.snackbar = true;
      });
      this.getStudents();
    },
    /* Tool Bar toogles */
    searchClicked() {
      this.hasClickedAdd = false;
      this.hasClickedSearch = !this.hasClickedSearch;
    },
    addClicked() {
      this.hasClickedSearch = false;
      this.hasClickedAdd = !this.hasClickedAdd;
    },
    /* Table Population */
    async getStudents() {
      this.subject_id = this.$store.state.subject;
      Sesssion.getStudents({
        //Popualte students
        request: "VIEW_STUDENTS_BY_SUBJECT",
        subject_id: this.subject_id
      })
        .then(response => {
          //Reset values of students and headers, in the case of repeated calls (through refresh)
          this.studentsRetrieved = [];
          this.headers = [];
          //Bind head for student ID
          this.studentsRetrieved = response.data;
          this.headers.push({
            text: "Student ID",
            value: "student_id",
            align: "left",
            sortable: true
          });
          //Populate Assessment Tasks and student results if exists
          let tasks = this.studentsRetrieved[0].tasks;
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
  /* LifeCycle hooks */
  async mounted() {
    this.getStudents();
  }
};
</script>

<style  scoped>
#pageBreakHeading {
  padding-left: 1%;
  padding-right: 1%;
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

.searchBar.v-input {
  max-height: 5vh;
  background-color: white;
}

.v-data-table-header {
  font-weight: bold !important;
}

#fileName {
  color: blue;
  font-weight: bold;
  text-align: center !important;
  font-style: italic;
  margin-left: 10%;
  margin-right: 10%;
}
#uploader {
  height: 10%;
  width: 100%;
  display: inline-flex;
}
#uploadButton {
  width: 100%;
}
</style>
