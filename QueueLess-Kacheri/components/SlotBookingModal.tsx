'use client';

import React, { useState, useMemo } from 'react';
import { 
  Building2, MapPin, Calendar, Clock, AlertTriangle, 
  CheckCircle2, X, ChevronRight, ShieldCheck, ArrowRight,
  Info, Sparkles, UserCheck, Utensils
} from 'lucide-react';
import { 
  GUJARAT_33_DISTRICTS, 
  DistrictItem, 
  TalukaOffice, 
  getRecommendedCounter 
} from '@/lib/jurisdiction-data';
import { 
  generateOfficeSlots, 
  isGujaratGovernmentClosed, 
  TimeSlot,
  GUJARAT_GAZETTE_HOLIDAYS_2026 
} from '@/lib/slot-engine';
import { triggerHaptic } from '@/lib/haptics';
import { speakGuidance } from '@/lib/voice';
import { SchemeItem } from '@/lib/schemes-data';

export interface BookingDetails {
  district: DistrictItem;
  taluka: TalukaOffice;
  date: string;
  slot: TimeSlot;
  counterNumber: number;
  counterNameGu: string;
  counterNameEn: string;
  officerName: string;
  tokenNumber: string;
}

interface SlotBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: SchemeItem | null;
  onConfirm: (details: BookingDetails) => void;
  lang?: 'en' | 'gu' | 'hi';
}

export function SlotBookingModal({
  isOpen,
  onClose,
  scheme,
  onConfirm,
  lang = 'gu'
}: SlotBookingModalProps) {
  // District state
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('rajkot');
  const [selectedTalukaId, setSelectedTalukaId] = useState<string>('gondal');

  // Date state (defaults to today in 2026 format or current date)
  const todayStr = useMemo(() => {
    const now = new Date();
    // Defaulting to a working day
    const yyyy = '2026';
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-2');

  const selectedDistrict = useMemo(() => {
    return GUJARAT_33_DISTRICTS.find(d => d.id === selectedDistrictId) || GUJARAT_33_DISTRICTS[0];
  }, [selectedDistrictId]);

  const selectedTaluka = useMemo(() => {
    return selectedDistrict.talukas.find(t => t.id === selectedTalukaId) || selectedDistrict.talukas[0];
  }, [selectedDistrict, selectedTalukaId]);

  // Handle District Change
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrictId(distId);
    const dist = GUJARAT_33_DISTRICTS.find(d => d.id === distId);
    if (dist && dist.talukas.length > 0) {
      setSelectedTalukaId(dist.talukas[0].id);
    }
    triggerHaptic('tap');
  };

  // Holiday Check
  const holidayCheck = useMemo(() => {
    return isGujaratGovernmentClosed(selectedDate);
  }, [selectedDate]);

  // Slot list
  const slots = useMemo(() => {
    const seed = selectedDistrictId.length + selectedTalukaId.length;
    return generateOfficeSlots(seed);
  }, [selectedDistrictId, selectedTalukaId]);

  const selectedSlot = useMemo(() => {
    return slots.find(s => s.id === selectedSlotId) || slots[0];
  }, [slots, selectedSlotId]);

  // Recommended counter routing
  const routing = useMemo(() => {
    if (!scheme) {
      return {
        counterNumber: 2,
        reasonGu: 'સામાન્ય જન સેવા માટે કાઉન્ટર ૨ ફાળવેલ છે.',
        reasonEn: 'Assigned to General Jan Seva Counter 2.'
      };
    }
    return getRecommendedCounter(scheme.id);
  }, [scheme]);

  const counterDetails = useMemo(() => {
    const c = selectedTaluka.counters.find(cnt => cnt.number === routing.counterNumber);
    if (c) return c;
    return selectedTaluka.counters[0] || {
      number: 1,
      nameGu: 'જન સેવા કેન્દ્ર કાઉન્ટર ૧',
      nameEn: 'Jan Seva Counter 1',
      officerName: 'સરકારી અધિકારી',
      services: []
    };
  }, [selectedTaluka, routing.counterNumber]);

  if (!isOpen) return null;

  const handleFinalConfirm = () => {
    if (holidayCheck.isClosed) {
      triggerHaptic('warning');
      speakGuidance("પસંદ કરેલ તારીખે સરકારી રજા છે. કૃપા કરીને અન્ય કામકાજનો દિવસ પસંદ કરો.");
      return;
    }

    if (selectedSlot.isLunchBreak) {
      triggerHaptic('warning');
      speakGuidance("રિસેસના સમયમાં ટોકન બુકિંગ થઈ શકતું નથી.");
      return;
    }

    if (selectedSlot.status === 'full') {
      triggerHaptic('warning');
      speakGuidance("આ સ્લોટ હાઉસફુલ છે. અન્ય સમય પસંદ કરો.");
      return;
    }

    triggerHaptic('success');
    speakGuidance("સ્લોટ બુકિંગ સફળ! તમારો કચેરી ટોકન જારી થયો છે.");

    // Generate token number (e.g. A-42 or K-18)
    const tokenLetter = ['A', 'B', 'C', 'D'][routing.counterNumber % 4] || 'A';
    const tokenNum = Math.floor(10 + Math.random() * 89);
    const tokenNumber = `#${tokenLetter}-${tokenNum}`;

    onConfirm({
      district: selectedDistrict,
      taluka: selectedTaluka,
      date: selectedDate,
      slot: selectedSlot,
      counterNumber: routing.counterNumber,
      counterNameGu: counterDetails.nameGu,
      counterNameEn: counterDetails.nameEn,
      officerName: counterDetails.officerName,
      tokenNumber
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* HEADER */}
        <div className="bg-[#003366] text-white p-4 sm:p-5 flex items-center justify-between border-b border-blue-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5 text-[#FF9933]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold">
                  {lang === 'gu' ? 'કચેરી સ્લોટ & કાઉન્ટર પસંદગી' : 'Mamlatdar Office Slot & Counter Selection'}
                </h3>
                <span className="bg-[#138808] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  GRTSA Capped
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                {scheme ? scheme.titleGu : 'ગુજરાતના તમામ ૩૩ જિલ્લાઓ & તાલુકા મથકો'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('tap');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#1F2937]">
          
          {/* STEP 1: JURISDICTION (DISTRICT & TALUKA) */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#005A9C]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                પગલું ૧: અધિકારક્ષેત્ર પસંદ કરો (District & Taluka Mamlatdar Office)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* District Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  જિલ્લો (District) • ૩૩ ઉપલબ્ધ
                </label>
                <select
                  value={selectedDistrictId}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                >
                  {GUJARAT_33_DISTRICTS.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.nameGu} ({dist.nameEn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Taluka Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  તાલુકા મામલતદાર કચેરી (Jan Seva Kendra)
                </label>
                <select
                  value={selectedTalukaId}
                  onChange={(e) => {
                    setSelectedTalukaId(e.target.value);
                    triggerHaptic('tap');
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
                >
                  {selectedDistrict.talukas.map((tal) => (
                    <option key={tal.id} value={tal.id}>
                      {tal.nameGu} - {tal.officeNameGu}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 text-xs bg-blue-50/70 text-[#005A9C] border border-blue-200/60 rounded-lg p-2.5 flex items-center justify-between">
              <span className="font-semibold">
                📍 {selectedTaluka.officeNameGu}
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                {selectedDistrict.nameEn} District
              </span>
            </div>
          </section>

          {/* STEP 2: DATE PICKER & GUJARAT GAZETTE HOLIDAY BLOCKER */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-[#005A9C]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                પગલું ૨: મુલાકાતની તારીખ (Gazette Holiday Blocker Enforced)
              </h4>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  triggerHaptic('tap');
                }}
                min="2026-01-01"
                max="2026-12-31"
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#005A9C]"
              />

              <div className="text-xs text-gray-500">
                સરકારી સમય: સવારે ૧૦:૩૦ થી સાંજે ૦૬:૧૦ | રવિવાર & ૨જા-૪થા શનિવારે બંધ
              </div>
            </div>

            {/* HOLIDAY WARNING BANNER */}
            {holidayCheck.isClosed && (
              <div className="mt-3 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 animate-in fade-in">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-red-900 flex items-center gap-2">
                    <span>સરકારી કચેરી બંધ છે (Office Closed)</span>
                    <span className="bg-red-200 text-red-900 text-[10px] px-2 py-0.2 rounded-full">
                      નો-બુકિંગ દિવસ
                    </span>
                  </h5>
                  <p className="text-xs mt-1 text-red-700 font-medium">
                    {holidayCheck.reasonGu}
                  </p>
                  <p className="text-[11px] mt-0.5 text-red-600 font-mono">
                    {holidayCheck.reasonEn}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* STEP 3: CAPPED TIME SLOTS (10:30 AM - 06:10 PM with LUNCH BLACKOUT) */}
          <section className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#005A9C]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  પગલું ૩: સમય સ્લોટ પસંદ કરો (Max 5 Tokens / Hour Capacity)
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-[#138808] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#138808]" /> 🟢 જગ્યા ખાલી | 🟡 મધ્યમ | 🔴 હાઉસફુલ
              </span>
            </div>

            {holidayCheck.isClosed ? (
              <div className="p-6 text-center text-gray-400 bg-white border border-gray-200 rounded-xl">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-semibold">પસંદ કરેલ તારીખે સરકારી રજા હોવાથી સ્લોટ્સ ઉપલબ્ધ નથી.</p>
                <p className="text-[11px] text-gray-400 mt-1">કૃપા કરીને અન્ય ચાલુ દિવસ પસંદ કરો.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {slots.map((slot) => {
                  const isSelected = selectedSlotId === slot.id;
                  const isLunch = slot.isLunchBreak;
                  const isFull = slot.status === 'full';

                  if (isLunch) {
                    return (
                      <div
                        key={slot.id}
                        className="col-span-1 sm:col-span-2 p-2.5 rounded-xl bg-gray-200/70 border border-gray-300/80 text-gray-600 flex items-center justify-between opacity-80"
                      >
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-bold">
                            {slot.timeRange}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold bg-gray-300 text-gray-700 px-2 py-0.5 rounded-full">
                          {slot.statusGu}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={isFull}
                      onClick={() => {
                        triggerHaptic('tap');
                        setSelectedSlotId(slot.id);
                      }}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isSelected 
                          ? 'bg-[#003366] text-white border-[#003366] shadow-md ring-2 ring-blue-500/50' 
                          : isFull 
                            ? 'bg-red-50/60 border-red-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50/40 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{slot.timeRange}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF9933]" />
                          )}
                        </div>
                        <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          ક્ષમતા: {slot.bookedCount}/5 ટોકન બુક થયેલ
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          slot.statusColor === 'green' 
                            ? isSelected ? 'bg-green-700 text-white' : 'bg-green-100 text-green-800'
                            : slot.statusColor === 'yellow'
                              ? isSelected ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {slot.statusGu}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* STEP 4: SMART AUTO-COUNTER ROUTING BANNER */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#005A9C] text-white flex items-center justify-center font-bold text-sm shrink-0">
                C{routing.counterNumber}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-blue-900">
                    સ્માર્ટ કાઉન્ટર રાઉટીંગ: કાઉન્ટર {routing.counterNumber} - {counterDetails.nameGu}
                  </h4>
                  <span className="bg-blue-200 text-blue-900 text-[10px] px-1.5 py-0.2 rounded font-bold">
                    ઓટો-ડાયવર્ટ
                  </span>
                </div>
                <p className="text-xs text-blue-800 mt-1">
                  {routing.reasonGu}
                </p>
                <div className="mt-2 text-[11px] text-gray-600 flex items-center gap-2">
                  <UserCheck className="w-3.5 h-3.5 text-gray-500" />
                  <span>ડેસ્ક અધિકારી: <strong>{counterDetails.officerName}</strong></span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={() => {
              triggerHaptic('tap');
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition"
          >
            રદ કરો (Cancel)
          </button>

          <button
            disabled={holidayCheck.isClosed || selectedSlot.isLunchBreak || selectedSlot.status === 'full'}
            onClick={handleFinalConfirm}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md transition ${
              holidayCheck.isClosed || selectedSlot.isLunchBreak || selectedSlot.status === 'full'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#003366] hover:bg-[#002244] text-white hover:shadow-lg'
            }`}
          >
            <span>ટોકન સ્લોટ કન્ફર્મ કરો</span>
            <ArrowRight className="w-4 h-4 text-[#FF9933]" />
          </button>
        </div>

      </div>
    </div>
  );
}
