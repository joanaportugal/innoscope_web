import axios from "axios";

const api = axios.create({ baseURL: "https://innoscope.onrender.com/api" });

export default api;