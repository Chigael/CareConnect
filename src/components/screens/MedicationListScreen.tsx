"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { Pill, Clock, ArrowRight, ShieldCheck, Info, Camera, PlusCircle, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const MedicationListScreen: React.FC = () => {
  const { 
    medications, 
    updateMedicationReminderTime, 
    setActiveReminderMedication, 
    markDoseAsTaken,
    simulateMissedDose,
    setStep 
  } = useDemo();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-28">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2.5 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                Active Prescriptions & Reminders
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{t.medicines.title}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {medications.length} active medication{medications.length === 1 ? '' : 's'} logged • Set custom dosage alarm times
            </p>
          </div>

          <button
            onClick={() => setStep('DASHBOARD')}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm shrink-0 transition"
          >
            <span>{t.nav.home}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Empty State for Real User with Zero Medicines */}
        {medications.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 text-center space-y-4 shadow-soft">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{t.home.noMedicines}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                Your medication list is currently empty. Add your active prescriptions to enable dosage reminders and safety checks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2 max-w-md mx-auto">
              <button
                onClick={() => setStep('PRESCRIPTION_UPLOAD')}
                className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition"
              >
                <Camera className="w-4 h-4" />
                <span>{t.medicines.scanPrescription}</span>
              </button>

              <button
                onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
                className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t.medicines.addMedicine}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Medication Cards */
          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-600 text-white flex items-center justify-center font-black text-base shadow-sm shrink-0">
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{med.name}</h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{med.genericName}</p>
                    </div>
                  </div>

                  {/* Reminder Adherence Status Badge */}
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {med.status}
                    </span>
                    {med.reminderStatus && (
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md ${
                        med.reminderStatus === 'TAKEN' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' :
                        med.reminderStatus === 'SKIPPED' ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300' :
                        'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      }`}>
                        Dose Today: {med.reminderStatus}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase block">Category & Purpose</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{med.category}</span>
                    <span className="text-slate-600 dark:text-slate-400">{med.purpose}</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                    <span className="text-slate-400 text-[11px] font-semibold uppercase block">{t.medicines.doseSchedule} & {t.medicines.frequency}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block mt-0.5">{med.dosage}</span>
                    <span className="text-slate-600 dark:text-slate-400">{med.frequency}</span>
                  </div>
                </div>

                {/* Missed-Dose Warning Card */}
                {med.reminderStatus === 'SKIPPED' && (
                  <div className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs animate-in fade-in">
                    <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200">
                      <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <div>
                        <h4 className="font-extrabold text-xs text-rose-950 dark:text-rose-100">⚠️ Missed Today's Dose</h4>
                        <p className="text-[11px] text-rose-800 dark:text-rose-300">You indicated 'No (not taking)' or missed this dosage.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => markDoseAsTaken(med.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] py-1.5 px-3 rounded-lg shadow-xs transition shrink-0"
                    >
                      ✓ {t.home.takeDose}
                    </button>
                  </div>
                )}

                {/* Reminder Time Customization Card */}
                <div className="bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                      <span className="text-xs font-bold text-brand-950 dark:text-brand-200">{t.medicines.reminderTime}:</span>
                    </div>

                    <select
                      value={med.reminderTime || '08:00 AM'}
                      onChange={(e) => updateMedicationReminderTime(med.id, e.target.value)}
                      className="text-xs font-bold text-brand-900 dark:text-brand-100 bg-white dark:bg-slate-800 border border-brand-300 dark:border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="08:00 AM">Morning — 08:00 AM</option>
                      <option value="02:00 PM">Afternoon — 02:00 PM</option>
                      <option value="08:00 PM">Evening — 08:00 PM</option>
                      <option value="10:00 PM">Night — 10:00 PM</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      CareConnect will play a chime alarm & show Yes/No/Snooze options at <strong>{med.reminderTime || '08:00 AM'}</strong>.
                    </p>

                    <div className="flex items-center gap-2">
                      {med.reminderStatus !== 'SKIPPED' && (
                        <button
                          type="button"
                          onClick={() => simulateMissedDose(med.id)}
                          className="bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 text-rose-800 dark:text-rose-300 font-bold text-[10px] py-1.5 px-2.5 rounded-lg border border-rose-200 dark:border-rose-800 transition"
                        >
                          Simulate Missed Dose
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setActiveReminderMedication(med)}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-[11px] py-1.5 px-3 rounded-lg shadow-xs transition shrink-0"
                      >
                        <span>🔔 Test Reminder Alarm</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                  <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{t.medicines.instructions}:</p>
                    <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">{med.instructions}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5 text-brand-700 dark:text-brand-300 font-medium">
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

