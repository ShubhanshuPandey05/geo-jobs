// City presets for quick navigation
export const CITIES = {
  Bangalore: { lat: 12.9716, lng: 77.5946, zoom: 12 },
  Surat: { lat: 21.1702, lng: 72.8311, zoom: 12 },
  Pune: { lat: 18.5204, lng: 73.8567, zoom: 12 },
  Hyderabad: { lat: 17.3850, lng: 78.4867, zoom: 12 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714, zoom: 12 },
  Gurgaon: { lat: 28.4595, lng: 77.0266, zoom: 12 },
};

export const DEFAULT_CITY = 'Bangalore';

export const WORK_TYPE_COLORS = {
  remote: '#8b5cf6',
  hybrid: '#06b6d4',
  onsite: '#f59e0b',
};

export const WORK_TYPE_LABELS = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};

export const formatSalary = (min, max, currency = 'INR') => {
  if (!min && !max) return 'Not disclosed';
  const format = (n) => {
    if (n >= 10000000) return `${(n / 10000000).toFixed(1)}Cr`;
    if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toString();
  };
  if (min && max) return `₹${format(min)} - ₹${format(max)}`;
  if (min) return `₹${format(min)}+`;
  return `Up to ₹${format(max)}`;
};

export const formatExperience = (min, max) => {
  if (!min && !max) return 'Any';
  if (min && max) return `${min}-${max} yrs`;
  if (min) return `${min}+ yrs`;
  return `Up to ${max} yrs`;
};

export const timeAgo = (date) => {
  if (!date) return '';
  const now = new Date();
  const posted = new Date(date);
  const diffMs = now - posted;
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
};
