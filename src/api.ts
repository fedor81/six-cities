import axios, { AxiosInstance } from 'axios';

import { TOKEN_KEY } from './const';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = window.localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.set('X-Token', token);
    }

    return config;
  });

  return api;
};
