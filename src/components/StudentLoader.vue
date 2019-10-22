<!--
--  Authors: Sam, Alex, Ilyas
-->

<template>
  <div id="StudentLoader">
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students Of {{subjectCode}}</h2>
          <v-spacer></v-spacer>
        </span>
      </v-card-title>
    </v-card>
    <v-card color="secondary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2>Student Import</h2>
        </span>
      </v-card-title>

      <v-card-actions>
        <div id="uploader">
          <upload-btn icon @file-update="readFileInput">
            <template slot="icon">
              <v-icon color="background">mdi-cloud-upload</v-icon>
            </template>
          </upload-btn>
          <h2>Click To Upload</h2>
        </div>
      </v-card-actions>
      <span id="fileName">{{fileName}}</span>
      <div v-if="hasValidFile == true">
        <v-card-actions>
          <v-btn block @click="submitStudents" color="secondary">Submit</v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>
<script>
import UploadButton from "vuetify-upload-button";
import Subject from "@/services/Subject";
export default {
  data: () => ({
    fileName: "",
    students: [],
    hasValidFile: false,
    request: "ADD_STUDENTS",
    subject_id: 1
  }),
  components: {
    "upload-btn": UploadButton
  },
  methods: {
    readFileInput(file) {
      const reader = new FileReader();
      reader.onload = e => (this.students = e.target.result.split(","));
      reader.readAsText(file);

      this.fileName = file.name;
      this.hasValidFile = true;
    },
    async submitStudents() {
      const response = await Subject.addStudents({
        request: this.request,
        students: this.students,
        subject_id: this.subject_id
      });
    }
  }
};
</script>

<style scoped>
#uploader {
  height: 10%;
  width: 100%;
  display: inline-flex;
}

#StudentLoader {
  max-width: 100%;
  display: block;
}
#fileName {
  color: blue;
  font-weight: bold;
  text-align: center !important;
  font-style: italic;
}
#pageBreakHeading {
  padding: 1%;
  width: 100%;
  text-align: left;
  color: white;
}
</style>