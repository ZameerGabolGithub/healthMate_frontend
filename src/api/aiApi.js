import axios from './axios';

export const analyzeFile = async (fileId) => {
  const response = await axios.post(`api/ai/analyze/${fileId}`);
  return response.data;
};

export const getInsights = async (fileId) => {
  const response = await axios.get(`api/ai/insights/${fileId}`);
  return response.data;
};
