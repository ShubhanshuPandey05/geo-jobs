import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search,
  Briefcase,
  Building2,
  MapPin,
  X,
  Loader2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { fetchSuggestions } from '../services/api';

/**
 * Instant fuzzy search bar powered by Meilisearch.
 * Shows a dropdown with job & company suggestions as the user types.
 */
export default function SearchBar({ selectedCity, onSearch, onCompanySelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [processingTime, setProcessingTime] = useState(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced fetch suggestions
  const fetchResults = useCallback(
    async (q) => {
      if (!q || q.trim().length < 1) {
        setSuggestions(null);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await fetchSuggestions(q.trim(), selectedCity);
        setSuggestions(result.suggestions);
        setProcessingTime(result.processingTimeMs);
        setIsOpen(true);
        setActiveIndex(-1);
      } catch (err) {
        console.error('Search suggest error:', err);
        setSuggestions(null);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedCity]
  );

  // Debounce input changes (150ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchResults(query), 150);
    return () => clearTimeout(debounceRef.current);
  }, [query, fetchResults]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Flatten results for keyboard nav
  const allItems = [];
  if (suggestions?.companies?.length > 0) {
    suggestions.companies.forEach((c) => allItems.push({ type: 'company', data: c }));
  }
  if (suggestions?.jobs?.length > 0) {
    suggestions.jobs.forEach((j) => allItems.push({ type: 'job', data: j }));
  }

  const handleKeyDown = (e) => {
    if (!isOpen || allItems.length === 0) {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSearch(query);
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, allItems.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < allItems.length) {
          handleItemSelect(allItems[activeIndex]);
        } else {
          onSearch(query);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleItemSelect = (item) => {
    if (item.type === 'company') {
      onCompanySelect?.({
        id: item.data.id,
        slug: item.data.slug,
        name: item.data.name,
      });
    } else {
      setQuery(item.data.title);
      onSearch(item.data.title);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions(null);
    setIsOpen(false);
    onSearch('');
    inputRef.current?.focus();
  };

  const hasResults = suggestions && (suggestions.jobs?.length > 0 || suggestions.companies?.length > 0);

  return (
    <div className="relative flex-1 max-w-xl">
      {/* Input */}
      <div className="relative group">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-light transition-colors duration-200"
        />
        <input
          ref={inputRef}
          type="text"
          id="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 0 && suggestions && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search jobs, companies, roles..."
          autoComplete="off"
          className="w-full pl-10 pr-10 py-2 bg-surface-light/60 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-primary/50 focus:bg-surface-light focus:shadow-lg focus:shadow-primary/5 transition-all duration-300"
        />
        {/* Right side: spinner or clear */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {isLoading && (
            <Loader2 size={14} className="text-primary-light animate-spin" />
          )}
          {query.length > 0 && !isLoading && (
            <button
              onClick={handleClear}
              className="p-0.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-lighter/60 transition-all"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border-light rounded-2xl shadow-2xl shadow-black/30 overflow-hidden z-[100] animate-slide-up"
          style={{ maxHeight: '420px' }}
        >
          {/* Speed indicator */}
          {processingTime !== null && (
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border-light/50">
              <Sparkles size={10} className="text-accent" />
              <span className="text-[10px] text-text-muted font-medium">
                Found in {processingTime}ms
              </span>
            </div>
          )}

          {/* Scrollable results */}
          <div className="overflow-y-auto" style={{ maxHeight: '370px' }}>
            {!hasResults && !isLoading && (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <Search size={24} className="text-text-muted/40 mb-2" />
                <p className="text-xs text-text-muted">
                  No results for "<span className="text-text-secondary font-medium">{query}</span>"
                </p>
                <p className="text-[10px] text-text-muted/60 mt-1">Try a different search term</p>
              </div>
            )}

            {/* Company results */}
            {suggestions?.companies?.length > 0 && (
              <div>
                <div className="px-4 py-2 flex items-center gap-1.5">
                  <Building2 size={11} className="text-primary-light" />
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Companies
                  </span>
                  <span className="text-[9px] text-text-muted/50 ml-auto">{suggestions.companies.length}</span>
                </div>
                {suggestions.companies.map((company, idx) => {
                  const globalIdx = idx;
                  return (
                    <button
                      key={`company-${company.id}`}
                      onClick={() => handleItemSelect({ type: 'company', data: company })}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 ${
                        activeIndex === globalIdx
                          ? 'bg-primary/10 border-l-2 border-primary'
                          : 'hover:bg-surface-light/60 border-l-2 border-transparent'
                      }`}
                    >
                      {company.logo_url ? (
                        <img
                          src={company.logo_url}
                          alt=""
                          className="w-8 h-8 rounded-lg object-contain bg-surface-light p-1 shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                          <Building2 size={14} className="text-primary-light" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-text-primary truncate">
                          {company.name}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          {company.industry && (
                            <span className="text-[10px] text-text-muted">{company.industry}</span>
                          )}
                          {company.job_count > 0 && (
                            <span className="text-[10px] text-accent font-semibold">
                              {company.job_count} jobs
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight size={12} className="text-text-muted/40 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* Job results */}
            {suggestions?.jobs?.length > 0 && (
              <div>
                <div className="px-4 py-2 flex items-center gap-1.5 border-t border-border-light/30">
                  <Briefcase size={11} className="text-accent" />
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                    Jobs
                  </span>
                  <span className="text-[9px] text-text-muted/50 ml-auto">{suggestions.jobs.length}</span>
                </div>
                {suggestions.jobs.map((job, idx) => {
                  const globalIdx = (suggestions?.companies?.length || 0) + idx;
                  return (
                    <button
                      key={`job-${job.id}`}
                      onClick={() => handleItemSelect({ type: 'job', data: job })}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 ${
                        activeIndex === globalIdx
                          ? 'bg-primary/10 border-l-2 border-primary'
                          : 'hover:bg-surface-light/60 border-l-2 border-transparent'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent/15 to-warning/15 flex items-center justify-center shrink-0">
                        <Briefcase size={14} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-text-primary truncate">
                          {job.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-text-muted">{job.company_name}</span>
                          {job.city && (
                            <span className="text-[10px] text-text-muted/60 flex items-center gap-0.5">
                              <MapPin size={8} /> {job.city}
                            </span>
                          )}
                          {job.work_type && (
                            <span
                              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${
                                job.work_type === 'remote'
                                  ? 'bg-remote/15 text-remote'
                                  : job.work_type === 'hybrid'
                                  ? 'bg-hybrid/15 text-hybrid'
                                  : 'bg-onsite/15 text-onsite'
                              }`}
                            >
                              {job.work_type}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight size={12} className="text-text-muted/40 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer: full search link */}
          {hasResults && (
            <button
              onClick={() => {
                onSearch(query);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border-t border-border-light/50 text-xs font-semibold text-primary-light hover:bg-primary/5 transition-all"
            >
              <Search size={12} />
              View all results for "{query}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
