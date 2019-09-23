<template>
  <div>
    <h1>Welcome To Assessments For:</h1>
    <h1>{{subjectCode}}</h1>
    <br />
    <Assessments />
  </div>
</template>

<script>
import Assessments from "@/components/Assessments.vue";

export default {
  data: () => ({
    subjectCode: ""
  }),
  components: {
    Assessments
  },
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
</style>