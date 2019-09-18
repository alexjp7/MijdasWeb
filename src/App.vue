<template>
  <v-app app>
    <!-- <v-system-bar :flat="flat" color="primary"></v-system-bar> -->
    <v-system-bar color="primary"></v-system-bar>
    <Navigation />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer id="footer" color="trim">
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
  background-color: #e1e2e1;
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
  color: rgb(85, 85, 85) !important;
}
</style>
