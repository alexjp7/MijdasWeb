<style scoped>
#fields {
  display: inline-blockinline-block;
  margin: 5%;
}
</style>

<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3 id="fields">
        <panel title="Login">
          <v-text-field label="Username" v-model="username"></v-text-field>
          <br />
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <br />
          <div class="danger-alert" v-html="error" />
          <br />
          <v-btn dark class="cyan" @click="login">Login</v-btn>
        </panel>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Authentication from "@/services/Authentication";
export default {
  name: "login",
  data() {
    return {
      request: "LOGIN",
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const response = await Authentication.login({
        request: this.request,
        username: this.username,
        password: this.password
      }).then(function(response) {
        console.log(response);
      });
      //this.$store.dispatch("setToken", response.data.token);
      //this.$store.dispatch("setUser", response.data.user);
      // this.$router.push({
      //   name: "Calendar"
      // });
    }
  }
};
</script>