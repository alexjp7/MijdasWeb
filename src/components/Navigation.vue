<template>
  <div class="nav">
    <v-system-bar :flat="flat" color="white"></v-system-bar>
    <v-toolbar :extended="extended" :flat="flat" color="white">
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <router-link to="/">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Home</v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Login</v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn v-if="!$store.state.isUserLoggedIn" text class="navText">Register</v-btn>
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
  })
};
</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #e9e;
}
/* .navText {
   color: white !important; 
} */
</style>
