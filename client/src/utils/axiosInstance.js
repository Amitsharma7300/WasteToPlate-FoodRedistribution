import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // or process.env.REACT_APP_API_BASE_URL for CRA
  withCredentials: true,
});

export default instance;
