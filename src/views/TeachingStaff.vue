<template>
  <div>
    <h1>Welcome To Teaching Staff Management For:</h1>
    <h1>{{subjectCode}}</h1>
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
</style>