// services/api.ts
// Configura a instância do Axios com a URL base da API
import axios from 'axios';
 
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
 
export default api