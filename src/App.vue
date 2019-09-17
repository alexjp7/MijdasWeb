<template>
  <v-app app>
    <v-system-bar :flat="flat" color="primary"></v-system-bar>
    <Navigation />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="trim">
      <div id="homeFooter">
        <p>Mijdas Tech 2019. All rights reserved.</p>
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
#homeFooter {
  min-height: 2vw;
  width: 100vw;
  color: white !important;
  text-align: center !important;
}
</style>
