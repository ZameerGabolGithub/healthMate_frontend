import axios from './axios';

export const addVitals = async (vitalsData) => {
  const response = await axios.post('/api/vitals', vitalsData);
  return response.data;
};

export const getVitals = async (params = {}) => {
  const response = await axios.get('/api/vitals', { params });
  return response.data;
};

export const getTimeline = async (params = {}) => {
  const response = await axios.get('/api/timeline', { params });
  return response.data;
};
