import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import CompanyDetail from './components/CompanyDetail';
import LocationModal from './components/LocationModal';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapRef, setMapRef] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
        />

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div
            className={`transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${sidebarOpen ? 'w-[400px] min-w-[400px]' : 'w-0 min-w-0'
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

          {/* Map — z-0 creates a stacking context so Leaflet's internal z-indexes don't bleed over the header */}
          <div className="flex-1 relative z-0">
            <MapView
              selectedCity={selectedCity}
              onCompanySelect={handleCompanySelect}
              selectedCompany={selectedCompany}
              onMapLoad={setMapRef}
              userLocation={userLocation}
              theme={theme}
            />
          </div>

          {/* Company Detail Panel */}
          {selectedCompany && (
            <div className="w-[380px] min-w-[380px] border-l border-border-light overflow-hidden">
              <CompanyDetail
                companySlug={selectedCompany.slug}
                onClose={handleCompanyClose}
              />
            </div>
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
    </div>
  );
}

export default App;
