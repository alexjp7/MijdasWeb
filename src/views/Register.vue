<!--
--  Authors: Sam, Dylan
-->

<style scoped>
#fields {
  display: inline-blockinline-block;
  margin: 5%;
}
v-form {
  width: 50vw;
  margin-left: 25vw;
}
</style>

<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3 id="fields">
        <panel title="Register">
          <v-form name="register" autocomplete="off">
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-container class="py-0">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field label="Username" v-model="username" filled />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Email" v-model="email" filled />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="First Name" v-model="firstName" filled />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field label="Last Name" v-model="lastName" filled />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Password"
                      filled
                      type="password"
                      v-model="password"
                      autocomplete="new-password"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select :items="items" filled label="Filled style"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-form>

          <br />
          <div class="danger-alert" v-html="error" />
          <br />
          <v-row>
            <v-btn id="divider" style="min-width: 10vw" dark class="primary">Register</v-btn>
            <router-link to="/login" class="btn btn-link">
              <v-btn id="divider" style="min-width: 10vw" dark class="primary">Login</v-btn>
            </router-link>
          </v-row>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Authentication from "@/services/Authentication";

export default {
  data() {
    return {
      request: "CREATE",
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      password1: "",
      items: ["Tutor", "Admin"]
    };
  },
  methods: {
    async register() {
      const response = await Authentication.register({
        request: this.request,
        username: this.username,
        password: this.password
      }).then(function(response) {
        console.log(username, password);
      });
      // this.$store.dispatch("setToken", response.data.token);
      // this.$store.dispatch("setUser", response.data.user);
      // this.$router.push({
      //   name: "calendar"
      // });
    }
  }
};
</script>

<style scoped>
</style>