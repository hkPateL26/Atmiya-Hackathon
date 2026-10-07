'use client';

import React, { useState } from 'react';
import { 
  X, CheckSquare, Square, Share2, Camera, ShieldCheck, 
  Clock, IndianRupee, Volume2, ArrowRight, FileCheck2, Lock, CheckCircle2 
} from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { speakGuidance } from '@/lib/voice';
import { SchemeItem } from '@/lib/schemes-data';

interface SchemeDrawerProps {
  scheme: SchemeItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenScanner: () => void;
  isLoggedIn?: boolean;
  onCollectToken?: (scheme: SchemeItem) => void;
}

export const SchemeDrawer: React.FC<SchemeDrawerProps> = ({
  scheme,
  isOpen,
  onClose,
  onOpenScanner,
  isLoggedIn = false,
  onCollectToken,
}) => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!isOpen || !scheme) return null;

  const totalDocs = scheme.requiredDocs.length;
  const verifiedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((verifiedCount / totalDocs) * 100);

  const toggleDoc = (docName: string) => {
    triggerHaptic('tap');
    setCheckedDocs(prev => ({ ...prev, [docName]: !prev[docName] }));
  };

  const handleShareWhatsApp = () => {
    triggerHaptic('success');
    const docList = scheme.requiredDocs.map((d, i) => `${i + 1}. ${d.nameGu}`).join('\n');
    const message = `🏛️ *${scheme.titleGu}* માટે જરૂરી સરકારી કાગળો:\n\n${docList}\n\n⏱️ સેવા સમયમર્યાદા: ${scheme.slaDays} દિવસ (GRTSA 2013)\n💰 સરકારી ફી: ₹${scheme.fee} (મફત)\n\n📌 નાગરિકસેવા AI / QueueLess Kacheri પોર્ટલ પરથી પ્રમાણિત.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-[#003366]/60 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl border-l border-slate-200 flex flex-col justify-between animate-slide-left overflow-y-auto">
        
        <div>
          {/* Drawer Header */}
          <div className="bg-[#003366] text-white p-5 sticky top-0 z-20 flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF9933] bg-[#002244] px-2.5 py-0.5 rounded-full border border-blue-800">
                {scheme.categoryGu} • {scheme.department}
              </span>
              <h2 className="text-xl font-black text-white mt-1 leading-tight">
                {scheme.titleGu}
              </h2>
              <p className="text-xs text-blue-200">{scheme.titleEn}</p>
            </div>
            <button
              onClick={() => {
                triggerHaptic('tap');
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 space-y-6">
            
            {/* Quick Stats Grid: SLA, Fee, Validity */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-center">
                <Clock className="w-4 h-4 text-[#005A9C] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-500 uppercase">નિકાલ સમય</p>
                <p className="text-sm font-black text-[#003366] mt-0.5">{scheme.slaDays} દિવસ</p>
                <p className="text-[9px] text-[#138808] font-bold">GRTSA ગેરંટી</p>
              </div>

              <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-center">
                <IndianRupee className="w-4 h-4 text-[#138808] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-500 uppercase">સરકારી ફી</p>
                <p className="text-sm font-black text-[#003366] mt-0.5">
                  {scheme.fee === 0 ? '₹૦ (મફત)' : `₹${scheme.fee}`}
                </p>
                <p className="text-[9px] text-slate-500">અધિકૃત ચાર્જ</p>
              </div>

              <div className="bg-[#F5F7FA] border border-slate-200 rounded-2xl p-3 text-center">
                <ShieldCheck className="w-4 h-4 text-[#FF9933] mx-auto mb-1" />
                <p className="text-[10px] font-bold text-slate-500 uppercase">દાખલા મુદત</p>
                <p className="text-sm font-black text-[#003366] mt-0.5">
                  {scheme.validityYears ? `${scheme.validityYears} વર્ષ` : 'નિયમ મુજબ'}
                </p>
                <p className="text-[9px] text-slate-500">કાનૂની માન્યતા</p>
              </div>
            </div>

            {/* Scheme Benefit Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                  <span>✨ મુખ્ય યોજના લાભ</span>
                </span>
                <button
                  onClick={() => speakGuidance(scheme.benefitGu)}
                  className="text-[#003366] hover:text-[#005A9C] text-xs font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> સાંભળો
                </button>
              </div>
              <p className="text-xs font-bold text-amber-950 leading-relaxed">{scheme.benefitGu}</p>
              <p className="text-[11px] text-amber-800/80 font-medium">{scheme.benefit}</p>
            </div>

            {/* Document Readiness Progress Gauge */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#003366]">દસ્તાવેજ તૈયારી સ્કોર (Readiness)</span>
                <span className={`${progressPercent === 100 ? 'text-[#138808]' : 'text-[#FF9933]'}`}>
                  {verifiedCount}/{totalDocs} કાગળો તૈયાર ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#005A9C] via-[#FF9933] to-[#138808] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500">
                તમારી પાસે હાજર કાગળો પર ટિક કરો અથવા AI કેમેરાથી તપાસો.
              </p>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-black text-[#003366] uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#005A9C]" />
                <span>જરૂરી દસ્તાવેજોનું ચેકલિસ્ટ (Required Documents)</span>
              </h4>

              <div className="space-y-2">
                {scheme.requiredDocs.map((doc, idx) => {
                  const isChecked = !!checkedDocs[doc.nameGu];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleDoc(doc.nameGu)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition select-none ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-[#F5F7FA] border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-[#138808] shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <div>
                          <p className="text-xs font-bold leading-tight">{doc.nameGu}</p>
                          <p className="text-[10px] text-slate-500">{doc.nameEn}</p>
                        </div>
                      </div>

                      {doc.checkType === 'income_expiry_3yr' && (
                        <span className="text-[9px] font-black bg-amber-100 text-[#FF9933] border border-amber-300 px-2 py-0.5 rounded-full shrink-0">
                          ૩-વર્ષ ચેક
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Share on WhatsApp Button */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-[#138808] border border-emerald-300 rounded-xl py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>વોટ્સએપ પર યાદી મોકલો (Share on WhatsApp)</span>
            </button>

          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-2.5 sticky bottom-0 z-20">
          <button
            onClick={() => {
              triggerHaptic('success');
              onOpenScanner();
            }}
            className="w-full bg-[#005A9C] hover:bg-[#003366] text-white font-extrabold py-3.5 rounded-2xl text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#FF9933]" />
            <span>દસ્તાવેજ AI કેમેરાથી ચકાસો (Verify with Camera)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {onCollectToken && (
            <button
              onClick={() => {
                triggerHaptic('tap');
                onCollectToken(scheme);
              }}
              className="w-full bg-amber-50 hover:bg-amber-100 text-[#003366] border border-amber-300 font-extrabold py-2.5 rounded-2xl text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoggedIn ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#138808]" />
                  <span>કચેરી ટોકન કલેક્ટ કરો (Collect Live Token)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>ટોકન મેળવવા લૉગિન કરો (Login Required to Collect Token)</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
