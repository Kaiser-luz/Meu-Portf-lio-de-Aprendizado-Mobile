import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2',
});

export default api;