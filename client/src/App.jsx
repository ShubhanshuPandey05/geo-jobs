import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import CompanyDetail from './components/CompanyDetail';
import LocationModal from './components/LocationModal';
import WelcomePopup from './components/WelcomePopup';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mapRef, setMapRef] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem('geojobs_welcomed');
  });
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track mobile breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setSidebarOpen(false);
      }
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!mapRef?.invalidateSize) return;

    const rafId = requestAnimationFrame(() => {
      mapRef.invalidateSize();
    });

    const timeoutId = setTimeout(() => {
      mapRef.invalidateSize();
    }, 250);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [mapRef, sidebarOpen, selectedCompany]);

  const handleCompanySelect = useCallback((company) => {
    setSelectedCompany(company);
    // On mobile, close sidebar when a company is selected
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, []);

  const handleCompanyClose = useCallback(() => {
    setSelectedCompany(null);
  }, []);

  const handleCityChange = useCallback((city) => {
    setSelectedCity(city);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleRequestLocation = useCallback(() => {
    if (userLocation) {
      // Toggle off if already set
      setUserLocation(null);
    } else {
      setShowLocationModal(true);
    }
  }, [userLocation]);

  const handleLocationSet = useCallback((location) => {
    setUserLocation(location);
    setShowLocationModal(false);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-surface text-text-primary font-sans">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-warning/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-success/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Header
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
          onSearch={handleSearch}
          onCompanySelect={handleCompanySelect}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onRequestLocation={handleRequestLocation}
          userLocation={userLocation}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          isMobile={isMobile}
        />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar — on mobile it's a full-width overlay */}
          {isMobile ? (
            <>
              {sidebarOpen && (
                <div
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                  onClick={() => setSidebarOpen(false)}
                />
              )}
              <div
                className={`fixed inset-y-0 left-0 z-50 w-full max-w-[340px] bg-surface border-r border-border-light transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:hidden`}
                style={{ top: '60px' }}
              >
                <Sidebar
                  selectedCity={selectedCity}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  searchQuery={searchQuery}
                  onCompanySelect={handleCompanySelect}
                  selectedCompany={selectedCompany}
                />
              </div>
            </>
          ) : (
            <div
              className={`transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                sidebarOpen ? 'w-[400px] min-w-[400px]' : 'w-0 min-w-0'
              } overflow-hidden border-r border-border-light`}
            >
              <Sidebar
                selectedCity={selectedCity}
                filters={filters}
                onFilterChange={handleFilterChange}
                searchQuery={searchQuery}
                onCompanySelect={handleCompanySelect}
                selectedCompany={selectedCompany}
              />
            </div>
          )}

          {/* Map — z-0 creates a stacking context so Leaflet's internal z-indexes don't bleed over the header */}
          <div className="flex-1 relative z-0">
            <MapView
              selectedCity={selectedCity}
              onCompanySelect={handleCompanySelect}
              selectedCompany={selectedCompany}
              onMapLoad={setMapRef}
              userLocation={userLocation}
              theme={theme}
              showAllCompanies={showAllCompanies}
              onToggleShowAll={() => setShowAllCompanies(prev => !prev)}
            />
          </div>

          {/* Company Detail Panel — on mobile it's a full-screen overlay */}
          {selectedCompany && (
            isMobile ? (
              <div className="fixed inset-0 z-[60] bg-surface overflow-y-auto animate-slide-up">
                <CompanyDetail
                  companySlug={selectedCompany.slug}
                  onClose={handleCompanyClose}
                />
              </div>
            ) : (
              <div className="w-[380px] min-w-[380px] border-l border-border-light overflow-hidden">
                <CompanyDetail
                  companySlug={selectedCompany.slug}
                  onClose={handleCompanyClose}
                />
              </div>
            )
          )}
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onLocationSet={handleLocationSet}
        />
      )}

      {/* Welcome Popup */}
      {showWelcome && (
        <WelcomePopup
          onComplete={(showAll) => {
            setShowAllCompanies(showAll);
            setShowWelcome(false);
            sessionStorage.setItem('geojobs_welcomed', '1');
          }}
        />
      )}
    </div>
  );
}

export default App;
