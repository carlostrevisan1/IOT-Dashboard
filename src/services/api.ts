import axios from "axios";

const api = axios.create({
  baseURL: "http://80d2-179-98-74-90.ngrok.io",
});

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request
})

export default api;