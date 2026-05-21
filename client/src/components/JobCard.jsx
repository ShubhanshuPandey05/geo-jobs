import { ExternalLink, Clock, IndianRupee, Briefcase } from 'lucide-react';
import { formatSalary, formatExperience, timeAgo, WORK_TYPE_LABELS, WORK_TYPE_COLORS } from '../utils/constants';

export default function JobCard({ job }) {
  const workTypeColor = WORK_TYPE_COLORS[job.work_type] || '#64748b';
  const workTypeLabel = WORK_TYPE_LABELS[job.work_type] || job.work_type;

  return (
    <div className="group bg-surface-light hover:bg-card-hover border border-border hover:border-primary/20 rounded-xl p-3.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-semibold text-text-primary group-hover:text-primary-light transition-colors truncate">
            {job.title}
          </h4>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {/* Work Type Badge */}
            {job.work_type && (
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: `${workTypeColor}20`,
                  color: workTypeColor,
                }}
              >
                {workTypeLabel}
              </span>
            )}
            {/* Department */}
            {job.department && (
              <span className="text-[11px] text-text-muted flex items-center gap-0.5">
                <Briefcase size={10} />
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
          className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary text-primary-light hover:text-white rounded-lg text-xs font-semibold transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          Apply <ExternalLink size={10} />
        </a>
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 mt-2.5 text-[11px] text-text-muted">
        {(job.salary_min || job.salary_max) && (
          <span className="flex items-center gap-0.5 text-success font-medium">
            <IndianRupee size={10} />
            {formatSalary(job.salary_min, job.salary_max)}
          </span>
        )}
        {(job.experience_min || job.experience_max) && (
          <span>{formatExperience(job.experience_min, job.experience_max)}</span>
        )}
        {job.posted_at && (
          <span className="flex items-center gap-0.5">
            <Clock size={10} />
            {timeAgo(job.posted_at)}
          </span>
        )}
      </div>
    </div>
  );
}
