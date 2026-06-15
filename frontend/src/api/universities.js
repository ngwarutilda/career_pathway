import API from './axios';

export const getAllUniversities = (filters = {}) => API.get('/universities', { params: filters });
export const getUniversityById = (id) => API.get(`/universities/${id}`);
export const createUniversity = (data) => API.post('/universities', data);
export const updateUniversity = (id, data) => API.put(`/universities/${id}`, data);
export const deleteUniversity = (id) => API.delete(`/universities/${id}`);
