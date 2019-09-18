<template>
  <div class="nav">
    <v-toolbar :extended="extended" :flat="flat" color="primary">
      <v-toolbar-title>
        <router-link to="/">
          <v-icon x-large>mdi-home</v-icon>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/about">
          <v-btn v-if="$store.state.isUserLoggedIn" text class="navText">Dashboard</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Register</v-btn>
        </router-link>
        <router-link to="/calendar">
          <v-btn v-if="$store.state.isUserLoggedIn" text class="navText">Calendar</v-btn>
        </router-link>
        <router-link to="/logout">
          <v-btn v-if="$store.state.isUserLoggedIn" text class="navText" @click="logout()">Logout</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    extended: false,
    flat: true,
    extensionHeight: 48
  }),
  methods: {
    logout() {
      //this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
.navText {
  color: white !important;
}
</style>
