"use client";

import React from 'react';
import { useDemo, DemoStep } from '@/context/DemoContext';
import { 
  Pill, 
  Activity, 
  BookOpen, 
  Clock, 
  ShieldAlert,
  User
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentStep, setStep } = useDemo();

  if (currentStep === 'LANDING' || currentStep === 'LOG_IN' || currentStep === 'SIGN_UP' || currentStep === 'FORGOT_PASSWORD') {
    return null;
  }

  const navItems: { step: DemoStep; label: string; icon: React.ReactNode }[] = [
    { step: 'DASHBOARD', label: 'Hub', icon: <Activity className="w-5 h-5" /> },
    { step: 'MEDICATIONS', label: 'Meds', icon: <Pill className="w-5 h-5" /> },
    { step: 'SAFETY_GATE', label: 'Safety', icon: <ShieldAlert className="w-5 h-5 text-amber-500" /> },
    { step: 'AYURBOOK', label: 'AyurBook', icon: <BookOpen className="w-5 h-5" /> },
    { step: 'TIMELINE', label: 'Timeline', icon: <Clock className="w-5 h-5" /> },
    { step: 'PROFILE', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 shadow-lg px-1.5 py-1.5">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = currentStep === item.step;
          return (
            <button
              key={item.step}
              onClick={() => setStep(item.step)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
                isActive
                  ? 'text-brand-600 font-bold bg-brand-50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span className="text-[9px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
