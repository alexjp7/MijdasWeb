import axios from "axios";
// import store from "@/store";

//Creates a base api url request.

export default () => {
  return axios.create({
    baseURL: `https://markit.mijdas.com/api/`
  });
};
