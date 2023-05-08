import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.belanja24.com/api/v1',
  withCredentials: false,
});

export const API2 = axios.create({
  baseURL: 'https://api.belanja24.com',
  withCredentials: false,
});
