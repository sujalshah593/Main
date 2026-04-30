import { api } from './client';

export const saveInclinedFrictionAttempt = async (attemptData) => {
  const response = await api.post('/inclined-friction', attemptData);
  return response.data;
};

export const getInclinedFrictionAttempts = async () => {
  const response = await api.get('/inclined-friction');
  return response.data;
};
