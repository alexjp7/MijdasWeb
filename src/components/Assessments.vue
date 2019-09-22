<template>
  <div>
    <!-- <h3>Assessments</h3> -->
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <!-- <v-card-title  ></v-card-title> -->
    <div id="subjectBody">
      <v-card>
        <div v-for="assessment in assessmentsData.records" v-bind:key="assessment.id">
          <!-- Children nodes with clickable space-->

          <v-card-actions>
            <v-btn class="assessments" block color="secondary" light>{{assessment.name}}</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Assessment from "@/services/Assessment";
export default {
  data() {
    return {
      request: "VIEW_ASSESSMENT",
      coordinatorCheck: true,
      assessmentsData: null,
      errored: false
    };
  },
  props: {
    subjectID: String
  },
  async mounted() {
    // this.subjectID = this.$store.state.user;
    const response = await Assessment.getAssessments({
      request: this.request,
      subject_id: this.subjectID,
      is_coordinator: this.coordinatorCheck
    })
      .then(response => {
        this.assessmentsData = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {}
};
</script>

<style scoped>
</style>