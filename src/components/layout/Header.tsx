"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
import { Activity, RotateCcw, HeartHandshake, User, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, setStep, patient, resetDemo } = useDemo();
  const { profile, user, isDemoMode } = useAuth();

  const displayName = profile?.firstName || user?.user_metadata?.first_name || (isDemoMode ? patient.name : 'User');

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand logo & name */}
        <button
          onClick={() => setStep('LANDING')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">CareConnect</span>
              <span className="bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-200">
                MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">Post-Discharge Recovery Companion</p>
          </div>
        </button>

        {/* Auth / Patient Status pill */}
        {currentStep !== 'LANDING' ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setStep('PROFILE')}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs px-3 py-1.5 rounded-full transition shadow-xs"
              title="View Profile & Settings"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium max-w-[100px] truncate">{displayName}</span>
            </button>

            <button
              onClick={resetDemo}
              className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-lg transition"
              title="Reset Demo to Landing Page"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep('LOG_IN')}
              className="text-xs font-bold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-lg transition"
            >
              Log In
            </button>
            <button
              onClick={() => setStep('SIGN_UP')}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition"
            >
              Create Account
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
