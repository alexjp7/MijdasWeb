<template>
  <div id="assessmentDisplay">
    <!-- <Assessments /> -->
    <AssessmentBuilder />
  </div>
</template>

<script>
import Assessments from "@/components/Assessments.vue";
import AssessmentBuilder from "@/components/AssessmentBuilder.vue";

export default {
  data: () => ({
    subjectCode: ""
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