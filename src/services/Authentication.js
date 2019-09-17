import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("user/", credentials);
  },
  login(credentials) {
    return Api().post("user/", credentials);
  },
  logout(credentials) {
    return Api().post("user/", credentials);
  },
  profile(credentials) {
    return Api().post("user/", credentials);
  }
};
