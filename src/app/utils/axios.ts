import axios from 'axios';
import nookies from 'nookies';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
});

// ใช้ Interceptor เพื่อให้ Token อัปเดตทุกครั้ง
axiosClient.interceptors.request.use(
  async (config) => {
    const cookies = nookies.get();
    const token = cookies.authToken;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

export default axiosClient;
