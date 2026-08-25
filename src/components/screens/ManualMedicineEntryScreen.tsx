"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { Medication } from '@/data/mockData';
import { PlusCircle, Trash2, Edit3, CheckCircle2, ShieldCheck, ArrowRight, Pill, AlertCircle, Clock } from 'lucide-react';

export const ManualMedicineEntryScreen: React.FC = () => {
  const { realUserMedicines, addUserMedicine, deleteUserMedicine, verifyAndSaveMedicines, treatedCondition, setTreatedCondition, setStep } = useDemo();

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');
  const [conditionInput, setConditionInput] = useState(treatedCondition || '');
  const [isVerified, setIsVerified] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

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
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
            Manual Prescription Entry
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Enter Your Medicines</h1>
          <p className="text-xs text-slate-500">
            Add your prescribed post-discharge medications below. Real user accounts start empty.
          </p>
        </div>

        {/* Treatment Condition Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-soft space-y-2">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
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
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
          <p className="text-[11px] text-slate-400">This helps CareConnect match safe herbal remedies for your exact condition.</p>
        </div>

        {/* Medicine Entry Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Pill className="w-5 h-5 text-brand-600" />
            <h3 className="text-sm font-extrabold text-slate-900">Add New Prescription</h3>
          </div>

          <form onSubmit={handleAddMedicine} className="space-y-4">
            
            {/* Medicine Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                Medicine Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Paracetamol, Amoxicillin"
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
              />
            </div>

            {/* Dosage / Strength & Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Strength / Dosage *
                </label>
                <input
                  type="text"
                  required
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="e.g. 650 mg, 500mg"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Frequency *
                </label>
                <input
                  type="text"
                  required
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  placeholder="e.g. Twice daily, Every 6 hours"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            {/* Duration & Instructions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 3 days, 7 days"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                  Instructions (optional)
                </label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Take after food"
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
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
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Your Prescriptions ({realUserMedicines.length})
            </h3>
            {realUserMedicines.length === 0 && (
              <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full">
                List is currently empty
              </span>
            )}
          </div>

          {realUserMedicines.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-300 space-y-2">
              <Pill className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No medicines entered yet</p>
              <p className="text-[11px] text-slate-400">Fill out the form above and tap "Add Medicine".</p>
            </div>
          ) : (
            <div className="space-y-3">
              {realUserMedicines.map((med) => (
                <div key={med.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-soft flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">{med.name}</h4>
                      <span className="text-[10px] font-bold text-brand-800 bg-brand-50 px-2 py-0.5 rounded-md">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      Frequency: {med.frequency}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Instructions: {med.instructions}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteUserMedicine(med.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
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
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 shadow-card space-y-4">
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isVerified}
                onChange={(e) => setIsVerified(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500 accent-brand-600"
              />
              <span className="text-xs font-semibold text-slate-800 leading-tight">
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
