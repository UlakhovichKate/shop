import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://dummyjson.com/products/',
});

export default httpClient;
