// src/components/utils/axios.ts

 import axios from 'axios';
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token&& config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

