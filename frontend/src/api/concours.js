import API from './axios';

export const getAllConcours = (filters = {}) => API.get('/concours', { params: filters });
export const getConcoursById = (id) => API.get(`/concours/${id}`);
export const createConcours = (data) => API.post('/concours', data);
export const updateConcours = (id, data) => API.put(`/concours/${id}`, data);
export const deleteConcours = (id) => API.delete(`/concours/${id}`);
