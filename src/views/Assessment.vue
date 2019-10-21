<!--
--  Authors: Sam, Alex
-->

<template>
  <div id="assessmentDisplay">
    <v-breadcrumbs :items="items" large>
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Assessment Management For {{subjectCode}}</h2>
          <v-spacer></v-spacer>
        </span>
      </v-card-title>
    </v-card>
    <br />
    <!-- <Assessments /> -->
    <AssessmentBuilder />
  </div>
</template>

<script>
import Assessments from "@/components/Assessments.vue";
import AssessmentBuilder from "@/components/AssessmentBuilder.vue";

export default {
  data: () => ({
    subjectCode: "",
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: "/dashboard"
      },
      {
        text: "Students",
        disabled: false,
        to: "/students"
      },
      {
        text: "Teaching Staff",
        disabled: false,
        to: "/teachingstaff"
      }
    ]
  }),
  components: {
    Assessments,
    AssessmentBuilder
  },
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
#assessmentDisplay {
  margin-left: 10%;
  margin-right: 10%;
  max-width: 100%;
  display: block;
}
</style>