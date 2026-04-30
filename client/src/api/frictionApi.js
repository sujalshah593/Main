import { api } from './client';

export const saveFrictionAttempt = async (attemptData) => {
  const response = await api.post('/friction', attemptData);
  return response.data;
};

export const getFrictionAttempts = async (limit = 50) => {
  const response = await api.get(`/friction?limit=${limit}`);
  return response.data;
};
