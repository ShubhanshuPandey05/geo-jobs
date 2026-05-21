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

export const searchJobs = async (q, params = {}) => {
  const { data } = await api.get('/search', { params: { q, ...params } });
  return data;
};

export const fetchFilters = async () => {
  const { data } = await api.get('/filters');
  return data;
};

export default api;
