import axios from './axios';

export const uploadFile = async (formData) => {
  const response = await axios.post('/api/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getFiles = async (params = {}) => {
  const response = await axios.get('/api/files', { params });
  return response.data;
};

export const getFileById = async (id) => {
  const response = await axios.get(`/api/files/${id}`);
  return response.data;
};

export const deleteFile = async (id) => {
  const response = await axios.delete(`/api/files/${id}`);
  return response.data;
};
