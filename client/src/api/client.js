import axios from 'axios';

/**
 * Browser calls use Vite dev proxy (/api -> Express). Override with VITE_API_URL in production.
 */
const baseURL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export const api = axios.create({
  baseURL: baseURL ? `${baseURL}/api` : '/api',
  headers: { 'Content-Type': 'application/json' },
});
