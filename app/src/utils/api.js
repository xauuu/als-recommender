import * as axios from "axios";
import { apiDomain } from "./../store/constants";

const apiServices = axios.create({
  baseURL: apiDomain
  // withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Credentials": true
  // }
});

export default apiServices;
