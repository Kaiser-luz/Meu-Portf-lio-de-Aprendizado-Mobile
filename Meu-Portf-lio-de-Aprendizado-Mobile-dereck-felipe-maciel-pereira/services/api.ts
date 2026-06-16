import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6a050d08aa826ca75c0971ae.mockapi.io/api/v1',
});

export default api;