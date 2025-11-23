import axios from "axios";

const api = axios.create({
  baseURL: "", /*Colocar o IP para testar code*/ 
});

export default api;