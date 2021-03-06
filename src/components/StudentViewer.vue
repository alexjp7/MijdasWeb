<!--
--  Authors: Sam, Alex
-->

<template>
  <div id="StudentLoader">
    <v-divider vertical></v-divider>

    <v-card color="secondary">
      <!-- Header -->
      <v-card-title>
        <!-- <span id="pageBreakHeading"> -->
        <h2 style="color:white;">Students</h2>
        <!-- </span> -->
        <v-spacer></v-spacer>
        <!-- Toolbar with search and refresh buttons -->
        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="searchClicked" color="white">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Search</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="addClicked" color="white" icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Upload File</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" @click="getStudents" color="white" icon>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh</span>
          </v-tooltip>
        </v-card-actions>
      </v-card-title>
    </v-card>

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
      <v-divider vertical></v-divider>
    </v-card>
    <!-- Upload Tool -->
    <v-card v-if="hasClickedAdd == true">
      <v-card style="max-height:20vh !important;">
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
          <v-divider vertical></v-divider>
        </div>
      </v-card>

      <v-snackbar color="green" v-model="snackbar">
        <p style="color:white;">{{snackBarMessage}}</p>
        <v-btn color="red" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <!-- Student Table -->
    </v-card>
    <v-card>
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
    subjectCode: "",
    snackBarMessage: "",
    snackbar: false,
    subjectID: "",
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
      reader.onload = e => {
        this.studentsUploaded = e.target.result.split(",");
        console.log(this.studentsUploaded);
      };
      reader.readAsText(file);

      this.fileName = file.name;
      this.hasValidFile = true;
    },
    /* API Handler for submiting student data */
    async submitStudents() {
      this.subjectID = this.$store.state.subjectID;
      const response = await Subject.addStudents({
        request: "ADD_STUDENTS",
        students: this.studentsUploaded,
        subject_id: this.subjectID
      })
        .then(response => {
          this.snackBarMessage = "Upload Successful!";
          this.snackbar = true;
        })
        .catch(error => console.log(error));

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
      this.subjectID = this.$store.state.subjectID;
      Sesssion.getStudents({
        //Popualte students
        request: "VIEW_STUDENTS_BY_SUBJECT",
        subject_id: this.subjectID
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
    this.subjectCode = this.$store.state.subjectCode;
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
