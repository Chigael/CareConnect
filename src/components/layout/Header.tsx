"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { HeartHandshake, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentStep, setStep } = useDemo();
  const { profile, user } = useAuth();
  const { t } = useLanguage();

  const displayName = profile?.firstName || user?.user_metadata?.first_name || 'Patient';
  const isLoggedIn = Boolean(user || profile);
  const isAuthScreen = currentStep === 'LANDING' || currentStep === 'SIGN_UP' || currentStep === 'LOG_IN' || currentStep === 'FORGOT_PASSWORD';

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-xs">
      <div className="max-w-full mx-6 px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand logo & name */}
        <button
          onClick={() => setStep(isLoggedIn ? 'DASHBOARD' : 'LANDING')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <img
            src="/logo.svg"
            alt="CareConnect Logo"
            className="w-10 h-10 object-contain rounded-xl shadow-xs group-hover:scale-105 transition-transform"
          />
           <img
            src="/CareConnect Logo Dark.png"
            alt="CareConnect Logo"
            className="h-8 sm:h-9 w-auto object-contain hidden dark:block group-hover:scale-102 transition-transform duration-200"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 dark:text-slate-100 tracking-tight">CareConnect</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">{t.nav.subtitle}</p>
          </div>
        </button>

        {/* Top-Right Profile Icon Button */}
        {!isAuthScreen || isLoggedIn ? (
          <button
            onClick={() => setStep('PROFILE')}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition shadow-xs ${
              currentStep === 'PROFILE'
                ? 'bg-brand-50 dark:bg-brand-950 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-300 font-bold ring-2 ring-brand-400/20'
                : 'bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-650 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
            }`}
            title="View Profile & Account Settings"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-brand-600 to-teal-500 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
              {displayName.slice(0, 1).toUpperCase()}
            </div>
            <span className="text-xs font-bold hidden sm:inline max-w-[120px] truncate">
              {displayName}
            </span>
            <User className="w-4 h-4 text-slate-500 dark:text-slate-400 sm:hidden" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setStep('LOG_IN')}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-lg transition"
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => setStep('SIGN_UP')}
              className="bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition"
            >
              {t.nav.signup}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

