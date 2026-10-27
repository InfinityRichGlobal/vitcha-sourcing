import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowLeftRight, RefreshCw, Calculator, Sparkles } from 'lucide-react';

interface CurrencyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencyCalculatorModal: React.FC<CurrencyCalculatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { exchangeRate, updateExchangeRate, toggleCurrencyMode } = useApp();

  const [inputVal, setInputVal] = useState('1000');
  const [customRate, setCustomRate] = useState(exchangeRate.rate.toString());
  const [isManualEdit, setIsManualEdit] = useState(false);

  if (!isOpen) return null;

  const numVal = parseFloat(inputVal) || 0;
  const isCnyToThb = exchangeRate.currencyMode === 'CNY_TO_THB';
  const converted = isCnyToThb
    ? Math.round(numVal * exchangeRate.rate * 100) / 100
    : Math.round((numVal / exchangeRate.rate) * 100) / 100;

  const presets = [100, 500, 1000, 2500, 5000, 10000, 20000];

  const handleSaveRate = () => {
    const r = parseFloat(customRate);
    if (!isNaN(r) && r > 0) {
      updateExchangeRate(r, false);
      setIsManualEdit(false);
    }
  };

  const handleResetGoogle = () => {
    updateExchangeRate(5.08, true);
    setCustomRate('5.08');
    setIsManualEdit(false);
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/80 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden my-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-semibold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">เครื่องคิดเลขแปลงค่าเงิน</h3>
              <p className="text-[11px] text-slate-500">คำนวณเงินหยวน (CNY) ⇄ บาท (THB)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Calculator Display */}
        <div className="p-5 space-y-4">
          {/* Main Converted Display */}
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100 text-center space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {isCnyToThb ? 'จำนวนเงินบาทไทย (THB)' : 'จำนวนเงินหยวนจีน (CNY)'}
            </span>
            <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              {isCnyToThb ? '฿' : '¥'} {converted.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              (คำนวณจาก {numVal.toLocaleString()} {isCnyToThb ? 'CNY' : 'THB'} @ {exchangeRate.rate.toFixed(2)})
            </div>
          </div>

          {/* Input Amount */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-medium">กรอกจำนวนเงิน {isCnyToThb ? 'หยวน (¥)' : 'บาท (฿)'}</span>
              <button
                onClick={toggleCurrencyMode}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 text-[11px]"
              >
                <ArrowLeftRight className="w-3 h-3" /> สลับฝั่งแปลงค่า
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="0"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
              <span className="absolute right-3.5 top-3 text-sm font-semibold text-slate-400 font-mono">
                {isCnyToThb ? 'CNY ¥' : 'THB ฿'}
              </span>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">แตะด่วน:</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setInputVal(p.toString())}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {isCnyToThb ? '¥' : '฿'}{p.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Rate Setting */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600">เรตปัจจุบัน:</span>
                <span className="font-mono font-bold text-emerald-700">1 CNY = {exchangeRate.rate.toFixed(2)} THB</span>
              </div>
              <button
                type="button"
                onClick={() => setIsManualEdit(!isManualEdit)}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
              >
                {isManualEdit ? 'ปิดปรับแต่ง' : '✏️ ปรับเรตเอง'}
              </button>
            </div>

            {isManualEdit && (
              <div className="pt-2 border-t border-slate-200/60 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={customRate}
                    onChange={(e) => setCustomRate(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleSaveRate}
                    className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                  >
                    บันทึก
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleResetGoogle}
                  className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> รีเซ็ตเป็นค่ากู้เกิ้ลมาตรฐาน (5.08)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
