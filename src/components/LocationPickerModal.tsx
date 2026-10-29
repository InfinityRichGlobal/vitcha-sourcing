import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Crosshair, Check, X, Search, RotateCcw } from 'lucide-react';

export interface LocationPickerResult {
  lat: number;
  lng: number;
  addressText?: string;
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (result: LocationPickerResult) => void;
  initialLat?: number;
  initialLng?: number;
  initialAddress?: string;
  themeColor?: 'sky' | 'emerald' | 'amber';
  title?: string;
}

const GOOGLE_TILE_URL = 'https://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}';

// Quick jump preset zones for Thailand and China
const PRESET_ZONES = [
  // Thailand Zones
  { name: 'สยาม/ราชประสงค์', lat: 13.7466, lng: 100.5393, country: 'TH' },
  { name: 'สุขุมวิท/อโศก/พร้อมพงษ์', lat: 13.7372, lng: 100.5604, country: 'TH' },
  { name: 'สาทร/สีลม', lat: 13.7246, lng: 100.5332, country: 'TH' },
  { name: 'ลาดพร้าว/รัชโยธิน', lat: 13.8166, lng: 100.5615, country: 'TH' },
  { name: 'พระราม 9/ห้วยขวาง', lat: 13.7578, lng: 100.5654, country: 'TH' },
  { name: 'ทองหล่อ/เอกมัย', lat: 13.7314, lng: 100.5830, country: 'TH' },
  { name: 'บางนา/เมกา', lat: 13.6468, lng: 100.6800, country: 'TH' },
  // China Zones
  { name: 'กวางโจว (Guangzhou)', lat: 23.1291, lng: 113.2644, country: 'CN' },
  { name: 'ตลาดผานหยู (Panyu)', lat: 23.0035, lng: 113.3320, country: 'CN' },
  { name: 'เทียนเหอ (Grandview)', lat: 23.1322, lng: 113.3274, country: 'CN' },
  { name: 'สือซานหาง (Shisanhang)', lat: 23.1118, lng: 113.2505, country: 'CN' },
  { name: 'เซินเจิ้น (Shenzhen)', lat: 22.5431, lng: 114.0579, country: 'CN' },
  { name: 'ฝอซาน (Foshan)', lat: 23.0215, lng: 113.1214, country: 'CN' },
];

export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialLat,
  initialLng,
  initialAddress = '',
  themeColor = 'sky',
  title = 'เลือกตำแหน่งพิกัดบนแผนที่',
}) => {
  const [hasPin, setHasPin] = useState(Boolean(initialLat && initialLng && (initialLat !== 0 || initialLng !== 0)));
  const [currentLat, setCurrentLat] = useState<number>(initialLat && initialLat !== 0 ? initialLat : 13.7466);
  const [currentLng, setCurrentLng] = useState<number>(initialLng && initialLng !== 0 ? initialLng : 100.5393);
  const [addressText, setAddressText] = useState(initialAddress);
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [regionFilter, setRegionFilter] = useState<'ALL' | 'TH' | 'CN'>('TH');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      const valid = Boolean(initialLat && initialLng && (initialLat !== 0 || initialLng !== 0));
      setHasPin(valid);
      setCurrentLat(valid ? (initialLat as number) : 13.7466);
      setCurrentLng(valid ? (initialLng as number) : 100.5393);
      setAddressText(initialAddress || '');
    }
  }, [isOpen, initialLat, initialLng, initialAddress]);

  // Leaflet map setup
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

    // Wait for modal animation to settle before initializing map
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return;

      const startLat = hasPin ? currentLat : 13.7466;
      const startLng = hasPin ? currentLng : 100.5393;
      const zoom = hasPin ? 15 : 13;

      const map = L.map(mapContainerRef.current, {
        center: [startLat, startLng],
        zoom,
        minZoom: 2,
        maxZoom: 19,
        zoomControl: false,
      });

      L.tileLayer(GOOGLE_TILE_URL, {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20,
        attribution: 'Google Maps',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Custom marker icon based on theme
      const pinColor = themeColor === 'emerald' ? '#059669' : themeColor === 'amber' ? '#d97706' : '#0284c7';
      const markerIcon = L.divIcon({
        className: 'custom-picker-pin',
        html: `
          <div style="position: relative; width: 36px; height: 36px; transform: translate(-50%, -100%);">
            <div style="width: 36px; height: 36px; border-radius: 50% 50% 50% 0; background: ${pinColor}; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.35); border: 2.5px solid #fff;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #fff; transform: rotate(45deg);"></div>
            </div>
            <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 8px; height: 4px; border-radius: 50%; background: rgba(0,0,0,0.35); filter: blur(1px);"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      let marker: L.Marker | null = null;
      if (hasPin) {
        marker = L.marker([startLat, startLng], { icon: markerIcon, draggable: true }).addTo(map);
        marker.on('dragend', () => {
          const pos = marker!.getLatLng();
          setCurrentLat(pos.lat);
          setCurrentLng(pos.lng);
          setHasPin(true);
        });
      }

      // Map click handler to drop/move pin
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setCurrentLat(lat);
        setCurrentLng(lng);
        setHasPin(true);

        if (!marker) {
          marker = L.marker([lat, lng], { icon: markerIcon, draggable: true }).addTo(map);
          marker.on('dragend', () => {
            const pos = marker!.getLatLng();
            setCurrentLat(pos.lat);
            setCurrentLng(pos.lng);
            setHasPin(true);
          });
          markerRef.current = marker;
        } else {
          marker.setLatLng([lat, lng]);
        }
      });

      markerRef.current = marker;
      mapInstanceRef.current = map;

      // Invalidate size once rendered
      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }, 150);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {}
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [isOpen]);

  const handleFlyToCoord = (lat: number, lng: number, zoom = 16) => {
    setCurrentLat(lat);
    setCurrentLng(lng);
    setHasPin(true);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 0.8 });

      const pinColor = themeColor === 'emerald' ? '#059669' : themeColor === 'amber' ? '#d97706' : '#0284c7';
      const markerIcon = L.divIcon({
        className: 'custom-picker-pin',
        html: `
          <div style="position: relative; width: 36px; height: 36px; transform: translate(-50%, -100%);">
            <div style="width: 36px; height: 36px; border-radius: 50% 50% 50% 0; background: ${pinColor}; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.35); border: 2.5px solid #fff;">
              <div style="width: 12px; height: 12px; border-radius: 50%; background: #fff; transform: rotate(45deg);"></div>
            </div>
            <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 8px; height: 4px; border-radius: 50%; background: rgba(0,0,0,0.35); filter: blur(1px);"></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
      });

      if (!markerRef.current) {
        const marker = L.marker([lat, lng], { icon: markerIcon, draggable: true }).addTo(mapInstanceRef.current);
        marker.on('dragend', () => {
          const pos = marker.getLatLng();
          setCurrentLat(pos.lat);
          setCurrentLng(pos.lng);
          setHasPin(true);
        });
        markerRef.current = marker;
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }
    }
  };

  const handleUseCurrentGps = () => {
    if (!navigator.geolocation) {
      alert('เบราว์เซอร์ไม่รองรับ GPS');
      return;
    }
    setIsLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocatingGps(false);
        handleFlyToCoord(pos.coords.latitude, pos.coords.longitude, 16);
      },
      () => {
        setIsLocatingGps(false);
        alert('ไม่สามารถดึงตำแหน่งปัจจุบันได้ โปรดตรวจสอบสิทธิ์การใช้งาน GPS');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleClearPin = () => {
    setHasPin(false);
    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
      markerRef.current = null;
    }
    onConfirm({
      lat: 0,
      lng: 0,
      addressText: addressText.trim() || undefined,
    });
    onClose();
  };

  const handleConfirm = () => {
    if (!hasPin) {
      onConfirm({
        lat: 0,
        lng: 0,
        addressText: addressText.trim() || undefined,
      });
    } else {
      onConfirm({
        lat: Number(currentLat.toFixed(6)),
        lng: Number(currentLng.toFixed(6)),
        addressText: addressText.trim() || undefined,
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  const activeColorClasses =
    themeColor === 'emerald'
      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
      : themeColor === 'amber'
      ? 'bg-amber-600 hover:bg-amber-700 text-white'
      : 'bg-sky-600 hover:bg-sky-700 text-white';

  const displayedZones = PRESET_ZONES.filter(
    (z) => regionFilter === 'ALL' || z.country === regionFilter
  );

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 animate-in fade-in overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-picker-title"
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 ${
                themeColor === 'emerald'
                  ? 'bg-emerald-600'
                  : themeColor === 'amber'
                  ? 'bg-amber-600'
                  : 'bg-sky-600'
              }`}
            >
              <MapPin className="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <h2 id="location-picker-title" className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                {title}
              </h2>
              <p className="text-[11px] text-slate-500 truncate">
                แตะบนแผนที่เพื่อเลื่อนหมุด หรือแตะโซนทางลัดด้านล่าง
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Jump Bar */}
        <div className="p-2.5 bg-slate-100/70 border-b border-slate-200/70 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-slate-500" />
              <span>ทางลัดกระโดดไปโซน:</span>
            </span>

            {/* Region Switcher */}
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setRegionFilter('TH')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'TH' ? 'bg-sky-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🇹🇭 ไทย
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('CN')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'CN' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🇨🇳 จีน
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('ALL')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'ALL' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🌏 ทั้งหมด
              </button>
            </div>
          </div>

          {/* Quick zone pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={handleUseCurrentGps}
              disabled={isLocatingGps}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold whitespace-nowrap flex items-center gap-1 shadow-2xs hover:bg-emerald-700 transition-colors shrink-0"
            >
              <Crosshair className={`w-3 h-3 ${isLocatingGps ? 'animate-spin' : ''}`} />
              <span>{isLocatingGps ? 'ค้นหา GPS...' : '🎯 ตำแหน่งฉันตอนนี้'}</span>
            </button>

            {displayedZones.map((z) => (
              <button
                key={z.name}
                type="button"
                onClick={() => handleFlyToCoord(z.lat, z.lng, 15)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-bold whitespace-nowrap transition-colors shrink-0 shadow-2xs active:scale-95"
              >
                <span>{z.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas with Floating Coordinates Overlay */}
        <div className="relative flex-1 min-h-[320px] sm:min-h-[400px] w-full bg-slate-100">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* Floating Coordinate Pill on Map */}
          <div className="absolute top-2.5 left-2.5 right-2.5 sm:right-auto z-[450] pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-md inline-flex items-center gap-2 text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  hasPin ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                }`}
              />
              {hasPin ? (
                <div className="font-mono font-bold text-slate-800 text-[11px]">
                  <span>พิกัด: </span>
                  <span className="text-emerald-700">{currentLat.toFixed(5)}</span>
                  <span>, </span>
                  <span className="text-emerald-700">{currentLng.toFixed(5)}</span>
                </div>
              ) : (
                <span className="text-slate-500 text-[11px] font-medium">
                  แตะบนแผนที่เพื่อเริ่มปักหมุด
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Address / Landmark Name Input */}
        <div className="p-3 bg-white border-t border-slate-200/80 space-y-2 shrink-0">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              คำอธิบายสถานที่ / ชื่อจุดสังเกต (ไม่บังคับ)
            </label>
            <input
              type="text"
              placeholder="เช่น CentralWorld ชั้น 1 โซน Beacon, หรือ หน้าตึกสยามสแควร์วัน"
              value={addressText}
              onChange={(e) => setAddressText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-sky-500"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={handleClearPin}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ไม่ระบุพิกัด (ล้างออก)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                ยกเลิก
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 ${activeColorClasses}`}
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>{hasPin ? 'ยืนยันพิกัดนี้' : 'บันทึก (ไม่ปักพิกัด)'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
