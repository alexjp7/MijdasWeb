import Api from "@/services/Api";
import OAuth from "@/services/OAuth";
import store from "@/store.js";

export default {
  register(credentials) {
    // return Api().post("user/", credentials);
    return OAuth().post("register/", credentials);
  },
  login(credentials) {
    // return Api().post("user/", credentials);
    return OAuth().post("login/", credentials);
  },
  logout(credentials) {
    return Api().post("user/", credentials);
  },
  profile(credentials) {
    return Api().post("user/", credentials);
  }
};
