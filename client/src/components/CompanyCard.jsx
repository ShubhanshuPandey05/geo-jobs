import { MapPin, Briefcase, Users, ExternalLink } from 'lucide-react';

export default function CompanyCard({ company, isSelected, onClick }) {
  const initials = company.name?.slice(0, 2).toUpperCase() || '??';

  const industryColors = {
    Fintech: 'from-indigo-500 to-purple-500',
    'E-commerce': 'from-pink-500 to-rose-500',
    'Food Tech': 'from-amber-500 to-red-500',
    SaaS: 'from-cyan-500 to-blue-500',
    'Developer Tools': 'from-emerald-500 to-cyan-500',
    AdTech: 'from-orange-500 to-amber-500',
    'Social Media': 'from-violet-500 to-pink-500',
    Mobility: 'from-green-500 to-teal-500',
    Retail: 'from-rose-500 to-orange-500',
  };

  const gradientClass = industryColors[company.industry] || 'from-primary to-accent';

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer rounded-xl p-3.5 transition-all duration-200 ${
        isSelected
          ? 'bg-primary/10 border border-primary/30 shadow-lg shadow-primary/10'
          : 'bg-surface-light hover:bg-card-hover border border-transparent hover:border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary truncate group-hover:text-primary-light transition-colors">
              {company.name}
            </h3>
            <span className="text-xs font-bold text-primary-light bg-primary/10 px-2 py-0.5 rounded-full shrink-0 ml-2">
              {company.job_count || 0} jobs
            </span>
          </div>

          <div className="flex items-center gap-3 mt-1.5">
            {company.industry && (
              <span className="text-[11px] text-text-muted">{company.industry}</span>
            )}
            {company.city && (
              <span className="text-[11px] text-text-muted flex items-center gap-0.5">
                <MapPin size={10} />
                {company.city}
              </span>
            )}
            {company.employee_count && (
              <span className="text-[11px] text-text-muted flex items-center gap-0.5">
                <Users size={10} />
                {company.employee_count.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
