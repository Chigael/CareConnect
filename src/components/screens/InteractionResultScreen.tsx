"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Pill, 
  Coffee, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Sparkles,
  FileCheck2,
  Clock
} from 'lucide-react';

export const InteractionResultScreen: React.FC = () => {
  const { interactionResult, selectedRemedy, medications, setStep, addTimelineEvent } = useDemo();

  const handleFinishFlow = () => {
    addTimelineEvent({
      day: 4,
      date: "Aug 24, 2026",
      title: "Checked Ginger Tea Compatibility",
      description: "Interaction check against Demo Medicine A & B completed (Safe with food). Logged into recovery record.",
      category: "REMEDY",
      status: "COMPLETED",
      badgeColor: "emerald"
    });
    setStep('TIMELINE');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
            Step 8 • Matrix Assessment Result
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Medicine × Remedy Interaction Result</h1>
          <p className="text-xs text-slate-500">
            Safety analysis: {selectedRemedy.name} vs 2 Active Prescriptions
          </p>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="bg-amber-500/10 border-2 border-amber-300 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-amber-950 uppercase tracking-wider text-[11px]">
              Prototype Demo Notice • Mock Data Only
            </h4>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              These interaction results are simulated mock data created for demonstration purposes. CareConnect does not make clinical claims or replace professional pharmacological review.
            </p>
          </div>
        </div>

        {/* Overall Status Banner */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Overall Status Verdict
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {interactionResult.riskScore}
                </h2>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe with Guidance</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {interactionResult.summary}
          </p>
        </div>

        {/* Breakdown per Medication */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Detailed Pairwise Drug Breakdown
          </h3>

          {interactionResult.details.map((detail, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-brand-600" />
                  <span className="font-bold text-xs text-slate-900">{detail.medicineName}</span>
                  <span className="text-slate-400">×</span>
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span className="font-bold text-xs text-slate-900">{detail.remedyName}</span>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  detail.riskLevel === 'MODERATE_CAUTION'
                    ? 'bg-amber-100 border-amber-300 text-amber-900'
                    : 'bg-emerald-100 border-emerald-300 text-emerald-800'
                }`}>
                  {detail.riskLevel === 'MODERATE_CAUTION' ? 'Moderate Caution' : 'Low Risk / Safe'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-700">Interaction Mechanism: </span>
                  <span className="text-slate-600">{detail.mechanism}</span>
                </div>
                <div className="bg-brand-50/60 p-3 rounded-xl border border-brand-200/60 text-brand-950 font-medium">
                  <span className="font-bold text-brand-900">Actionable Advice: </span>
                  {detail.actionableAdvice}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Steps Checklist */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>Recommended Patient Action Plan</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {interactionResult.actionableSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Final Button */}
        <div>
          <button
            onClick={handleFinishFlow}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition"
          >
            <span>Log Check & View Step 9: Recovery Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
