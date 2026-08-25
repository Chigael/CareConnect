"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { Activity, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const SymptomCheckinScreen: React.FC = () => {
  const { symptom, updateSymptom, setStep } = useDemo();
  
  const [selectedSymptomName, setSelectedSymptomName] = useState(symptom.symptom);
  const [severity, setSeverity] = useState(symptom.severity);
  const [notes, setNotes] = useState(symptom.notes);

  const commonSymptoms = [
    "Mild nausea",
    "Stomach uneasiness",
    "Mild surgical site soreness",
    "Loss of appetite",
    "Mild fatigue",
    "Gas / Bloating"
  ];

  const handleSaveAndProceed = () => {
    updateSymptom(selectedSymptomName, severity, notes);
    setStep('SAFETY_GATE');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
            Step 4 • Daily Check-in
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Log Daily Recovery Symptom</h1>
          <p className="text-xs text-slate-500">Record how you feel today (Day 4 of Post-Op Recovery)</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-6">
          
          {/* Preset Symptoms Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              1. Select Primary Symptom
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {commonSymptoms.map((symp) => {
                const isSelected = symp === selectedSymptomName;
                return (
                  <button
                    key={symp}
                    type="button"
                    onClick={() => setSelectedSymptomName(symp)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 text-brand-900 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{symp}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Severity Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Symptom Intensity Level
              </label>
              <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                severity <= 3 ? 'bg-emerald-100 border-emerald-300 text-emerald-800' :
                severity <= 6 ? 'bg-amber-100 border-amber-300 text-amber-900' :
                'bg-rose-100 border-rose-300 text-rose-800'
              }`}>
                {severity} / 10 • {severity <= 3 ? 'Mild' : severity <= 6 ? 'Moderate' : 'Severe'}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1.5 px-0.5">
              <span>1 - Barely Noticeable</span>
              <span>5 - Moderate</span>
              <span>10 - Unbearable</span>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              3. Context & Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe when the symptom started, trigger events, or relation to medication timing..."
              className="w-full text-xs p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition"
            />
          </div>

          {/* Guidance box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Submitting your symptom passes it directly through our <strong>Red-Flag Safety Gate</strong> to ensure it does not require urgent clinical triage before you explore natural remedies.
            </p>
          </div>

        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={handleSaveAndProceed}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-amber-500/20 transition"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Pass to Step 5: Red-Flag Safety Gate Screening</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
