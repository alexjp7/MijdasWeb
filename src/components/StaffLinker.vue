<template>
  <div id="staffLinker">
    <v-card color="secondary">
      <v-card-title class="pageBreakHeading">
        <span id="teachingStaffHeading">
          <h2>Teaching Staff</h2>
        </span>
        <v-spacer></v-spacer>
        <v-card-action>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat v-on="on" @click="getStaff" color="secondary">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Refresh</span>
          </v-tooltip>
        </v-card-action>
      </v-card-title>
    </v-card>
    <hr />
    <div v-if="teachingStaff == null">
      <v-card>
        <p>
          This subject doesn't have any staff assigned
          <br />Use the form below to add a Staff Member
        </p>
      </v-card>
    </div>
    <div v-else>
      <!-- Populate Existing Staff Members -->
      <v-card>
        <div id="staffCards" v-for="staff in teachingStaff" v-bind:key="staff">
          <v-card id="currentStaff">
            <span class="staffName">
              <v-icon>mdi-account</v-icon>
              <h4>{{staff}}</h4>
            </span>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="removeStaff(staff)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Remove</span>
            </v-tooltip>
          </v-card>
        </div>
      </v-card>
    </div>
    <h3 id="pageBreakHeading" align="left">Search By Username</h3>
    <div id="searchComponent">
      <v-text-field
        label="Staff Username"
        class="components"
        v-model="searchString"
        @keyup="onKey"
        single-line
        filled
      ></v-text-field>
      <v-btn @click="addStaff" style="margin-top: 20px" color="secondary">Add Staff</v-btn>
    </div>
    <div v-if="hasQuery === true">
      <div v-if="hasMatch === true">
        <div v-for="results in matchedResults" v-bind:key="results">
          <v-btn
            class="searchResults"
            block
            color="secondary"
            light
            @click="fillSearchBar(results)"
          >{{results}}</v-btn>
        </div>
      </div>
      <div v-else>
        <v-card color="error">
          <h1 style="color:white">No Matches Found</h1>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import User from "@/services/User";
import Subject from "@/services/Subject";
export default {
  name: "StaffLinker",
  data: () => ({
    teachingStaff: null,
    searchString: "",
    matchedResults: [],
    hasMatch: false,
    hasQuery: false,
    staffSelection: "",
    subjectID: null
  }),
  methods: {
    //Event Listener for handling keyboard input with searchbar
    onKey() {
      /*************************************************
       * A Query is only made after 2 characters entered,
       * in order to reduce server load
       ************************************************/
      if (this.searchString.length > 1) {
        this.hasQuery = true;
        this.queryMatchs()
          .then(response => {
            this.matchedResults = response.data;
            this.hasMatch = true;
          })
          .catch(error => {
            this.hasMatch = false;
          });
      } else {
        this.hasQuery = false;
      }
    },
    //When matched user is clicked, their username value is appended to result
    fillSearchBar(value) {
      this.searchString = value;
      this.hasQuery = false;
    },
    //Async call to populate matched results from query string
    async queryMatchs() {
      return User.matchUser({
        request: "SEARCH_USER_PARTIAL",
        query_string: this.searchString
      });
    },
    //Takes the field from search bar, and adds that username
    async addStaff() {
      this.subjectID = this.$store.state.subjectID;
      Subject.addStaffMember({
        request: "ADD_TUTOR",
        tutors: [this.searchString],
        subject_id: this.subjectID
      }).catch(error => console.log(error));
      this.getStaff();
      this.searchString = "";
    },
    //Makes an asyncronous call to popualte linked staff members
    async getStaff() {
      this.subjectID = this.$store.state.subjectID;
      Subject.getTutors({
        request: "VIEW_TUTORS",
        subject_id: this.subjectID
      })
        .then(response => {
          this.teachingStaff = response.data;
        })
        .catch(error => console.log(error));
    },
    //Removes Tutor from subject and display
    async removeStaff(staff) {
      this.subjectID = this.$store.state.subjectID;
      Subject.removeStaff({
        request: "REMOVE_TUTOR",
        subject_id: this.subjectID,
        tutor_username: staff
      })
        .then()
        .finally(this.getStaff());
    }
  },
  async created() {
    this.getStaff();
  }
};
</script>

<style>
.pageBreakHeading {
  padding: 1%;
  display: flex;
  color: white;
}
#teachingStaffHeading {
  display: inline-flex;
}
#staffLinker {
  border: 1px;
  max-width: 100%;
  display: block;
  margin-left: 10%;
  margin-right: 10%;
}
#searchComponent {
  display: inline-flex;
  width: 100%;
  padding: 1%;
}

.components {
  min-height: 6.8vh !important;
}
.searchResults {
  padding: 1%;
  margin-bottom: 2%;
}
#currentStaff {
  text-align: left;
  margin: 0.5%;
  padding: 1%;
  display: flex !important;
  max-width: 100%;
}
.staffName {
  padding-left: 1%;
  font-size: 1em !important;
  font-style: bold;
  min-width: 80%;
  display: -webkit-inline-box;
}
</style>
