"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { 
  Coffee, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Pill, 
  ChevronLeft,
  Flame,
  Clock
} from 'lucide-react';

export const RemedyDetailScreen: React.FC = () => {
  const { selectedRemedy, medications, setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Link */}
        <button
          onClick={() => setStep('AYURBOOK')}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to AyurBook Explorer</span>
        </button>

        {/* Header Hero Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <Coffee className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2 py-0.5 rounded-md">
                  Step 7 • Selected Herbal Profile
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">{selectedRemedy.name}</h1>
                <p className="text-xs font-medium italic text-slate-500">
                  {selectedRemedy.botanicalName} ({selectedRemedy.sanskritName})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{selectedRemedy.safetyRating} Profile</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {selectedRemedy.summary}
          </p>

          {/* Recommended For Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Target Symptoms:</span>
            {selectedRemedy.recommendedFor.map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-brand-50 text-brand-800 px-2.5 py-1 rounded-lg border border-brand-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Traditional Uses & Active Compounds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Traditional Uses */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Traditional Therapeutic Actions</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedRemedy.traditionalUses.map((use, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Active Bioactive Compounds */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600" />
              <span>Bioactive Constituents</span>
            </h3>
            <p className="text-xs text-slate-500">Key phytochemical compounds responsible for efficacy:</p>
            <div className="flex flex-wrap gap-2">
              {selectedRemedy.activeCompounds.map((compound) => (
                <span key={compound} className="text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-xl">
                  {compound}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Traditional Preparation Method */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Recommended Preparation & Dosage</span>
          </h3>
          <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed font-medium">
            "{selectedRemedy.preparation}"
          </p>
        </div>

        {/* Interaction Check Prompt Card */}
        <div className="bg-gradient-to-r from-brand-700 via-teal-700 to-emerald-700 text-white rounded-3xl p-6 shadow-card space-y-4">
          <div>
            <span className="bg-white/20 text-brand-100 text-xs font-bold px-2.5 py-0.5 rounded-md inline-block mb-2">
              Safety Gate Validation Ready
            </span>
            <h3 className="text-lg font-extrabold">Check {selectedRemedy.name} against Ananya's Medications</h3>
            <p className="text-xs text-brand-100 mt-1">
              Cross-evaluating {selectedRemedy.name} with Demo Medicine A (Amoxicillin 500mg) & Demo Medicine B (Paracetamol 500mg).
            </p>
          </div>

          <button
            onClick={() => setStep('INTERACTION_RESULT')}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-brand-50 text-brand-900 font-extrabold text-sm py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            <Pill className="w-5 h-5 text-brand-700" />
            <span>Run Medicine × Remedy Interaction Check</span>
            <ArrowRight className="w-4 h-4 text-brand-700" />
          </button>
        </div>

      </div>
    </div>
  );
};
