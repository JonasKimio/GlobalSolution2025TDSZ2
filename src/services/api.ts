import axios from 'axios';

const api = axios.create({
  baseURL: '', /*http://[IPV4 da sua Maquina]:8080*/ 
});

export default api;