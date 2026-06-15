import API from './axios';

export const getAllCareers = (filters = {}) => API.get('/careers', { params: filters });
export const getRecommendedCareers = () => API.get('/careers/recommended');
export const getCareerById = (id) => API.get(`/careers/${id}`);
export const createCareer = (data) => API.post('/careers', data);
export const updateCareer = (id, data) => API.put(`/careers/${id}`, data);
export const deleteCareer = (id) => API.delete(`/careers/${id}`);
