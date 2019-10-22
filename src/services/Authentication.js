import Api from "@/services/Api";
import OAuth from "@/services/OAuth";

export default {
  register(credentials) {
    return Api().post("user/", credentials);
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
