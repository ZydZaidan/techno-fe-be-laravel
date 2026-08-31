// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/techno', // Sesuaikan dengan PORT backend kamu
  timeout: 10000,
});

export default API;