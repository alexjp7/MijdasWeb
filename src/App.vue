<template>
  <v-app app>
    <v-system-bar :flat="flat" color="white"></v-system-bar>
    <Navigation />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer id="footer" color="background">
      <div class="inner-container">
        <span class="copyright-text">&copy; Mijdas Tech 2019. All rights reserved.</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "app",
  components: {
    Navigation
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
}
.danger-alert {
  color: red;
}
#divider {
  margin: 3vw;
}
#footer {
  padding-top: 10px;
  padding-bottom: 10px;
}
#footer .inner-container {
  width: 100vw;
  /* color: rgb(255, 255, 255) !important; */
}
</style>
<style>
* {
  text-transform: none !important;
}
</style>