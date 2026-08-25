"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { RED_FLAG_CHECKLIST } from '@/data/mockData';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, PhoneCall, HeartPulse, FileCheck } from 'lucide-react';

export const SafetyGateScreen: React.FC = () => {
  const { symptom, setStep } = useDemo();
  const [checkedFlags, setCheckedFlags] = useState<string[]>([]);

  const hasRedFlag = checkedFlags.length > 0;

  const toggleFlag = (id: string) => {
    if (checkedFlags.includes(id)) {
      setCheckedFlags(checkedFlags.filter(item => item !== id));
    } else {
      setCheckedFlags([...checkedFlags, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2.5 py-1 rounded-md">
            Step 5 • Emergency Safety Screening
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Red-Flag Safety Gate</h1>
          <p className="text-xs text-slate-500">
            Triage screening before exploring traditional or home remedies.
          </p>
        </div>

        {/* Current Symptom Under Triage */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Symptom Being Evaluated
          </span>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{symptom.symptom}</h3>
              <p className="text-xs text-slate-500">Severity: {symptom.severity}/10 • Logged {symptom.timestamp}</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Non-Critical Symptom
            </span>
          </div>
        </div>

        {/* Red Flag Checklist Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-extrabold text-slate-900">Post-Operative Red-Flag Screen</h3>
          </div>

          <p className="text-xs text-slate-600">
            Select any warning signs you are currently experiencing alongside your nausea:
          </p>

          <div className="space-y-2.5">
            {RED_FLAG_CHECKLIST.map((flag) => {
              const isChecked = checkedFlags.includes(flag.id);
              return (
                <button
                  key={flag.id}
                  onClick={() => toggleFlag(flag.id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center justify-between ${
                    isChecked
                      ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && '✓'}
                    </span>
                    <span>{flag.label}</span>
                  </span>
                  {isChecked && <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Triage Output Card */}
        {!hasRedFlag ? (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                  Red-Flag Check Status: PASSED
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 mt-1">Cleared for AyurBook Explorer</h3>
              </div>
            </div>

            <p className="text-xs text-slate-700 bg-white/80 p-3.5 rounded-xl border border-emerald-200 leading-relaxed">
              <strong>Triage Assessment:</strong> No emergency surgical complications or high-risk red flags detected for "Mild Nausea" (Severity 2/10). You may safely proceed to examine evidence-backed herbal remedies.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setStep('AYURBOOK')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition"
              >
                <span>Proceed to Step 6: AyurBook Remedy Explorer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 border-2 border-rose-400 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-md shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-900 bg-rose-200 px-2 py-0.5 rounded-md">
                  URGENT CLINICAL WARNING
                </span>
                <h3 className="text-lg font-extrabold text-rose-900 mt-1">Red-Flag Symptoms Detected</h3>
              </div>
            </div>

            <p className="text-xs text-rose-800 bg-white p-3.5 rounded-xl border border-rose-300 leading-relaxed">
              <strong>Do not start home remedies.</strong> One or more checked warning symptoms indicate potential post-operative complications requiring immediate clinical review by your surgeon or hospital triage team.
            </p>

            <div className="flex gap-3">
              <a
                href="tel:108"
                className="flex-1 flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency Triage (108)</span>
              </a>
              <button
                onClick={() => setCheckedFlags([])}
                className="px-4 py-3 bg-white text-slate-700 border border-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
              >
                Clear Screen
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
