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
new Vue({
  router,
  store,
  vuetify,
  sync,
  render: h => h(App)
}).$mount("#app");

