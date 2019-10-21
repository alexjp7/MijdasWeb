<!--
--  Authors: Sam, Alex, Dylan, Ilyas
-->

<template>
  <div class="dashboard">
    <SubjectDisplay />
  </div>
</template>

<script>
import SubjectDisplay from "@/components/SubjectDisplay.vue";
// import StudentLoader from "@/components/StudentLoader.vue";
import StaffLinker from "@/components/StaffLinker.vue";
import StudentViewer from "@/components/StudentViewer.vue";
export default {
  name: "dashboard",
  components: {
    SubjectDisplay,
    // StudentLoader,
    StaffLinker,
    StudentViewer
  },
  async mounted() {}
};
</script>

<style  scoped>
#job {
  margin-left: 10%;
  margin-right: 10%;
}
.job-content {
  padding: 2%;
}

.expansionHeader {
  padding: 1%;
}
.v-expansion-panel-content {
  padding: 1%;
}
</style>