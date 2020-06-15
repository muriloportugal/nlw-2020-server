import axios from 'axios';


const api = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

export default api;