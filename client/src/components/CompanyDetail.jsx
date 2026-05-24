import { useQuery } from '@tanstack/react-query';
import {
  X,
  ExternalLink,
  MapPin,
  Users,
  Globe,
  Calendar,
  Briefcase,
  ArrowUpRight,
  Building2,
} from 'lucide-react';
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
      <div className="h-full bg-surface p-5 space-y-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-surface-lighter/60 text-text-muted transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 skeleton rounded-2xl" />
            <div className="space-y-2 flex-1">
              <div className="h-5 skeleton w-2/3" />
              <div className="h-3 skeleton w-1/2" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 skeleton flex-1 rounded-xl" />
            <div className="h-8 skeleton flex-1 rounded-xl" />
            <div className="h-8 skeleton flex-1 rounded-xl" />
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="h-full bg-surface p-6 flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-surface-light/40 flex items-center justify-center mb-3">
          <Building2 size={24} className="text-text-muted" />
        </div>
        <p className="text-text-muted text-sm font-medium mb-1">Failed to load company</p>
        <p className="text-text-muted text-xs mb-4">Please try again later</p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-surface-light/60 hover:bg-surface-lighter/60 rounded-xl text-sm text-text-secondary font-medium transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  const industryColors = {
    Fintech: ['#6366f1', '#8b5cf6'],
    'E-commerce': ['#ec4899', '#f43f5e'],
    'Food Tech': ['#f59e0b', '#ef4444'],
    SaaS: ['#06b6d4', '#3b82f6'],
    'Developer Tools': ['#10b981', '#06b6d4'],
    default: ['#6366f1', '#06b6d4'],
  };
  const [c1, c2] = industryColors[company.industry] || industryColors.default;

  return (
    <div className="h-full bg-surface flex flex-col overflow-hidden animate-slide-right">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden p-5 border-b border-border-light shrink-0">
        <div
          className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl opacity-70"
          style={{ background: `radial-gradient(circle at 30% 30%, ${c1}66, ${c2}33, transparent 70%)` }}
        />
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${c1}, ${c2})`,
                boxShadow: `0 6px 20px ${c1}30`,
              }}
            >
              {company.name?.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-base font-extrabold text-text-primary leading-tight">
                {company.name}
              </h2>
              <p className="text-xs text-text-muted font-medium mt-0.5">{company.industry}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-surface-lighter/60 text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Meta Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-xl text-text-secondary hover:text-primary-light hover:border-primary/20 transition-all group"
            >
              <Globe size={11} />
              Website
              <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )}
          {company.employee_count && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-xl text-text-secondary">
              <Users size={11} />
              {company.employee_count.toLocaleString()}
            </span>
          )}
          {company.founded_year && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-card rounded-xl text-text-secondary">
              <Calendar size={11} />
              {company.founded_year}
            </span>
          )}
        </div>

        {company.description && (
          <p className="text-xs text-text-muted mt-3 leading-relaxed line-clamp-3">
            {company.description}
          </p>
        )}

        {/* Offices */}
        {company.offices?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {company.offices.map((office) => (
              <span
                key={office.id}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-light/40 rounded-lg text-[10px] text-text-muted font-medium"
              >
                <MapPin size={9} className="text-primary-light/70" />
                {office.city}, {office.state}
                {office.is_hq && (
                  <span className="text-accent text-[8px] font-bold uppercase ml-0.5">HQ</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ─── Jobs List ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center">
                <Briefcase size={11} className="text-primary-light" />
              </div>
              Active Jobs
            </h3>
            <span className="text-xs font-bold text-primary-light bg-primary/10 px-2.5 py-0.5 rounded-full">
              {company.jobs?.length || 0}
            </span>
          </div>

          <div className="space-y-2">
            {company.jobs?.length > 0 ? (
              company.jobs.map((job, i) => (
                <div key={job.id} className="stagger-item">
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <div className="w-12 h-12 rounded-2xl bg-surface-light/40 flex items-center justify-center mx-auto mb-3">
                  <Briefcase size={20} className="text-text-muted" />
                </div>
                <p className="text-xs text-text-muted font-medium">No active jobs right now</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
