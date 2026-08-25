"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { User, Calendar, Pill, ShieldAlert, ArrowRight, Activity, CheckCircle, FileText } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { patient, medications, nextStep, setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Title */}
        <div className="bg-gradient-to-r from-brand-700 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-brand-500/30 text-brand-200 text-xs font-semibold px-3 py-1 rounded-full border border-brand-400/30 inline-block mb-3">
              Step 1 • Patient Profile Loaded
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Post-Discharge Recovery Profile
            </h1>
            <p className="text-brand-100 text-xs sm:text-sm mt-1 max-w-xl">
              Fictional Patient Profile loaded for hackathon interactive safety demonstration.
            </p>
          </div>
        </div>

        {/* Patient Identity Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
          <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-500 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full">
                  Day {patient.recoveryDay} / {patient.totalRecoveryDays}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {patient.age} years old • {patient.gender} • Discharged {patient.dischargeDate}
              </p>
              <div className="flex items-center gap-1 text-xs text-brand-700 font-medium mt-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{patient.condition}</span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Attending Physician
              </span>
              <p className="text-xs font-bold text-slate-800">{patient.doctorName}</p>
              <p className="text-[11px] text-slate-500">{patient.hospitalName}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Recovery Timeline
              </span>
              <p className="text-xs font-bold text-slate-800">Day 4 of 14 (Sub-acute post-op phase)</p>
              <p className="text-[11px] text-slate-500">Incision healing & dietary transition</p>
            </div>
          </div>
        </div>

        {/* Active Prescriptions Preview */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Pill className="w-5 h-5 text-brand-600" />
              <span>Discharge Prescriptions (2 Active)</span>
            </h3>
            <span className="text-xs text-brand-600 font-semibold cursor-pointer hover:underline" onClick={() => setStep('MEDICATIONS')}>
              View Full Details &rarr;
            </span>
          </div>

          <div className="space-y-3">
            {medications.map((med) => (
              <div key={med.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                    {med.name.slice(-1)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{med.name}</h4>
                    <p className="text-[11px] text-slate-500">{med.genericName} • {med.dosage}</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md border border-teal-200 shrink-0">
                  {med.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={() => setStep('MEDICATIONS')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition"
          >
            <span>Proceed to Active Medication List</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
