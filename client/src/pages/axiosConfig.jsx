import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', //proxy to http://localhost:8800/api
});

export default axiosInstance;
