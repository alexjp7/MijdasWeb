<template>
  <v-app app>
    <div v-scroll="handleScroll">
      <v-system-bar :flat="flat" color="white"></v-system-bar>
      <Navigation />

      <v-content>
        <router-view></router-view>
      </v-content>
      <v-btn
        id="scrollToTopButton"
        class="md-5 mr-3 elevation-21"
        dark
        fab
        append
        button
        bottom
        style="visibility: hidden"
        right
        color="primary"
        fixed
        @click="scrollToTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>

      <v-footer id="footer" color="background" bottom absolute app inset>
        <div class="inner-container">
          <span class="copyright-text">&copy; Mijdas Tech 2019. All rights reserved.</span>
        </div>
      </v-footer>
    </div>
  </v-app>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import { log } from "util";

export default {
  name: "app",
  components: {
    Navigation
  },
  data() {
    return {};
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    handleScroll: function(evt, el) {
      if (window.scrollY > 150) {
        document.getElementById("scrollToTopButton").style.visibility =
          "visible";
      } else {
        document.getElementById("scrollToTopButton").style.visibility =
          "hidden";
      }
      return window.scrollY < 149;
    }
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
  /* color: rgb(255, 255, 255) !important; */
}
.inner-container {
  width: 100%;
}
</style>
<style>
* {
  text-transform: none !important;
}
</style>