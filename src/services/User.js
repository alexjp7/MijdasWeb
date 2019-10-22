import Api from "@/services/Api";
import store from "@/store.js";

export default {
  matchUser(credentials) {
    // credentials.token = store.state.token;
    return Api().post("user/", credentials);
  }
}