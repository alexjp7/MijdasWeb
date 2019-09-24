import Api from "@/services/Api";

export default {
  matchUser(credentials) {
    return Api().post("user/", credentials);
  }
}