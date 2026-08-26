"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
import { Camera, FileUp, PlusCircle, ArrowRight, ShieldCheck, Pill, Sparkles } from 'lucide-react';

export const PostSignUpSetupScreen: React.FC = () => {
  const { setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Account Ready
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Choose Your CareConnect Setup Path
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Select how you would like to set up your recovery care companion.
          </p>
        </div>

        {/* 3 Setup Options Grid */}
        <div className="space-y-4">
          
          {/* Option 1: Take Photo */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-extrabold text-xs">
                  1
                </span>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  📷 Take a Photo of Prescription
                </h3>
              </div>
              <span className="text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-200 dark:border-teal-800">
                Camera
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Use your phone or tablet camera to snap a photo of your discharge summary.
            </p>

            <button
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="w-full flex items-center justify-center gap-2 bg-teal-50 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-900 dark:text-teal-200 font-bold text-xs py-3 px-4 rounded-xl border border-teal-200 dark:border-teal-800 transition"
            >
              <Camera className="w-4 h-4 text-teal-700 dark:text-teal-400" />
              <span>Take a Photo with Camera</span>
            </button>
          </div>

          {/* Option 2: Upload Prescription */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 flex items-center justify-center font-extrabold text-xs">
                  2
                </span>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  📁 Upload Prescription File
                </h3>
              </div>
              <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                JPG / PNG / PDF
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Select an existing prescription image or PDF document from your device files.
            </p>

            <button
              onClick={() => setStep('PRESCRIPTION_UPLOAD')}
              className="w-full flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 font-bold text-xs py-3 px-4 rounded-xl border border-indigo-200 dark:border-indigo-800 transition"
            >
              <FileUp className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
              <span>Upload Document from Device</span>
            </button>
          </div>

          {/* Option 3: Enter Medicines Manually */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-800 dark:text-brand-300 flex items-center justify-center font-extrabold text-xs">
                  3
                </span>
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  💊 Enter Medicines Manually
                </h3>
              </div>
              <span className="text-[10px] font-bold text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-md border border-brand-200 dark:border-brand-800">
                Custom List
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Manually type your prescribed medicine names, dosage strengths, and schedules.
            </p>

            <button
              onClick={() => setStep('MANUAL_MEDICINE_ENTRY')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-md transition"
            >
              <Pill className="w-4 h-4" />
              <span>Enter Medicines Manually</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
