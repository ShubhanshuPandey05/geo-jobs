import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CITIES } from '../utils/constants';
import { fetchMapMarkers } from '../services/api';

// ─── Leaflet imports ─────────────────────────────────────────────────────────
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './map.css';

export default function MapView({ selectedCity, onCompanySelect, selectedCompany, onMapLoad, userLocation, theme, showAllCompanies, onToggleShowAll }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const clusterGroupRef = useRef(null);
  const userMarkerRef = useRef(null);
  const tileLayerRef = useRef(null);
  const tempMarkerRef = useRef(null);
  const tempMarkerTimeoutRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const getTileLayerConfig = useCallback((mode) => {
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';

    if (mode === 'light') {
      return {
        url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution,
        subdomains: 'abcd',
        maxZoom: 19,
      };
    }

    return {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution,
      subdomains: 'abcd',
      maxZoom: 19,
    };
  }, []);

  const city = CITIES[selectedCity] || CITIES.Bangalore;

  // Fetch markers
  const { data: markerData } = useQuery({
    queryKey: ['mapMarkers'],
    queryFn: () => fetchMapMarkers(),
    enabled: mapReady,
  });

  const visibleMarkers = useMemo(() => {
    if (!markerData?.data) return [];

    return markerData.data.filter((company) => {
      if (!company.latitude || !company.longitude) return false;
      if (showAllCompanies) return true;
      const jobCount = Number(company.job_count || 0);
      return jobCount > 0;
    });
  }, [markerData, showAllCompanies]);

  const clearTempMarker = useCallback(() => {
    if (tempMarkerTimeoutRef.current) {
      clearTimeout(tempMarkerTimeoutRef.current);
      tempMarkerTimeoutRef.current = null;
    }

    if (tempMarkerRef.current) {
      tempMarkerRef.current.remove();
      tempMarkerRef.current = null;
    }
  }, []);

  // ─── Initialize Leaflet map ──────────────────────────────────────────────
  useEffect(() => {
    if (map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [city.lat, city.lng],
      zoom: city.zoom,
      zoomControl: false,
    });

    const tileConfig = getTileLayerConfig(theme);

    tileLayerRef.current = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      subdomains: tileConfig.subdomains,
      maxZoom: tileConfig.maxZoom,
    }).addTo(map.current);

    // Zoom control bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    setMapReady(true);
    if (onMapLoad) onMapLoad(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const tileConfig = getTileLayerConfig(theme);

    if (tileLayerRef.current && tileLayerRef.current._url === tileConfig.url) {
      return;
    }

    tileLayerRef.current?.remove();
    tileLayerRef.current = L.tileLayer(tileConfig.url, {
      attribution: tileConfig.attribution,
      subdomains: tileConfig.subdomains,
      maxZoom: tileConfig.maxZoom,
    }).addTo(map.current);
  }, [theme, getTileLayerConfig]);

  // ─── Fly to city when changed ────────────────────────────────────────────
  useEffect(() => {
    if (!map.current) return;
    const target = CITIES[selectedCity] || CITIES.Bangalore;
    map.current.flyTo([target.lat, target.lng], target.zoom, { duration: 1.5 });
  }, [selectedCity]);

  // ─── User location marker (RED PIN) ─────────────────────────────────────
  useEffect(() => {
    if (!map.current) return;

    // Remove old marker
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (!userLocation) return;

    const userIcon = L.divIcon({
      className: '',
      html: `
        <div class="user-location-marker" title="${userLocation.label || 'My Location'}">
          <div class="user-location-pulse"></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -16],
    });

    const popup = L.popup({
      maxWidth: 220,
      closeButton: true,
      className: 'leaflet-dark-popup',
    }).setContent(`
      <div style="padding: 14px; font-family: var(--font-sans, Inter, system-ui, -apple-system, sans-serif); text-align: center;">
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:6px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#ef4444;border:2px solid white;box-shadow:0 0 8px rgba(239,68,68,0.5);"></div>
          <span style="font-weight:700;font-size:13px;color:var(--color-text-primary);">You are here</span>
        </div>
        <div style="font-size:11px;color:var(--color-text-secondary);margin-bottom:4px;">
          ${userLocation.label || 'My Location'}
        </div>
        <div style="font-size:10px;color:var(--color-text-muted);">
          ${userLocation.lat.toFixed(4)}°N, ${userLocation.lng.toFixed(4)}°E
        </div>
      </div>
    `);

    userMarkerRef.current = L.marker(
      [userLocation.lat, userLocation.lng],
      { icon: userIcon, zIndexOffset: 1000 }
    )
      .bindPopup(popup)
      .addTo(map.current);

    // Fly to user location with some zoom
    map.current.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.5 });

    // Open the popup after fly animation
    setTimeout(() => {
      userMarkerRef.current?.openPopup();
    }, 1600);
  }, [userLocation]);

  // ─── Render company markers (CLUSTERED) ─────────────────────────────────
  useEffect(() => {
    if (!map.current) return;

    // Remove previous cluster group
    if (clusterGroupRef.current) {
      map.current.removeLayer(clusterGroupRef.current);
      clusterGroupRef.current = null;
    }

    if (!visibleMarkers.length) return;

    // Create cluster group with custom styling
    const clusterGroup = L.markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 16,
      chunkedLoading: true,
      chunkInterval: 100,
      chunkDelay: 10,
      iconCreateFunction: (cluster) => {
        const count = cluster.getChildCount();
        let size = 'small';
        let radius = 36;
        if (count > 50) { size = 'large'; radius = 50; }
        else if (count > 20) { size = 'medium'; radius = 42; }

        return L.divIcon({
          html: `<div class="cluster-marker cluster-marker--${size}">${count}</div>`,
          className: '',
          iconSize: [radius, radius],
          iconAnchor: [radius / 2, radius / 2],
        });
      },
    });

    const markers = visibleMarkers.map((company) => {
      // Color by industry
      const colors = {
        Fintech: ['#6366f1', '#8b5cf6'],
        'E-commerce': ['#ec4899', '#f43f5e'],
        'Food Tech': ['#f59e0b', '#ef4444'],
        SaaS: ['#06b6d4', '#3b82f6'],
        'Developer Tools': ['#10b981', '#06b6d4'],
        default: ['#6366f1', '#06b6d4'],
      };
      const [c1, c2] = colors[company.industry] || colors.default;

      // Custom DivIcon
      const icon = L.divIcon({
        className: '',
        html: `<div class="company-marker" style="background:linear-gradient(135deg,${c1},${c2});box-shadow:0 4px 16px ${c1}50,0 0 0 3px ${c1}10" title="${company.name}">${company.job_count || ''}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -24],
      });

      // Enhanced popup content
      const popupContent = `
        <div style="padding: 18px; font-family: var(--font-sans, Inter, system-ui, -apple-system, sans-serif); min-width: 200px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            ${company.logo_url
          ? `<img src="${company.logo_url}" alt="" style="width:36px;height:36px;border-radius:10px;object-fit:cover;" />`
          : `<div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:13px;box-shadow:0 4px 12px ${c1}30;">${company.name[0]}</div>`
        }
            <div>
              <div style="font-weight:700;font-size:14px;color:var(--color-text-primary);line-height:1.2;">${company.name}</div>
              <div style="font-size:11px;color:var(--color-text-secondary);margin-top:2px;">${company.industry || ''} · ${company.city || ''}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:linear-gradient(135deg,${c1}10,${c2}10);border-radius:10px;border:1px solid ${c1}15;">
            <span style="font-size:22px;font-weight:800;background:linear-gradient(135deg,${c1},${c2});-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${company.job_count || 0}</span>
            <span style="font-size:11px;color:var(--color-text-secondary);font-weight:500;">active jobs</span>
          </div>
          <button onclick="window.__selectCompany__('${company.slug}','${company.name}','${company.industry}','${company.city}')"
            style="width:100%;margin-top:12px;padding:10px;background:linear-gradient(135deg,${c1},${c2});color:white;border:none;border-radius:10px;font-size:12px;font-weight:700;cursor:pointer;transition:all 0.2s;box-shadow:0 4px 12px ${c1}30;letter-spacing:0.3px;">
            View Jobs →
          </button>
        </div>
      `;

      const marker = L.marker(
        [parseFloat(company.latitude), parseFloat(company.longitude)],
        { icon }
      ).bindPopup(popupContent, {
        maxWidth: 300,
        closeButton: true,
        className: 'leaflet-dark-popup',
      });

      marker.on('click', () => {
        map.current.flyTo(
          [parseFloat(company.latitude), parseFloat(company.longitude)],
          14,
          { duration: 0.8 }
        );
      });

      return marker;
    });

    clusterGroup.addLayers(markers);
    map.current.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    // Global handler for popup button clicks
    window.__selectCompany__ = (slug, name, industry, cityName) => {
      onCompanySelect({ slug, name, industry, city: cityName });
    };

    return () => {
      delete window.__selectCompany__;
    };
  }, [visibleMarkers, onCompanySelect]);

  // ─── Highlight selected company ──────────────────────────────────────────
  useEffect(() => {
    if (!selectedCompany || !map.current) return;

    clearTempMarker();

    const hasJobCount = selectedCompany.job_count !== undefined && selectedCompany.job_count !== null;
    const jobCount = Number(selectedCompany.job_count);
    const isZeroJobs = hasJobCount && Number.isFinite(jobCount) && jobCount <= 0;

    let targetLat = Number(selectedCompany.latitude ?? selectedCompany.lat);
    let targetLng = Number(selectedCompany.longitude ?? selectedCompany.lng);

    if (!Number.isFinite(targetLat) || !Number.isFinite(targetLng)) {
      const comp = markerData?.data?.find((c) => c.slug === selectedCompany.slug);
      if (comp?.latitude && comp?.longitude) {
        targetLat = Number(comp.latitude);
        targetLng = Number(comp.longitude);
      }
    }

    if (!Number.isFinite(targetLat) || !Number.isFinite(targetLng)) return;

    map.current.flyTo(
      [targetLat, targetLng],
      isZeroJobs ? 14 : 15,
      { duration: 1 }
    );

    if (!isZeroJobs) return;

    const tempIcon = L.divIcon({
      className: '',
      html: '<div class="temp-company-marker"><div class="temp-company-pulse"></div></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11],
      popupAnchor: [0, -16],
    });

    tempMarkerRef.current = L.marker([targetLat, targetLng], {
      icon: tempIcon,
      zIndexOffset: 900,
    }).addTo(map.current);

    tempMarkerTimeoutRef.current = setTimeout(() => {
      clearTempMarker();
    }, 3500);
  }, [selectedCompany, markerData, clearTempMarker]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      {/* Left edge fade */}
      <div className="map-overlay-left" />

      {/* Floating stats on map */}
      {markerData?.data && (
        <div className="map-stats-float">
          <div className="map-stat-chip">
            <div className="w-2 h-2 rounded-full bg-primary-light" />
            <span className="font-semibold text-text-primary">{visibleMarkers.length}</span>
            <span>companies on map</span>
          </div>
          {userLocation && (
            <div className="map-stat-chip">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <span className="font-medium text-danger">{userLocation.label}</span>
            </div>
          )}
        </div>
      )}

      {/* Show All Companies Toggle */}
      <label className="map-toggle-chip" htmlFor="showAllToggle">
        <input
          type="checkbox"
          id="showAllToggle"
          checked={showAllCompanies}
          onChange={onToggleShowAll}
          className="map-toggle-checkbox"
        />
        <span className="map-toggle-checkmark" />
        <span className="map-toggle-label">Show all companies</span>
      </label>
    </div>
  );
}
