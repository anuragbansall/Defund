import axios from "axios";

const aiWorkerInstance = axios.create({
  baseURL: "http://127.0.0.1:8787",
  headers: {
    "Content-Type": "application/json",
  },
});

export default aiWorkerInstance;
