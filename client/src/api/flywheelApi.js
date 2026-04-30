import { api } from './client';

export const saveFlywheelAttempt = async (attemptData) => {
  const response = await api.post('/flywheel', attemptData);
  return response.data;
};

export const getFlywheelAttempts = async (limit = 50) => {
  const response = await api.get(`/flywheel?limit=${limit}`);
  return response.data;
};
