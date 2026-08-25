"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { Globe, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export interface LanguageOption {
  id: string;
  name: string;
  nativeName: string;
  region: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { id: 'en', name: 'English', nativeName: 'English', region: 'Global / International', flag: '🌐' },
  { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', region: 'India (Northern & Central)', flag: '🇮🇳' },
  { id: 'mr', name: 'Marathi', nativeName: 'मराठी', region: 'Maharashtra, India', flag: '🇮🇳' },
  { id: 'te', name: 'Telugu', nativeName: 'తెలుగు', region: 'Andhra Pradesh & Telangana, India', flag: '🇮🇳' },
  { id: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', region: 'Southeastern Nigeria', flag: '🇳🇬' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', region: 'Germany, Austria & Switzerland', flag: '🇩🇪' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', region: 'Japan', flag: '🇯🇵' },
];

export const LanguageSelectionScreen: React.FC = () => {
  const { selectedLanguage, setSelectedLanguage, setStep } = useDemo();
  const [tempLanguage, setTempLanguage] = useState<string>(selectedLanguage || 'English');

  const handleSaveAndContinue = () => {
    setSelectedLanguage(tempLanguage);
    setStep('POST_SIGNUP_SETUP');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center pb-20">
      <div className="max-w-xl w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg mx-auto">
            <Globe className="w-7 h-7" />
          </div>
          <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full border border-brand-200">
            One-Time Setup • Step 1 of 2
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Select Your Language
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Choose your preferred language for CareConnect dosage reminders, safety alerts, and instructions.
          </p>
        </div>

        {/* Language Selection Card List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = tempLanguage === lang.name;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setTempLanguage(lang.name)}
                  className={`p-4 rounded-2xl border text-left transition flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-50 to-teal-50 border-brand-500 shadow-md ring-2 ring-brand-500/20'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-sm font-bold ${isSelected ? 'text-brand-950' : 'text-slate-900'}`}>
                          {lang.name}
                        </span>
                        <span className="text-xs text-slate-400 font-normal">({lang.nativeName})</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{lang.region}</p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                    isSelected
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'border-slate-300 group-hover:border-slate-400'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              Selected preference: <strong className="text-slate-900">{tempLanguage}</strong>. You can change your language preference anytime from your Account Profile.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleSaveAndContinue}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition"
          >
            <span>Save Preference & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
