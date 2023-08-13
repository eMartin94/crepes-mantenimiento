import axios from './axios';

export const getUsers = () => axios.get('/user');
export const createUser = (user) => axios.post('/user', user);
export const updateUser = (id, user) => axios.patch(`/user/${id}`, user);