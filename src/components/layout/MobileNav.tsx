"use client";

import React from 'react';
import { useDemo, DemoStep } from '@/context/DemoContext';
import { 
  Activity, 
  Pill, 
  BookOpen, 
  ShieldCheck, 
  User
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentStep, setStep } = useDemo();

  if (currentStep === 'LANDING' || currentStep === 'LOG_IN' || currentStep === 'SIGN_UP' || currentStep === 'FORGOT_PASSWORD') {
    return null;
  }

  const navItems: { step: DemoStep; label: string; icon: React.ReactNode }[] = [
    { step: 'DASHBOARD', label: 'Home', icon: <Activity className="w-5 h-5" /> },
    { step: 'MEDICATIONS', label: 'Meds', icon: <Pill className="w-5 h-5" /> },
    { step: 'AYURBOOK', label: 'AyurBook', icon: <BookOpen className="w-5 h-5" /> },
    { step: 'SAFETY_GATE', label: 'Safety', icon: <ShieldCheck className="w-5 h-5" /> },
    { step: 'PROFILE', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Fixed Bottom Tab Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 shadow-lg px-2 py-1.5">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = currentStep === item.step || (item.step === 'SAFETY_GATE' && currentStep === 'INTERACTION_RESULT');
            return (
              <button
                key={item.step}
                onClick={() => setStep(item.step)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                  isActive
                    ? 'text-brand-600 font-bold bg-brand-50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Centered Floating Bottom Dock Tab Bar */}
      <nav className="hidden sm:flex fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/90 z-50 shadow-xl rounded-full px-5 py-2 items-center gap-2 transition-all">
        {navItems.map((item) => {
          const isActive = currentStep === item.step || (item.step === 'SAFETY_GATE' && currentStep === 'INTERACTION_RESULT');
          return (
            <button
              key={item.step}
              onClick={() => setStep(item.step)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-teal-600 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
