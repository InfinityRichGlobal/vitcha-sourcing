import React, { useState, useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Navigation,
  Crosshair,
  Check,
  X,
  Search,
  RotateCcw,
  Loader2,
  Sparkles,
  ChevronRight,
  Compass,
  ClipboardPaste,
  Link2,
} from 'lucide-react';
import {
  searchPlacesApi,
  reverseGeocodeApi,
  GeocodePlaceItem,
  parseCoordinatesOrMapUrl,
  resolveMapUrlApi,
} from '../services/api';

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
const PRESET_ZONES: { name: string; lat: number; lng: number; country: 'TH' | 'CN'; tag?: string }[] = [
  // Thailand Zones & Popular Landmarks
  { name: 'สยาม / ราชประสงค์', lat: 13.7466, lng: 100.5393, country: 'TH', tag: 'กรุงเทพฯ' },
  { name: 'เซ็นทรัลเวิลด์ (CentralWorld)', lat: 13.7469, lng: 100.5398, country: 'TH', tag: 'ราชประสงค์' },
  { name: 'ไอคอนสยาม (ICONSIAM)', lat: 13.7267, lng: 100.5108, country: 'TH', tag: 'คลองสาน' },
  { name: 'ราชพฤกษ์ / ปตท. ราชพฤกษ์', lat: 13.8189, lng: 100.4485, country: 'TH', tag: 'นนทบุรี/ราชพฤกษ์' },
  { name: 'สุขุมวิท / อโศก / พร้อมพงษ์', lat: 13.7372, lng: 100.5604, country: 'TH', tag: 'สุขุมวิท' },
  { name: 'ทองหล่อ / เอกมัย', lat: 13.7314, lng: 100.5830, country: 'TH', tag: 'สุขุมวิท' },
  { name: 'สาทร / สีลม', lat: 13.7246, lng: 100.5332, country: 'TH', tag: 'สาทร' },
  { name: 'พระราม 9 / ห้วยขวาง', lat: 13.7578, lng: 100.5654, country: 'TH', tag: 'พระราม 9' },
  { name: 'ลาดพร้าว / รัชโยธิน / จตุจักร', lat: 13.8166, lng: 100.5615, country: 'TH', tag: 'ลาดพร้าว' },
  { name: 'บางนา / เมกาบางนา (Mega Bangna)', lat: 13.6468, lng: 100.6800, country: 'TH', tag: 'บางนา' },
  { name: 'ฟิวเจอร์พาร์ค รังสิต', lat: 13.9892, lng: 100.6177, country: 'TH', tag: 'รังสิต/ปทุมธานี' },
  { name: 'สนามบินสุวรรณภูมิ', lat: 13.6900, lng: 100.7501, country: 'TH', tag: 'สนามบิน' },
  { name: 'สนามบินดอนเมือง', lat: 13.9126, lng: 100.6067, country: 'TH', tag: 'สนามบิน' },

  // China Zones & Sourcing Hubs
  { name: 'กวางโจว (Guangzhou)', lat: 23.1291, lng: 113.2644, country: 'CN', tag: 'Guangdong' },
  { name: 'ตลาดผานหยู (Panyu Tea Market)', lat: 23.0035, lng: 113.3320, country: 'CN', tag: 'ตลาดชา/วัตถุดิบ' },
  { name: 'เทียนเหอ (Grandview / Tianhe)', lat: 23.1322, lng: 113.3274, country: 'CN', tag: 'ห้าง/แหล่งช้อปปิ้ง' },
  { name: 'สือซานหาง (Shisanhang)', lat: 23.1118, lng: 113.2505, country: 'CN', tag: 'ตลาดค้าส่ง' },
  { name: 'เซินเจิ้น (Shenzhen)', lat: 22.5431, lng: 114.0579, country: 'CN', tag: 'Shenzhen' },
  { name: 'ฝอซาน (Foshan)', lat: 23.0215, lng: 113.1214, country: 'CN', tag: 'เครื่องจักร/บรรจุภัณฑ์' },
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
  const [selectedLocationLabel, setSelectedLocationLabel] = useState<string>('');
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [regionFilter, setRegionFilter] = useState<'ALL' | 'TH' | 'CN'>('TH');

  // Search & Autocomplete State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodePlaceItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const searchAbortRef = useRef<AbortController | null>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const reverseGeocodeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      const valid = Boolean(initialLat && initialLng && (initialLat !== 0 || initialLng !== 0));
      setHasPin(valid);
      setCurrentLat(valid ? (initialLat as number) : 13.7466);
      setCurrentLng(valid ? (initialLng as number) : 100.5393);
      setAddressText(initialAddress || '');
      setSelectedLocationLabel(initialAddress ? initialAddress.split(',')[0].trim() : '');
      setSearchQuery('');
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [isOpen, initialLat, initialLng, initialAddress]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const createMarkerIcon = useCallback((color: string) => {
    return L.divIcon({
      className: 'custom-picker-pin',
      html: `
        <div style="position: relative; width: 38px; height: 38px; transform: translate(-50%, -100%);">
          <div style="width: 38px; height: 38px; border-radius: 50% 50% 50% 0; background: ${color}; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border: 2.5px solid #fff;">
            <div style="width: 13px; height: 13px; border-radius: 50%; background: #fff; transform: rotate(45deg);"></div>
          </div>
          <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 10px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.35); filter: blur(1.5px);"></div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    });
  }, []);

  const pinColor = themeColor === 'emerald' ? '#059669' : themeColor === 'amber' ? '#d97706' : '#0284c7';

  // Reverse geocoding helper (debounced)
  const triggerReverseGeocode = useCallback((lat: number, lng: number) => {
    if (reverseGeocodeTimerRef.current) clearTimeout(reverseGeocodeTimerRef.current);
    reverseGeocodeTimerRef.current = setTimeout(async () => {
      try {
        const address = await reverseGeocodeApi(lat, lng);
        if (address) {
          setAddressText((prev) => (!prev.trim() || prev.includes(',') || prev.startsWith('พิกัด:') ? address : prev));
          setSelectedLocationLabel(address.split(',')[0].trim());
        }
      } catch {
        // Fallback silently
      }
    }, 450);
  }, []);

  // Fly to coordinate and update/create marker
  const handleFlyToCoord = useCallback(
    (lat: number, lng: number, zoom = 16) => {
      setCurrentLat(lat);
      setCurrentLng(lng);
      setHasPin(true);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 0.8 });

        const icon = createMarkerIcon(pinColor);

        if (!markerRef.current) {
          const marker = L.marker([lat, lng], { icon, draggable: true }).addTo(mapInstanceRef.current);
          marker.on('dragend', () => {
            const pos = marker.getLatLng();
            setCurrentLat(pos.lat);
            setCurrentLng(pos.lng);
            setHasPin(true);
            triggerReverseGeocode(pos.lat, pos.lng);
          });
          markerRef.current = marker;
        } else {
          markerRef.current.setLatLng([lat, lng]);
        }
      }
    },
    [pinColor, createMarkerIcon, triggerReverseGeocode]
  );

  // Leaflet map setup
  useEffect(() => {
    if (!isOpen || !mapContainerRef.current) return;

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

      const markerIcon = createMarkerIcon(pinColor);

      let marker: L.Marker | null = null;
      if (hasPin) {
        marker = L.marker([startLat, startLng], { icon: markerIcon, draggable: true }).addTo(map);
        marker.on('dragend', () => {
          const pos = marker!.getLatLng();
          setCurrentLat(pos.lat);
          setCurrentLng(pos.lng);
          setHasPin(true);
          triggerReverseGeocode(pos.lat, pos.lng);
        });
      }

      // Map click handler: METHOD 3 (Pan & Pin)
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
            triggerReverseGeocode(pos.lat, pos.lng);
          });
          markerRef.current = marker;
        } else {
          marker.setLatLng([lat, lng]);
        }
        triggerReverseGeocode(lat, lng);
      });

      markerRef.current = marker;
      mapInstanceRef.current = map;

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

  // METHOD 1: Search Places & Auto-Pin (like LINE MAN / Google Maps / Raw Coordinates / Google Maps Links)
  const runSearch = useCallback(async (query: string) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Check for raw coordinates e.g. "(13.9848152, 100.4729654)" or Google Maps URL
    const parsed = parseCoordinatesOrMapUrl(query);
    const detectedMatches: GeocodePlaceItem[] = [];

    if (parsed && (parsed.type === 'coords' || parsed.type === 'direct_url') && parsed.lat && parsed.lng) {
      detectedMatches.push({
        id: 'detected-coords',
        name: `📍 ตรวจพบพิกัด (${parsed.lat.toFixed(5)}, ${parsed.lng.toFixed(5)})`,
        displayName: `พิกัดละติจูด ${parsed.lat}, ลองจิจูด ${parsed.lng} · แตะเพื่อปักหมุดทันที`,
        lat: parsed.lat,
        lng: parsed.lng,
        type: 'preset',
        country: 'TH',
      });
    } else if (parsed && parsed.type === 'short_url' && parsed.url) {
      setIsSearching(true);
      resolveMapUrlApi(parsed.url).then((res) => {
        setIsSearching(false);
        if (res.ok && res.lat && res.lng) {
          const item: GeocodePlaceItem = {
            id: 'detected-short-url',
            name: `🔗 พิกัดจาก Google Maps (${res.lat.toFixed(5)}, ${res.lng.toFixed(5)})`,
            displayName: `ถอดพิกัดสำเร็จ · แตะเพื่อปักหมุดทันที`,
            lat: res.lat,
            lng: res.lng,
            type: 'preset',
            country: 'TH',
          };
          setSearchResults((prev) => [item, ...prev.filter((p) => p.id !== 'detected-short-url')]);
          setShowDropdown(true);
        }
      }).catch(() => {
        setIsSearching(false);
      });
    }

    // Immediate local matches from PRESET_ZONES
    const localMatches: GeocodePlaceItem[] = PRESET_ZONES.filter(
      (z) => z.name.toLowerCase().includes(q) || (z.tag && z.tag.toLowerCase().includes(q))
    ).map((z) => ({
      id: `preset-${z.name}`,
      name: z.name,
      displayName: `${z.name} (${z.tag || z.country})`,
      lat: z.lat,
      lng: z.lng,
      type: 'preset',
      country: z.country,
    }));

    const initialResults = [...detectedMatches, ...localMatches];
    if (initialResults.length > 0) {
      setSearchResults(initialResults);
      setShowDropdown(true);
    }

    if (searchAbortRef.current) {
      searchAbortRef.current.abort();
    }
    const abortController = new AbortController();
    searchAbortRef.current = abortController;

    setIsSearching(true);
    try {
      const remoteResults = await searchPlacesApi(query, abortController.signal);
      if (!abortController.signal.aborted) {
        const combined = [...initialResults];
        for (const item of remoteResults) {
          const isDup = combined.some(
            (c) => Math.abs(c.lat - item.lat) < 0.001 && Math.abs(c.lng - item.lng) < 0.001
          );
          if (!isDup) {
            combined.push(item);
          }
        }
        setSearchResults(combined);
        setShowDropdown(true);
      }
    } catch {
      // Ignore fetch aborts
    } finally {
      if (!abortController.signal.aborted) {
        setIsSearching(false);
      }
    }
  }, []);

  // Debounce search typing
  useEffect(() => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setShowDropdown(true);
    searchDebounceRef.current = setTimeout(() => {
      runSearch(searchQuery);
    }, 320);

    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchQuery, runSearch]);

  const executeSearchNow = async () => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    if (!searchQuery.trim()) return;

    // Check for instant coordinate or map URL match on Enter / click Search
    const parsed = parseCoordinatesOrMapUrl(searchQuery);
    if (parsed && (parsed.type === 'coords' || parsed.type === 'direct_url') && parsed.lat && parsed.lng) {
      handleFlyToCoord(parsed.lat, parsed.lng, 17);
      triggerReverseGeocode(parsed.lat, parsed.lng);
      setShowDropdown(false);
      return;
    }
    if (parsed && parsed.type === 'short_url' && parsed.url) {
      setIsSearching(true);
      try {
        const res = await resolveMapUrlApi(parsed.url);
        setIsSearching(false);
        if (res.ok && res.lat && res.lng) {
          handleFlyToCoord(res.lat, res.lng, 17);
          triggerReverseGeocode(res.lat, res.lng);
          setShowDropdown(false);
          return;
        } else {
          alert('ไม่พบพิกัดในลิงก์ Google Maps ที่ระบุ');
        }
      } catch {
        setIsSearching(false);
      }
    }

    runSearch(searchQuery);
  };

  // Quick Paste from Clipboard (สำหรับคนที่ก๊อบปี้พิกัดหรือลิงก์มา)
  const handlePasteFromClipboard = async () => {
    let text = '';
    try {
      if (navigator.clipboard?.readText) {
        text = await navigator.clipboard.readText();
      }
    } catch {
      // Permission blocked or not supported
    }

    if (!text?.trim()) {
      const prompted = window.prompt(
        'วางพิกัด เช่น (13.9848152, 100.4729654) หรือ ลิงก์ Google Maps (เช่น https://maps.app.goo.gl/...):'
      );
      if (prompted) text = prompted;
    }

    if (text?.trim()) {
      const clean = text.trim();
      setSearchQuery(clean);
      setShowDropdown(true);
      const parsed = parseCoordinatesOrMapUrl(clean);
      if (parsed && (parsed.type === 'coords' || parsed.type === 'direct_url') && parsed.lat && parsed.lng) {
        handleFlyToCoord(parsed.lat, parsed.lng, 17);
        triggerReverseGeocode(parsed.lat, parsed.lng);
        setShowDropdown(false);
        return;
      } else if (parsed && parsed.type === 'short_url' && parsed.url) {
        setIsSearching(true);
        try {
          const res = await resolveMapUrlApi(parsed.url);
          setIsSearching(false);
          if (res.ok && res.lat && res.lng) {
            handleFlyToCoord(res.lat, res.lng, 17);
            triggerReverseGeocode(res.lat, res.lng);
            setShowDropdown(false);
            return;
          } else {
            alert('ไม่พบพิกัดในลิงก์ Google Maps ที่ระบุ');
          }
        } catch {
          setIsSearching(false);
        }
        return;
      }
      runSearch(clean);
      return;
    }
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  };

  const handleSelectPlace = (item: GeocodePlaceItem) => {
    setSearchQuery(item.name);
    setShowDropdown(false);
    handleFlyToCoord(item.lat, item.lng, 17);
    const prettyAddress = item.displayName || item.name;
    setAddressText(prettyAddress);
    setSelectedLocationLabel(item.name);
  };

  // METHOD 2: GPS Current Location (กดโลเคชั่นปัจจุบัน)
  const handleUseCurrentGps = () => {
    if (!navigator.geolocation) {
      alert('เบราว์เซอร์ไม่รองรับ GPS');
      return;
    }
    setIsLocatingGps(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocatingGps(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        handleFlyToCoord(lat, lng, 17);
        try {
          const address = await reverseGeocodeApi(lat, lng);
          if (address) {
            setAddressText(address);
            setSelectedLocationLabel('ตำแหน่ง GPS ปัจจุบัน');
          } else {
            const fallback = `พิกัดปัจจุบัน (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
            setAddressText(fallback);
            setSelectedLocationLabel(fallback);
          }
        } catch {
          const fallback = `พิกัดปัจจุบัน (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
          setAddressText(fallback);
          setSelectedLocationLabel(fallback);
        }
      },
      (err) => {
        setIsLocatingGps(false);
        alert('ไม่สามารถดึงตำแหน่งปัจจุบันได้: ' + (err.message || 'โปรดตรวจสอบสิทธิ์การใช้งาน GPS'));
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
    setSelectedLocationLabel('');
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
        className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-3xl flex flex-col max-h-[94vh] overflow-hidden my-auto animate-in zoom-in-95"
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                themeColor === 'emerald'
                  ? 'bg-emerald-600'
                  : themeColor === 'amber'
                  ? 'bg-amber-600'
                  : 'bg-sky-600'
              }`}
            >
              <Compass className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 id="location-picker-title" className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                {title}
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 truncate mt-0.5">
                <span className="font-semibold text-sky-700">เลือก 1 ใน 4 วิธีปักหมุด</span>
                <span>(วิธีใดวิธีหนึ่ง ไม่ต้องทำทุกปุ่ม)</span>
              </div>
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

        {/* 4 CLEAR METHODS SELECTOR (วิธีใดวิธีหนึ่ง ไม่ต้องทำทุกปุ่ม) */}
        <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-indigo-50 border-b border-slate-200/80 px-3 py-2 text-xs shrink-0">
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="font-bold text-slate-700 text-[11px] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>เลือก 1 ใน 4 วิธีปักหมุด (วิธีใดวิธีหนึ่ง ไม่ต้องทำทุกปุ่ม):</span>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={handlePasteFromClipboard}
              className="p-1.5 sm:p-2 rounded-xl border border-sky-300 bg-white hover:bg-sky-50 text-left transition-all shadow-2xs group flex items-start gap-1.5 cursor-pointer active:scale-98"
            >
              <span className="p-1 rounded-lg bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white transition-colors shrink-0">
                <ClipboardPaste className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-[11px] text-slate-800">1. วางพิกัด/ลิงก์</div>
                <div className="text-[10px] text-slate-500 truncate">(lat,lng) / Google Maps</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                if (searchInputRef.current) {
                  searchInputRef.current.focus();
                  searchInputRef.current.select();
                }
              }}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left transition-all shadow-2xs group flex items-start gap-1.5 cursor-pointer active:scale-98"
            >
              <span className="p-1 rounded-lg bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                <Search className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-[11px] text-slate-800">2. ค้นหาชื่อ</div>
                <div className="text-[10px] text-slate-500 truncate">พิมพ์ชื่อห้าง/สถานที่/ซอย</div>
              </div>
            </button>

            <button
              type="button"
              onClick={handleUseCurrentGps}
              disabled={isLocatingGps}
              className="p-1.5 sm:p-2 rounded-xl border border-emerald-300 bg-white hover:bg-emerald-50 text-left transition-all shadow-2xs group flex items-start gap-1.5 cursor-pointer active:scale-98"
            >
              <span className="p-1 rounded-lg bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                <Crosshair className={`w-3.5 h-3.5 ${isLocatingGps ? 'animate-spin' : ''}`} />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-[11px] text-slate-800">3. ตำแหน่ง GPS</div>
                <div className="text-[10px] text-slate-500 truncate">พิกัดปัจจุบันมือถือ/คอม</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedLocationLabel('เลื่อนหมุดบนแผนที่ได้อิสระ');
              }}
              className="p-1.5 sm:p-2 rounded-xl border border-amber-300 bg-white hover:bg-amber-50 text-left transition-all shadow-2xs group flex items-start gap-1.5 cursor-pointer active:scale-98"
            >
              <span className="p-1 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </span>
              <div className="min-w-0">
                <div className="font-bold text-[11px] text-slate-800">4. หมุดบนแผนที่</div>
                <div className="text-[10px] text-slate-500 truncate">จิ้มลากหมุดบนแผนที่</div>
              </div>
            </button>
          </div>
        </div>

        {/* METHOD 1 & 2: PROMINENT PLACE SEARCH BAR / COORDINATE & LINK PASTE */}
        <div className="relative p-2.5 sm:p-3 bg-white border-b border-slate-200/80 z-[60] shrink-0">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => {
                if (searchQuery.trim().length > 0 || searchResults.length > 0) {
                  setShowDropdown(true);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  executeSearchNow();
                }
              }}
              placeholder="🔍 ค้นหาสถานที่ หรือ วางพิกัด (lat, lng) หรือ วางลิงก์ Google Maps..."
              className="w-full pl-10 pr-32 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/90 focus:bg-white placeholder:text-slate-400 transition-all outline-none"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowDropdown(false);
                  }}
                  className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-400 hover:text-slate-600 transition-colors"
                  title="ล้างข้อความ"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePasteFromClipboard}
                  className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold transition-all flex items-center gap-1 border border-sky-200"
                  title="วางพิกัดหรือลิงก์จากคลิปบอร์ด"
                >
                  <ClipboardPaste className="w-3 h-3" />
                  <span className="hidden sm:inline">วาง</span>
                </button>
              )}
              <button
                type="button"
                onClick={executeSearchNow}
                disabled={isSearching}
                className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-2xs active:scale-95"
              >
                {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">ค้นหา</span>
              </button>
            </div>
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-2.5 right-2.5 sm:left-3 sm:right-3 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-[500] max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-1"
            >
              <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-600" />
                  <span>ผลการค้นหาสถานที่ (แตะเพื่อปักหมุดทันที)</span>
                </span>
                {isSearching && (
                  <span className="flex items-center gap-1 text-sky-600">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>กำลังค้นหา...</span>
                  </span>
                )}
                {!isSearching && searchResults.length > 0 && (
                  <span>{searchResults.length} รายการ</span>
                )}
              </div>

              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {searchResults.map((item) => {
                    const isDetected = item.id.startsWith('detected-');
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => handleSelectPlace(item)}
                        className={`w-full px-3.5 py-2.5 text-left flex items-start gap-2.5 transition-colors group cursor-pointer ${
                          isDetected
                            ? 'bg-emerald-50/70 hover:bg-emerald-100/80 active:bg-emerald-200/90 border-l-4 border-l-emerald-500'
                            : 'hover:bg-sky-50/80 active:bg-sky-100'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDetected
                              ? 'bg-emerald-600 text-white'
                              : 'bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white'
                          }`}
                        >
                          {isDetected ? (
                            <Sparkles className="w-4 h-4 animate-pulse" />
                          ) : item.type === 'preset' ? (
                            <Sparkles className="w-3.5 h-3.5" />
                          ) : (
                            <MapPin className="w-3.5 h-3.5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`font-bold text-xs ${
                                isDetected ? 'text-emerald-900 font-extrabold' : 'text-slate-800 group-hover:text-sky-700'
                              }`}
                            >
                              {item.name}
                            </span>
                            {isDetected && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-600 text-white font-extrabold shadow-2xs">
                                ตรวจพบพิกัดสำเร็จ ✨
                              </span>
                            )}
                            {item.type === 'preset' && !isDetected && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                                จุดยอดนิยม
                              </span>
                            )}
                            {item.country === 'TH' ? (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                                🇹🇭 ไทย
                              </span>
                            ) : item.country === 'CN' ? (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-rose-50 text-rose-700 font-medium">
                                🇨🇳 จีน
                              </span>
                            ) : null}
                          </div>
                          <p
                            className={`text-[11px] truncate mt-0.5 ${
                              isDetected ? 'text-emerald-700 font-medium' : 'text-slate-500'
                            }`}
                          >
                            {item.displayName}
                          </p>
                        </div>
                        <div
                          className={`text-[11px] font-bold shrink-0 self-center hidden sm:flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform ${
                            isDetected ? 'text-emerald-700' : 'text-sky-600'
                          }`}
                        >
                          <span>ปักหมุดนี้</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : isSearching ? (
                <div className="p-4 text-center text-slate-500 text-xs flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                  <span>กำลังค้นหาสถานที่ &quot;{searchQuery}&quot;...</span>
                </div>
              ) : (
                <div className="p-4 text-center text-slate-500 text-xs">
                  <p className="font-semibold text-slate-700">ไม่พบสถานที่ที่ตรงกับคำค้นหา</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    ลองใช้คำค้นหาที่สั้นลง เช่น &quot;ราชพฤกษ์&quot; หรือเลื่อนหมุดบนแผนที่แทน
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Action & Region Shortcuts Bar */}
        <div className="p-2.5 bg-slate-100/80 border-b border-slate-200/70 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-slate-500" />
              <span>โซนทำเลยอดนิยม:</span>
            </span>

            {/* Region Switcher */}
            <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setRegionFilter('TH')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'TH' ? 'bg-sky-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🇹🇭 ไทย
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('CN')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'CN' ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🇨🇳 จีน
              </button>
              <button
                type="button"
                onClick={() => setRegionFilter('ALL')}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  regionFilter === 'ALL' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                🌏 ทั้งหมด
              </button>
            </div>
          </div>

          {/* METHOD 2 (GPS) + Quick Preset Zone Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={handleUseCurrentGps}
              disabled={isLocatingGps}
              className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[11px] font-bold whitespace-nowrap flex items-center gap-1.5 shadow-2xs hover:bg-emerald-700 transition-all shrink-0 active:scale-95"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isLocatingGps ? 'animate-spin' : ''}`} />
              <span>{isLocatingGps ? 'กำลังระบุพิกัด GPS...' : '🎯 ตำแหน่งฉันตอนนี้ (GPS)'}</span>
            </button>

            {displayedZones.map((z) => (
              <button
                key={z.name}
                type="button"
                onClick={() => {
                  handleFlyToCoord(z.lat, z.lng, 15);
                  setSelectedLocationLabel(z.name);
                  setAddressText((prev) => (!prev.trim() || prev.includes(',') ? z.name : prev));
                }}
                className="px-2.5 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-[11px] font-bold whitespace-nowrap transition-all shrink-0 shadow-2xs active:scale-95"
              >
                <span>{z.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* METHOD 3: Interactive Leaflet Map Canvas */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[380px] w-full bg-slate-100">
          <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

          {/* Floating Coordinate & Current Status Pill on Map */}
          <div className="absolute top-2.5 left-2.5 right-2.5 sm:right-auto z-[450] pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-200/80 shadow-md inline-flex items-center gap-2 text-xs">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  hasPin ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
                }`}
              />
              {hasPin ? (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="font-bold text-slate-700">พิกัด:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {currentLat.toFixed(5)}, {currentLng.toFixed(5)}
                  </span>
                  {selectedLocationLabel && (
                    <span className="hidden sm:inline-block font-semibold text-slate-500 truncate max-w-[160px]">
                      · {selectedLocationLabel}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-500 text-[11px] font-medium">
                  👆 แตะหรือเลื่อนหมุดบนแผนที่เพื่อเลือกพิกัด
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Address / Landmark Field & Action Buttons */}
        <div className="p-3 bg-white border-t border-slate-200/80 space-y-2 shrink-0">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 block">
                คำอธิบายสถานที่ / ชื่อจุดสังเกต
              </label>
              <span className="text-[10px] text-slate-400">
                (กรอกให้อัตโนมัติเมื่อค้นหาหรือปักหมุด)
              </span>
            </div>
            <input
              type="text"
              placeholder="เช่น CentralWorld ชั้น 1 โซน Beacon หรือ ปตท. ราชพฤกษ์ กม.35"
              value={addressText}
              onChange={(e) => setAddressText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-sky-500"
            />
          </div>

          {/* Action Buttons */}
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
                <span>
                  {hasPin
                    ? `ยืนยันพิกัดนี้ (${currentLat.toFixed(3)}, ${currentLng.toFixed(3)})`
                    : 'บันทึก (ไม่ปักพิกัด)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
