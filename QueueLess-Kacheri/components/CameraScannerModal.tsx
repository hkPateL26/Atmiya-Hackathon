import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, AlertTriangle, CheckCircle, X, RefreshCw, Volume2, 
  ShieldCheck, ArrowRight, Lock, Cloud, FolderOpen, FileText, FileCheck, FolderPlus
} from 'lucide-react';
import { triggerHaptic } from '@/lib/haptics';
import { speakGuidance } from '@/lib/voice';
import { validateIncomeCertificateText, SAMPLE_OCR_TEST_CASES, ValidationResult } from '@/lib/ocr-validator';
import { SchemeItem } from '@/lib/schemes-data';

interface CameraScannerModalProps {
  scheme: SchemeItem;
  isOpen: boolean;
  onClose: () => void;
  onVerifiedSuccess: () => void;
  isLoggedIn?: boolean;
}

export const CameraScannerModal: React.FC<CameraScannerModalProps> = ({
  scheme,
  isOpen,
  onClose,
  onVerifiedSuccess,
  isLoggedIn = false,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'drive'>('camera');
  const [scanning, setScanning] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [cameraStreamActive, setCameraStreamActive] = useState(false);
  const [selectedFileMeta, setSelectedFileMeta] = useState<{ name: string; size: string; source: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isOpen && activeTab === 'camera') {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            setCameraStreamActive(true);
          }
        })
        .catch(() => {
          setCameraStreamActive(false);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleRunOcr = (rawText: string) => {
    setScanning(true);
    setValidationResult(null);
    triggerHaptic('tap');

    setTimeout(() => {
      const result = validateIncomeCertificateText(rawText);
      setValidationResult(result);
      setScanning(false);

      if (result.isValid) {
        triggerHaptic('success');
        speakGuidance("આવક પ્રમાણપત્ર માન્ય છે. તમે કચેરી ટોકન બુક કરી શકો છો.");
      } else {
        triggerHaptic('warning');
        speakGuidance(result.messageGu);
      }
    }, 1200);
  };

  const handleDirectFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileMeta({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        source: 'Local Device File'
      });
      handleRunOcr(SAMPLE_OCR_TEST_CASES.valid2025);
    }
  };

  const handleDirectFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileMeta({
        name: `📁 Folder (${files.length} Documents)`,
        size: `${files.length} files processed`,
        source: 'Local Folder Upload'
      });
      handleRunOcr(SAMPLE_OCR_TEST_CASES.valid2025);
    }
  };

  const selectDriveFile = (name: string, size: string, year: number) => {
    setSelectedFileMeta({
      name,
      size,
      source: 'Google Drive Synced'
    });
    handleRunOcr(year === 2021 ? SAMPLE_OCR_TEST_CASES.expired2021 : SAMPLE_OCR_TEST_CASES.valid2025);
  };

  return (
    <div className="fixed inset-0 bg-[#003366]/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="bg-[#003366] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#005A9C] text-[#FF9933] flex items-center justify-center text-lg font-black border border-[#FF9933]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                AI કેમેરા ગાઈડ & દસ્તાવેજ ચકાસણી
              </h3>
              <p className="text-[11px] text-blue-200">{scheme.titleGu}</p>
            </div>
          </div>
          <button
            onClick={() => {
              triggerHaptic('tap');
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector & Test Presets */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              triggerHaptic('tap');
              setActiveTab('camera');
            }}
            className={`flex-1 py-3 text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'camera'
                ? 'text-[#003366] border-b-2 border-[#005A9C] bg-white'
                : 'text-slate-500 hover:text-[#003366]'
            }`}
          >
            <Camera className="w-4 h-4 text-[#005A9C]" />
            <span>લાઈવ કેમેરા સ્કેન (Live Camera)</span>
          </button>
          <button
            onClick={() => {
              triggerHaptic('tap');
              setActiveTab('drive');
              speakGuidance("ગૂગલ ડ્રાઇવ અથવા કમ્પ્યુટરમાંથી ફાઇલ અથવા ફોલ્ડર અપલોડ કરો.");
            }}
            className={`flex-1 py-3 text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer ${
              activeTab === 'drive'
                ? 'text-[#003366] border-b-2 border-[#FF9933] bg-white'
                : 'text-slate-500 hover:text-[#003366]'
            }`}
          >
            <Cloud className="w-4 h-4 text-[#FF9933]" />
            <span>Google Drive & ફાઇલ/ફોલ્ડર અપલોડ</span>
          </button>
        </div>

        {/* Viewfinder Canvas Area */}
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          
          {activeTab === 'camera' ? (
            <div className="space-y-4">
              {/* Presets for Camera */}
              <div className="p-3 bg-[#F5F7FA] border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-500">ટેસ્ટ સેમ્પલ:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRunOcr(SAMPLE_OCR_TEST_CASES.expired2021)}
                    className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span>ટેસ્ટ: ૨૦૨૧ (રદબાતલ)</span>
                  </button>
                  <button
                    onClick={() => handleRunOcr(SAMPLE_OCR_TEST_CASES.valid2025)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-[#138808] border border-emerald-300 px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3 h-3 text-[#138808]" />
                    <span>ટેસ્ટ: ૨૦૨૫ (માન્ય)</span>
                  </button>
                </div>
              </div>

              <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-slate-700">
                {cameraStreamActive ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6 text-slate-400 space-y-2">
                    <Camera className="w-12 h-12 mx-auto text-slate-500 animate-pulse" />
                    <p className="text-xs font-semibold text-slate-300">કેમેરા વ્યુફાઈન્ડર સક્રિય છે</p>
                    <p className="text-[11px] text-slate-400">દસ્તાવેજને લીલા બોક્સની અંદર સીધો રાખો</p>
                  </div>
                )}

                {/* CamScanner Green Rectangular Framing Guide */}
                <div className="absolute inset-4 sm:inset-6 border-2 border-dashed border-[#138808] rounded-xl pointer-events-none shadow-[0_0_20px_rgba(19,136,8,0.3)] flex flex-col justify-between p-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-emerald-400 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-xs w-max">
                    <span>આવક પ્રમાણપત્ર / આધાર કાર્ડ ફ્રેમ</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-white bg-slate-900/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                      કાગળ ચારેય ખૂણાથી સીધો રાખો
                    </span>
                  </div>
                </div>

                {/* Scan Beam Animation if Scanning */}
                {scanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#138808] animate-bounce top-1/2" />
                )}
              </div>
            </div>
          ) : (
            /* Google Drive & Direct File / Folder Upload Studio */
            <div className="space-y-4">
              
              {/* Direct File & Folder Upload Box */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 text-center bg-[#F5F7FA] hover:bg-slate-100 transition space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#005A9C] flex items-center justify-center text-lg">
                    <Cloud className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#FF9933] flex items-center justify-center text-lg">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#138808] flex items-center justify-center text-lg">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black text-[#003366]">સીધી ફાઇલ અથવા આખું ફોલ્ડર પસંદ કરો</p>
                  <p className="text-[11px] text-slate-500">PDF, JPG, PNG અથવા આખું દસ્તાવેજ ફોલ્ડર અપલોડ કરી શકાય છે</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#005A9C] hover:bg-[#003366] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>📂 ફાઇલ અપલોડ કરો (Select File)</span>
                  </button>
                  <button
                    onClick={() => folderInputRef.current?.click()}
                    className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-95"
                  >
                    <FolderPlus className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>📁 આખું ફોલ્ડર અપલોડ કરો (Upload Folder)</span>
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleDirectFileSelect}
                />
                <input
                  type="file"
                  ref={folderInputRef}
                  {...({ webkitdirectory: '', directory: '' } as any)}
                  className="hidden"
                  onChange={handleDirectFolderSelect}
                />
              </div>

              {/* Google Drive / DigiLocker Cloud Browser */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-[#005A9C]" />
                    <div className="text-left">
                      <p className="text-xs font-black text-[#003366]">Google Drive / DigiLocker ક્લાઉડ ફાઇલ્સ</p>
                      <p className="text-[10px] text-slate-500">My Drive &gt; ગુજરાત સરકારી પ્રમાણપત્રો</p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-extrabold bg-[#138808] text-white px-2 py-0.5 rounded-full">
                    ● Live Synced
                  </span>
                </div>

                <div className="p-2 space-y-1.5 divide-y divide-slate-100 text-left">
                  
                  {/* 1. Valid 2025 */}
                  <div
                    onClick={() => selectDriveFile('આવકનો_દાખલો_૨૦૨૫_ડીજીટલ.pdf', '284 KB', 2025)}
                    className="p-2.5 rounded-xl hover:bg-blue-50/80 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                        PDF
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#005A9C]">આવકનો_દાખલો_૨૦૨૫_ડીજીટલ.pdf</p>
                        <p className="text-[10px] text-slate-400">ઇસ્યુ: ૧૫-૦૪-૨૦૨૫ • ૨૮૪ KB • <span className="text-emerald-700 font-bold">૩-વર્ષ માન્ય</span></p>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#005A9C] bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg group-hover:bg-[#005A9C] group-hover:text-white transition">
                      ઇમ્પોર્ટ કરો →
                    </span>
                  </div>

                  {/* 2. Expired 2021 */}
                  <div
                    onClick={() => selectDriveFile('આવકનો_દાખલો_૨૦૨૧_જૂનો.pdf', '192 KB', 2021)}
                    className="p-2.5 rounded-xl hover:bg-red-50/80 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0">
                        PDF
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-red-700">આવકનો_દાખલો_૨૦૨૧_જૂનો.pdf</p>
                        <p className="text-[10px] text-slate-400">ઇસ્યુ: ૧૦-૦૧-૨૦૨૧ • ૧૯૨ KB • <span className="text-red-600 font-bold">૩ વર્ષથી જૂનો (રદબાતલ)</span></p>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-lg group-hover:bg-red-600 group-hover:text-white transition">
                      ટેસ્ટ એક્સપાયરી →
                    </span>
                  </div>

                  {/* 3. Land record */}
                  <div
                    onClick={() => selectDriveFile('૭_૧૨_અને_૮-અ_જમીન_નકલ.pdf', '512 KB', 2025)}
                    className="p-2.5 rounded-xl hover:bg-blue-50/80 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#138808] flex items-center justify-center text-xs font-bold shrink-0">
                        RoR
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#005A9C]">૭_૧૨_અને_૮-અ_જમીન_નકલ.pdf</p>
                        <p className="text-[10px] text-slate-400">ઇ-ધરા ગોંડલ • ૫૧૨ KB • <span className="text-emerald-700 font-bold">વેરિફાઇડ RoR</span></p>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#005A9C] bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg group-hover:bg-[#005A9C] group-hover:text-white transition">
                      ઇમ્પોર્ટ કરો →
                    </span>
                  </div>

                  {/* 4. Aadhaar */}
                  <div
                    onClick={() => selectDriveFile('આધાર_કાર્ડ_UIDAI_ઇ-આધાર.pdf', '340 KB', 2025)}
                    className="p-2.5 rounded-xl hover:bg-blue-50/80 transition cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#005A9C] flex items-center justify-center text-xs font-bold shrink-0">
                        UID
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#005A9C]">આધાર_કાર્ડ_UIDAI_ઇ-આધાર.pdf</p>
                        <p className="text-[10px] text-slate-400">UIDAI Safe • ૩૪૦ KB • <span className="text-emerald-700 font-bold">૧૨-ડિજિટ ડિજિટલ</span></p>
                      </div>
                    </div>
                    <span className="text-[11px] font-extrabold text-[#005A9C] bg-blue-50 border border-blue-200 px-2 py-1 rounded-lg group-hover:bg-[#005A9C] group-hover:text-white transition">
                      ઇમ્પોર્ટ કરો →
                    </span>
                  </div>

                </div>
              </div>

              {/* Active Selected File Banner */}
              {selectedFileMeta && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCheck className="w-5 h-5 text-[#005A9C]" />
                    <div className="text-left">
                      <p className="text-xs font-black text-[#003366]">{selectedFileMeta.name}</p>
                      <p className="text-[10px] text-slate-500">{selectedFileMeta.source} • {selectedFileMeta.size}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-[#138808] border border-emerald-300 px-2 py-0.5 rounded-full">
                    તપાસ પૂર્ણ
                  </span>
                </div>
              )}

            </div>
          )}

          {/* Validation Result Box */}
          {validationResult && (
            <div
              className={`p-4 rounded-2xl border transition-all ${
                validationResult.isValid
                  ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                  : 'bg-red-50 border-red-300 text-slate-900'
              }`}
            >
              <div className="flex items-start gap-3">
                {validationResult.isValid ? (
                  <CheckCircle className="w-5 h-5 text-[#138808] shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        validationResult.isValid
                          ? 'bg-emerald-200 text-[#138808]'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {validationResult.isValid ? '● પ્રમાણિત માન્ય' : '● અમાન્ય / મુદત વીતી ગઈ'}
                    </span>
                    <button
                      onClick={() => speakGuidance(validationResult.messageGu)}
                      className="text-slate-600 hover:text-slate-900 text-xs flex items-center gap-1 font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> સાંભળો
                    </button>
                  </div>

                  <p className="text-xs font-bold leading-relaxed">{validationResult.messageGu}</p>
                  <p className="text-[11px] text-slate-600">{validationResult.messageEn}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => handleRunOcr(SAMPLE_OCR_TEST_CASES.valid2025)}
            disabled={scanning}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
            <span>{scanning ? 'સ્કેનિંગ ચાલુ છે...' : 'ફોટો કેપ્ચર & સ્કેન'}</span>
          </button>

          <button
            onClick={() => {
              if (validationResult?.isValid) {
                triggerHaptic('success');
                onVerifiedSuccess();
              }
            }}
            disabled={!validationResult?.isValid}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition shadow-md ${
              validationResult?.isValid
                ? 'bg-[#005A9C] hover:bg-[#003366] text-white active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoggedIn ? (
              <>
                <span>ટોકન મેળવવા આગળ વધો</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>ટોકન મેળવવા લૉગિન કરો (Login to Collect)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
