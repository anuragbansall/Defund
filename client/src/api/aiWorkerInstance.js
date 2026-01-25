import axios from "axios";

const aiWorkerInstance = axios.create({
  baseURL: "https://ai-worker.defund-ai.workers.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default aiWorkerInstance;
