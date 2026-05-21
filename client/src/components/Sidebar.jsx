import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Briefcase, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { fetchCompanies, fetchFilters } from '../services/api';
import { formatSalary } from '../utils/constants';
import CompanyCard from './CompanyCard';

export default function Sidebar({ selectedCity, filters, onFilterChange, searchQuery, onCompanySelect, selectedCompany }) {
  const [showFilters, setShowFilters] = useState(false);
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

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="h-full flex flex-col bg-surface overflow-hidden">
      {/* Stats Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Building2 size={16} className="text-primary-light" />
              Companies in {selectedCity}
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              {companies.length} companies found
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              showFilters
                ? 'bg-primary text-white'
                : 'bg-surface-light text-text-secondary hover:bg-surface-lighter'
            }`}
          >
            <Filter size={12} />
            Filters
            {showFilters ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="space-y-3 pt-3 border-t border-border animate-slide-up">
            {/* Work Type */}
            <div>
              <label className="text-xs font-medium text-text-muted mb-1.5 block">Work Type</label>
              <div className="flex gap-1.5">
                {['', 'remote', 'hybrid', 'onsite'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleFilterUpdate('work_type', type)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      localFilters.work_type === type
                        ? 'bg-primary/20 text-primary-light border border-primary/30'
                        : 'bg-surface-light text-text-muted hover:text-text-secondary'
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
                <label className="text-xs font-medium text-text-muted mb-1.5 block">Industry</label>
                <select
                  value={localFilters.industry || ''}
                  onChange={(e) => handleFilterUpdate('industry', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-xs text-text-primary focus:outline-none focus:border-primary"
                >
                  <option value="">All Industries</option>
                  {filterData.industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Company List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-3 p-4 bg-surface-light rounded-xl">
                  <div className="w-10 h-10 bg-surface-lighter rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-surface-lighter rounded w-2/3" />
                    <div className="h-2 bg-surface-lighter rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : companies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Building2 size={48} className="text-text-muted mb-4" />
            <h3 className="text-sm font-semibold text-text-secondary">No companies found</h3>
            <p className="text-xs text-text-muted mt-1">Try changing your filters or selecting a different city.</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {companies.map((company) => (
              <CompanyCard
                key={`${company.id}-${company.office_id}`}
                company={company}
                isSelected={selectedCompany?.slug === company.slug}
                onClick={() => onCompanySelect(company)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
