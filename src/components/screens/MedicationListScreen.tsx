"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { Pill, Clock, ArrowRight, ShieldCheck, Info, Camera, PlusCircle, AlertCircle } from 'lucide-react';

export const MedicationListScreen: React.FC = () => {
  const { medications, isDemoMode, setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-md">
                Step 2 • Active Prescriptions
              </span>
              {isDemoMode ? (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                  DEMO MODE — Fictional patient
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                  Authenticated Real User
                </span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Current Hospital Discharge Medications</h1>
            <p className="text-xs text-slate-500">
              {medications.length} active medication{medications.length === 1 ? '' : 's'} logged
            </p>
          </div>

          <button
            onClick={() => setStep('DASHBOARD')}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm shrink-0 transition"
          >
            <span>Recovery Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Empty State for Real User with Zero Medicines */}
        {medications.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">No medicines added yet.</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Your medication list is currently empty. Add your active prescriptions to enable medicine-remedy interaction screening.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                onClick={() => setStep('PRESCRIPTION_UPLOAD')}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Prescription</span>
              </button>

              <button
                onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
                className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Enter Medicines Manually</span>
              </button>
            </div>
          </div>
        ) : (
          /* Medication Cards */
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{med.name}</h3>
                      <p className="text-xs font-medium text-slate-500">{med.genericName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {med.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase block">Category & Purpose</span>
                    <span className="font-bold text-slate-800 block mt-0.5">{med.category}</span>
                    <span className="text-slate-600">{med.purpose}</span>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase block">Dosage & Frequency</span>
                    <span className="font-bold text-slate-800 block mt-0.5">{med.dosage}</span>
                    <span className="text-slate-600">{med.frequency}</span>
                  </div>
                </div>

                <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">Instructions:</p>
                    <p className="text-slate-700 text-[11px] leading-relaxed">{med.instructions}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <div className="flex items-center gap-1.5 text-brand-700 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>Next dose: <strong>{med.nextDose}</strong></span>
                  </div>
                  <span>{med.pillsRemaining} doses remaining</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action button */}
        <div>
          <button
            onClick={() => setStep('DASHBOARD')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition"
          >
            <span>Go to Recovery Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
