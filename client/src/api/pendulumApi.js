import { api } from './client';

export const savePendulumAttempt = async (attemptData) => {
  const response = await api.post('/pendulum', attemptData);
  return response.data;
};

export const getPendulumAttempts = async (limit = 50) => {
  const response = await api.get(`/pendulum?limit=${limit}`);
  return response.data;
};
