<!--
--  Authors: Sam, Alex
-->

<template>
  <div>
    <v-breadcrumbs :items="items" large>
      <template v-slot:divider>
        <v-icon>mdi-forward</v-icon>
      </template>
    </v-breadcrumbs>
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
    subjectCode: "",
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: "/dashboard"
      },
      {
        text: "Teaching Staff",
        disabled: false,
        to: "/teachingstaff"
      },
      {
        text: "Assessments",
        disabled: false,
        to: "/assessment"
      }
    ]
  }),
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
</style>