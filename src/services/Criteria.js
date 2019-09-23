import Api from "@/services/Api";

export default {
  criteria(credentials) {
    return Api().post("criteria/", credentials);
  },
  getCriteria(credentials) {
    return Api().post("criteria/", credentials);
  }
};
