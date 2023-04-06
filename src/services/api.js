import axios from 'axios';

export * from './routes.constants';

// export const baseURL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
  // baseURL,
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json ',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
  },
});

const addTokenToRequest = async (req) => {
  const token = localStorage.getItem('11#221#');
  req.headers.Authorization = `Bearer ${token}`;
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
