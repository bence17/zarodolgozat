import axios from "axios";

export default axios.create({
  // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
  withCredentials: true,

  baseURL: "http://localhost:3001",
});
