import { useState } from 'react';
import { MapPin, Navigation, Loader2, X, AlertCircle } from 'lucide-react';

export default function LocationModal({ onClose, onLocationSet }) {
  const [mode, setMode] = useState('choose'); // 'choose' | 'detecting' | 'manual' | 'error'
  const [manualCity, setManualCity] = useState('');
  const [error, setError] = useState('');

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setMode('error');
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setMode('detecting');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationSet({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: 'My Location',
          source: 'gps',
        });
      },
      (err) => {
        setMode('error');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Location access denied. Please allow location access or enter manually.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location unavailable. Please try entering manually.');
            break;
          case err.TIMEOUT:
            setError('Location request timed out. Please try again.');
            break;
          default:
            setError('Could not detect your location. Please enter manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  // Simple city-to-coord lookup for manual entry
  const CITY_COORDS = {
    'delhi': { lat: 28.6139, lng: 77.2090 },
    'new delhi': { lat: 28.6139, lng: 77.2090 },
    'mumbai': { lat: 19.0760, lng: 72.8777 },
    'bangalore': { lat: 12.9716, lng: 77.5946 },
    'bengaluru': { lat: 12.9716, lng: 77.5946 },
    'hyderabad': { lat: 17.3850, lng: 78.4867 },
    'pune': { lat: 18.5204, lng: 73.8567 },
    'chennai': { lat: 13.0827, lng: 80.2707 },
    'kolkata': { lat: 22.5726, lng: 88.3639 },
    'ahmedabad': { lat: 23.0225, lng: 72.5714 },
    'surat': { lat: 21.1702, lng: 72.8311 },
    'jaipur': { lat: 26.9124, lng: 75.7873 },
    'lucknow': { lat: 26.8467, lng: 80.9462 },
    'gurgaon': { lat: 28.4595, lng: 77.0266 },
    'gurugram': { lat: 28.4595, lng: 77.0266 },
    'noida': { lat: 28.5355, lng: 77.3910 },
    'chandigarh': { lat: 30.7333, lng: 76.7794 },
    'indore': { lat: 22.7196, lng: 75.8577 },
    'kochi': { lat: 9.9312, lng: 76.2673 },
    'coimbatore': { lat: 11.0168, lng: 76.9558 },
    'nagpur': { lat: 21.1458, lng: 79.0882 },
    'bhopal': { lat: 23.2599, lng: 77.4126 },
    'thiruvananthapuram': { lat: 8.5241, lng: 76.9366 },
    'visakhapatnam': { lat: 17.6868, lng: 83.2185 },
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const city = manualCity.trim().toLowerCase();
    const coords = CITY_COORDS[city];

    if (coords) {
      onLocationSet({
        ...coords,
        label: manualCity.trim(),
        source: 'manual',
      });
    } else {
      setError(`City "${manualCity}" not found. Try another Indian city.`);
    }
  };

  return (
    <div className="location-modal-backdrop" onClick={onClose}>
      <div className="location-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl hover:bg-surface-lighter/60 text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={16} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-danger/20 to-danger/5 flex items-center justify-center">
              <MapPin size={28} className="text-danger" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-danger flex items-center justify-center animate-float">
              <Navigation size={10} className="text-white fill-white" />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-extrabold text-text-primary text-center mb-1">
          Where are you?
        </h2>
        <p className="text-xs text-text-muted text-center mb-6 leading-relaxed max-w-[300px] mx-auto">
          Share your location to see a <span className="text-danger font-semibold">red pin</span> on the map and discover jobs near you.
        </p>

        {mode === 'choose' && (
          <div className="space-y-3">
            <button
              onClick={handleDetectLocation}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.01]"
            >
              <Navigation size={16} className="fill-white" />
              Detect My Location
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <button
              onClick={() => setMode('manual')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-light/60 hover:bg-surface-lighter/60 text-text-secondary hover:text-text-primary rounded-xl font-semibold text-sm transition-all border border-border hover:border-border-light"
            >
              <MapPin size={15} />
              Enter City Manually
            </button>
          </div>
        )}

        {mode === 'detecting' && (
          <div className="flex flex-col items-center py-6">
            <Loader2 size={32} className="text-primary-light animate-spin mb-3" />
            <p className="text-sm text-text-secondary font-medium">Detecting your location...</p>
            <p className="text-[11px] text-text-muted mt-1">Please allow location access when prompted</p>
          </div>
        )}

        {mode === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="relative">
              <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={manualCity}
                onChange={(e) => {
                  setManualCity(e.target.value);
                  setError('');
                }}
                placeholder="Enter your city (e.g., Bangalore, Mumbai)"
                className="w-full pl-10 pr-4 py-3 bg-surface-light/60 border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted/70 focus:outline-none focus:border-primary/50 focus:shadow-lg focus:shadow-primary/5 transition-all"
                autoFocus
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-danger px-1 animate-slide-up">
                <AlertCircle size={12} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!manualCity.trim()}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-danger to-red-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-danger/20 hover:shadow-xl hover:shadow-danger/30 transition-all duration-300 hover:scale-[1.01] disabled:opacity-40 disabled:pointer-events-none"
            >
              <MapPin size={15} className="fill-white" />
              Pin My Location
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('choose');
                setError('');
              }}
              className="w-full text-xs text-text-muted hover:text-text-secondary font-medium py-2 transition-colors"
            >
              ← Back to options
            </button>
          </form>
        )}

        {mode === 'error' && (
          <div className="space-y-3">
            <div className="flex items-start gap-2.5 p-3 bg-danger/10 border border-danger/20 rounded-xl animate-slide-up">
              <AlertCircle size={16} className="text-danger shrink-0 mt-0.5" />
              <p className="text-xs text-danger/90 leading-relaxed">{error}</p>
            </div>

            <button
              onClick={() => setMode('manual')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-light/60 hover:bg-surface-lighter/60 text-text-secondary hover:text-text-primary rounded-xl font-semibold text-sm transition-all border border-border"
            >
              <MapPin size={15} />
              Enter City Manually
            </button>

            <button
              onClick={handleDetectLocation}
              className="w-full text-xs text-text-muted hover:text-text-secondary font-medium py-2 transition-colors"
            >
              Try detecting again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
