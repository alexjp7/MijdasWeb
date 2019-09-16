
<template>
  <div class="login">
    <v-layout column>
      <v-flex xs6 offset-xs3>
        <panel title="Login">
          <v-text-field label="Email" v-model="email"></v-text-field>
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
  components:{ 

  },
  data:
  {
    message:'hey',
  components: {},
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
        username: this.email,
        password: this.password
      }).then(function(response) {
        console.log(response);
      });
      //this.$store.dispatch("setToken", response.data.token);
      //this.$store.dispatch("setUser", response.data.user);
      this.$router.push({
        name: "Calendar"
      });
    }
  }
}
}
</script>