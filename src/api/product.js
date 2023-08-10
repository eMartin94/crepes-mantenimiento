import axios from './axios'

// export const getProduct = () => axios.get('/product');
export const getProduct = (page = 1, limit = 10) => axios.get('/product', { params: { page, limit } });
export const getProductAvailable = () => axios.get('/productAvailable');
export const getProductById = (id) => axios.get(`/product/${id}`);
export const addProduct = (product) => axios.post('/product', product);
export const updateProduct = (id, product) => axios.patch(`/product/${id}`, product);
export const deleteProduct = (id) => axios.delete(`/product/${id}`);
