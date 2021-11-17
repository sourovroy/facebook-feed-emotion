import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 0,
  headers: {
    'App-Secret-ID': process.env.REACT_APP_SECRET_ID
  }
});

export default axiosInstance;
