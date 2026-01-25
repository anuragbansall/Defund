import axios from "axios";

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_SECRET_KEY}`,
  },
});

export default unsplashInstance;
