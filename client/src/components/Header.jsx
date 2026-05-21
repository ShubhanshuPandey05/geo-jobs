import { useState } from 'react';
import { Search, MapPin, Menu, X } from 'lucide-react';
import { CITIES } from '../utils/constants';

export default function Header({ selectedCity, onCityChange, onSearch, sidebarOpen, onToggleSidebar }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <header className="glass h-16 flex items-center px-4 gap-4 z-50 border-b border-border">
      {/* Toggle Sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg hover:bg-surface-lighter transition-colors text-text-secondary hover:text-text-primary"
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 mr-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <MapPin size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
            JobMap
          </h1>
          <p className="text-[10px] text-text-muted leading-none">Discover jobs near you</p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex-1 max-w-xl">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search jobs, companies, roles..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
          />
        </div>
      </form>

      {/* City Selector */}
      <div className="flex items-center gap-1">
        {Object.keys(CITIES).slice(0, 3).map((city) => (
          <button
            key={city}
            onClick={() => onCityChange(city)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCity === city
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-lighter'
            }`}
          >
            {city}
          </button>
        ))}

        {/* More cities dropdown */}
        <select
          value={Object.keys(CITIES).slice(0, 3).includes(selectedCity) ? '' : selectedCity}
          onChange={(e) => e.target.value && onCityChange(e.target.value)}
          className="px-2 py-1.5 rounded-lg text-xs font-medium bg-surface-light border border-border text-text-secondary cursor-pointer focus:outline-none"
        >
          <option value="">More...</option>
          {Object.keys(CITIES).slice(3).map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
