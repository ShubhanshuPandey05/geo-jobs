import { MapPin, Users } from 'lucide-react';

export default function CompanyCard({ company, isSelected, onClick, compact }) {
  const initials = company.name?.slice(0, 2).toUpperCase() || '??';

  const industryColors = {
    Fintech: ['#6366f1', '#8b5cf6'],
    'E-commerce': ['#ec4899', '#f43f5e'],
    'Food Tech': ['#f59e0b', '#ef4444'],
    SaaS: ['#06b6d4', '#3b82f6'],
    'Developer Tools': ['#10b981', '#06b6d4'],
    AdTech: ['#f97316', '#f59e0b'],
    'Social Media': ['#8b5cf6', '#ec4899'],
    Mobility: ['#10b981', '#14b8a6'],
    Retail: ['#f43f5e', '#f97316'],
  };

  const [c1, c2] = industryColors[company.industry] || ['#6366f1', '#06b6d4'];

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`group relative overflow-hidden cursor-pointer rounded-xl p-3 transition-all duration-250 ${isSelected
            ? 'bg-primary/10 border border-primary/25 shadow-lg shadow-primary/8'
            : 'bg-surface-light/40 hover:bg-surface-light/70 border border-transparent hover:border-border-light'
          }`}
      >
        <span
          className="absolute inset-x-0 top-0 h-0.5"
          style={{ background: `linear-gradient(90deg, ${c1}, ${c2})` }}
        />
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[11px] mb-2 shadow-md"
          style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
        >
          {initials}
        </div>
        <h3 className="text-xs font-bold text-text-primary truncate group-hover:text-primary-light transition-colors mb-0.5">
          {company.name}
        </h3>
        <span className="text-[10px] font-bold text-primary-light">
          {company.job_count || 0} jobs
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden cursor-pointer rounded-xl p-3 transition-all duration-250 ${isSelected
          ? 'bg-primary/8 border border-primary/20 shadow-lg shadow-primary/8'
          : 'bg-transparent hover:bg-surface-light/50 border border-transparent hover:border-border-light'
        }`}
    >
      <span
        className="absolute inset-y-0 left-0 w-1 rounded-r-full opacity-80"
        style={{ background: `linear-gradient(180deg, ${c1}, ${c2})` }}
      />
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
            boxShadow: `0 4px 14px ${c1}30`,
          }}
        >
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[13px] font-bold text-text-primary truncate group-hover:text-primary-light transition-colors duration-200">
              {company.name}
            </h3>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-colors"
              style={{
                backgroundColor: `${c1}15`,
                color: c1,
              }}
            >
              {company.job_count || 0} jobs
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-1">
            {company.industry && (
              <span className="text-[11px] text-text-muted font-medium">{company.industry}</span>
            )}
            {company.city && (
              <span className="text-[11px] text-text-muted flex items-center gap-0.5">
                <MapPin size={9} className="text-text-muted/60" />
                {company.city}
              </span>
            )}
            {company.employee_count && (
              <span className="text-[11px] text-text-muted flex items-center gap-0.5">
                <Users size={9} className="text-text-muted/60" />
                {company.employee_count.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
