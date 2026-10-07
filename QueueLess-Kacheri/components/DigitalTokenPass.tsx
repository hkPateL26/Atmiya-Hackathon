'use client';

import React, { useState } from 'react';
import { 
  QrCode, Clock, MapPin, UserCheck, AlertTriangle, 
  Download, Share2, CheckCircle2, ShieldCheck, Printer,
  Volume2, ArrowRight, RefreshCw, Smartphone, Layers
} from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { speakGuidance } from '@/lib/voice';
import { BookingDetails } from './SlotBookingModal';
import { SchemeItem } from '@/lib/schemes-data';

interface DigitalTokenPassProps {
  booking: BookingDetails;
  scheme: SchemeItem | null;
  citizenName: string;
  onClose?: () => void;
  lang?: 'en' | 'gu' | 'hi';
}

export function DigitalTokenPass({
  booking,
  scheme,
  citizenName,
  onClose,
  lang = 'gu'
}: DigitalTokenPassProps) {
  // Late shifting state
  const [shiftCount, setShiftCount] = useState<number>(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(18);
  const [currentSlotTime, setCurrentSlotTime] = useState<string>(booking.slot.timeRange);
  const [aheadInQueue, setAheadInQueue] = useState<number>(2);

  const handleRunningLate = () => {
    triggerHaptic('warning');
    const newCount = shiftCount + 1;
    setShiftCount(newCount);
    setEstimatedMinutes(prev => prev + 36);
    setAheadInQueue(prev => prev + 3);

    speakGuidance("તમારો ટોકન ૩ સ્લોટ પાછળ ખસેડવામાં આવ્યો છે. કાઉન્ટર તમારો નંબર છોડશે નહીં.");
    alert(`⚠️ મોડું થવાની વિનંતી મંજૂર!\n\nતમારો ટોકન ૩ સ્લોટ (+૩૬ મિનિટ) આગળ ધકેલવામાં આવ્યો છે.\nનવો અંદાજિત સમય: +${estimatedMinutes + 36} મિનિટ પછી.\nકાઉન્ટર અધિકારી તમારો વારો સ્કીપ નહીં કરે.`);
  };

  const handleDownload = () => {
    triggerHaptic('success');
    speakGuidance("ટોકન પાસ ડાઉનલોડ થઈ રહ્યો છે.");
    window.print();
  };

  const handleWhatsAppShare = () => {
    triggerHaptic('tap');
    const msg = encodeURIComponent(
      `🏛️ ગુજરાત સરકાર ઈ-જન સેવા ટોકન પાસ\n` +
      `ટોકન નંબર: ${booking.tokenNumber}\n` +
      `યોજના/સેવા: ${scheme ? scheme.titleGu : 'જન સેવા'}\n` +
      `કચેરી: ${booking.taluka.officeNameGu}, ${booking.district.nameGu}\n` +
      `કાઉન્ટર: ${booking.counterNumber} (${booking.counterNameGu})\n` +
      `સમય સ્લોટ: ${currentSlotTime}\n` +
      `GRTSA માન્ય ડિજિટલ પાસ.`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#003366]/20 overflow-hidden text-[#1F2937]">
      {/* GOVERNMENT OFFICIAL HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#003366] via-[#005A9C] to-[#003366] text-white p-4 sm:p-5 relative overflow-hidden">
        {/* Tricolor top border indicator */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-[#FF9933] font-bold">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded text-white">
                  GUJARAT GOV • GRTSA 2013
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-green-300">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  સક્રિય (Active)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">
                ઈ-જન સેવા સત્તાવાર ટોકન પાસ
              </h2>
              <p className="text-xs text-blue-100">
                {booking.taluka.officeNameGu}
              </p>
            </div>
          </div>

          {/* TOKEN CHIP */}
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-blue-200 block">ટોકન ક્રમાંક</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FF9933] drop-shadow-sm">
              {booking.tokenNumber}
            </span>
          </div>
        </div>
      </div>

      {/* PASS CONTENT */}
      <div className="p-4 sm:p-6 space-y-5">
        
        {/* CITIZEN & SCHEME SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-200">
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block">નાગરિકનું નામ (Citizen Name)</span>
            <span className="text-sm font-bold text-gray-900">{citizenName}</span>
          </div>
          <div>
            <span className="text-[11px] font-semibold text-gray-500 block">યોજના / સેવા (Service)</span>
            <span className="text-sm font-bold text-[#003366]">
              {scheme ? scheme.titleGu : 'સામાન્ય જન સેવા'}
            </span>
          </div>
        </div>

        {/* QR CODE & COUNTER ROUTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          
          {/* QR Code Container */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-200 text-center">
            <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 relative group">
              {/* Fallback SVG QR Code */}
              <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* Outer corners */}
                <rect x="5" y="5" width="26" height="26" fill="#003366" rx="3" />
                <rect x="9" y="9" width="18" height="18" fill="white" />
                <rect x="13" y="13" width="10" height="10" fill="#003366" />

                <rect x="69" y="5" width="26" height="26" fill="#003366" rx="3" />
                <rect x="73" y="9" width="18" height="18" fill="white" />
                <rect x="77" y="13" width="10" height="10" fill="#003366" />

                <rect x="5" y="69" width="26" height="26" fill="#003366" rx="3" />
                <rect x="9" y="73" width="18" height="18" fill="white" />
                <rect x="13" y="77" width="10" height="10" fill="#003366" />

                {/* Data blocks */}
                <rect x="36" y="8" width="8" height="8" fill="#005A9C" />
                <rect x="48" y="12" width="12" height="6" fill="#FF9933" />
                <rect x="36" y="24" width="6" height="12" fill="#138808" />
                <rect x="46" y="22" width="16" height="8" fill="#003366" />
                <rect x="8" y="38" width="14" height="6" fill="#003366" />
                <rect x="26" y="40" width="8" height="14" fill="#005A9C" />
                <rect x="40" y="38" width="20" height="20" fill="#003366" rx="2" />
                <circle cx="50" cy="48" r="4" fill="#FF9933" />
                <rect x="66" y="38" width="10" height="10" fill="#138808" />
                <rect x="80" y="44" width="12" height="6" fill="#003366" />
                <rect x="38" y="64" width="14" height="6" fill="#005A9C" />
                <rect x="58" y="64" width="8" height="14" fill="#FF9933" />
                <rect x="44" y="76" width="16" height="14" fill="#003366" />
                <rect x="68" y="72" width="12" height="10" fill="#138808" />
                <rect x="82" y="68" width="10" height="22" fill="#005A9C" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/5 rounded-xl pointer-events-none">
                <span className="text-[10px] font-bold bg-[#003366] text-white px-2 py-0.5 rounded shadow">
                  Qless-GRTSA-Scan
                </span>
              </div>
            </div>

            <span className="text-[10px] font-mono text-gray-500 mt-2">
              કચેરી સ્કેનર ID: QLESS-{booking.tokenNumber.replace('#', '')}-GP
            </span>
            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full mt-1">
              ✓ ઑફલાઇન QR માન્ય (No Internet Required)
            </span>
          </div>

          {/* Counter, Time, and Queue Details */}
          <div className="md:col-span-7 space-y-3">
            
            {/* Auto-routed Counter Box */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#003366] text-white font-bold flex items-center justify-center text-sm">
                    {booking.counterNumber}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-950">
                      કાઉન્ટર {booking.counterNumber}: {booking.counterNameGu}
                    </h4>
                    <span className="text-[11px] text-gray-600 block">
                      અધિકારી: <strong>{booking.officerName}</strong>
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  સીધો પ્રવેશ
                </span>
              </div>
            </div>

            {/* Time Slot & Queue Estimate */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#005A9C]" />
                  સમય સ્લોટ
                </span>
                <span className="text-xs font-bold text-gray-900 mt-1 block">
                  {currentSlotTime}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">
                  તારીખ: {booking.date}
                </span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#138808]" />
                  કતારમાં સ્થિતિ
                </span>
                <span className="text-xs font-bold text-[#138808] mt-1 block">
                  આગળ {aheadInQueue} નાગરિકો બાકી
                </span>
                <span className="text-[10px] text-gray-500">
                  અંદાજિત રાહ: ~{estimatedMinutes} મિનિટ
                </span>
              </div>
            </div>

            {/* Jurisdiction Location */}
            <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-2 text-xs text-gray-700">
              <MapPin className="w-4 h-4 text-[#005A9C] shrink-0" />
              <span className="truncate">
                {booking.taluka.officeNameGu}, જિલ્લો: {booking.district.nameGu}
              </span>
            </div>

          </div>
        </div>

        {/* PHASE 3 DYNAMIC FEATURE: "I'M RUNNING LATE" (+3 SLOTS SHIFTER) */}
        <div className="p-4 bg-amber-50/80 border-2 border-amber-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-amber-950">
                  કચેરી પહોંચવામાં મોડું થાય છે? (Running Late?)
                </h4>
                {shiftCount > 0 && (
                  <span className="bg-amber-200 text-amber-900 text-[10px] font-bold px-2 py-0.2 rounded-full">
                    {shiftCount} વખત ખસેડેલ
                  </span>
                )}
              </div>
              <p className="text-[11px] text-amber-800 mt-0.5">
                એક ક્લિકમાં ટોકન ૩ સ્લોટ (+૩૬ મિનિટ) આગળ ખસેડો જેથી કાઉન્ટર પર તમારો નંબર કેન્સલ ન થાય!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRunningLate}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition active:scale-95 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>+૩ સ્લોટ ખસેડો (+36m)</span>
          </button>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>પ્રિન્ટ / PDF</span>
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>વોટ્સએપ શેર</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#003366] hover:bg-[#002244] text-white text-xs font-bold transition ml-auto"
            >
              ડેશબોર્ડ પર જાઓ
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
