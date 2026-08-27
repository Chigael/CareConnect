"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { AYURBOOK_REMEDIES, Remedy } from '@/data/mockData';
import { Search, BookOpen, Sparkles, ShieldCheck, ArrowRight, Coffee, Leaf, Shield, CheckCircle2, Stethoscope, HeartPulse, Lock, Unlock, Clock } from 'lucide-react';

export const AyurBookScreen: React.FC = () => {
  const { 
    setSelectedRemedy, 
    setStep, 
    symptom, 
    patient, 
    treatedCondition, 
    medications,
    ayurbookLockUntil,
    unlockAyurbook
  } = useDemo();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'REMEDIES' | 'SAFETY_CHECK'>('REMEDIES');
  const [symptomSearch, setSymptomSearch] = useState('');
  const [selectedRemedyForCheck, setSelectedRemedyForCheck] = useState<string>(AYURBOOK_REMEDIES[0].id);

  const quickSymptoms = [
    'Cold',
    'Cough',
    'Fever',
    'Sore Throat',
    'Fatigue',
    'Headaches',
    'Body Ache',
    'Back Pain',
    'Indigestion',
    'Bloating',
    'Cramps',
    'Poor Sleep',
    'Stress',
    'Skin Irritation',
    'Cold Sores',
    'Acidity',
    'Insomnia',
    'Constipation',
    'Diarrhea'
  ];

  // Calculate lock status and remaining time
  const isLocked = ayurbookLockUntil !== null && Date.now() < ayurbookLockUntil;
  const remainingSeconds = isLocked ? Math.max(0, Math.floor((ayurbookLockUntil! - Date.now()) / 1000)) : 0;
  const remainingMinutesStr = `${Math.floor(remainingSeconds / 60)}m ${remainingSeconds % 60}s`;

  // Symptom search filtering
  const filteredRemedies = AYURBOOK_REMEDIES.filter(rem => {
    if (!symptomSearch.trim()) return true;
    const query = symptomSearch.toLowerCase().trim();
    
    const matchesRecommendedSymptom = rem.recommendedFor?.some(s => s.toLowerCase().includes(query));
    const matchesName = rem.name.toLowerCase().includes(query) || rem.sanskritName.toLowerCase().includes(query) || rem.botanicalName.toLowerCase().includes(query);
    const matchesCategory = rem.category.toLowerCase().includes(query) || rem.summary.toLowerCase().includes(query);
    const matchesUses = rem.traditionalUses?.some(u => u.toLowerCase().includes(query));

    return matchesRecommendedSymptom || matchesName || matchesCategory || matchesUses;
  });

  const displayedRemedies = filteredRemedies;

  const handleSelectRemedy = (remedy: Remedy) => {
    setSelectedRemedy(remedy);
    setStep('REMEDY_DETAIL');
  };

  const activeConditionName = treatedCondition || patient.condition || 'Current Condition';

  // Locked / Cooldown Screen View
  if (isLocked) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white dark:bg-slate-800 rounded-3xl py-8 border-2 border-amber-300 dark:border-amber-700 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Lock className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800 inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-700 dark:text-amber-400" />
              <span>AyurBook Cooldown Period Active</span>
            </span>

            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
              AyurBook Search is Currently Locked
            </h2>

            <div className="bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-4 border border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200 inline-block text-center my-2">
              <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase block">Remaining Cooldown Time:</span>
              <span className="text-3xl font-black text-amber-700 dark:text-amber-400 tracking-tight block mt-1">
                {remainingMinutesStr}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-md mx-auto">
              You recently logged a remedy action. To allow your body sufficient time to absorb the remedy and prevent over-medicating, AyurBook search is locked for 25 minutes.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setStep('DASHBOARD')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition"
            >
              <span>{t.nav.home}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={unlockAyurbook}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs py-3 rounded-xl transition border border-slate-200 dark:border-slate-600"
            >
              <Unlock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Simulate Unlock (Skip Cooldown for Testing)</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-28">
      <div className="max-w-3xl lg:max-w-full mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              AyurBook • Remedy & Safety Hub
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{t.ayurbook.title}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.ayurbook.subtitle}
          </p>
        </div>

        {/* Sub-Tab Segmented Control */}
        <div className="bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl flex items-center gap-1 border border-slate-300/50 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('REMEDIES')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition ${
              activeTab === 'REMEDIES'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>🌿 Remedy Finder</span>
          </button>
          <button
            onClick={() => setActiveTab('SAFETY_CHECK')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition ${
              activeTab === 'SAFETY_CHECK'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>🛡️ {t.ayurbook.checkInteraction}</span>
          </button>
        </div>

        {activeTab === 'SAFETY_CHECK' ? (
          /* Folded Safety & Interaction Checker UI */
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2.5 py-1 rounded-md">
                Safety Screening Tool
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t.ayurbook.checkInteraction}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Select an Ayurvedic remedy to evaluate cross-reaction risks against your {medications.length} active prescription{medications.length === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                  Select Herbal Remedy to Check:
                </label>
                <select
                  value={selectedRemedyForCheck}
                  onChange={(e) => setSelectedRemedyForCheck(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {AYURBOOK_REMEDIES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.sanskritName}) — {r.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Prescriptions Summary */}
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-400 block">Screening Against Prescriptions:</span>
                {medications.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">No active prescriptions logged yet. Safety score: Clear (No drug interactions).</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {medications.map((m) => (
                      <span key={m.id} className="text-xs font-bold text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2.5 py-1 rounded-lg border border-brand-200 dark:border-brand-800">
                        💊 {m.name} ({m.genericName || m.dosage})
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  const targetRemedy = AYURBOOK_REMEDIES.find(r => r.id === selectedRemedyForCheck) || AYURBOOK_REMEDIES[0];
                  setSelectedRemedy(targetRemedy);
                  setStep('INTERACTION_RESULT');
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Run Interaction & Safety Check</span>
              </button>
            </div>
          </div>
        ) : (
          /* Symptom Search Bar & Remedy Finder */
          <>
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
          <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Search Remedies by Symptom</span>
          </label>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
              placeholder={t.ayurbook.searchPlaceholder}
              className="w-full text-xs pl-10 pr-10 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-slate-100"
            />
            {symptomSearch && (
              <button
                onClick={() => setSymptomSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold bg-slate-200 dark:bg-slate-600 w-5 h-5 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Symptom Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400 font-semibold mr-1">Quick Search:</span>
            {quickSymptoms.map((symp) => (
              <button
                key={symp}
                onClick={() => setSymptomSearch(symp)}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg border transition ${
                  symptomSearch.toLowerCase() === symp.toLowerCase()
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {symp}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search / Condition Safety Banner */}
        {symptomSearch.trim() ? (
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-950 dark:text-emerald-200">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs">
                  Showing {filteredRemedies.length} Safe Option{filteredRemedies.length === 1 ? '' : 's'} for "{symptomSearch}"
                </h4>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Screened safe alongside <strong>{activeConditionName}</strong> and your {medications.length} active prescription{medications.length === 1 ? '' : 's'}.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSymptomSearch('')}
              className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 underline hover:text-emerald-950 shrink-0"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-950 dark:text-emerald-200">
            <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <p className="font-semibold">
              Tap a quick symptom chip above or type any symptom to explore {AYURBOOK_REMEDIES.length} safe, tailored Ayurvedic remedies.
            </p>
          </div>
        )}

        {/* Remedy List Grid */}
        {displayedRemedies.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">No remedies found for "{symptomSearch}"</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Try searching for Cold, Cough, Fever, Sore Throat, Fatigue, Headaches, Back Pain, or Indigestion.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedRemedies.map((remedy) => (
              <div
                key={remedy.id}
                onClick={() => handleSelectRemedy(remedy)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 shadow-soft hover:shadow-card cursor-pointer transition flex flex-col justify-between group space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2.5 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                      {remedy.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200 dark:border-emerald-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      {remedy.safetyRating} Safe
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                    {remedy.name}
                  </h3>
                  <p className="text-xs font-medium italic text-slate-500 dark:text-slate-400 mb-2">
                    {remedy.botanicalName} ({remedy.sanskritName})
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {remedy.summary}
                  </p>

                  {/* Recommended For Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {remedy.recommendedFor.map((rec) => (
                      <span key={rec} className="text-[9px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                        ✓ {rec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    {t.ayurbook.viewRemedy} &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        </>
        )}

      </div>
    </div>
  );
};


