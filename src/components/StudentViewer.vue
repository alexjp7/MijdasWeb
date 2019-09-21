<template>
  <div id="StudentLoader">
    <v-card color="secondary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students</h2>
        </span>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="students"
        :items-per-page="5"
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
    headers: []
  }),
  async mounted() {
    Subject.getStudents({
      //Popualte students
      request: "VIEW_STUDENTS_BY_SUBJECT",
      subject_id: this.subject_id
    }).then(response => {
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
    });
  }
};
</script>

<style  scoped>
#pageBreakHeading {
  padding: 1%;
  width: 100%;
  text-align: left;
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
</style>
