import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord } from '../types';
import L from 'leaflet';
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

  const [filterType, setFilterType] = useState<'all' | 'suppliers' | 'drink_stores'>('all');
  const [regionFocus, setRegionFocus] = useState<'CN' | 'TH' | 'ALL'>('CN');
  const [selectedPin, setSelectedPin] = useState<{
    type: 'supplier' | 'drink_store';
    data: SupplierRecord | StoreInspoRecord;
  } | null>(null);

  // Initialize Map with ResizeObserver & multiple invalidateSize calls so tiles never render blank
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [23.115, 113.325],
      zoom: 11,
      zoomControl: false,
    });

    // Primary OpenStreetMap Standard Tile Layer (fast & universally reliable)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    const timers = [
      window.setTimeout(() => map.invalidateSize(), 100),
      window.setTimeout(() => map.invalidateSize(), 350),
      window.setTimeout(() => map.invalidateSize(), 800),
    ];

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && mapContainerRef.current) {
      observer = new ResizeObserver(() => {
        map.invalidateSize();
      });
      observer.observe(mapContainerRef.current);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (observer) observer.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Circular Photo Pins & Fit to Selected Region
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const map = mapInstanceRef.current;
    map.invalidateSize();
    markersLayerRef.current.clearLayers();

    const bounds = L.latLngBounds([]);

    // 1. Suppliers Pins
    if (filterType === 'all' || filterType === 'suppliers') {
      suppliers.forEach((s) => {
        if (!s.location?.lat || !s.location?.lng) return;
        const itemCountry = s.country || 'CN';

        const photo =
          s.photos.storefrontAndAtmosphere?.[0] ||
          (s.catalogItems[0] && s.catalogItems[0].photo) ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #059669; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 0; right: 0; width: 17px; height: 17px; border-radius: 50%; background: #059669; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff;">🏭</div>
            </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        });

        const marker = L.marker([s.location.lat, s.location.lng], { icon: customIcon });
        marker.bindTooltip(s.name, { direction: 'top', offset: [0, -20] });
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

        const photo =
          d.photos.drinkCups?.[0] ||
          d.photos.storefrontAndAtmosphere?.[0] ||
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 46px; height: 46px; border-radius: 50%; border: 3px solid #D97706; box-shadow: 0 4px 14px rgba(0,0,0,0.28); overflow: hidden; background: #fff; cursor: pointer;">
              <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 0; right: 0; width: 17px; height: 17px; border-radius: 50%; background: #D97706; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff;">🧋</div>
            </div>
          `,
          iconSize: [46, 46],
          iconAnchor: [23, 23],
        });

        const marker = L.marker([d.location.lat, d.location.lng], { icon: customIcon });
        marker.bindTooltip(d.storeName, { direction: 'top', offset: [0, -20] });
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

    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [48, 48],
        maxZoom: regionFocus === 'ALL' ? 12 : 13,
      });
    } else if (regionFocus === 'CN') {
      map.setView([23.115, 113.325], 11);
    } else if (regionFocus === 'TH') {
      map.setView([13.7563, 100.5018], 11);
    }
  }, [suppliers, drinkStores, filterType, regionFocus]);

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
  ];

  const handleFlyToItem = (item: (typeof quickPinItems)[number]) => {
    setSelectedPin({ type: item.type, data: item.raw });
    if (mapInstanceRef.current && item.lat && item.lng) {
      mapInstanceRef.current.flyTo([item.lat, item.lng], 15, { duration: 0.7 });
    }
  };

  return (
    <div className="space-y-2">
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
            <span>ทั้งหมด ({suppliers.length + drinkStores.length})</span>
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
            <span>ซัพ ({suppliers.length})</span>
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
            <span>ร้านน้ำ ({drinkStores.length})</span>
          </button>
        </div>

        {/* Top Right: Quick Region Zoom Switcher (โซนจีน / โซนไทย / ทั้งหมด) */}
        <div className="absolute top-14 sm:top-2.5 right-2.5 z-[400] flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-sm">
          <button
            type="button"
            onClick={() => setRegionFocus('CN')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              regionFocus === 'CN'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🇨🇳 โซนจีน (กวางโจว/เซินเจิ้น)
          </button>
          <button
            type="button"
            onClick={() => setRegionFocus('TH')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
              regionFocus === 'TH'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🇹🇭 โซนไทย (กทม.)
          </button>
          <button
            type="button"
            onClick={() => setRegionFocus('ALL')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
              regionFocus === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🌏 รวม
          </button>
        </div>

        {/* Map Canvas Container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" style={{ minHeight: '380px' }} />

        {/* Bottom Popup Card for Selected Pin */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-88 z-[450] bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3.5 shadow-lg animate-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedPin.type === 'supplier'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {selectedPin.type === 'supplier' ? '🏭 ซัพพลายเออร์' : '🧋 เรฟร้านน้ำ'}
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
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
              selectedPin?.data.id === p.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200/90 hover:border-slate-400'
            }`}
          >
            <span>{p.country === 'TH' ? '🇹🇭' : '🇨🇳'}</span>
            <span>{p.type === 'supplier' ? '🏭' : '🧋'}</span>
            <span className="max-w-[160px] truncate">{p.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
