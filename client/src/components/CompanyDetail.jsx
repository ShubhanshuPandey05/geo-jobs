import { useQuery } from '@tanstack/react-query';
import { X, ExternalLink, MapPin, Users, Globe, Calendar, Briefcase } from 'lucide-react';
import { fetchCompanyBySlug } from '../services/api';
import { formatSalary, formatExperience, timeAgo, WORK_TYPE_LABELS } from '../utils/constants';
import JobCard from './JobCard';

export default function CompanyDetail({ companySlug, onClose }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['company', companySlug],
    queryFn: () => fetchCompanyBySlug(companySlug),
    enabled: !!companySlug,
  });

  const company = data?.data;

  if (isLoading) {
    return (
      <div className="h-full bg-surface p-6 space-y-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-lighter text-text-muted">
            <X size={18} />
          </button>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-surface-lighter rounded-xl" />
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-surface-lighter rounded w-2/3" />
              <div className="h-3 bg-surface-lighter rounded w-1/2" />
            </div>
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-surface-lighter rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="h-full bg-surface p-6 flex flex-col items-center justify-center">
        <p className="text-text-muted text-sm">Failed to load company.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-surface-light rounded-lg text-sm text-text-secondary">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-surface flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border shrink-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
              {company.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">{company.name}</h2>
              <p className="text-xs text-text-muted">{company.industry}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-lighter text-text-muted hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
          {company.website && (
            <a href={company.website} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-primary-light transition-colors">
              <Globe size={12} /> Website
              <ExternalLink size={10} />
            </a>
          )}
          {company.employee_count && (
            <span className="flex items-center gap-1">
              <Users size={12} /> {company.employee_count.toLocaleString()} employees
            </span>
          )}
          {company.founded_year && (
            <span className="flex items-center gap-1">
              <Calendar size={12} /> Founded {company.founded_year}
            </span>
          )}
        </div>

        {company.description && (
          <p className="text-xs text-text-muted mt-3 leading-relaxed">{company.description}</p>
        )}

        {/* Offices */}
        {company.offices?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {company.offices.map((office) => (
              <span key={office.id} className="inline-flex items-center gap-1 px-2 py-1 bg-surface-light rounded-md text-[11px] text-text-muted">
                <MapPin size={10} className="text-primary-light" />
                {office.city}, {office.state}
                {office.is_hq && <span className="text-accent text-[9px] font-semibold">HQ</span>}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Jobs List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3 flex items-center gap-2">
            <Briefcase size={14} className="text-primary-light" />
            Active Jobs ({company.jobs?.length || 0})
          </h3>
          <div className="space-y-2">
            {company.jobs?.length > 0 ? (
              company.jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-8">
                <Briefcase size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-xs text-text-muted">No active jobs right now.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
