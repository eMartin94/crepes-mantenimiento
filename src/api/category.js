import axios from './axios';

export const getAllCategories = () => axios.get('/category');
export const getCategory = (id) => axios.get(`/category/${id}`);
export const addCategory = (category) => axios.post('/category', category);
export const updateCategory = (id, category) => axios.patch(`/category/${id}`, category);
export const deleteCategory = (id) => axios.delete(`/category/${id}`);