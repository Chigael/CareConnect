"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
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
  const { enableDemoMode } = useAuth();

  const handleTryDemo = () => {
    enableDemoMode();
    setStep('ONBOARDING');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-brand-50/20 to-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Brand Header */}
          <div className="inline-flex items-center gap-2 bg-brand-100/80 border border-brand-200 text-brand-800 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <span>CARECONNECT</span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto mb-4">
            Recover with confidence. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 via-teal-600 to-emerald-600">
              Check before you try.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            A post-discharge safety companion bridging prescription medications with traditional & herbal remedies.
          </p>

          {/* Three Required Hero Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto mb-12">
            
            {/* [ Log In ] */}
            <button
              onClick={() => setStep('LOG_IN')}
              className="w-full sm:w-1/3 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm py-3.5 px-5 rounded-2xl border border-slate-300 shadow-sm transition"
            >
              <LogIn className="w-4 h-4 text-brand-600" />
              <span>Log In</span>
            </button>

            {/* [ Create Account ] */}
            <button
              onClick={() => setStep('SIGN_UP')}
              className="w-full sm:w-1/3 flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-lg shadow-brand-500/20 transition transform hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>

            {/* [ Try Demo ] */}
            <button
              onClick={handleTryDemo}
              className="w-full sm:w-1/3 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-3.5 px-5 rounded-2xl shadow-md transition"
            >
              <Play className="w-4 h-4" />
              <span>Try Demo</span>
            </button>

          </div>

          {/* Sample Patient Highlight Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-brand-200 p-6 max-w-xl mx-auto shadow-card text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
                CareConnect Sample Patient
              </span>
              <span className="text-xs text-slate-500 font-medium">Sample Overview</span>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center shrink-0">
                PS
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Priya S. (32)</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  <strong className="text-slate-800">Condition:</strong> Active Care Plan • <strong className="text-slate-800">Meds:</strong> Amoxicillin (Antibiotic) & Paracetamol (Pain Reliever)
                </p>
                <div className="mt-2 text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 inline-block">
                  Symptom Status: Ready for daily check-in
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Gate Flow Graphic */}
      <section className="px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">CareConnect End-to-End Journey</h2>
            <p className="text-xs text-slate-500 mt-1">Prescription → Dashboard → Symptom → Safety Gate → AyurBook → Interaction Matrix</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 sm:gap-3 text-center">
            {[
              { title: "1. Prescriptions", desc: "Baseline loaded", color: "bg-teal-50 border-teal-200 text-teal-900" },
              { title: "2. Dashboard", desc: "Central hub", color: "bg-slate-50 border-slate-200 text-slate-800" },
              { title: "3. Symptom", desc: "Log symptom", color: "bg-amber-50 border-amber-200 text-amber-900" },
              { title: "4. Safety Gate", desc: "Red-flag check", color: "bg-rose-50 border-rose-200 text-rose-900" },
              { title: "5. AyurBook", desc: "Herbal explorer", color: "bg-emerald-50 border-emerald-200 text-emerald-900" },
              { title: "6. Check Matrix", desc: "Medicine × Remedy", color: "bg-brand-50 border-brand-200 text-brand-900" },
            ].map((step, idx) => (
              <div key={idx} className={`p-3 rounded-xl border text-xs font-medium ${step.color} shadow-xs`}>
                <div className="font-bold mb-1">{step.title}</div>
                <div className="text-[10px] opacity-80">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Non-Medical Disclaimer */}
      <section className="px-4 py-8">
        <div className="max-w-3xl mx-auto bg-slate-900 text-slate-200 p-6 rounded-2xl border border-slate-800 text-xs leading-relaxed">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>Medical Safety Disclaimer</span>
          </div>
          <p>
            CareConnect is a technology demonstration for post-discharge recovery monitoring. This application does NOT diagnose conditions, prescribe medications, instruct users to stop prescribed drugs, or replace professional medical advice. Always consult your physician before starting any new herbal remedy.
          </p>
        </div>
      </section>
    </div>
  );
};
