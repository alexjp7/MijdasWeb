<template>
  <v-container fill-height fluid>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <material-card color="green" title="Edit Profile" text="Complete your profile">
          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="User Name" v-model="username" filled readonly="true" />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Email Address" v-model="email" clearable filled />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="First Name" v-model="firstName" clearable filled />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field label="Last Name" v-model="lastName" clearable filled />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Password"
                    v-model="password"
                    type="password"
                    hint="At least 8 characters"
                    clearable
                    filled
                    :rules="passwordRules"
                  />
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Re-Enter Password"
                    v-model="password1"
                    type="password"
                    hint="At least 8 characters"
                    clearable
                    filled
                    :rules="passwordRules1"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea label="About Me" v-model="about" value clearable filled />
                </v-col>
                <v-col cols="12" class="text-right">
                  <div v-if="updated == true">
                    <v-alert type="success" dismissible>Successfully Updated Profile!</v-alert>
                  </div>
                  <div v-if="updatedErrored == true">
                    <v-alert type="error" dismissible>Unsuccessfully Updated Profile!</v-alert>
                  </div>
                  <v-btn color="success" @click="updateProfile">Update Profile</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </material-card>
      </v-col>
      <v-col cols="12" md="4">
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block elevation-6" size="130">
            <img src />
            <!-- Add a avatar image here -->
          </v-avatar>
          <v-card-text class="text-center">
            <h6 class="overline mb-3">{{permissionType}}</h6>
            <h4 class="font-weight-light">{{firstName}} {{lastName}}</h4>
            <p class="font-weight-light"></p>
          </v-card-text>
        </material-card>
      </v-col>
    </v-row>
    <v-card dark color="primary">just for you ilyas my boi</v-card>
  </v-container>
</template>

<script>
import Profile from "@/services/Authentication";
export default {
  name: "profile",
  components: {},
  data() {
    return {
      request: "VIEW_PROFILE",
      username: "",
      password: "",
      password1: "",
      email: "",
      firstName: "",
      lastName: "",
      about: "",
      object: [],
      permissionType: "",
      updated: null,
      errored: null,
      updatedErrored: null,

      passwordRules: [
        v => v.length <= 64 || "Password too long",
        v => v.length >= 4 || "Min 4 characters",
        v => v.password == password1 || "Passwords must be the same"
      ],
      passwordRules1: [
        v => v.length <= 64 || "Password too long",
        v => v.length >= 4 || "Min 4 characters",
        v => v.password1 == password || "Passwords must be the same"
      ]
    };
  },
  async mounted() {
    this.username = this.$store.state.user;
    await Profile.profile({
      request: this.request,
      username: this.username
    })
      .then(response => {
        this.object = response.data.records;

        this.email = this.object[0].email;
        //this.password = this.object[0].password;
        this.permissionType = this.object[0].permission_type;
        this.firstName = this.object[0].first_name;
        this.lastName = this.object[0].last_name;
        this.about = this.object[0].about;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      });
  },
  methods: {
    //     async updateProfile() {
    //       await Profile.profile({
    //         request: this.request,
    //         username: this.username
    //       })
    //         .catch(error => {
    //           console.log(error);
    //           this.updatedErrored = true;
    //         })
    //         .then((this.updated = true));
    //     }
  }
};
</script>

<style scoped>
</style>