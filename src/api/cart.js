import axios from './axios';

export const getCarts = () => axios.get('/carts');