import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://wastetoplate-foodredistribution.onrender.com",
  withCredentials: true,
});
export default axiosInstance;
