import { api } from './client.js';

export async function fetchLabs() {
  const { data } = await api.get('/labs');
  return data;
}

export async function fetchExperimentsForLab(labId) {
  const { data } = await api.get(`/experiments/${labId}`);
  return data;
}

export async function fetchExperimentById(id) {
  const { data } = await api.get(`/experiment/${id}`);
  return data;
}

export async function postFeedback(payload) {
  const { data } = await api.post('/feedback', payload);
  return data;
}
