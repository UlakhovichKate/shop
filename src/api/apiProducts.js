import httpClient from '@/api/httpClient';

export const getAllProducts = () => httpClient.get('');

export const getProduct = (id) => httpClient.get(id);
