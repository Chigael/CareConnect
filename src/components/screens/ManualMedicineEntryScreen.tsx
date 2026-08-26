"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { Medication } from '@/data/mockData';
import { PlusCircle, Trash2, Edit3, CheckCircle2, ShieldCheck, ArrowRight, Pill, AlertCircle, Clock, Camera, FileUp } from 'lucide-react';

export const ManualMedicineEntryScreen: React.FC = () => {
  const { realUserMedicines, addUserMedicine, deleteUserMedicine, verifyAndSaveMedicines, treatedCondition, setTreatedCondition, setStep } = useDemo();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');
  const [conditionInput, setConditionInput] = useState(treatedCondition || '');
  const [isVerified, setIsVerified] = useState(false);

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dosage.trim() || !frequency.trim()) {
      return;
    }

    if (conditionInput.trim()) {
      setTreatedCondition(conditionInput.trim());
    }

    addUserMedicine({
      name,
      genericName: `${name} (${dosage})`,
      category: 'Prescription Medication',
      dosage: `${dosage} - ${duration ? `${duration} duration` : 'As prescribed'}`,
      frequency,
      purpose: conditionInput ? `Treatment for ${conditionInput}` : 'Post-discharge care',
      instructions: instructions || 'Take as directed by your physician.',
      status: 'Active',
      color: 'brand',
      nextDose: 'Scheduled today',
      pillsRemaining: 10
    });

    // Reset form fields
    setName('');
    setDosage('');
    setFrequency('');
    setDuration('');
    setInstructions('');
  };

  const handleConfirmVerified = () => {
    if (realUserMedicines.length === 0 || !isVerified) return;
    if (conditionInput.trim()) {
      setTreatedCondition(conditionInput.trim());
    }
    verifyAndSaveMedicines();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2.5 py-1 rounded-md border border-brand-200 dark:border-brand-800">
            Manual Prescription Entry
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">Enter Your Medicines</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add your prescribed post-discharge medications below. Real user accounts start empty.
          </p>
        </div>

        {/* Prescription Entry Method Options Selector */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            How would you like to add your prescription?
          </label>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition text-center"
            >
              <Camera className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-[11px] font-extrabold leading-tight">Scan Prescription</span>
              <span className="text-[9px] font-normal text-teal-700 dark:text-teal-400">Camera</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs flex flex-col items-center justify-center gap-1.5 transition text-center"
            >
              <FileUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-[11px] font-extrabold leading-tight">Upload Document</span>
              <span className="text-[9px] font-normal text-indigo-700 dark:text-indigo-400">PDF / Image</span>
            </button>

            <button
              type="button"
              className="p-3 rounded-2xl bg-brand-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-sm transition text-center"
            >
              <Pill className="w-5 h-5 text-white" />
              <span className="text-[11px] font-extrabold leading-tight">Enter Manually</span>
              <span className="text-[9px] font-normal text-brand-100">Manual Form</span>
            </button>
          </div>
        </div>

        {/* Treatment Condition Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-soft space-y-2">
          <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            What are you currently being treated for? *
          </label>
          <input
            type="text"
            value={conditionInput}
            onChange={(e) => {
              setConditionInput(e.target.value);
              setTreatedCondition(e.target.value);
            }}
            placeholder="e.g. Diabetes, Diarrhea, Post-Op Recovery..."
            className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
          />
          <p className="text-[11px] text-slate-400 dark:text-slate-400">This helps CareConnect match safe herbal remedies for your exact condition.</p>
        </div>

        {/* Medicine Entry Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Pill className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Add New Prescription</h3>
          </div>

          <form onSubmit={handleAddMedicine} className="space-y-4">
            
            {/* Medicine Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                Medicine Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Paracetamol, Amoxicillin"
                className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Dosage / Strength & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Strength / Dosage *
                </label>
                <input
                  type="text"
                  required
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 650 mg, 500mg"
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Frequency *
                </label>
                <input
                  type="text"
                  required
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. Twice daily, Every 6 hours"
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Duration & Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 days, 7 days"
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-1">
                  Instructions (optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Take after food"
                  className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Add Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Medicine to List</span>
            </button>
          </form>
        </div>

        {/* Added Medicines List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
              Your Prescriptions ({realUserMedicines.length})
            </h3>
            {realUserMedicines.length === 0 && (
              <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                List is currently empty
              </span>
            )}
          </div>

          {realUserMedicines.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-dashed border-slate-300 dark:border-slate-700 space-y-2">
              <Pill className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">No medicines entered yet</p>
              <p className="text-[11px] text-slate-400">Fill out the form above or use Scan/Upload to add medicines.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {realUserMedicines.map((med) => (
                <div key={med.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-soft flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{med.name}</h4>
                      <span className="text-[10px] font-bold text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      Frequency: {med.frequency}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Instructions: {med.instructions}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteUserMedicine(med.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/60 transition"
                    title="Delete Medicine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verification Checkbox & Action Button */}
        {realUserMedicines.length > 0 && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 dark:from-emerald-950/40 dark:to-teal-950/40 border-2 border-emerald-300 dark:border-emerald-700 rounded-3xl p-5 shadow-card space-y-4">
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600"
              />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                Please verify that these medicines match your doctor's official discharge prescription.
              </span>
            </label>

            <button
              onClick={handleConfirmVerified}
              disabled={!isVerified}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition disabled:opacity-40"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>✓ Medicines Verified — Save & Continue</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

