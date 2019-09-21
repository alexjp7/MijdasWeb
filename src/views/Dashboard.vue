<template>
  <div class="dashboard">
    <StudentViewer/>
    <br>
    <br>
    <br>
    <StudentLoader/>
    <br>
    <br>
    <br>
    <StaffLinker/>
    <br>
    <br>
    <br>
    <SubjectDisplay/>
  </div>
</template>

<script>
import SubjectDisplay from "@/components/SubjectDisplay.vue";
import StudentLoader from "@/components/StudentLoader.vue";
import StaffLinker from "@/components/StaffLinker.vue";
import StudentViewer from "@/components/StudentViewer.vue";
export default {
  name: "dashboard",
  components: {
    SubjectDisplay,
    StudentLoader,
    StaffLinker,
    StudentViewer
  }
};
</script>

<style  scoped>
</style>