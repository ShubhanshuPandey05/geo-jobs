import { ExternalLink, Clock, IndianRupee, Briefcase, ArrowUpRight } from 'lucide-react';
import { formatSalary, formatExperience, timeAgo, WORK_TYPE_LABELS, WORK_TYPE_COLORS } from '../utils/constants';
import posthog from 'posthog-js';

export default function JobCard({ job }) {
  const workTypeColor = WORK_TYPE_COLORS[job.work_type] || '#64748b';
  const workTypeLabel = WORK_TYPE_LABELS[job.work_type] || job.work_type;

  const handleClick = () => {
    posthog.capture('Job Apply button clicked', {
      job: job.title,
      source: job.source,
    });
  };

  return (
    <div className="group relative overflow-hidden bg-surface-light/40 hover:bg-surface-light/70 border border-border-light hover:border-primary/15 rounded-xl p-3.5 transition-all duration-250 cursor-default">
      <span
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${workTypeColor}, transparent)` }}
      />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-[13px] font-bold text-text-primary group-hover:text-primary-light transition-colors duration-200 truncate">
            {job.title}
          </h4>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {/* Work Type Badge */}
            {job.work_type && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold tracking-wide"
                style={{
                  backgroundColor: `${workTypeColor}15`,
                  color: workTypeColor,
                  border: `1px solid ${workTypeColor}20`,
                }}
              >
                {workTypeLabel}
              </span>
            )}
            {/* Department */}
            {job.department && (
              <span className="text-[11px] text-text-muted flex items-center gap-1 font-medium">
                <Briefcase size={9} className="text-text-muted/60" />
                {job.department}
              </span>
            )}
          </div>
        </div>

        {/* Apply button */}
        <a
          href={job.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-accent/20 hover:from-primary hover:to-accent text-primary-light hover:text-white rounded-xl text-[11px] font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          onClick={handleClick}
        >
          Apply
          <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 mt-2.5 text-[11px] text-text-muted">
        {(job.salary_min || job.salary_max) && (
          <span className="flex items-center gap-0.5 text-success font-semibold">
            <IndianRupee size={10} />
            {formatSalary(job.salary_min, job.salary_max)}
          </span>
        )}
        {(job.experience_min || job.experience_max) && (
          <span className="font-medium">{formatExperience(job.experience_min, job.experience_max)}</span>
        )}
        {job.posted_at && (
          <span className="flex items-center gap-0.5 font-medium">
            <Clock size={9} />
            {timeAgo(job.posted_at)}
          </span>
        )}
      </div>
    </div>
  );
}
