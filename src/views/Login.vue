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
    <v-container fluid>
      <v-flex xs6 offset-xs3 id="fields">
        <panel title="Login">
          <v-form class="px-3" ref="form">
            <div class="pl-4 pr-4 pt-2 pb-2">
              <v-text-field
                label="Username"
                v-model="username"
                clearable
                filled
                :rules="usernameRules"
              ></v-text-field>
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
              <v-row no-gutters>
                <v-cols cols="2">
                  <v-btn
                    id="divider"
                    class="primary"
                    style="min-width: 10vw"
                    dark
                    tile
                    @click="login"
                  >Login</v-btn>

                  <router-link to="/register" class="btn btn-link" color="white">
                    <v-btn dark style="min-width: 10vw" class="primary" tile>Register</v-btn>
                  </router-link>
                </v-cols>
              </v-row>
            </div>
          </v-form>
        </panel>
      </v-flex>
      <div style="margin-right: 20vw" v-if="correct == true">
        <v-alert type="success">Successfully logged in!</v-alert>
      </div>
      <div style="margin-right: 20vw" v-else-if="correct == false">
        <v-alert type="error">Incorrect credentials, please try again.</v-alert>
      </div>
    </v-container>
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
      this.errored = false;
      if (this.$refs.form.validate()) {
        await Authentication.login({
          request: this.request,
          username: this.username,
          password: this.password
        }).catch(error => {
          console.log(error);
          this.errored = true;
        });
        if (this.errored == false) {
          this.correct = true;
        }
        //this.$store.dispatch("setToken", response.data.token);
        else {
          this.correct = false;
        }
        if (this.correct == true) {
          this.$store.dispatch("setUser", this.username);
          // const sleep = milliseconds => {
          //   return new Promise(resolve => setTimeout(resolve, milliseconds));
          // };
          // sleep(1500).then(() => {
          this.redirect();
          // });
        }
      }
    },
    redirect() {
      this.$router.push({
        name: "dashboard"
      });
    }
  }
};
</script>