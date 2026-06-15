import API from './axios';

export const getAllPrograms = (filters = {}) => API.get('/programs', { params: filters });
export const getProgramById = (id) => API.get(`/programs/${id}`);
export const createProgram = (data) => API.post('/programs', data);
export const updateProgram = (id, data) => API.put(`/programs/${id}`, data);
export const deleteProgram = (id) => API.delete(`/programs/${id}`);
