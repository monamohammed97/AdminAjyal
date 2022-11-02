import axios from "axios";

//pass new generated access token here

//apply base url for axios
const API_URL = "http://portal.aajyal.org/api";

const axiosApi = axios.create({
  baseURL: API_URL,
});


axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authUserLogin");
  if (!token) {
      return config
  }
  config.headers.Authorization = `Bearer ${token}`

  return config;
});


axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);


export function get(url, config = {}) {
  return axiosApi.get(url, config ).then(response => response.data);
}

export function post(url, data, config = {}) {
  return axiosApi
    .post(url,data ,config)
    .then(response => response.data);
}

export function put(url, data, config = {}) {
  return axiosApi
    .put(url, data , config )
    .then(response => response.data);
}

export function del(url, data,config = {}) {
  return axiosApi
    .delete(url, {data}, config )
    .then(response => response.data);
}


export default axiosApi
