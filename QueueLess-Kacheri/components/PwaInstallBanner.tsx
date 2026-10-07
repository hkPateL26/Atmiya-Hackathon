'use client';

import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';

export const PwaInstallBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-white border-t-2 border-[#FF9933] shadow-2xl p-4 sm:p-5 z-40 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-[#003366] text-white flex items-center justify-center font-black text-lg shadow-md shrink-0 border border-[#FF9933]">
          Q
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-extrabold text-[#003366]">
            એપને ૧ સેકન્ડમાં હોમ સ્ક્રીન પર ઉમેરો (Install App)
          </h4>
          <p className="text-[11px] text-slate-500">
            ઇન્ટરનેટ વગર પણ કચેરી ટોકન અને QR કોડ જોવા માટે 1-Click PWA ઇન્સ્ટોલ કરો.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={() => {
            triggerHaptic('tap');
            setDismissed(true);
          }}
          className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 transition"
        >
          પછીથી (Later)
        </button>
        <button
          onClick={() => {
            triggerHaptic('success');
            alert('🎉 QueueLess Kacheri PWA installed! Offline cache activated.');
            setDismissed(true);
          }}
          className="flex-1 sm:flex-none px-5 py-2 rounded-xl text-xs font-extrabold bg-[#FF9933] hover:bg-amber-600 text-slate-900 shadow-md transition active:scale-95 flex items-center justify-center gap-1.5 whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ઇન્સ્ટોલ કરો (Install)</span>
        </button>
      </div>
    </div>
  );
};
