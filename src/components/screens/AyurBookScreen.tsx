"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
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
  const [activeTab, setActiveTab] = useState<'REMEDIES' | 'SAFETY_CHECK'>('REMEDIES');
  const [symptomSearch, setSymptomSearch] = useState('');
  const [selectedRemedyForCheck, setSelectedRemedyForCheck] = useState<string>(AYURBOOK_REMEDIES[0].id);

  const quickSymptoms = [
    'Nausea',
    'Headaches',
    'Acidity',
    'Insomnia',
    'Constipation',
    'Diarrhea'
  ];

  // SECTION 8: Calculate lock status and remaining time
  const isLocked = ayurbookLockUntil !== null && Date.now() < ayurbookLockUntil;
  const remainingSeconds = isLocked ? Math.max(0, Math.floor((ayurbookLockUntil! - Date.now()) / 1000)) : 0;
  const remainingMinutesStr = `${Math.floor(remainingSeconds / 60)}m ${remainingSeconds % 60}s`;

  // SECTION 7: Symptom search filtering returning a short list (around 2 safe options)
  const filteredRemedies = AYURBOOK_REMEDIES.filter(rem => {
    if (!symptomSearch.trim()) return true;
    const query = symptomSearch.toLowerCase().trim();
    
    // Check match against recommendedFor symptoms, name, category, or summary
    const matchesRecommendedSymptom = rem.recommendedFor?.some(s => s.toLowerCase().includes(query));
    const matchesName = rem.name.toLowerCase().includes(query) || rem.sanskritName.toLowerCase().includes(query);
    const matchesCategory = rem.category.toLowerCase().includes(query) || rem.summary.toLowerCase().includes(query);

    return matchesRecommendedSymptom || matchesName || matchesCategory;
  });

  // Limit search results to around 2 top safe options when a symptom search query is active
  const displayedRemedies = symptomSearch.trim() ? filteredRemedies.slice(0, 2) : filteredRemedies;

  const handleSelectRemedy = (remedy: Remedy) => {
    setSelectedRemedy(remedy);
    setStep('REMEDY_DETAIL');
  };

  const activeConditionName = treatedCondition || patient.condition || 'Current Condition';

  // SECTION 8: Locked / Cooldown Screen View
  if (isLocked) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 border-2 border-amber-300 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="relative mx-auto w-20 h-20 rounded-3xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Lock className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-amber-700" />
              <span>AyurBook Cooldown Period Active</span>
            </span>

            <h2 className="text-2xl font-black text-slate-900 mt-2">
              AyurBook Search is Currently Locked
            </h2>

            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-950 inline-block text-center my-2">
              <span className="text-[11px] font-bold text-amber-800 uppercase block">Remaining Cooldown Time:</span>
              <span className="text-3xl font-black text-amber-700 tracking-tight block mt-1">
                {remainingMinutesStr}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
              You recently logged a remedy action. To allow your body sufficient time to absorb the remedy and prevent over-medicating, AyurBook search is locked for 25 minutes.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setStep('DASHBOARD')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition"
            >
              <span>Return to Recovery Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={unlockAyurbook}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 rounded-xl transition border border-slate-200"
            >
              <Unlock className="w-4 h-4 text-slate-500" />
              <span>Simulate Unlock (Skip Cooldown for Testing)</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-28">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              AyurBook • Remedy & Safety Hub
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">AyurBook Remedies & Safety</h1>
          <p className="text-xs text-slate-500">
            Explore safe herbal remedies and check potential interaction risks against your active prescriptions.
          </p>
        </div>

        {/* Sub-Tab Segmented Control */}
        <div className="bg-slate-200/80 p-1 rounded-2xl flex items-center gap-1 border border-slate-300/50">
          <button
            onClick={() => setActiveTab('REMEDIES')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition ${
              activeTab === 'REMEDIES'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>🌿 Remedy Finder</span>
          </button>
          <button
            onClick={() => setActiveTab('SAFETY_CHECK')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition ${
              activeTab === 'SAFETY_CHECK'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>🛡️ Safety & Interaction Checker</span>
          </button>
        </div>

        {activeTab === 'SAFETY_CHECK' ? (
          /* Folded Safety & Interaction Checker UI */
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
                Safety Screening Tool
              </span>
              <h2 className="text-lg font-extrabold text-slate-900">Medicine × Remedy Interaction Checker</h2>
              <p className="text-xs text-slate-500">
                Select an Ayurvedic remedy to evaluate cross-reaction risks against your {medications.length} active prescription{medications.length === 1 ? '' : 's'}.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Herbal Remedy to Check:
                </label>
                <select
                  value={selectedRemedyForCheck}
                  onChange={(e) => setSelectedRemedyForCheck(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {AYURBOOK_REMEDIES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.sanskritName}) — {r.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Prescriptions Summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Screening Against Prescriptions:</span>
                {medications.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No active prescriptions logged yet. Safety score: Clear (No drug interactions).</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {medications.map((m) => (
                      <span key={m.id} className="text-xs font-bold text-brand-800 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-200">
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
          /* SECTION 7: Symptom Search Bar & Remedy Finder */
          <>
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-3">
          <label className="block text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-4 h-4 text-emerald-600" />
            <span>Search Remedies by Symptom</span>
          </label>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={symptomSearch}
              onChange={(e) => setSymptomSearch(e.target.value)}
              placeholder="Type a symptom e.g. Nausea, Headaches, Acidity, Insomnia, Constipation..."
              className="w-full text-xs pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            {symptomSearch && (
              <button
                onClick={() => setSymptomSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs font-bold bg-slate-200 w-5 h-5 rounded-full flex items-center justify-center"
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
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {symp}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search / Condition Safety Banner */}
        {symptomSearch.trim() ? (
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-950">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-xs">
                  Showing 2 Safe Options for "{symptomSearch}"
                </h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Screened safe alongside <strong>{activeConditionName}</strong> and your {medications.length} active prescription{medications.length === 1 ? '' : 's'}.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSymptomSearch('')}
              className="text-[10px] font-bold text-emerald-800 underline hover:text-emerald-950 shrink-0"
            >
              Clear Filter
            </button>
          </div>
        ) : (
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-emerald-950">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="font-semibold">
              Tap a quick symptom chip above or type any symptom to get 2 safe, tailored Ayurvedic remedies.
            </p>
          </div>
        )}

        {/* SECTION 7: Remedy List Grid (Shows 2 safe options for searched symptom) */}
        {displayedRemedies.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-2">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
            <h3 className="text-sm font-extrabold text-slate-900">No remedies found for "{symptomSearch}"</h3>
            <p className="text-xs text-slate-500">Try searching for Nausea, Headaches, Acidity, Insomnia, or Constipation.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {displayedRemedies.map((remedy) => (
              <div
                key={remedy.id}
                onClick={() => handleSelectRemedy(remedy)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 shadow-soft hover:shadow-card cursor-pointer transition flex flex-col justify-between group space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-extrabold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                      {remedy.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      {remedy.safetyRating} Safe
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                    {remedy.name}
                  </h3>
                  <p className="text-xs font-medium italic text-slate-500 mb-2">
                    {remedy.botanicalName} ({remedy.sanskritName})
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {remedy.summary}
                  </p>

                  {/* Recommended For Badges */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {remedy.recommendedFor.map((rec) => (
                      <span key={rec} className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        ✓ {rec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-extrabold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Select Remedy & Confirm Action &rarr;
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

