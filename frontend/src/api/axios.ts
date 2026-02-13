import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  
  // Removemos withCredentials para evitar conflictos con CORS
  // withCredentials: true,
});


export default api;
