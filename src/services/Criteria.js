import Api from "@/services/Api";

export default {
  criteria(credentials) {
    return Api().post("criteria/", credentials);
  },
  getCriteria(credentials) {
    return Api().post("criteria/", credentials);
  },
  createCriteria(credentials) {
    return Api().post("criteria/", credentials);
  },
  deleteCriteria(credentials) {
    return Api().post("criteria/", credentials);
  }
};
