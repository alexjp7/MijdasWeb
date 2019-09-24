<template>
  <div>
    <h1>Welcome To The Student List For:</h1>
    <h1>{{subjectCode}}</h1>
    <StudentViewer />
  </div>
</template>

<script>
import StudentViewer from "@/components/StudentViewer.vue";
export default {
  components: {
    StudentViewer
  },
  data: () => ({
    subjectCode: ""
  }),
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
</style>