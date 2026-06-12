import axios from 'axios';

const ticketmasterApi = axios.create({
  baseURL: 'https://app.ticketmaster.com/discovery/v2',
});

export const crudApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const TICKETMASTER_API_KEY =
  process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY || 'q9uh0aSWLq7gVjJLRof6UeJ0B7oeafQm';

export default ticketmasterApi;
