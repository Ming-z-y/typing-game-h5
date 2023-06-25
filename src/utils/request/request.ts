import Axios from "axios";

const BASE_URL = "http://127.0.0.1:3000";

const axios = Axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export default axios;
