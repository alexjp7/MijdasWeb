<style scoped>
.subjectDisplay {
  color: black;
  background-color: white;
  margin: auto;
  padding: 5%;
  text-align: center;
}
.cards {
  color: black;
  background-color: white;
  margin: auto;
  padding: 2%;
  text-align: left !important;
}
.subjects {
  color: white !important;
  padding: 30%;
}
</style>

<template>
  <div class="subjectDisplay">
    <h1>Subjects</h1>
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div class="cards" v-for="institution in institutions" v-bind:key="institution.id">
        <v-card>
          <h1>{{institution.institution}}</h1>
          <div v-for="subject in institution.subjects" v-bind:key="subject.id">
            <!-- Children nodes with clickable space-->
            <v-card-actions>
              <v-btn x-large class="subjects" block color="secondary" light>{{subject.subject_code}}</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </div>
    </section>
  </div>
</template>

<script>
import Subject from "@/services/Subject";
export default {
  name: "SubjectDisplay",
  data: () => ({
    request: "POPULATE_SUBJECTS",
    username: "st111",
    institutions: null,
    loading: true,
    errored: false
  }),
  async mounted() {
    const response = await Subject.subjects({
      request: this.request,
      username: this.username
    })
      .then(response => {
        this.institutions = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

