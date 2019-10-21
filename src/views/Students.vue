<template>
  <div id="studentViewer">
  <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Students for {{subjectCode}}</h2>
          <v-spacer></v-spacer>
        </span>
      </v-card-title>
    </v-card>
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
#studentViewer {
  padding-left:2%;
  padding-right:2%;
}
</style>