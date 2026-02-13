import axios from 'axios';
import { getServerSideURL } from './utils/getURL';
import { cookies } from 'next/headers';

const api = axios.create({
  baseURL: `${getServerSideURL()}/api`,
});

api.interceptors.request.use(async (request) => {
  const cookie = await cookies();
  request.headers.Authorization = `Bearer ${cookie.get('payload-token')?.value}`;
  return request;
});

export default api;
