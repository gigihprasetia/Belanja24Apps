import axios from 'axios';

const API = axios.create({
  baseURL: 'https://uat-api.belanja24.com/api/v1',
  withCredentials: false,
});

export default API;
