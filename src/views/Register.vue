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
  <div style="margin-left: 25vw">
    <v-layout column>
      <v-flex xs6 offset-xs3 id="fields">
        <panel title="Register">
          <v-form name="register" autocomplete="off">
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-text-field label="Username" v-model="username"></v-text-field>
              <br />
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                autocomplete="new-password"
              ></v-text-field>
            </div>
          </v-form>
          <br />
          <div class="danger-alert" v-html="error" />
          <br />
          <v-row>
            <v-btn id="divider" dark class="primary" @click="register">Register</v-btn>
            <router-link to="/login" class="btn btn-link">
              <v-btn id="divider" dark class="primary">Login</v-btn>
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
      username: "",
      password: ""
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