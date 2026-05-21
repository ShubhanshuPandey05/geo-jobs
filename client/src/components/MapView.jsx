import { useEffect, useRef, useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CITIES } from '../utils/constants';
import { fetchMapMarkers } from '../services/api';

// ─── Leaflet imports (MVP — free, no token required) ────────────────────────
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── COMMENTED-OUT MAPBOX IMPORTS ────────────────────────────────────────────
// import mapboxgl from 'mapbox-gl';
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
// ─────────────────────────────────────────────────────────────────────────────

export default function MapView({ selectedCity, onCompanySelect, selectedCompany, onMapLoad }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [mapReady, setMapReady] = useState(false);

  const city = CITIES[selectedCity] || CITIES.Bangalore;

  // Fetch markers
  const { data: markerData } = useQuery({
    queryKey: ['mapMarkers'],
    queryFn: () => fetchMapMarkers(),
    enabled: mapReady,
  });

  // ─── Initialize Leaflet map ──────────────────────────────────────────────
  useEffect(() => {
    if (map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [city.lat, city.lng],
      zoom: city.zoom,
      zoomControl: false, // we'll add it manually in a better position
    });

    // OpenStreetMap dark-themed tiles (CartoDB Dark Matter — free, no key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map.current);

    // Zoom control bottom-right (mirroring Mapbox layout)
    L.control.zoom({ position: 'bottomright' }).addTo(map.current);

    setMapReady(true);
    if (onMapLoad) onMapLoad(map.current);

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // ─── Fly to city when changed ────────────────────────────────────────────
  useEffect(() => {
    if (!map.current) return;
    const target = CITIES[selectedCity] || CITIES.Bangalore;
    map.current.flyTo([target.lat, target.lng], target.zoom, { duration: 1.5 });
  }, [selectedCity]);

  // ─── Render markers ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!map.current || !markerData?.data) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    markerData.data.forEach((company) => {
      if (!company.latitude || !company.longitude) return;

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

      // Create a custom DivIcon (same look as the Mapbox marker)
      const icon = L.divIcon({
        className: '', // reset default leaflet styles
        html: `<div class="company-marker" style="background:linear-gradient(135deg,${c1},${c2})" title="${company.name}">${company.job_count || ''}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -22],
      });

      // Popup content (identical to Mapbox version)
      const popupContent = `
        <div style="padding: 16px; font-family: Inter, sans-serif;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
            ${company.logo_url
              ? `<img src="${company.logo_url}" alt="" style="width:32px;height:32px;border-radius:8px;" />`
              : `<div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;">${company.name[0]}</div>`
            }
            <div>
              <div style="font-weight:600;font-size:14px;color:#f1f5f9;">${company.name}</div>
              <div style="font-size:11px;color:#94a3b8;">${company.industry || ''} · ${company.city || ''}</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(99,102,241,0.1);border-radius:8px;margin-top:8px;">
            <span style="font-size:20px;font-weight:700;color:#818cf8;">${company.job_count || 0}</span>
            <span style="font-size:12px;color:#94a3b8;">active jobs</span>
          </div>
          <button onclick="window.__selectCompany__('${company.slug}','${company.name}','${company.industry}','${company.city}')"
            style="width:100%;margin-top:10px;padding:8px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">
            View Jobs →
          </button>
        </div>
      `;

      const marker = L.marker(
        [parseFloat(company.latitude), parseFloat(company.longitude)],
        { icon }
      )
        .bindPopup(popupContent, {
          maxWidth: 280,
          closeButton: true,
          className: 'leaflet-dark-popup',
        })
        .addTo(map.current);

      marker.on('click', () => {
        map.current.flyTo(
          [parseFloat(company.latitude), parseFloat(company.longitude)],
          14,
          { duration: 0.8 }
        );
      });

      markersRef.current.push(marker);
    });

    // Global handler for popup button clicks (same as Mapbox version)
    window.__selectCompany__ = (slug, name, industry, cityName) => {
      onCompanySelect({ slug, name, industry, city: cityName });
    };

    return () => {
      delete window.__selectCompany__;
    };
  }, [markerData, onCompanySelect]);

  // ─── Highlight selected company ──────────────────────────────────────────
  useEffect(() => {
    if (!selectedCompany || !map.current || !markerData?.data) return;
    const comp = markerData.data.find((c) => c.slug === selectedCompany.slug);
    if (comp?.latitude && comp?.longitude) {
      map.current.flyTo(
        [parseFloat(comp.latitude), parseFloat(comp.longitude)],
        15,
        { duration: 1 }
      );
    }
  }, [selectedCompany, markerData]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMMENTED-OUT MAPBOX IMPLEMENTATION (kept for future use)
// ═══════════════════════════════════════════════════════════════════════════════
//
// import mapboxgl from 'mapbox-gl';
//
// mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
//
// export default function MapView({ selectedCity, onCompanySelect, selectedCompany, onMapLoad }) {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const markersRef = useRef([]);
//   const [mapReady, setMapReady] = useState(false);
//
//   const city = CITIES[selectedCity] || CITIES.Bangalore;
//
//   // Fetch markers
//   const { data: markerData } = useQuery({
//     queryKey: ['mapMarkers'],
//     queryFn: () => fetchMapMarkers(),
//     enabled: mapReady,
//   });
//
//   // Initialize map
//   useEffect(() => {
//     if (map.current) return;
//
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/dark-v11',
//       center: [city.lng, city.lat],
//       zoom: city.zoom,
//       pitch: 0,
//       bearing: 0,
//       antialias: true,
//     });
//
//     map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
//
//     map.current.on('load', () => {
//       setMapReady(true);
//       if (onMapLoad) onMapLoad(map.current);
//     });
//
//     return () => {
//       map.current?.remove();
//       map.current = null;
//     };
//   }, []);
//
//   // Fly to city when changed
//   useEffect(() => {
//     if (!map.current) return;
//     const target = CITIES[selectedCity] || CITIES.Bangalore;
//     map.current.flyTo({
//       center: [target.lng, target.lat],
//       zoom: target.zoom,
//       duration: 2000,
//       essential: true,
//     });
//   }, [selectedCity]);
//
//   // Render markers
//   useEffect(() => {
//     if (!map.current || !markerData?.data) return;
//
//     // Clear existing markers
//     markersRef.current.forEach((m) => m.remove());
//     markersRef.current = [];
//
//     markerData.data.forEach((company) => {
//       if (!company.latitude || !company.longitude) return;
//
//       // Create marker element
//       const el = document.createElement('div');
//       el.className = 'company-marker';
//       el.textContent = company.job_count || '';
//       el.title = company.name;
//
//       // Color by industry
//       const colors = {
//         Fintech: ['#6366f1', '#8b5cf6'],
//         'E-commerce': ['#ec4899', '#f43f5e'],
//         'Food Tech': ['#f59e0b', '#ef4444'],
//         SaaS: ['#06b6d4', '#3b82f6'],
//         'Developer Tools': ['#10b981', '#06b6d4'],
//         default: ['#6366f1', '#06b6d4'],
//       };
//       const [c1, c2] = colors[company.industry] || colors.default;
//       el.style.background = `linear-gradient(135deg, ${c1}, ${c2})`;
//
//       // Popup content
//       const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, maxWidth: '280px' })
//         .setHTML(`
//           <div style="padding: 16px; font-family: Inter, sans-serif;">
//             <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
//               ${company.logo_url
//                 ? `<img src="${company.logo_url}" alt="" style="width:32px;height:32px;border-radius:8px;" />`
//                 : `<div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,${c1},${c2});display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;">${company.name[0]}</div>`
//               }
//               <div>
//                 <div style="font-weight:600;font-size:14px;color:#f1f5f9;">${company.name}</div>
//                 <div style="font-size:11px;color:#94a3b8;">${company.industry || ''} · ${company.city || ''}</div>
//               </div>
//             </div>
//             <div style="display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(99,102,241,0.1);border-radius:8px;margin-top:8px;">
//               <span style="font-size:20px;font-weight:700;color:#818cf8;">${company.job_count || 0}</span>
//               <span style="font-size:12px;color:#94a3b8;">active jobs</span>
//             </div>
//             <button onclick="window.__selectCompany__('${company.slug}','${company.name}','${company.industry}','${company.city}')"
//               style="width:100%;margin-top:10px;padding:8px;background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;">
//               View Jobs →
//             </button>
//           </div>
//         `);
//
//       const marker = new mapboxgl.Marker(el)
//         .setLngLat([parseFloat(company.longitude), parseFloat(company.latitude)])
//         .setPopup(popup)
//         .addTo(map.current);
//
//       el.addEventListener('click', () => {
//         map.current.flyTo({
//           center: [parseFloat(company.longitude), parseFloat(company.latitude)],
//           zoom: 14,
//           duration: 1000,
//         });
//       });
//
//       markersRef.current.push(marker);
//     });
//
//     // Global handler for popup button clicks
//     window.__selectCompany__ = (slug, name, industry, city) => {
//       onCompanySelect({ slug, name, industry, city });
//     };
//
//     return () => {
//       delete window.__selectCompany__;
//     };
//   }, [markerData, onCompanySelect]);
//
//   // Highlight selected company
//   useEffect(() => {
//     if (!selectedCompany || !map.current || !markerData?.data) return;
//     const comp = markerData.data.find((c) => c.slug === selectedCompany.slug);
//     if (comp?.latitude && comp?.longitude) {
//       map.current.flyTo({
//         center: [parseFloat(comp.longitude), parseFloat(comp.latitude)],
//         zoom: 15,
//         duration: 1200,
//       });
//     }
//   }, [selectedCompany, markerData]);
//
//   return (
//     <div ref={mapContainer} className="w-full h-full" />
//   );
// }
