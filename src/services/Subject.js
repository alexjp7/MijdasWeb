import Api from "@/services/Api";

export default {
  subjects(credentials) {
    return Api().post("subject/", credentials);
  },
  addStudents(credentials) {
    return Api().post("subject/", credentials);
  }
};
