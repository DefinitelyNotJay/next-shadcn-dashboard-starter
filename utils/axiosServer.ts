// utils/axiosServer.ts
import axios from 'axios';
import { cookies } from 'next/headers';

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

axiosServer.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default axiosServer;
