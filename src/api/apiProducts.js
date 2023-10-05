import httpClient from '@/api/httpClient';

export const getAllProducts = () => httpClient.get('');

export const getProductById = (id) => httpClient.get(id);
