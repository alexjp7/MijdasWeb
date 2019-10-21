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
  }
};
</script>

<style scoped>
#assessmentDisplay {
  margin-left: 1%;
  margin-right: 1%;
  max-width: 100%;
  display: block;
}
</style>