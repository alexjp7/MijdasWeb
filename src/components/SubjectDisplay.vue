<!--
--  Authors: Sam, Alex, Dylan
-->

<template>
  <div class="subjectDisplay">
    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>
    <section v-else>
      <v-card color="primary">
        <div v-if="loading">Loading...</div>
        <div class="col-container">
          <div class="col-heading">
            <h2 id="pageBreakHeading">Your Subjects</h2>
          </div>
          <!-- <v-spacer></v-spacer> -->
          <div class="col-add-button">
            <v-card-actions class="add-button">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <router-link to="/add-subject">
                    <v-btn v-on="on" icon color="white">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </router-link>
                </template>
                <span>Add Subject</span>
              </v-tooltip>
            </v-card-actions>
          </div>
        </div>
      </v-card>

      <div class="cards" v-for="institution in institutions" v-bind:key="institution.id">
        <!-- <v-card-title  ></v-card-title> -->
        <div id="subjectBody">
          <br />
          <h1>{{institution.institution}}</h1>
          <v-expansion-panels accordion="true" focusable light>
            <v-expansion-panel
              v-for="subject in institution.subjects"
              v-bind:key="subject.id"
              style="padding-bottom:15px;"
            >
              <!-- Children nodes with clickable space-->
              <v-card x-large id="subjects" color="secondary">
                <v-expansion-panel-header>
                  <span class="text-center">{{subject.subject_code}}</span>
                </v-expansion-panel-header>
              </v-card>
              <v-expansion-panel-content>
                <v-row>
                  <v-col style="margin-left: 20vw; margin-right: 20vw">
                    <router-link to="/teachingstaff">
                      <v-btn
                        color="trim"
                        block
                        id="navText"
                        @click="updateSubject(subject.subject_code, subject.id, $event)"
                      >Teaching Staff</v-btn>
                    </router-link>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col style="margin-left: 20vw; margin-right: 20vw">
                    <router-link to="/students">
                      <v-btn
                        color="trim"
                        block
                        id="navText"
                        @click="updateSubject(subject.subject_code, subject.id, $event)"
                      >Students</v-btn>
                    </router-link>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col style="margin-left: 20vw; margin-right: 20vw">
                    <router-link to="/assessment">
                      <v-btn
                        color="trim"
                        block
                        id="navText"
                        @click="updateSubject(subject.subject_code, subject.id,$event)"
                      >Assessments</v-btn>
                    </router-link>
                  </v-col>
                </v-row>
                <!-- <v-expansion-panel>
                  <v-expansion-panel-header>
                    <h3 style="text-align: center">Assessments</h3>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-btn>
                      <Assessment :subjectID="subject.id" />
                    </v-btn>
                  </v-expansion-panel-content>
                </v-expansion-panel>-->
              </v-expansion-panel-content>
              <v-spacer></v-spacer>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Subject from "@/services/Subject";
import Assessment from "@/components/Assessments.vue";
import StudentViewer from "@/components/StudentViewer.vue";

export default {
  components: {
    Assessment,
    StudentViewer
  },
  name: "SubjectDisplay",
  data: () => ({
    request: "VIEW_OWNED_SUBJECTS",
    // request: "POPULATE_SUBJECTS",
    username: null,
    institutions: null,
    loading: true,
    errored: false,
    dialog: false
  }),
  async mounted() {
    this.username = this.$store.state.user;
    //   console.log("username:" + this.$store.state.user);
    const response = await Subject.subjects({
      request: this.request,
      username: this.username
    })
      .then(response => {
        this.institutions = response.data;
      })
      .catch(error => {
        console.log(error);
        // this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    updateSubject: function(subjectCode, subjectID, event) {
      if (event) {
        this.$store.dispatch("setSubjectCode", subjectCode);
        this.$store.dispatch("setSubjectID", subjectID);
      }
    }
  }
};
</script>

<style scoped>
.subjectDisplay {
  color: #333;
  background-color: white;
  margin-left: 2%;
  max-width: 100%;
  margin-right: 2%;
}
.cards {
  color: #333;
  background-color: white;
  margin: auto;
  text-align: left !important;
}
#subjects {
  color: white !important;
}
#pageBreakHeading {
  padding: 1%;
  display: flex;
  color: white;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #333;
}
#subjectBody {
}
.col-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col-2 {
  width: 50%;
  display: flex;
}
.col-align-right {
  align-items: right;
}
/* .add-button {
  margin-right: 3%;
  color: white;
} */
.col-heading {
  width: 50%;
  padding-left: 10px;
}
.col-add-button {
  width: 50%;
  padding-left: 10px;
}
.add-button {
  justify-content: flex-end;
}

#navText {
  color: white;
  text-decoration: none;
}
</style>

