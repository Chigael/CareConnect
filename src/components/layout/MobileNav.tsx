"use client";

import React from 'react';
import { useDemo, DemoStep } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Home, 
  Pill, 
  BookOpen, 
  Clock 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentStep, setStep } = useDemo();
  const { t } = useLanguage();

  if (currentStep === 'LANDING' || currentStep === 'LOG_IN' || currentStep === 'SIGN_UP' || currentStep === 'FORGOT_PASSWORD') {
    return null;
  }

  const navItems: { step: DemoStep; label: string; icon: React.ReactNode; matchSteps: DemoStep[] }[] = [
    { 
      step: 'DASHBOARD', 
      label: t.nav.home, 
      icon: <Home className="w-5 h-5" />,
      matchSteps: ['DASHBOARD', 'SYMPTOM_CHECKIN'] 
    },
    { 
      step: 'MEDICATIONS', 
      label: t.nav.medicines, 
      icon: <Pill className="w-5 h-5" />,
      matchSteps: ['MEDICATIONS', 'MANUAL_MEDICINE_ENTRY', 'PRESCRIPTION_UPLOAD', 'ONBOARDING'] 
    },
    { 
      step: 'AYURBOOK', 
      label: t.nav.ayurbook, 
      icon: <BookOpen className="w-5 h-5" />,
      matchSteps: ['AYURBOOK', 'SAFETY_GATE', 'INTERACTION_RESULT', 'REMEDY_DETAIL'] 
    },
    { 
      step: 'TIMELINE', 
      label: t.nav.timeline, 
      icon: <Clock className="w-5 h-5" />,
      matchSteps: ['TIMELINE'] 
    },
  ];

  return (
    <>
      {/* Mobile Fixed 4-Tab Bottom Bar */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 z-50 shadow-lg px-2 py-1.5">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = item.matchSteps.includes(currentStep);
            return (
              <button
                key={item.step}
                onClick={() => setStep(item.step)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 font-bold bg-brand-50 dark:bg-brand-950/60'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {item.icon}
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Centered Floating 4-Tab Bottom Dock */}
      <nav className="hidden sm:flex fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border border-slate-200/90 dark:border-slate-700 z-50 shadow-xl rounded-full px-5 py-2 items-center gap-3 transition-all">
        {navItems.map((item) => {
          const isActive = item.matchSteps.includes(currentStep);
          return (
            <button
              key={item.step}
              onClick={() => setStep(item.step)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-teal-600 text-white shadow-md shadow-brand-500/20'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700'
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

