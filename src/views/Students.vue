<!--
--  Authors: Sam, Alex
-->

<template>
  <div id="studentViewer">
    <v-breadcrumbs :items="items" large>
      <template v-slot:divider>
        <v-icon>mdi-power-on</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students for {{subjectCode}}</h2>
          <v-spacer></v-spacer>
        </span>
      </v-card-title>
    </v-card>
    <StudentViewer />
    <br>
    <br>
    <ResultsDisplay/>

  </div>
</template>

<script>
import StudentViewer from "@/components/StudentViewer.vue";
import ResultsDisplay from "@/components/ResultsDisplay.vue";
export default {
  components: {
    StudentViewer,
    ResultsDisplay
  },
  data: () => ({
    subjectCode: "",
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: "/dashboard"
      },
      {
        text: "Teaching Staff",
        disabled: false,
        to: "/teachingstaff"
      },
      {
        text: "Assessments",
        disabled: false,
        to: "/assessment"
      }
    ]
  }),
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
#studentViewer {
  padding-left: 2%;
  padding-right: 2%;
}
</style>