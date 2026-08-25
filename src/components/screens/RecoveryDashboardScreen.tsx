"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { Activity, Calendar, Pill, ShieldAlert, HeartPulse, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export const RecoveryDashboardScreen: React.FC = () => {
  const { patient, symptom, setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-md">
                  Step 3 • Recovery Hub
                </span>
                <span className="text-xs text-slate-400">Day 4 of 14</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back, {patient.name}</h1>
              <p className="text-xs text-slate-500">{patient.condition} • Discharged Aug 20</p>
            </div>

            {/* Circular Progress Indicator */}
            <div className="flex items-center gap-3 bg-gradient-to-br from-brand-50 to-teal-50 p-3 rounded-2xl border border-brand-200/60 shrink-0">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-14 h-14 transform -rotate-90">
                  <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-slate-200" fill="transparent" />
                  <circle cx="28" cy="28" r="22" stroke="currentColor" strokeWidth="4" className="text-brand-600" fill="transparent" strokeDasharray={138} strokeDashoffset={138 - (138 * 4) / 14} strokeLinecap="round" />
                </svg>
                <span className="absolute font-black text-xs text-brand-900">Day 4</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Recovery Phase 1</div>
                <div className="text-[11px] text-slate-500">28% Complete</div>
              </div>
            </div>
          </div>

          {/* Vitals Bar */}
          <div className="grid grid-cols-3 gap-3 pt-5 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Body Temp</span>
              <span className="text-sm font-extrabold text-slate-800">98.4°F</span>
              <span className="text-[10px] text-emerald-600 font-medium block">Normal</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Incision Site</span>
              <span className="text-sm font-extrabold text-slate-800">Clean/Dry</span>
              <span className="text-[10px] text-emerald-600 font-medium block">No Redness</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Med Adherence</span>
              <span className="text-sm font-extrabold text-slate-800">100%</span>
              <span className="text-[10px] text-emerald-600 font-medium block">On Track</span>
            </div>
          </div>
        </div>

        {/* Current Active Symptom Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  Active Logged Symptom
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{symptom.symptom}</h3>
                <p className="text-xs text-slate-600">Severity: {symptom.severity}/10 • Logged {symptom.timestamp}</p>
              </div>
            </div>
            <button
              onClick={() => setStep('SYMPTOM_CHECKIN')}
              className="text-xs text-amber-900 bg-amber-200/70 hover:bg-amber-200 px-3 py-1.5 rounded-lg font-semibold border border-amber-300 transition"
            >
              Update Log
            </button>
          </div>

          <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-amber-200">
            "{symptom.notes}"
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setStep('SAFETY_GATE')}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Run Red-Flag Safety Gate Screening</span>
            </button>

            <button
              onClick={() => setStep('AYURBOOK')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl border border-slate-300 transition"
            >
              <span>Explore AyurBook Remedies</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Quick Action Navigation Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setStep('MEDICATIONS')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 shadow-soft text-left transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Pill className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Active Medications</h4>
            <p className="text-xs text-slate-500 mt-1">2 prescriptions logged</p>
          </button>

          <button
            onClick={() => setStep('TIMELINE')}
            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-brand-300 shadow-soft text-left transition group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Recovery Timeline</h4>
            <p className="text-xs text-slate-500 mt-1">Day 1 - Day 14 history</p>
          </button>
        </div>

        {/* Next Step Banner */}
        <div className="pt-2">
          <button
            onClick={() => setStep('SYMPTOM_CHECKIN')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition"
          >
            <span>Proceed to Step 4: Daily Symptom Check-in</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
