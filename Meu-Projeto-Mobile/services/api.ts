import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6a18db4d489e471575194753.mockapi.io/eventos',
});

export default api;