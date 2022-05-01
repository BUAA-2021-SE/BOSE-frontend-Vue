import axios from 'axios'
const service = axios.create({
    baseURL: 'http://43.138.58.36:8000/',
    timeout: 10000
});

export default service;