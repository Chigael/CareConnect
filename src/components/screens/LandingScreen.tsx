"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  ArrowRight, 
  FileCheck2, 
  AlertCircle,
  LogIn,
  UserPlus,
  Play
} from 'lucide-react';

export const LandingScreen: React.FC = () => {
  const { setStep } = useDemo();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 text-slate-900 dark:text-slate-100 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Brand Header */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="/CareConnect Logo.png"
              alt="CareConnect Logo"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-md dark:hidden"
            />
            <img
              src="/CareConnect Logo Dark.png"
              alt="CareConnect Logo"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-md hidden dark:block"
            />
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium -mt-1">
              {t.nav.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 bg-brand-100/80 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-800 dark:text-brand-300 text-xs font-bold px-4 py-1.5 rounded-full shadow-xs uppercase tracking-wider mt-1">
              <Sparkles className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <span>WELCOME TO CARECONNECT</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-3xl mx-auto">
            Recover with confidence. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-teal-600 to-emerald-600">
              Check safety before you try.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your personal post-discharge safety companion bridging prescription medications with traditional & herbal remedies.
          </p>

          {/* TWO OPTIONS: Create Account & Log In */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-4">
            
            {/* Option 1: Create Account */}
            <button
              onClick={() => setStep('SIGN_UP')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-extrabold text-sm py-4 px-6 rounded-2xl shadow-lg shadow-brand-500/20 transition transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-5 h-5" />
              <span>{t.nav.signup}</span>
            </button>

            {/* Option 2: Log In */}
            <button
              onClick={() => setStep('LOG_IN')}
              className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-sm py-4 px-6 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-sm transition"
            >
              <LogIn className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              <span>{t.nav.login}</span>
            </button>

          </div>

        </div>
      </section>

      {/* Safety Gate Flow Graphic */}
      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">CareConnect Recovery Features</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Prescription Manager • Daily Dosage Alerts • AyurBook Remedies • Timeline Log</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { title: "1. Home Hub", desc: "Daily dosage alerts & next actions", color: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200" },
              { title: "2. Medicines", desc: "Prescription schedule & upload", color: "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200" },
              { title: "3. AyurBook", desc: "Herbal remedies & interaction check", color: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200" },
              { title: "4. Timeline", desc: "Recovery history & dosage logs", color: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200" },
            ].map((step, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border text-xs font-medium ${step.color} shadow-xs space-y-1`}>
                <div className="font-extrabold text-sm">{step.title}</div>
                <div className="text-[11px] opacity-80">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Medical Disclaimer */}
      <section className="px-4 py-6">
        <div className="max-w-3xl mx-auto bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Medical Safety Disclaimer</span>
          </div>
          <p>
            CareConnect is a post-discharge recovery companion. This application does NOT diagnose conditions, replace prescriptions, or instruct users to discontinue prescribed medications. Always consult your physician before starting any new herbal remedy.
          </p>
        </div>
      </section>
    </div>
  );
};

