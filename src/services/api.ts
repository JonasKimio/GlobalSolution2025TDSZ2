import axios from 'axios';

const api = axios.create({
  baseURL: '', /*http://[IPV4 da sua Maquina]:8080*/ 
});

export default api;

/*npx json-server db.json --host 0.0.0.0 --port 8080*/