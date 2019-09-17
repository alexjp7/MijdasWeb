<style scoped>
#fields {
  display: inline-blockinline-block;
  margin: 5%;
}
form {
  width: 50vw;
  margin-left: 25vw;
}
</style>

<template>
  <div>
    <v-flex xs6 offset-xs3 id="fields">
      <panel title="Login">
        <v-form class="px-3" ref="form">
          <v-text-field label="Username" v-model="username" clearable filled :rules="usernameRules"></v-text-field>
          <br />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"
            hint="At least 8 characters"
            clearable
            filled
            :rules="passwordRules"
          ></v-text-field>
          <br />
          <div class="danger-alert" v-html="error" />
          <br />
          <v-row>
            <v-btn id="divider" class="primary" dark tile @click="login">Login</v-btn>
            <router-link to="/register" class="btn btn-link" color="white">
              <v-btn id="divider" dark class="primary" tile>Register</v-btn>
            </router-link>
          </v-row>
        </v-form>
      </panel>
    </v-flex>
    <div v-if="correct == true">
      <v-alert type="success">Successfully logged in!</v-alert>
    </div>
    <div v-else-if="correct == false">
      <v-alert type="error">Incorrect credentials, please try again.</v-alert>
    </div>
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
      password: "",
      correct: null,
      errored: false,
      passwordRules: [
        v => v.length <= 64 || "Password too long",
        v => v.length >= 4 || "Min 4 characters"
      ],
      usernameRules: [
        v => !!v || "Name is required",
        v => v.length <= 18 || "Name must be less than 18 characters"
      ]
    };
  },
  watch: {
    value: function() {}
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        const response = await Authentication.login({
          request: this.request,
          username: this.username,
          password: this.password
        })
          .catch(error => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.correct = true));
        //this.$store.dispatch("setToken", response.data.token);
        //this.$store.dispatch("setUser", response.data.user);
      } else {
        this.correct = false;
      }
      if (this.correct == "true") {
        this.redirect;
      }
    },
    //method be broke idk y
    redirect() {
      setTimeout(
        this.$router.push({
          name: "Home"
        }),
        2000
      );
    }
  }
};
</script>