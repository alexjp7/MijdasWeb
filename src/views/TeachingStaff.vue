<template>
  <div id="StudentDisplay">
    <v-card color="primary">
      <v-card-title>
        <span id="pageBreakHeading">
          <h2 style="color:white;">Teaching Staff Of {{subjectCode}}</h2>
          <v-spacer></v-spacer>
        </span>
      </v-card-title>
    </v-card>
    <br />
    <StaffLinker />
  </div>
</template>

<script>
import StaffLinker from "@/components/StaffLinker.vue";

export default {
  data: () => ({
    subjectCode: ""
  }),
  components: {
    StaffLinker
  },
  async mounted() {
    this.subjectCode = this.$store.state.subjectCode;
  }
};
</script>

<style scoped>
#pageBreakHeading {
  padding: 1%;
  display: flex;
  color: white;
}
#StudentDisplay {
  margin-left: 10%;
  margin-right: 10%;
  max-width: 100%;
  display: block;
}
</style>