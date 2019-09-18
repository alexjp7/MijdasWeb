<template>
  <div class="dashboard">
    <SubjectDisplay />
    <br />
    <br />
    <StudentLoader />
  </div>
</template>

<script>
import SubjectDisplay from "@/components/SubjectDisplay.vue";
import StudentLoader from "@/components/StudentLoader.vue";
export default {
  name: "dashboard",
  components: {
    SubjectDisplay,
    StudentLoader
  }
};
</script>

<style  scoped>
</style>