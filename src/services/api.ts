import axios from 'axios';

const api = axios.create({
  baseURL: '',/*Adicionar um IP da maquina para rodar o backend*/ 
});

export default api;