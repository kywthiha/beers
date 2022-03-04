import axios from "axios";

const axiosInstance = axios.create({

});

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers.common["X-CSRF-Token"] = document.querySelector('meta[name="csrf-token"]').attributes.content.value

export default axiosInstance;