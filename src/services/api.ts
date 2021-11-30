import axios from "axios";

const api = axios.create({
  // baseURL: "http://iotdashboardapi.duckdns.org:5000",
  baseURL: "http://192.168.15.13:5000"
});

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

export default api;