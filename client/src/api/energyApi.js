import axios from 'axios';

const API_URL = '/api/energy';

export const saveEnergyAttempt = async (data) => {
  const response = await axios.post(`${API_URL}/save`, data);
  return response.data;
};

export const getEnergyHistory = async () => {
  const response = await axios.get(`${API_URL}/history`);
  return response.data;
};
