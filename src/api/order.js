import axios from './axios';

export const getOrders = async () => axios.get('/orders/all');