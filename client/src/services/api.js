import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const fetchCompanies = async (params = {}) => {
  const { data } = await api.get('/companies', { params });
  return data;
};

export const fetchCompanyBySlug = async (slug) => {
  const { data } = await api.get(`/companies/${slug}`);
  return data;
};

export const fetchMapMarkers = async (bounds) => {
  const params = bounds ? { bounds: bounds.join(',') } : {};
  const { data } = await api.get('/companies/map', { params });
  return data;
};

export const fetchNearbyCompanies = async (lat, lng, radius = 10000) => {
  const { data } = await api.get('/companies/nearby', { params: { lat, lng, radius } });
  return data;
};

export const fetchJobs = async (params = {}) => {
  const { data } = await api.get('/jobs', { params });
  return data;
};

export const fetchJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);
  return data;
};

/**
 * Full search — returns both jobs and companies with highlighting
 */
export const searchAll = async (q, params = {}) => {
  const { data } = await api.get('/search', { params: { q, type: 'all', ...params } });
  return data;
};

/**
 * Search only jobs
 */
export const searchJobs = async (q, params = {}) => {
  const { data } = await api.get('/search', { params: { q, type: 'jobs', ...params } });
  return data;
};

/**
 * Search only companies
 */
export const searchCompanies = async (q, params = {}) => {
  const { data } = await api.get('/search', { params: { q, type: 'companies', ...params } });
  return data;
};

/**
 * Lightweight autocomplete suggestions — for instant search dropdown
 */
export const fetchSuggestions = async (q, city) => {
  const params = { q };
  if (city) params.city = city;
  const { data } = await api.get('/search/suggest', { params });
  return data;
};

/**
 * Trigger manual Meilisearch re-sync
 */
export const triggerSearchSync = async () => {
  const { data } = await api.post('/search/sync');
  return data;
};

export const fetchFilters = async () => {
  const { data } = await api.get('/filters');
  return data;
};

export default api;
