// src/utils/axios.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // เช่น http://localhost:3333
  withCredentials: true // จะใส่ Cookie ไปกับทุก request
});

export default axiosClient;
