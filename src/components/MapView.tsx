import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord, LocationRecord } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GOOGLE_TILE_URL = 'https://{s}.google.com/vt/lyrs=m&hl=en&gl=US&x={x}&y={y}&z={z}';
import { Factory, Coffee, Layers, MapPin, ChevronRight, X, Navigation } from 'lucide-react';

interface MapViewProps {
  onSelectSupplier: (supplier: SupplierRecord) => void;
  onSelectStoreInspo: (store: StoreInspoRecord) => void;
  onSelectLocation?: (location: LocationRecord) => void;
  initialFilterType?: 'all' | 'suppliers' | 'drink_stores' | 'locations';
}

function resolveItemCountry(item: { country?: string; location?: { lat?: number; lng?: number } }): 'CN' | 'TH' {
  const lat = item.location?.lat;
  const lng = item.location?.lng;
  if (typeof lat === 'number' && typeof lng === 'number' && lat !== 0 && lng !== 0) {
    if (lat >= 5 && lat <= 20.8 && lng >= 97 && lng <= 106) {
      return 'TH';
    }
    if (lat >= 18.2 && lat <= 54 && lng >= 73 && lng <= 135) {
      return 'CN';
    }
  }
  return item.country === 'TH' ? 'TH' : 'CN';
}

export const MapView: React.FC<MapViewProps> = ({
  onSelectSupplier,
  onSelectStoreInspo,
  onSelectLocation,
  initialFilterType,
}) => {
  const { suppliers, drinkStores, locations } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const lastFocusRef = useRef<string | null>(null);
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [mapFailure, setMapFailure] = useState('');
  const [mapAttempt, setMapAttempt] = useState(0);

  const [filterType, setFilterType] = useState<'all' | 'suppliers' | 'drink_stores' | 'locations'>(
    initialFilterType || 'all'
  );
  const [regionFocus, setRegionFocus] = useState<'ALL' | 'TH' | 'CN'>(
    'ALL'
  );

  useEffect(() => {
    if (initialFilterType) {
      setFilterType(initialFilterType);
      if (initialFilterType === 'locations') {
        setRegionFocus('ALL');
      }
    }
  }, [initialFilterType]);
  const [selectedPin, setSelectedPin] = useState<{
    type: 'supplier' | 'drink_store' | 'location';
    data: SupplierRecord | StoreInspoRecord | LocationRecord;
  } | null>(null);

  // Initialize Map safely without heavy ResizeObserver loops to prevent freezing
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Check if container already initialized
    if ((mapContainerRef.current as any)._leaflet_id) {
      delete (mapContainerRef.current as any)._leaflet_id;
    }

    const map = L.map(mapContainerRef.current, {
      center: [23.115, 113.325],
      zoom: 11,
      minZoom: 1,
      maxZoom: 19,
      zoomControl: false,
    });

    let active = true;
    let ready = false;
    setMapStatus('loading');
    setMapFailure('');
    lastFocusRef.current = null;
    const loadTimeout = window.setTimeout(() => { if (active && !ready) { setMapFailure('Map loading timed out'); setMapStatus('error'); } }, 25000);
    // Google Maps road tiles with English labels (hl=en) — readable place names in China.
    const googleLayer = L.tileLayer(GOOGLE_TILE_URL, {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      maxZoom: 20,
      attribution: 'Map data © Google',
    }).addTo(map);
    googleLayer.on('load', () => { if (active) { ready = true; window.clearTimeout(loadTimeout); setMapFailure(''); setMapStatus('ready'); } });
    googleLayer.on('tileerror', () => { if (active && !ready) { setMapFailure('Google Maps tiles unavailable'); setMapStatus('error'); } });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Gentle throttled resize handler
    let resizeTimer: number | null = null;
    const handleResize = () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    const initTimer = window.setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);

    return () => {
      active = false; window.clearTimeout(loadTimeout);
      if (resizeTimer) window.clearTimeout(resizeTimer);
      window.clearTimeout(initTimer);
      window.removeEventListener('resize', handleResize);
      try {
        map.remove();
      } catch {
        // ignore cleanup error
      }
      mapInstanceRef.current = null; markersLayerRef.current = null;
    };
  }, [mapAttempt]);

  // Render Circular Photo Pins & Fit to Selected Region
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const map = mapInstanceRef.current;
    markersLayerRef.current.clearLayers();

    const bounds = L.latLngBounds([]);

    // 1. Suppliers Pins
    if (filterType === 'all' || filterType === 'suppliers') {
      suppliers.forEach((s) => {
        if (!s.location?.lat || !s.location?.lng) return;
        const itemCountry = resolveItemCountry(s);
        if (regionFocus !== 'ALL' && regionFocus !== itemCountry) return;

        const photo =
          s.photos.storefrontAndAtmosphere?.[0] ||
          (s.catalogItems[0] && s.catalogItems[0].photo) ||
          null;

        const pinInner = photo
          ? `<img src="${photo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : `<div style="width: 100%; height: 100%; background: #ecfdf5; display: flex; align-items: center; justify-content: center; color: #059669; font-size: 18px;"><i class="fa-solid fa-industry"></i></div>`;

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #059669; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              ${pinInner}
              <div style="position: absolute; bottom: 0; right: 0; width: 17px; height: 17px; border-radius: 50%; background: #059669; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff;"><i class="fa-solid fa-industry"></i></div>
            </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        });

        const marker = L.marker([s.location.lat, s.location.lng], { icon: customIcon });
        marker.bindTooltip(Object.assign(document.createElement('span'), { textContent: s.name }), { direction: 'top', offset: [0, -20] });
        marker.on('click', () => {
          setSelectedPin({ type: 'supplier', data: s });
          map.flyTo([s.location.lat, s.location.lng], 14, { duration: 0.6 });
        });

        markersLayerRef.current?.addLayer(marker);
        bounds.extend([s.location.lat, s.location.lng]);
      });
    }

    // 2. Drink Stores Pins
    if (filterType === 'all' || filterType === 'drink_stores') {
      drinkStores.forEach((d) => {
        if (!d.location?.lat || !d.location?.lng) return;
        const itemCountry = resolveItemCountry(d);
        if (regionFocus !== 'ALL' && regionFocus !== itemCountry) return;

        const photo =
          d.photos.drinkCups?.[0] ||
          d.photos.storefrontAndAtmosphere?.[0] ||
          null;

        const pinInner = photo
          ? `<img src="${photo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : `<div style="width: 100%; height: 100%; background: #fffbeb; display: flex; align-items: center; justify-content: center; color: #d97706; font-size: 18px;"><i class="fa-solid fa-mug-hot"></i></div>`;

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #D97706; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              ${pinInner}
              <div style="position: absolute; bottom: 0; right: 0; width: 17px; height: 17px; border-radius: 50%; background: #D97706; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff;"><i class="fa-solid fa-mug-hot"></i></div>
            </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        });

        const marker = L.marker([d.location.lat, d.location.lng], { icon: customIcon });
        marker.bindTooltip(Object.assign(document.createElement('span'), { textContent: d.storeName }), { direction: 'top', offset: [0, -20] });
        marker.on('click', () => {
          setSelectedPin({ type: 'drink_store', data: d });
          map.flyTo([d.location.lat, d.location.lng], 14, { duration: 0.6 });
        });

        markersLayerRef.current?.addLayer(marker);
        bounds.extend([d.location.lat, d.location.lng]);
      });
    }

    // 3. Locations Pins (สีฟ้า)
    if (filterType === 'all' || filterType === 'locations') {
      locations.forEach((loc) => {
        if (!loc.location?.lat || !loc.location?.lng) return;
        const itemCountry = resolveItemCountry(loc);
        if (regionFocus !== 'ALL' && regionFocus !== itemCountry) return;

        const photo =
          loc.photos.storefrontAndAtmosphere?.[0] ||
          loc.photos.floorPlanAndSpecs?.[0] ||
          null;

        const pinInner = photo
          ? `<img src="${photo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : `<div style="width: 100%; height: 100%; background: #f0f9ff; display: flex; align-items: center; justify-content: center; color: #0284c7; font-size: 18px;"><i class="fa-solid fa-map-location-dot"></i></div>`;

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #0284c7; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              ${pinInner}
              <div style="position: absolute; bottom: 0; right: 0; width: 17px; height: 17px; border-radius: 50%; background: #0284c7; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 8px; color: #fff;"><i class="fa-solid fa-map-location-dot"></i></div>
            </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        });

        const marker = L.marker([loc.location.lat, loc.location.lng], { icon: customIcon });
        marker.bindTooltip(Object.assign(document.createElement('span'), { textContent: loc.name }), { direction: 'top', offset: [0, -20] });
        marker.on('click', () => {
          setSelectedPin({ type: 'location', data: loc });
          map.flyTo([loc.location.lat, loc.location.lng], 14, { duration: 0.6 });
        });

        markersLayerRef.current?.addLayer(marker);
        bounds.extend([loc.location.lat, loc.location.lng]);
      });
    }

    const focusKey = `${regionFocus}:${filterType}`;
    if (lastFocusRef.current === focusKey) return;
    lastFocusRef.current = focusKey;
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: regionFocus === 'ALL' ? 12 : 13,
        animate: true,
      });
    } else if (regionFocus === 'CN') {
      map.setView([23.115, 113.325], 11, { animate: true });
    } else if (regionFocus === 'TH') {
      map.setView([13.7563, 100.5018], 11, { animate: true });
    } else {
      map.setView([18.0, 107.0], 5, { animate: true });
    }
  }, [suppliers, drinkStores, locations, filterType, regionFocus, mapAttempt]);

  useEffect(() => { setSelectedPin(null); }, [filterType, regionFocus]);
  const regionSuppliers = suppliers.filter(s => regionFocus === 'ALL' || resolveItemCountry(s) === regionFocus);
  const regionStores = drinkStores.filter(d => regionFocus === 'ALL' || resolveItemCountry(d) === regionFocus);
  const regionLocations = locations.filter(l => regionFocus === 'ALL' || resolveItemCountry(l) === regionFocus);

  // Combined list of pinned items for quick-jump bar below map
  const quickPinItems = [
    ...(filterType === 'all' || filterType === 'suppliers'
      ? suppliers.map((s) => ({
          id: s.id,
          title: s.name,
          country: resolveItemCountry(s),
          lat: s.location.lat,
          lng: s.location.lng,
          type: 'supplier' as const,
          raw: s,
        }))
      : []),
    ...(filterType === 'all' || filterType === 'drink_stores'
      ? drinkStores.map((d) => ({
          id: d.id,
          title: d.storeName,
          country: resolveItemCountry(d),
          lat: d.location.lat,
          lng: d.location.lng,
          type: 'drink_store' as const,
          raw: d,
        }))
      : []),
    ...(filterType === 'all' || filterType === 'locations'
      ? locations.map((loc) => ({
          id: loc.id,
          title: loc.name,
          country: resolveItemCountry(loc),
          lat: loc.location.lat,
          lng: loc.location.lng,
          type: 'location' as const,
          raw: loc,
        }))
      : []),
  ].filter(item => regionFocus === 'ALL' || item.country === regionFocus);

  const handleFlyToItem = (item: (typeof quickPinItems)[number]) => {
    setSelectedPin({ type: item.type, data: item.raw });
    if (mapInstanceRef.current && item.lat && item.lng) {
      mapInstanceRef.current.flyTo([item.lat, item.lng], 15, { duration: 0.7 });
    }
  };

  return (
    <div className="space-y-2 min-w-0 max-w-full overflow-hidden" data-testid="english-map" data-map-status={mapStatus} data-map-error={mapFailure}>
      <span className="sr-only">Map language: English</span>
      <div className="relative isolate w-full h-[380px] sm:h-[430px] overflow-hidden rounded-2xl border border-slate-200/90 shadow-2xs bg-slate-100">
        {/* Top Left Corner: 3 Distinct Colored Buttons with FontAwesome IconFonts */}
        <div className="absolute top-1.5 left-1.5 z-[400] flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-2xs max-w-[calc(100%-110px)] overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <i className="fa-solid fa-layer-group text-[10px]" />
            <span>ทั้งหมด ({regionSuppliers.length + regionStores.length + regionLocations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('suppliers')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
              filterType === 'suppliers'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/70'
            }`}
          >
            <i className="fa-solid fa-industry text-[10px]" />
            <span>ซัพ ({regionSuppliers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('drink_stores')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
              filterType === 'drink_stores'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/70'
            }`}
          >
            <i className="fa-solid fa-mug-hot text-[10px]" />
            <span>ร้านน้ำ ({regionStores.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('locations')}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all whitespace-nowrap ${
              filterType === 'locations'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200/70'
            }`}
          >
            <i className="fa-solid fa-map-location-dot text-[10px]" />
            <span>สถานที่ ({regionLocations.length})</span>
          </button>
        </div>

        {/* Top Right Corner: Minimal Country Switcher: โลก (ALL) -> ไทย (TH) -> จีน (CN) */}
        <div className="absolute top-1.5 right-1.5 z-[400] flex items-center gap-0.5 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/90 shadow-2xs">
          <button
            type="button"
            aria-label="All regions"
            title="รวมทุกโซน / แผนที่โลก"
            onClick={() => setRegionFocus('ALL')}
            className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              regionFocus === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span className="text-xs leading-none">🌐</span>
            <span className="hidden sm:inline">โลก</span>
          </button>
          <button
            type="button"
            aria-label="Thailand"
            title="โซนไทย"
            onClick={() => setRegionFocus('TH')}
            className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              regionFocus === 'TH'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
            }`}
          >
            <span className="text-xs leading-none">🇹🇭</span>
            <span className="hidden sm:inline">ไทย</span>
          </button>
          <button
            type="button"
            aria-label="China"
            title="โซนจีน"
            onClick={() => setRegionFocus('CN')}
            className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              regionFocus === 'CN'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
            }`}
          >
            <span className="text-xs leading-none">🇨🇳</span>
            <span className="hidden sm:inline">จีน</span>
          </button>
        </div>

        {/* Map Canvas Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" style={{ minHeight: '380px' }} />

        {mapStatus !== 'ready' && <div role="status" className="absolute bottom-8 left-3 right-12 z-[450] rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
          {mapStatus === 'loading' ? 'กำลังโหลดแผนที่ภาษาอังกฤษ…' : 'ยังแสดงแผนที่ไม่ได้ กรุณาลองอีกครั้ง'}
          {mapStatus === 'error' && <button className="ml-2 min-h-10 font-semibold text-emerald-700 underline" onClick={() => setMapAttempt(value => value + 1)}>ลองใหม่</button>}
        </div>}

        {/* Bottom Popup Card for Selected Pin */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-88 z-[450] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3.5 shadow-lg animate-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  selectedPin.type === 'supplier'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : selectedPin.type === 'drink_store'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-sky-50 text-sky-800 border border-sky-200'
                }`}
              >
                {selectedPin.type === 'supplier' ? (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-industry text-[9px] text-emerald-600" />
                    <span>ซัพพลายเออร์</span>
                  </>
                ) : selectedPin.type === 'drink_store' ? (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-mug-hot text-[9px] text-amber-600" />
                    <span>เรฟร้านน้ำ</span>
                  </>
                ) : (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-map-location-dot text-[9px] text-sky-600" />
                    <span>ทำเล & พื้นที่</span>
                  </>
                )}
              </span>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {(() => {
              const previewThumb =
                selectedPin.type === 'supplier'
                  ? (selectedPin.data as SupplierRecord).photos.storefrontAndAtmosphere?.[0] ||
                    (selectedPin.data as SupplierRecord).catalogItems?.[0]?.photo
                  : selectedPin.type === 'drink_store'
                  ? (selectedPin.data as StoreInspoRecord).photos.drinkCups?.[0] ||
                    (selectedPin.data as StoreInspoRecord).photos.storefrontAndAtmosphere?.[0]
                  : (selectedPin.data as LocationRecord).photos.storefrontAndAtmosphere?.[0] ||
                    (selectedPin.data as LocationRecord).photos.floorPlanAndSpecs?.[0];

              return (
                <div className="flex items-center gap-3 mb-3">
                  {previewThumb ? (
                    <img
                      src={previewThumb}
                      alt="Thumbnail"
                      className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm"
                    />
                  ) : (
                    <div
                      className={`w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center text-xl border ${
                        selectedPin.type === 'supplier'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                          : selectedPin.type === 'drink_store'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-sky-50 text-sky-600 border-sky-100'
                      }`}
                    >
                      {selectedPin.type === 'supplier' ? (
                        <i className="fa-solid fa-industry" />
                      ) : selectedPin.type === 'drink_store' ? (
                        <i className="fa-solid fa-mug-hot" />
                      ) : (
                        <i className="fa-solid fa-map-location-dot" />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-slate-900 truncate">
                      {selectedPin.type === 'supplier'
                        ? (selectedPin.data as SupplierRecord).name
                        : selectedPin.type === 'drink_store'
                        ? (selectedPin.data as StoreInspoRecord).storeName
                        : (selectedPin.data as LocationRecord).name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {selectedPin.type === 'supplier'
                        ? (selectedPin.data as SupplierRecord).chineseName ||
                          (selectedPin.data as SupplierRecord).marketOrCity
                        : selectedPin.type === 'drink_store'
                        ? (selectedPin.data as StoreInspoRecord).chineseName ||
                          (selectedPin.data as StoreInspoRecord).city
                        : (selectedPin.data as LocationRecord).zoneOrFloor}
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-1 font-medium">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">
                        {selectedPin.data.location.addressText || 'พิกัดที่ตั้ง'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                โดย: <strong className="text-slate-800">{selectedPin.data.creator.alias}</strong>
              </div>

              <button
                onClick={() => {
                  if (selectedPin.type === 'supplier') {
                    onSelectSupplier(selectedPin.data as SupplierRecord);
                  } else if (selectedPin.type === 'drink_store') {
                    onSelectStoreInspo(selectedPin.data as StoreInspoRecord);
                  } else if (onSelectLocation) {
                    onSelectLocation(selectedPin.data as LocationRecord);
                  } else {
                    onSelectSupplier(selectedPin.data as any);
                  }
                }}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
              >
                <span>ดูข้อมูลเต็ม</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Jump Pin Strip below Map (แตะชื่อร้านเพื่อซูมไปหาหมุดบนแผนที่ทันที) */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 min-w-0 max-w-full">
        <span className="text-[11px] font-bold text-slate-500 shrink-0 flex items-center gap-1 pr-1">
          <Navigation className="w-3 h-3 text-emerald-600" />
          <span>แตะเพื่อซูมไปที่หมุด:</span>
        </span>
        {quickPinItems.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleFlyToItem(p)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              selectedPin?.data.id === p.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-400'
            }`}
          >
            <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-slate-100 text-slate-600">
              {p.country === 'TH' ? 'TH' : 'CN'}
            </span>
            {p.type === 'supplier' ? (
              <i aria-hidden="true" className="fa-solid fa-industry text-[10px] text-emerald-600" />
            ) : p.type === 'drink_store' ? (
              <i aria-hidden="true" className="fa-solid fa-mug-hot text-[10px] text-amber-600" />
            ) : (
              <i aria-hidden="true" className="fa-solid fa-map-location-dot text-[10px] text-sky-600" />
            )}
            <span className="max-w-[160px] truncate">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
