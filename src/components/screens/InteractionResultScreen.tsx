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
  const { selectedRemedy, medications, setStep } = useDemo();

  const handleFinishFlow = () => {
    setStep('DASHBOARD');
  };

  const interactionResult = {
    remedy: selectedRemedy,
    overallStatus: 'SAFE_WITH_CAUTION',
    riskScore: 'Low-to-Moderate Caution',
    summary: `${selectedRemedy.name} (${selectedRemedy.sanskritName || selectedRemedy.botanicalName}) exhibits no severe chemical cross-reactions with your ${medications.length || 1} active prescription(s). Maintain a gap of 30-45 minutes between prescription medication intake and herbal infusions.`,
    details: medications.length > 0 ? medications.map(med => ({
      medicineId: med.id,
      medicineName: `${med.name} (${med.dosage})`,
      remedyId: selectedRemedy.id,
      remedyName: selectedRemedy.name,
      riskLevel: 'LOW_RISK',
      summary: 'No adverse metabolic interference detected in standard culinary or infusion amounts.',
      mechanism: 'Standard dietary consumption does not inhibit primary metabolic enzymes at therapeutic doses.',
      actionableAdvice: 'Compatible. Sip warm after food and maintain adequate hydration.'
    })) : [
      {
        medicineId: "med-1",
        medicineName: "Active Care Plan Prescription",
        remedyId: selectedRemedy.id,
        remedyName: selectedRemedy.name,
        riskLevel: "LOW_RISK",
        summary: "No adverse metabolic interference detected.",
        mechanism: "Standard dietary consumption does not inhibit primary metabolic enzymes.",
        actionableAdvice: "Compatible. Sip warm 30 minutes after light meals."
      }
    ],
    actionableSteps: [
      `Sip warm (not boiling hot) ${selectedRemedy.name} 30 minutes after light meals.`,
      "Do not consume concentrated botanical supplements; stick to light culinary tea infusions.",
      "Maintain a 45-minute gap between prescription intake and herbal tea for optimal absorption."
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-28">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2.5 py-1 rounded-md border border-brand-200 dark:border-brand-800">
            Safety Assessment Result
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">Medicine × Remedy Interaction Result</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Safety analysis: {selectedRemedy.name} vs Active Prescriptions
          </p>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wider text-[11px]">
              Safety Screening Notice
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
              These interaction results provide general pharmacological guidance for educational review. Always consult your attending physician before starting new herbal remedies.
            </p>
          </div>
        </div>

        {/* Overall Status Banner */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-card space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                  Overall Status Verdict
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  {interactionResult.riskScore}
                </h2>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Safe with Guidance</span>
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-600">
            {interactionResult.summary}
          </p>
        </div>

        {/* Breakdown per Medication */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Detailed Pairwise Drug Breakdown
          </h3>

          {interactionResult.details.map((detail: any, idx: number) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{detail.medicineName}</span>
                  <span className="text-slate-400">×</span>
                  <Coffee className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{detail.remedyName}</span>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                  detail.riskLevel === 'MODERATE_CAUTION'
                    ? 'bg-amber-100 dark:bg-amber-950 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300'
                    : 'bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                }`}>
                  {detail.riskLevel === 'MODERATE_CAUTION' ? 'Moderate Caution' : 'Low Risk / Safe'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Interaction Mechanism: </span>
                  <span className="text-slate-600 dark:text-slate-400">{detail.mechanism}</span>
                </div>
                <div className="bg-brand-50/60 dark:bg-brand-950/40 p-3 rounded-xl border border-brand-200/60 dark:border-brand-800/60 text-brand-950 dark:text-brand-200 font-medium">
                  <span className="font-bold text-brand-900 dark:text-brand-300">Actionable Advice: </span>
                  {detail.actionableAdvice}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Steps Checklist */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>Recommended Action Plan</span>
          </h3>

          <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {interactionResult.actionableSteps.map((step: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
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
            <span>Return to Home Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
