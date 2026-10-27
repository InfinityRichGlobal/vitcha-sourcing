import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { SupplierRecord, StoreInspoRecord } from '../types';
import L from 'leaflet';
import { Factory, Coffee, Layers, MapPin, ChevronRight, X } from 'lucide-react';

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
  const [selectedPin, setSelectedPin] = useState<{
    type: 'supplier' | 'drink_store';
    data: SupplierRecord | StoreInspoRecord;
  } | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Guangzhou / Pazhou Fair Complex (approx 23.11, 113.34)
    const map = L.map(mapContainerRef.current, {
      center: [23.11, 113.34],
      zoom: 12,
      zoomControl: false,
    });

    // Voyager tile layer (clean, high-resolution, light aesthetic)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Render Circular Photo Pins
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    const bounds = L.latLngBounds([]);

    // 1. Suppliers Pins
    if (filterType === 'all' || filterType === 'suppliers') {
      suppliers.forEach((s) => {
        if (!s.location.lat || !s.location.lng) return;

        const photo =
          s.photos.storefrontAndAtmosphere?.[0] ||
          (s.catalogItems[0] && s.catalogItems[0].photo) ||
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 44px; height: 44px; border-radius: 50%; border: 3px solid #059669; box-shadow: 0 4px 14px rgba(0,0,0,0.18); overflow: hidden; background: #fff; cursor: pointer; transition: transform 0.2s;">
              <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 0; right: 0; width: 16px; height: 16px; border-radius: 50%; background: #059669; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff;">🏭</div>
            </div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const marker = L.marker([s.location.lat, s.location.lng], { icon: customIcon });
        marker.on('click', () => {
          setSelectedPin({ type: 'supplier', data: s });
        });

        markersLayerRef.current?.addLayer(marker);
        bounds.extend([s.location.lat, s.location.lng]);
      });
    }

    // 2. Drink Stores Pins
    if (filterType === 'all' || filterType === 'drink_stores') {
      drinkStores.forEach((d) => {
        if (!d.location.lat || !d.location.lng) return;

        const photo =
          d.photos.drinkCups?.[0] ||
          d.photos.storefrontAndAtmosphere?.[0] ||
          'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=150&auto=format&fit=crop&q=80';

        const customIcon = L.divIcon({
          className: 'custom-map-pin',
          html: `
            <div style="position: relative; width: 44px; height: 44px; border-radius: 50%; border: 3px solid #D97706; box-shadow: 0 4px 14px rgba(0,0,0,0.18); overflow: hidden; background: #fff; cursor: pointer; transition: transform 0.2s;">
              <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 0; right: 0; width: 16px; height: 16px; border-radius: 50%; background: #D97706; border: 1.5px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 9px; color: #fff;">🧋</div>
            </div>
          `,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const marker = L.marker([d.location.lat, d.location.lng], { icon: customIcon });
        marker.on('click', () => {
          setSelectedPin({ type: 'drink_store', data: d });
        });

        markersLayerRef.current?.addLayer(marker);
        bounds.extend([d.location.lat, d.location.lng]);
      });
    }

    if (bounds.isValid() && mapInstanceRef.current) {
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [suppliers, drinkStores, filterType]);

  return (
    <div className="relative isolate w-full h-[380px] sm:h-[440px] overflow-hidden rounded-2xl border border-slate-200/90 shadow-2xs bg-slate-50">
      {/* Filter Floating Bar on Top */}
      <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-sm">
        <button
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
          onClick={() => setFilterType('suppliers')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            filterType === 'suppliers'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-emerald-700'
          }`}
        >
          <Factory className="w-3 h-3" />
          <span>ซัพพลายเออร์ ({suppliers.length})</span>
        </button>

        <button
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

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Bottom Popup Card for Selected Pin */}
      {selectedPin && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-88 z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3.5 shadow-lg animate-in slide-in-from-bottom-2">
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
                  ? (selectedPin.data as SupplierRecord).chineseName || (selectedPin.data as SupplierRecord).marketOrCity
                  : (selectedPin.data as StoreInspoRecord).chineseName || (selectedPin.data as StoreInspoRecord).city}
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
  );
};
