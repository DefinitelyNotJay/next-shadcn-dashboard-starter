import axios from 'axios';
import nookies from 'nookies';
import qs from 'qs';

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

axiosClient.defaults.paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: 'brackets', encode: false });

export const fetcher = (url: string) =>
  axiosClient.get(url).then((res) => res.data);

export default axiosClient;
