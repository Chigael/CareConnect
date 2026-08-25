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
    'Acidity / GERD'
  ];

  const handleSaveCondition = (conditionName: string) => {
    setConditionInput(conditionName);
    setTreatedCondition(conditionName);
    setIsSavedCondition(true);
    setTimeout(() => setIsSavedCondition(false), 2000);
  };

  // Determine the ONE clear next action
  const pendingMed = medications.find(m => m.reminderStatus === 'PENDING' || m.reminderStatus === 'SKIPPED');
  
  let heroActionTitle = "";
  let heroActionDesc = "";
  let heroActionButtonText = "";
  let heroActionIcon = <CheckCircle2 className="w-5 h-5" />;
  let heroActionOnClick = () => {};

  if (missedMedications.length > 0 && pendingMed) {
    heroActionTitle = `Log Today's Dose: ${pendingMed.name}`;
    heroActionDesc = `Scheduled for ${pendingMed.reminderTime || 'Today'}. Tap below to record that you have taken your dose.`;
    heroActionButtonText = "Mark Dose as Taken Now";
    heroActionIcon = <CheckCircle2 className="w-5 h-5" />;
    heroActionOnClick = () => markDoseAsTaken(pendingMed.id);
  } else if (medications.length === 0) {
    heroActionTitle = "Add Your Prescriptions to CareConnect";
    heroActionDesc = "Log your prescribed medicines to receive daily dosage reminders and interaction screening.";
    heroActionButtonText = "+ Add First Prescription";
    heroActionIcon = <Pill className="w-5 h-5" />;
    heroActionOnClick = () => setStep('MANUAL_MEDICINE_ENTRY');
  } else if (!symptom.symptom) {
    heroActionTitle = "Log Daily Symptom Check-in";
    heroActionDesc = "Record how you are feeling today to check herbal remedy compatibility and safety.";
    heroActionButtonText = "Start Symptom Check-in";
    heroActionIcon = <HeartPulse className="w-5 h-5" />;
    heroActionOnClick = () => setStep('SYMPTOM_CHECKIN');
  } else {
    heroActionTitle = `Active Symptom Logged: ${symptom.symptom}`;
    heroActionDesc = `Severity ${symptom.severity}/10. Explore safe Ayurvedic remedies or run safety screening.`;
    heroActionButtonText = "Check Remedy Safety";
    heroActionIcon = <Sparkles className="w-5 h-5" />;
    heroActionOnClick = () => setStep('AYURBOOK');
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-28">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header Title & Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-0.5 rounded-md">
                Today's Status • {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Hello, {patient.name}</h1>
              <p className="text-xs text-slate-500">Post-discharge safety & dosage companion</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-800">Care Plan Active</span>
            </div>
          </div>

          {/* Treatment Condition Bar */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <Stethoscope className="w-3.5 h-3.5 text-brand-600" />
                <span>Primary Condition Being Treated:</span>
              </label>
              {isSavedCondition && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
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
                placeholder="e.g. Diabetes, Diarrhea, General Care..."
                className="flex-1 text-xs px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="button"
                onClick={() => handleSaveCondition(conditionInput)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
              >
                Save
              </button>
            </div>

            <div className="flex flex-wrap gap-1 pt-0.5">
              {presetConditions.map((cond) => (
                <button
                  key={cond}
                  type="button"
                  onClick={() => handleSaveCondition(cond)}
                  className={`text-[9px] font-bold px-2.5 py-0.5 rounded-md border transition ${
                    conditionInput === cond
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dosage Alerts (if missed) */}
        {missedMedications.length > 0 && (
          <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-3 text-rose-900">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">Missed Dosage Alert ({missedMedications.length})</h3>
                <p className="text-xs text-slate-600">You skipped or missed a scheduled prescription dose today.</p>
              </div>
            </div>

            {missedMedications.map((med) => (
              <div key={med.id} className="bg-white p-3 rounded-2xl border border-rose-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{med.name} ({med.dosage})</h4>
                  <p className="text-[10px] text-slate-500">{med.instructions}</p>
                </div>
                <button
                  onClick={() => markDoseAsTaken(med.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shrink-0"
                >
                  ✓ Take Dose
                </button>
              </div>
            ))}
          </div>
        )}

        {/* HERO CARD: ONE CLEAR NEXT ACTION */}
        <div className="bg-gradient-to-r from-brand-600 via-teal-600 to-emerald-600 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
              🎯 One Clear Next Action
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">{heroActionTitle}</h2>
            <p className="text-xs text-brand-100 mt-1 leading-relaxed">{heroActionDesc}</p>
          </div>

          <button
            onClick={heroActionOnClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white text-slate-900 hover:bg-brand-50 font-extrabold text-xs py-4 px-6 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
          >
            {heroActionIcon}
            <span>{heroActionButtonText}</span>
            <ArrowRight className="w-4 h-4 text-brand-600" />
          </button>
        </div>

        {/* Active Prescriptions Card */}
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
              Manage Prescriptions &rarr;
            </button>
          </div>

          {medications.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-5 text-center border border-dashed border-slate-200 space-y-2">
              <p className="text-xs font-bold text-slate-700">No active prescriptions added yet</p>
              <p className="text-[11px] text-slate-500">Tap below to add your prescribed medicines manually or by scanning a discharge summary.</p>
              <button
                onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
                className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition mt-1"
              >
                <Pill className="w-3.5 h-3.5" />
                <span>+ Add Prescription</span>
              </button>
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
                      <p className="text-[11px] text-slate-500">{med.dosage} • {med.frequency}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${
                    med.reminderStatus === 'TAKEN' 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : med.reminderStatus === 'SKIPPED'
                      ? 'bg-rose-100 text-rose-800 border-rose-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {med.reminderStatus || 'PENDING'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

