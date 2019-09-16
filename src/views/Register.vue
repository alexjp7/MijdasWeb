<template>
  <div>
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <panel title="Register">
          <form name="register" autocomplete="off">
            <v-text-field label="Username" v-model="username"></v-text-field>
            <br />
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              autocomplete="new-password"
            ></v-text-field>
          </form>
          <br />
          <div class="danger-alert" v-html="error" />
          <br />
          <v-btn dark class="cyan" @click="register">Register</v-btn>
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