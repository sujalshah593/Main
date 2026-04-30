import { api } from './client';

export const saveMotionAttempt = async (attemptData) => {
  const response = await api.post('/motion', attemptData);
  return response.data;
};

export const getMotionAttempts = async (limit = 50) => {
  const response = await api.get(`/motion?limit=${limit}`);
  return response.data;
};
