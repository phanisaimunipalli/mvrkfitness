import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "../common/const";

class EnrollService {
  constructor() {
    // Supported Method: REST.GET
    this.createClassEnrollment_url = API_URL + "/enroll/";
  }

  createEnrollment(userId, classId, days) {
    const headers = authHeader();
    console.log("headers:", headers);
    const data = { days };
    return axios.post(
      this.createClassEnrollment_url + userId + "/" + classId,
      data,
      {
        headers,
      }
    );
  }
}
export default new EnrollService();
