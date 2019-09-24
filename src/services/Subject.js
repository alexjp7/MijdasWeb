import Api from "@/services/Api";

export default {
  subjects(credentials) {
    return Api().post("subject/", credentials);
  },
  addStudents(credentials) {
    return Api().post("subject/", credentials);
  },
  getStudents(credentials) {
    return Api().post("subject/", credentials);
  },
  addStaffMember(credentials) {
    return Api().post("subject/", credentials);
  },
  getTutors(credentials) {
    return Api().post("subject/", credentials);
  },
  removeStaff(credentials) {
    return Api().post("subject/", credentials);
  }
};
