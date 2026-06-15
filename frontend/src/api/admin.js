import API from './axios';

export const getAllStudents = () => API.get('/admin/students');
export const deleteStudent = (id) => API.delete(`/admin/students/${id}`);
