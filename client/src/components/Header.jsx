import { useState } from 'react';
import { MapPin, Menu, X, Navigation, ChevronDown, Sun, Moon } from 'lucide-react';
import { CITIES } from '../utils/constants';
import SearchBar from './SearchBar';

export default function Header({
  selectedCity,
  onCityChange,
  onSearch,
  onCompanySelect,
  sidebarOpen,
  onToggleSidebar,
  onRequestLocation,
  userLocation,
  theme,
  onToggleTheme,
}) {
  const [showAllCities, setShowAllCities] = useState(false);

  const cityKeys = Object.keys(CITIES);
  const topCities = cityKeys.slice(0, 4);

  return (
    <header className="glass gradient-border h-[60px] flex items-center px-4 gap-3 z-50 border-b border-border-light">
      {/* Toggle Sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-xl hover:bg-surface-lighter/60 transition-all duration-200 text-text-muted hover:text-text-primary"
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2.5 mr-1">
        <div className="w-9 h-9 rounded-xl animated-gradient flex items-center justify-center shadow-lg shadow-primary/20">
          {/* <MapPin size={17} className="text-white drop-shadow-sm" /> */}
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>
        <div>
          <h1 className="text-[15px] font-extrabold leading-tight gradient-text tracking-tight">
            GeoJobs
          </h1>
          <p className="text-[9px] text-text-muted leading-none font-medium tracking-wide uppercase">
            Discover nearby
          </p>
        </div>
      </div>

      {/* Search Bar — now powered by Meilisearch */}
      <SearchBar
        selectedCity={selectedCity}
        onSearch={onSearch}
        onCompanySelect={onCompanySelect}
      />

      {/* City Selector */}
      <div className="flex items-center gap-1 relative">
        {topCities.map((city) => (
          <button
            key={city}
            onClick={() => onCityChange(city)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${selectedCity === city
              ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/25 scale-[1.02]'
              : 'text-text-muted hover:text-text-secondary hover:bg-surface-lighter/50'
              }`}
          >
            {city}
          </button>
        ))}

        {/* More cities dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAllCities(!showAllCities)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-text-muted hover:text-text-secondary hover:bg-surface-lighter/50 transition-all"
          >
            More
            <ChevronDown size={12} className={`transition-transform duration-200 ${showAllCities ? 'rotate-180' : ''}`} />
          </button>

          {showAllCities && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowAllCities(false)} />
              <div className="absolute right-0 top-full mt-2 py-1.5 glass-elevated rounded-xl min-w-[140px] z-50 animate-slide-up">
                {cityKeys.slice(4).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onCityChange(city);
                      setShowAllCities(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${selectedCity === city
                      ? 'text-primary-light bg-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-lighter/50'
                      }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-7 bg-border mx-1" />

      {/* User Location Button */}
      <button
        onClick={onRequestLocation}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300 ${userLocation
          ? 'bg-danger/15 text-danger border border-danger/25 shadow-sm shadow-danger/10'
          : 'bg-surface-light/60 text-text-secondary hover:text-text-primary hover:bg-surface-lighter/60 border border-border'
          }`}
        title="Show my location"
      >
        <Navigation size={13} className={userLocation ? 'fill-danger' : ''} />
        {userLocation ? 'Located' : 'My Location'}
      </button>

      {/* Theme toggle */}
      <button
        onClick={onToggleTheme}
        type="button"
        className={`p-2 rounded-xl border text-text-secondary transition-all duration-300 ${theme === 'light'
          ? 'bg-primary/10 border-primary/20 text-primary-dark'
          : 'bg-surface-light/60 border-border hover:bg-surface-lighter/60 hover:text-text-primary'
          }`}
        title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      >
        {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
      </button>
    </header>
  );
}
