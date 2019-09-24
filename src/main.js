import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import "vuetify/dist/vuetify.min.css";

import { sync } from "vuex-router-sync";
 

Vue.use(VueResource);
Vue.use(vuetify);
sync(store, router);
Vue.config.silent = true;

// Creates a directive that can be called to handle onScroll eventlistener functions
Vue.directive("scroll", {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener("scroll", f);
      }
    };
    window.addEventListener("scroll", f);
  }
});

new Vue({
  router,
  store,
  vuetify,
  sync,
  render: h => h(App)
}).$mount("#app");
