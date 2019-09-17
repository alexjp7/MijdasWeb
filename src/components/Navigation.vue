<template>
  <div class="nav">
    <v-toolbar :extended="extended" :flat="flat" color="primary">
      <v-toolbar-title>
        <router-link to="/">
          <v class="btn">
            <v-img src="@/assets/markit-logo.png"></v-img>
          </v>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/about">
          <v-btn text class="navText">About Us</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn text class="navText">Register</v-btn>
        </router-link>
        <router-link to="/calendar">
          <v-btn text class="navText">Calendar</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    extended: true,
    flat: true,
    extensionHeight: 48
  }),
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
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
