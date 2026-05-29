import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  Briefcase,
  AlertTriangle,
  ChevronRight,
  MapPin,
  Eye,
  Filter,
  X,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { fetchMapMarkers } from '../services/api';
import './WelcomePopup.css';

export default function WelcomePopup({ onComplete }) {
  const [step, setStep] = useState(1);
  const [visible, setVisible] = useState(false);

  const { data: markerData } = useQuery({
    queryKey: ['mapMarkers'],
    queryFn: () => fetchMapMarkers(),
  });

  const stats = useMemo(() => {
    if (!markerData?.data) return { totalCompanies: 0, totalJobs: 0, companiesWithJobs: 0 };

    const allCompanies = markerData.data.filter(c => c.latitude && c.longitude);
    const companiesWithJobs = allCompanies.filter(c => Number(c.job_count || 0) > 0);
    const totalJobs = allCompanies.reduce((sum, c) => sum + Number(c.job_count || 0), 0);

    return {
      totalCompanies: allCompanies.length,
      totalJobs,
      companiesWithJobs: companiesWithJobs.length,
    };
  }, [markerData]);

  // Animate in after mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (showAll) => {
    setVisible(false);
    setTimeout(() => onComplete(showAll), 350);
  };

  const handleNext = () => {
    setStep(2);
  };

  return (
    <div className={`welcome-overlay ${visible ? 'welcome-overlay--visible' : ''}`}>
      <div className={`welcome-popup ${visible ? 'welcome-popup--visible' : ''}`}>
        {/* Close button */}
        <button
          className="welcome-close"
          onClick={() => handleChoice(false)}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Decorative background elements */}
        <div className="welcome-bg-glow welcome-bg-glow--1" />
        <div className="welcome-bg-glow welcome-bg-glow--2" />

        {/* Step indicator */}
        <div className="welcome-steps">
          <div className={`welcome-step-dot ${step >= 1 ? 'welcome-step-dot--active' : ''}`} />
          <div className="welcome-step-line">
            <div className={`welcome-step-line-fill ${step >= 2 ? 'welcome-step-line-fill--active' : ''}`} />
          </div>
          <div className={`welcome-step-dot ${step >= 2 ? 'welcome-step-dot--active' : ''}`} />
        </div>

        {step === 1 ? (
          /* ─── Step 1: Stats & Disclaimer ──────────────────────────── */
          <div className="welcome-content" key="step1">
            <div className="welcome-icon-wrap">
              <div className="welcome-icon-ring" />
              <MapPin size={28} className="welcome-icon" />
            </div>

            <h2 className="welcome-title">
              Welcome to <span className="gradient-text">GeoJobs</span>
            </h2>
            <p className="welcome-subtitle">
              Discover tech companies and jobs across India, visualized on an interactive map.
            </p>

            {/* Stats cards */}
            <div className="welcome-stats">
              <div className="welcome-stat-card">
                <div className="welcome-stat-icon welcome-stat-icon--companies">
                  <Building2 size={18} />
                </div>
                <div className="welcome-stat-value">{stats.totalCompanies.toLocaleString()}</div>
                <div className="welcome-stat-label">Companies</div>
              </div>
              <div className="welcome-stat-card">
                <div className="welcome-stat-icon welcome-stat-icon--jobs">
                  <Briefcase size={18} />
                </div>
                <div className="welcome-stat-value">{stats.totalJobs.toLocaleString()}</div>
                <div className="welcome-stat-label">Job Listings</div>
                <div className="welcome-stat-sublabel">🔄 Fresh & recently scraped</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="welcome-disclaimer">
              <div className="welcome-disclaimer-icon">
                <ShieldAlert size={16} />
              </div>
              <div className="welcome-disclaimer-text">
                <strong>Please Note:</strong> These jobs are scraped automatically and are{' '}
                <span className="welcome-disclaimer-highlight">not manually verified</span>. Some listings
                may be outdated or inaccurate. Always verify on the company's official website before applying.
              </div>
            </div>

            <button className="welcome-btn welcome-btn--primary" onClick={handleNext}>
              Got it, continue
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          /* ─── Step 2: View Preference ─────────────────────────────── */
          <div className="welcome-content" key="step2">
            <div className="welcome-icon-wrap">
              <div className="welcome-icon-ring" />
              <Eye size={28} className="welcome-icon" />
            </div>

            <h2 className="welcome-title">
              What would you like to <span className="gradient-text">see</span>?
            </h2>
            <p className="welcome-subtitle">
              Choose how companies appear on the map. You can change this anytime.
            </p>

            {/* Choice cards */}
            <div className="welcome-choices">
              <button
                className="welcome-choice-card"
                onClick={() => handleChoice(false)}
              >
                <div className="welcome-choice-icon welcome-choice-icon--filtered">
                  <Filter size={22} />
                </div>
                <div className="welcome-choice-info">
                  <div className="welcome-choice-title">Companies with Jobs</div>
                  <div className="welcome-choice-desc">
                    Show only <strong>{stats.companiesWithJobs}</strong> companies that currently have active job listings
                  </div>
                </div>
                <div className="welcome-choice-badge welcome-choice-badge--recommended">
                  <Sparkles size={10} />
                  Recommended
                </div>
              </button>

              <button
                className="welcome-choice-card"
                onClick={() => handleChoice(true)}
              >
                <div className="welcome-choice-icon welcome-choice-icon--all">
                  <Building2 size={22} />
                </div>
                <div className="welcome-choice-info">
                  <div className="welcome-choice-title">All Companies</div>
                  <div className="welcome-choice-desc">
                    Show all <strong>{stats.totalCompanies}</strong> companies on the map, including those without current openings
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
