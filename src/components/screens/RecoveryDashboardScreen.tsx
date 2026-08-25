"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { 
  Activity, 
  Pill, 
  ShieldAlert, 
  HeartPulse, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  Camera, 
  FileUp, 
  Edit3, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export const RecoveryDashboardScreen: React.FC = () => {
  const { 
    patient, 
    symptom, 
    medications, 
    missedMedications,
    markDoseAsTaken,
    treatedCondition, 
    setTreatedCondition, 
    setStep 
  } = useDemo();

  const [conditionInput, setConditionInput] = useState(treatedCondition || patient.condition || '');
  const [isSavedCondition, setIsSavedCondition] = useState(false);

  const presetConditions = [
    'Diabetes',
    'Diarrhea',
    'Post-Op Recovery',
    'Hypertension',
    'Asthma',
    'Acidity / GERD'
  ];

  const handleSaveCondition = (conditionName: string) => {
    setConditionInput(conditionName);
    setTreatedCondition(conditionName);
    setIsSavedCondition(true);
    setTimeout(() => setIsSavedCondition(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Dashboard Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-md">
                  CareConnect Hub
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Welcome Back, {patient.name}</h1>
              <p className="text-xs text-slate-500">Manage prescriptions, track condition, and explore safe remedies</p>
            </div>
          </div>

          {/* SECTION 4: Condition Input Field ("What are you currently being treated for?") */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-brand-600" />
                <span>What are you currently being treated for? *</span>
              </label>
              {isSavedCondition && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md animate-in fade-in">
                  ✓ Saved
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={conditionInput}
                onChange={(e) => setConditionInput(e.target.value)}
                onBlur={() => handleSaveCondition(conditionInput)}
                placeholder="e.g. Diabetes, Diarrhea, Post-Op Recovery..."
                className="flex-1 text-xs p-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
              <button
                type="button"
                onClick={() => handleSaveCondition(conditionInput)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-3 rounded-xl transition shadow-xs"
              >
                Save
              </button>
            </div>

            {/* Quick condition preset chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Quick Select:</span>
              {presetConditions.map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => handleSaveCondition(cond)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                    conditionInput === cond
                      ? 'bg-brand-600 text-white border-brand-600 font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 6: Missed-Dosage Warning Banner */}
        {missedMedications.length > 0 && (
          <div className="bg-gradient-to-r from-rose-500/10 via-rose-50 to-orange-50 border-2 border-rose-300 rounded-3xl p-5 shadow-card space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-rose-500/30">
                  <AlertTriangle className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-0.5 rounded-md border border-rose-300">
                    ⚠️ Missed Dosage Alert ({missedMedications.length})
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    Missed Today's Prescription Tablet
                  </h3>
                  <p className="text-xs text-slate-600">
                    You indicated you missed or skipped your scheduled dose.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep('MEDICATIONS')}
                className="text-xs text-rose-950 bg-rose-200/70 hover:bg-rose-200 px-3 py-1.5 rounded-xl font-bold border border-rose-300 transition shrink-0"
              >
                Review Schedule &rarr;
              </button>
            </div>

            <div className="space-y-2">
              {missedMedications.map((med) => (
                <div key={med.id} className="bg-white/90 p-3.5 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span>{med.name}</span>
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                        {med.dosage}
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Scheduled time: {med.reminderTime || '08:00 AM'} • Instructions: {med.instructions}
                    </p>
                  </div>

                  <button
                    onClick={() => markDoseAsTaken(med.id)}
                    className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-xs transition shrink-0"
                  >
                    <span>✓ Mark as Taken Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Three Prescription Entry Options Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-brand-600" />
              <h3 className="font-extrabold text-slate-900 text-base">Add or Update Prescriptions</h3>
            </div>
            <span className="text-[10px] font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
              3 Entry Methods
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Choose your preferred method to log your current prescribed medications into CareConnect:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Method 1: Scan Prescription */}
            <button
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 hover:bg-teal-100/70 text-left transition group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-teal-950 text-xs">📷 Scan Prescription</h4>
                <p className="text-[10px] text-teal-800 mt-0.5">Use device camera to snap & extract</p>
              </div>
            </button>

            {/* Method 2: Upload Prescription Document */}
            <button
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 hover:bg-indigo-100/70 text-left transition group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <FileUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-indigo-950 text-xs">📄 Upload Document</h4>
                <p className="text-[10px] text-indigo-800 mt-0.5">Upload JPG, PNG, or PDF file</p>
              </div>
            </button>

            {/* Method 3: Enter Medicines Manually */}
            <button
              onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
              className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 hover:bg-brand-100/70 text-left transition group space-y-2"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-100 text-brand-800 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-brand-950 text-xs">✍️ Manual Entry</h4>
                <p className="text-[10px] text-brand-800 mt-0.5">Type custom medicine names & dosages</p>
              </div>
            </button>

          </div>
        </div>

        {/* Active Logged Prescriptions List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Pill className="w-4 h-4 text-teal-600" />
              <span>Active Prescriptions ({medications.length})</span>
            </h3>
            <button
              onClick={() => setStep('MEDICATIONS')}
              className="text-xs font-bold text-brand-600 hover:text-brand-700 underline"
            >
              Manage List &rarr;
            </button>
          </div>

          {medications.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-5 text-center border border-dashed border-slate-200 space-y-1.5">
              <p className="text-xs font-semibold text-slate-600">No active prescriptions logged yet</p>
              <p className="text-[11px] text-slate-400">Use one of the 3 entry options above to log your medicines.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {medications.map((med) => (
                <div key={med.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {med.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{med.name}</h4>
                      <p className="text-[11px] text-slate-500">{med.genericName || med.dosage} • {med.frequency}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md border border-teal-200 shrink-0">
                    {med.dosage}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Current Active Symptom Banner */}
        {symptom.symptom ? (
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

            {symptom.notes && (
              <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-amber-200">
                "{symptom.notes}"
              </p>
            )}

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
        ) : (
          <div className="bg-gradient-to-r from-teal-500/10 via-brand-50 to-teal-50 border-2 border-brand-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-800 bg-brand-100 px-2 py-0.5 rounded-md">
                    Symptom Status
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">No Active Symptom Logged</h3>
                  <p className="text-xs text-slate-600">Tell us what you're experiencing to check safety & remedies</p>
                </div>
              </div>
              <button
                onClick={() => setStep('SYMPTOM_CHECKIN')}
                className="text-xs text-white bg-brand-600 hover:bg-brand-700 px-3.5 py-2 rounded-xl font-bold transition shadow-sm shrink-0"
              >
                + Log Symptom
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setStep('SYMPTOM_CHECKIN')}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Start Symptom Check-in</span>
              </button>

              <button
                onClick={() => setStep('AYURBOOK')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs py-3 px-4 rounded-xl border border-slate-300 transition"
              >
                <span>Browse AyurBook</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

