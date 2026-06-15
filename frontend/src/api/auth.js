import API from './axios';

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const adminLogin = (data) => API.post('/auth/admin/login', data);
export const getMe = () => API.get('/auth/me');
export const updateUserProfile = (data) => API.put('/auth/update-profile', data);