'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Clock, ShieldCheck, ArrowRight, FileCheck, 
  ChevronRight, Sparkles, Filter 
} from 'lucide-react';
import { ALL_YOJANAS, SchemeItem } from '@/lib/schemes-data';
import { triggerHaptic } from '@/lib/haptics';

interface SchemesCatalogProps {
  onSelectScheme: (scheme: SchemeItem) => void;
}

export const SchemesCatalog: React.FC<SchemesCatalogProps> = ({ onSelectScheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', labelGu: 'તમામ યોજનાઓ (All)', icon: '🏛️' },
    { id: 'agriculture', labelGu: '🌾 ખેતીવાડી (Agri)', icon: '🌾' },
    { id: 'healthcare', labelGu: '🏥 આરોગ્ય (Health)', icon: '🏥' },
    { id: 'education', labelGu: '🎓 શિક્ષણ (Edu)', icon: '🎓' },
    { id: 'welfare', labelGu: '🏠 આવાસ & કલ્યાણ', icon: '🏠' },
  ];

  const personaFilters = [
    { id: 'farmer', labelGu: 'હું ખેડૂત છું', icon: '🌾', category: 'agriculture' },
    { id: 'student', labelGu: 'હું વિદ્યાર્થી છું', icon: '🎓', category: 'education' },
    { id: 'woman', labelGu: 'મહિલા / માતા', icon: '👩', category: 'healthcare' },
    { id: 'housing', labelGu: 'મકાન / પેન્શન સહાય', icon: '🏠', category: 'welfare' },
  ];

  const filteredSchemes = useMemo(() => {
    return ALL_YOJANAS.filter(scheme => {
      // Category match
      const catMatch = selectedCategory === 'all' || scheme.category === selectedCategory;
      
      // Search match (Gujarati or English)
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q || 
        scheme.titleGu.toLowerCase().includes(q) ||
        scheme.titleEn.toLowerCase().includes(q) ||
        scheme.benefitGu.toLowerCase().includes(q) ||
        scheme.department.toLowerCase().includes(q);

      return catMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#003366] text-xs font-bold border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" />
            <span>ગુજરાત સત્તાવાર સરકારી યોજના પોર્ટલ • ૨૦૨૬</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#003366] tracking-tight">
            સરકારી યોજનાઓ & સેવાઓ ({ALL_YOJANAS.length}+ Schemes)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ખેતીવાડી, આરોગ્ય, શિક્ષણ, આવાસ અને સામાજિક કલ્યાણના કાગળો ચકાસો અને સીધા ટોકન મેળવો.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="યોજના શોધો: ટ્રેક્ટર, MYSY, આવાસ..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-[#005A9C] shadow-xs"
          />
        </div>
      </div>

      {/* Quick Persona Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> ઝડપી ફિલ્ટર:
        </span>
        {personaFilters.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              triggerHaptic('tap');
              if (selectedPersona === p.id) {
                setSelectedPersona(null);
                setSelectedCategory('all');
              } else {
                setSelectedPersona(p.id);
                setSelectedCategory(p.category);
              }
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              selectedPersona === p.id
                ? 'bg-[#FF9933] text-slate-900 shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{p.icon}</span>
            <span>{p.labelGu}</span>
          </button>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar border-b border-slate-200">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              triggerHaptic('tap');
              setSelectedPersona(null);
              setSelectedCategory(c.id);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition flex items-center gap-2 ${
              selectedCategory === c.id
                ? 'bg-[#003366] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.labelGu}</span>
          </button>
        ))}
      </div>

      {/* Schemes Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            onClick={() => {
              triggerHaptic('tap');
              onSelectScheme(scheme);
            }}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-[#005A9C]/50 transition cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#005A9C] via-[#FF9933] to-[#138808]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase text-[#003366] bg-[#F5F7FA] border border-slate-200 px-2.5 py-0.5 rounded-full truncate">
                  {scheme.categoryGu}
                </span>
                <span className="text-[10px] font-bold text-[#138808] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                  {scheme.fee === 0 ? '● મફત સેવા' : `₹${scheme.fee} સરકારી ફી`}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-[#003366] text-sm sm:text-base leading-snug group-hover:text-[#005A9C] transition">
                  {scheme.titleGu}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                  {scheme.titleEn}
                </p>
              </div>

              <div className="bg-[#F5F7FA] border border-slate-200/80 rounded-2xl p-3">
                <p className="text-[11px] font-bold text-slate-700 line-clamp-2 leading-relaxed">
                  ✨ {scheme.benefitGu}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                <FileCheck className="w-3.5 h-3.5 text-[#005A9C]" />
                <span>{scheme.requiredDocs.length} કાગળો જરૂરી</span>
              </span>

              <span className="text-[#005A9C] group-hover:text-[#003366] flex items-center gap-1 text-[11px] font-extrabold">
                <span>કાગળો ચકાસો</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <p className="text-base font-extrabold text-[#003366]">કોઈ યોજના મળી નથી</p>
          <p className="text-xs text-slate-500">કૃપા કરીને અન્ય શબ્દ અથવા કેટેગરી પસંદ કરો.</p>
        </div>
      )}

    </div>
  );
};
