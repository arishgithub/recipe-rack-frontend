import axios from 'axios';

const api = axios.create({
  baseURL: 'http://16.171.175.124/api/',
});

export default api;