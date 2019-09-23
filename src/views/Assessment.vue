<template>
  <div>
    <h1>Welcome To Assessments For:</h1>
    <h1>{{SubjectCode}}</h1>
    <Assessments />
  </div>
</template>

<script>
import Assessments from "@/components/Assessments";

export default {
  components: {
    Assessments
  },
  data: () => ({
    SubjectCode: null
  }),
  async mounted() {
    SubjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
</style>