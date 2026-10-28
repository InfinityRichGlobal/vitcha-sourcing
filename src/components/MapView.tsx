import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord } from '../types';
import L from 'leaflet';
import { maplibreGL } from '@maplibre/maplibre-gl-leaflet';
import { setWorkerUrl } from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'leaflet/dist/leaflet.css';
import { MAP_STYLE_URL, withEnglishLabels } from '../utils/englishMapStyle';

setWorkerUrl(workerUrl);
import { Factory, Coffee, Layers, MapPin, ChevronRight, X, Navigation } from 'lucide-react';

interface MapViewProps {
  onSelectSupplier: (supplier: SupplierRecord) => void;
  onSelectStoreInspo: (store: StoreInspoRecord) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  onSelectSupplier,
  onSelectStoreInspo,
}) => {
  const { suppliers, drinkStores } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const lastFocusRef = useRef<string | null>(null);
  const [mapStatus, setMapStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [mapAttempt, setMapAttempt] = useState(0);

  const [filterType, setFilterType] = useState<'all' | 'suppliers' | 'drink_stores'>('all');
  const [regionFocus, setRegionFocus] = useState<'CN' | 'TH' | 'ALL'>('CN');
  const [selectedPin, setSelectedPin] = useState<{
    type: 'supplier' | 'drink_store';
    data: SupplierRecord | StoreInspoRecord;
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

    const controller = new AbortController();
    let active = true;
    let vectorLayer: ReturnType<typeof maplibreGL> | undefined;
    let ready = false;
    setMapStatus('loading');
    lastFocusRef.current = null;
    const loadTimeout = window.setTimeout(() => { if (active && !ready) setMapStatus('error'); }, 25000);
    fetch(MAP_STYLE_URL, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Map style unavailable'); return response.json(); })
      .then(style => {
        if (!active) return;
        vectorLayer = maplibreGL({ style: withEnglishLabels(style), attributionControl: false, renderWorldCopies: false }).addTo(map);
        const gl = vectorLayer.getMaplibreMap();
        gl.on('load', () => { if (active) { ready = true; window.clearTimeout(loadTimeout); setMapStatus('ready'); } });
        gl.on('error', () => { if (active && !ready) setMapStatus('error'); });
        gl.on('webglcontextlost', () => { if (active) setMapStatus('error'); });
      })
      .catch(() => { if (active && !controller.signal.aborted) setMapStatus('error'); });
    map.attributionControl.addAttribution('<a href="https://openfreemap.org/" target="_blank" rel="noopener">OpenFreeMap</a> · <a href="https://openmaptiles.org/" target="_blank" rel="noopener">OpenMapTiles</a> · <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">© OpenStreetMap</a>');

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
      active = false; controller.abort(); window.clearTimeout(loadTimeout);
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
        const itemCountry = s.country || 'CN';
        if (regionFocus !== 'ALL' && regionFocus !== itemCountry) return;

        const photo =
          s.photos.storefrontAndAtmosphere?.[0] ||
          (s.catalogItems[0] && s.catalogItems[0].photo) ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #059669; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              <img src="${photo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}" style="width: 100%; height: 100%; object-fit: cover;" />
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
        if (regionFocus === 'ALL' || regionFocus === itemCountry) {
          bounds.extend([s.location.lat, s.location.lng]);
        }
      });
    }

    // 2. Drink Stores Pins
    if (filterType === 'all' || filterType === 'drink_stores') {
      drinkStores.forEach((d) => {
        if (!d.location?.lat || !d.location?.lng) return;
        const itemCountry = d.country || 'CN';
        if (regionFocus !== 'ALL' && regionFocus !== itemCountry) return;

        const photo =
          d.photos.drinkCups?.[0] ||
          d.photos.storefrontAndAtmosphere?.[0] ||
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #D97706; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              <img src="${photo.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")}" style="width: 100%; height: 100%; object-fit: cover;" />
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
        if (regionFocus === 'ALL' || regionFocus === itemCountry) {
          bounds.extend([d.location.lat, d.location.lng]);
        }
      });
    }

    const focusKey = `${regionFocus}:${filterType}`;
    if (lastFocusRef.current === focusKey) return;
    lastFocusRef.current = focusKey;
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [36, 36],
        maxZoom: regionFocus === 'ALL' ? 12 : 13,
        animate: false,
      });
    } else if (regionFocus === 'CN') {
      map.setView([23.115, 113.325], 11, { animate: false });
    } else if (regionFocus === 'TH') {
      map.setView([13.7563, 100.5018], 11, { animate: false });
    }
  }, [suppliers, drinkStores, filterType, regionFocus, mapAttempt]);

  useEffect(() => { setSelectedPin(null); }, [filterType, regionFocus]);
  const regionSuppliers = suppliers.filter(s => regionFocus === 'ALL' || (s.country || 'CN') === regionFocus);
  const regionStores = drinkStores.filter(s => regionFocus === 'ALL' || (s.country || 'CN') === regionFocus);

  // Combined list of pinned items for quick-jump bar below map
  const quickPinItems = [
    ...(filterType !== 'drink_stores'
      ? suppliers.map((s) => ({
          id: s.id,
          title: s.name,
          country: s.country || 'CN',
          lat: s.location.lat,
          lng: s.location.lng,
          type: 'supplier' as const,
          raw: s,
        }))
      : []),
    ...(filterType !== 'suppliers'
      ? drinkStores.map((d) => ({
          id: d.id,
          title: d.storeName,
          country: d.country || 'CN',
          lat: d.location.lat,
          lng: d.location.lng,
          type: 'drink_store' as const,
          raw: d,
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
    <div className="space-y-2" data-testid="english-map" data-map-status={mapStatus}>
      <p className="text-xs text-slate-500"><span className="font-semibold text-slate-700">Map language: English</span> · ชื่อสถานที่ภาษาอังกฤษ</p>
      <div className="relative isolate w-full h-[380px] sm:h-[430px] overflow-hidden rounded-2xl border border-slate-200/90 shadow-2xs bg-slate-100">
        {/* Top Left: Type Filter Bar */}
        <div className="absolute top-2.5 left-2.5 z-[400] flex flex-wrap items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>ทั้งหมด ({regionSuppliers.length + regionStores.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('suppliers')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'suppliers'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <Factory className="w-3 h-3" />
            <span>ซัพ ({regionSuppliers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterType('drink_stores')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              filterType === 'drink_stores'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            <Coffee className="w-3 h-3" />
            <span>ร้านน้ำ ({regionStores.length})</span>
          </button>
        </div>

        {/* Top Right: Quick Region Zoom Switcher (โซนจีน / โซนไทย / ทั้งหมด) */}
        <div className="absolute top-14 sm:top-2.5 right-2.5 z-[400] flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setRegionFocus('CN')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              regionFocus === 'CN'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px]" />
            <span>China</span>
          </button>
          <button
            type="button"
            onClick={() => setRegionFocus('TH')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              regionFocus === 'TH'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i aria-hidden="true" className="fa-solid fa-location-dot text-[10px]" />
            <span>Thailand</span>
          </button>
          <button
            type="button"
            onClick={() => setRegionFocus('ALL')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              regionFocus === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <i aria-hidden="true" className="fa-solid fa-earth-asia text-[10px]" />
            <span>All regions</span>
          </button>
        </div>

        {/* Map Canvas Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" style={{ minHeight: '380px' }} />

        {mapStatus !== 'ready' && <div role="status" className="absolute bottom-8 left-3 right-12 z-[450] rounded-xl border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
          {mapStatus === 'loading' ? 'กำลังโหลดแผนที่ภาษาอังกฤษ…' : 'ยังโหลดแผนที่ไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ต'}
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
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {selectedPin.type === 'supplier' ? (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-industry text-[9px] text-emerald-600" />
                    <span>ซัพพลายเออร์</span>
                  </>
                ) : (
                  <>
                    <i aria-hidden="true" className="fa-solid fa-mug-hot text-[9px] text-amber-600" />
                    <span>เรฟร้านน้ำ</span>
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

            <div className="flex items-center gap-3 mb-3">
              <img
                src={
                  selectedPin.type === 'supplier'
                    ? (selectedPin.data as SupplierRecord).photos.storefrontAndAtmosphere?.[0]
                    : (selectedPin.data as StoreInspoRecord).photos.drinkCups?.[0] ||
                      (selectedPin.data as StoreInspoRecord).photos.storefrontAndAtmosphere?.[0]
                }
                className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-100 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-slate-900 truncate">
                  {selectedPin.type === 'supplier'
                    ? (selectedPin.data as SupplierRecord).name
                    : (selectedPin.data as StoreInspoRecord).storeName}
                </h4>
                <p className="text-xs text-slate-500 truncate">
                  {selectedPin.type === 'supplier'
                    ? (selectedPin.data as SupplierRecord).chineseName ||
                      (selectedPin.data as SupplierRecord).marketOrCity
                    : (selectedPin.data as StoreInspoRecord).chineseName ||
                      (selectedPin.data as StoreInspoRecord).city}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-1 font-medium">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {selectedPin.data.location.addressText || 'กวางโจว'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                โดย: <strong className="text-slate-800">{selectedPin.data.creator.alias}</strong>
              </div>

              <button
                onClick={() => {
                  if (selectedPin.type === 'supplier') {
                    onSelectSupplier(selectedPin.data as SupplierRecord);
                  } else {
                    onSelectStoreInspo(selectedPin.data as StoreInspoRecord);
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
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
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
            ) : (
              <i aria-hidden="true" className="fa-solid fa-mug-hot text-[10px] text-amber-600" />
            )}
            <span className="max-w-[160px] truncate">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
