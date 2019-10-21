<!--
--  Authors: Sam, Alex, Dylan 
-->

<template>
  <div class="add-subject-content">
    <v-card class="subject-header" color="secondary">
      <v-card-header>
        <h1>Create Subject</h1>
      </v-card-header>
    </v-card>
    <v-card>
      <v-form class="subject-form" ref="form" v-model="valid" :lazy-validation="lazy">
        <v-container fluid>
          <v-row align="center">
            <v-col cols="12" sm="9">
              <v-select
                ref="subjectCode"
                v-if="!checkbox"
                v-model="subject"
                :items="subjects"
                :menu-props="{ maxHeight: '400' }"
                :rules="subjectRules"
                label="Subject code"
                hint="Select an existing subject."
                @input="updateSubject"
                persistent-hint
                required
              ></v-select>
              <v-text-field
                ref="subjectCode"
                v-if="checkbox"
                v-model="subjectCode"
                :counter="10"
                :rules="subjectRules"
                label="Subject code"
                hint="Enter the new subject code."
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-checkbox v-model="checkbox" label="New subject"></v-checkbox>
            </v-col>
          </v-row>
          <v-row v-if="checkbox" align="center">
            <v-col cols="12" sm="12">
              <v-select
                ref="institution"
                v-model="i_id"
                :items="institutions"
                :menu-props="{ maxHeight: '400' }"
                :rules="institutionRules"
                label="Institution"
                hint="Select an institution."
                persistent-hint
                required
              ></v-select>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="12" sm="12">
              <!-- <v-text-field
                                v-model="date"
              ></v-text-field>-->
              <v-text-field v-model="coordinator" label="Subject coordinator" readonly></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="date"
                    v-model="date"
                    :rules="dateRules"
                    label="Session end date"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable required>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12">
              <v-btn color="primary" class="mr-4" @click="submit" text>Submit</v-btn>
              <v-btn class="mr-4" @click="reset" text>Clear</v-btn>
              <br />
              <v-card v-if="subjectValidation == true">
                <v-alert type="success" dismissible>Successfully created subject!</v-alert>
              </v-card>
              <v-card v-else-if="subjectValidation == false">
                <v-alert type="error" dismissible>Error creating subject, please try again.</v-alert>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import Subject from "@/services/Subject";
import Profile from "@/services/Authentication";
export default {
  name: "AddSubject",
  data: () => ({
    /**
     * v-form data
     */
    valid: true,
    subjectValidation: null,
    snackbarSuccess: "Subject succesfully created",
    snackbarFailure: "An error occured, please try again",
    coordinator: "",
    subjectRules: [
      v => !!v || "Subject code is required"
      // v => (v && v.length <= 10) || 'Subject code must be less than 10 characters',
    ],
    institutionRules: [
      v => !!v || "Institution is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    dateRules: [
      v => !!v || "End date is required"
      // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false,
    /**
     * v-select data
     */
    username: null,
    // username: 'aa111',
    subjects: [],
    subject: null,
    subjectCode: "",
    /**
     * Date picker
     */
    date: null,
    menu: false,
    institutions: [],
    i_id: null
  }),
  methods: {
    /**
     * v-form methods
     */
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.subjectCode.reset();
      this.$refs.date.reset();
      this.subjectValidation = null;
      if (this.$refs.institution !== undefined) {
        this.$refs.institution.reset();
      }
    },
    updateSubject(subject) {
      if (subject !== undefined) {
        this.subjectCode = subject.subject_code;
        this.i_id = subject.i_id;
      }
    },
    submit() {
      console.log(this.date);
      let response = Subject.subjects({
        request: "CREATE_SUBJECT",
        code: this.subjectCode,
        institution_id: this.i_id,
        coordinator: this.username
      })
        .catch(error => {
          this.subjectValidation = false;
        })
        .then(response => {
          console.log(response);
          let subject_id = response.data.subject_id;
          Subject.subjects(
            {
              request: "ACTIVATE_SUBJECT",
              subject_id: subject_id,
              session_expiry: this.date
            },
            error => {
              this.subjectValidation = false;
            }
          )
            .then(response => {
              this.subjectValidation = true;
              console.log(response);
            })
            .catch(error => {
              this.subjectValidation = false;
            })
            .finally(() => {
              this.reset();
            });
        });
    }
    /**
     * v-select methods
     */
  },
  async mounted() {
    this.username = this.$store.state.user;
    let response = await Subject.subjects({
      request: "VIEW_OWNED_SUBJECTS",
      username: this.username
    })
      .then(response => {
        let institutions = response.data;
        console.log("Response data:");
        console.log(institutions);
        institutions.forEach(item => {
          this.institutions.push({
            text: item.institution,
            value: item.i_id
          });
          this.subjects.push({
            header: item.institution
          });
          item.subjects.forEach(subject => {
            this.subjects.push({
              text: subject.subject_code,
              // value: subject.id
              value: {
                subject_code: subject.subject_code,
                i_id: item.i_id
              }
            });
          });
        });
      })
      .catch(error => {
        console.log("There was an error:");
        console.log(error);
      })
      .finally(() => {
        let response = Profile.profile({
          request: "VIEW_PROFILE",
          username: this.username
        }).then(response => {
          var profile = response.data;
          console.log(profile);
          this.coordinator =
            profile.records[0].first_name + " " + profile.records[0].last_name;
        });
      });
  }
};
</script>

<style scoped>
.add-subject-content {
  color: #333;
  /* background-color: white; */
  margin-left: 10%;
  padding: 20px 50px;
  max-width: 100%;
  margin-right: 10%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.subject-header {
  color: #fff;
  padding: 10px 20px;
}
.subject-form {
  background-color: #fff;
  padding: 20px 50px;
}
</style>