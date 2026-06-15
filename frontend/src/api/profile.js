import API from './axios';

export const getProfile = () => API.get('/profile');
export const saveProfile = (data) => API.post('/profile', data);
export const getRecommendations = () => API.get('/recommendations');
