import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tractian-back-end.herokuapp.com',
  // baseURL: 'http://localhost:3333',
});

export default api;
