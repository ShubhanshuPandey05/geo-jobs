import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  TrendingUp,
  LayoutGrid,
  LayoutList,
} from 'lucide-react';
import { fetchCompanies, fetchFilters } from '../services/api';
import CompanyCard from './CompanyCard';

export default function Sidebar({
  selectedCity,
  filters,
  onFilterChange,
  searchQuery,
  onCompanySelect,
  selectedCompany,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('jobs'); // 'jobs' or 'name'
  const [localFilters, setLocalFilters] = useState({
    work_type: '',
    industry: '',
  });

  // Fetch companies for selected city
  const { data: companiesData, isLoading } = useQuery({
    queryKey: ['companies', selectedCity, searchQuery, filters],
    queryFn: () => fetchCompanies({ city: selectedCity, ...filters }),
  });

  // Fetch filter options
  const { data: filterOptions } = useQuery({
    queryKey: ['filters'],
    queryFn: fetchFilters,
  });

  const companies = companiesData?.data || [];
  const filterData = filterOptions?.data || {};

  // Sort companies
  const sortedCompanies = useMemo(() => {
    const sorted = [...companies];
    if (sortBy === 'jobs') {
      sorted.sort((a, b) => (b.job_count || 0) - (a.job_count || 0));
    } else {
      sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
    return sorted;
  }, [companies, sortBy]);

  // Count active filters
  const activeFilterCount = Object.values(localFilters).filter(Boolean).length;

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const totalJobs = companies.reduce((sum, c) => sum + (parseInt(c.job_count, 10) || 0), 0);

  return (
    <div className="h-full flex flex-col bg-surface overflow-hidden">
      {/* ─── Header Section ─────────────────────────────────────────── */}
      <div className="p-4 pb-3 border-b border-border-light">
        {/* City info + stats */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Building2 size={13} className="text-primary-light" />
              </div>
              {selectedCity}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            {/* View toggle */}
            <div className="flex bg-surface-light/60 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'list'
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-text-muted hover:text-text-secondary'
                  }`}
              >
                <LayoutList size={13} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid'
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-text-muted hover:text-text-secondary'
                  }`}
              >
                <LayoutGrid size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats chips */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1 glass-card rounded-xl px-3 py-2 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary/70 to-accent/70" />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5">
                <Building2 size={12} className="text-primary-light" />
                <span className="text-lg font-extrabold gradient-text">{companies.length}</span>
              </div>
              <span className="text-[10px] text-text-muted font-medium">Companies</span>
            </div>
          </div>
          <div className="relative flex-1 glass-card rounded-xl px-3 py-2 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-warning/70 to-success/70" />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={12} className="text-accent-light" />
                <span className="text-lg font-extrabold gradient-text">{totalJobs}</span>
              </div>
              <span className="text-[10px] text-text-muted font-medium">Open Jobs</span>
            </div>
          </div>
        </div>

        {/* Filter / Sort controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${showFilters || activeFilterCount > 0
                ? 'bg-primary/15 text-primary-light border border-primary/25 shadow-sm shadow-primary/5'
                : 'bg-surface-light/60 text-text-muted hover:text-text-secondary hover:bg-surface-lighter/40 border border-transparent'
              }`}
          >
            <Filter size={12} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
            {showFilters ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>

          <div className="flex-1" />

          {/* Sort control */}
          <button
            onClick={() => setSortBy(sortBy === 'jobs' ? 'name' : 'jobs')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-text-muted hover:text-text-secondary bg-surface-light/40 hover:bg-surface-lighter/40 transition-all border border-transparent"
          >
            <Sparkles size={11} />
            {sortBy === 'jobs' ? 'By Jobs' : 'A-Z'}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="space-y-3 pt-3 mt-3 border-t border-border-light animate-slide-up">
            {/* Work Type */}
            <div>
              <label className="text-[10px] font-semibold text-text-muted mb-2 block uppercase tracking-wider">
                Work Type
              </label>
              <div className="flex gap-1.5">
                {['', 'remote', 'hybrid', 'onsite'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterUpdate('work_type', type)}
                    className={`flex-1 px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 ${localFilters.work_type === type
                        ? type === 'remote'
                          ? 'bg-remote/15 text-remote border border-remote/25'
                          : type === 'hybrid'
                            ? 'bg-hybrid/15 text-hybrid border border-hybrid/25'
                            : type === 'onsite'
                              ? 'bg-onsite/15 text-onsite border border-onsite/25'
                              : 'bg-primary/15 text-primary-light border border-primary/25'
                        : 'bg-surface-light/40 text-text-muted hover:text-text-secondary border border-transparent hover:border-border-light'
                      }`}
                  >
                    {type || 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
            {filterData.industries && (
              <div>
                <label className="text-[10px] font-semibold text-text-muted mb-2 block uppercase tracking-wider">
                  Industry
                </label>
                <select
                  value={localFilters.industry || ''}
                  onChange={(e) => handleFilterUpdate('industry', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light/60 border border-border rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary/50 focus:shadow-sm focus:shadow-primary/5 transition-all cursor-pointer"
                >
                  <option value="">All Industries</option>
                  {filterData.industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ─── Company List ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-3 space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3.5 bg-surface-light/40 rounded-xl">
                <div className="w-10 h-10 skeleton rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 skeleton w-3/4" />
                  <div className="h-2 skeleton w-1/2" />
                </div>
                <div className="h-5 w-14 skeleton rounded-full" />
              </div>
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-surface-light/40 flex items-center justify-center mb-4">
              <Building2 size={28} className="text-text-muted" />
            </div>
            <h3 className="text-sm font-bold text-text-secondary mb-1">No companies found</h3>
            <p className="text-xs text-text-muted leading-relaxed max-w-[200px]">
              Try changing your filters or selecting a different city.
            </p>
          </div>
        ) : (
          <div className={`p-3 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-1.5'}`}>
            {sortedCompanies.map((company, index) => (
              <div key={`${company.id}-${company.office_id}`} className="stagger-item">
                <CompanyCard
                  company={company}
                  isSelected={selectedCompany?.slug === company.slug}
                  onClick={() => onCompanySelect(company)}
                  compact={viewMode === 'grid'}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
