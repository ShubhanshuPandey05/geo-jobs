import { useState, useCallback } from 'react';
import Header from './components/Header';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import CompanyDetail from './components/CompanyDetail';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mapRef, setMapRef] = useState(null);

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

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-surface">
      <Header
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        onSearch={handleSearch}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'w-[420px] min-w-[420px]' : 'w-0 min-w-0'
          } overflow-hidden border-r border-border`}
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

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            selectedCity={selectedCity}
            onCompanySelect={handleCompanySelect}
            selectedCompany={selectedCompany}
            onMapLoad={setMapRef}
          />
        </div>

        {/* Company Detail Panel */}
        {selectedCompany && (
          <div className="w-[400px] min-w-[400px] border-l border-border overflow-hidden animate-slide-up">
            <CompanyDetail
              companySlug={selectedCompany.slug}
              onClose={handleCompanyClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
