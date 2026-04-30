import { api } from './client';

export const saveMeasurementAttempt = async (attemptData) => {
  const response = await api.post('/measurements', attemptData);
  return response.data;
};

export const getMeasurementAttempts = async (limit = 50) => {
  const response = await api.get(`/measurements?limit=${limit}`);
  return response.data;
};
