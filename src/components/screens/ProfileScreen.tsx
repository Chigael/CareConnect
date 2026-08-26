"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES_LIST } from '@/i18n';
import { DeleteAccountModal } from '@/components/modals/DeleteAccountModal';
import { 
  User, 
  Mail, 
  Pill, 
  Activity, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  FileText, 
  Lock,
  Globe,
  Sun,
  Moon,
  Trash2,
  Settings as SettingsIcon
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const { patient, medications, selectedLanguage, setSelectedLanguage, setStep, resetDemo } = useDemo();
  const { language, setLanguage, theme, toggleTheme, t } = useLanguage();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    resetDemo('LOG_IN');
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setSelectedLanguage(newLang);
  };

  const displayName = profile?.firstName || user?.user_metadata?.first_name || patient.name || 'CareConnect User';
  const displayEmail = profile?.email || user?.email || 'user@careconnect.health';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-28">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2.5 py-1 rounded-md border border-brand-200 dark:border-brand-800">
            {t.profile.userAccount}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">{t.profile.title}</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t.profile.subtitle}</p>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft">
          <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{displayName}</h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{displayEmail}</span>
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.profile.authenticated}</span>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 pt-5 text-xs">
            <div className="bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-400 block mb-1">User ID</span>
              <span className="font-mono text-slate-700 dark:text-slate-200 font-bold truncate block">
                {user?.id ? user.id.slice(0, 14) + '...' : 'user-id-active'}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
              <span className="text-[10px] font-semibold uppercase text-slate-400 dark:text-slate-400 block mb-1">RLS Protection</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold block">{t.profile.rlsActive}</span>
            </div>
          </div>
        </div>

        {/* Profile Sections List */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-2 border border-slate-200 dark:border-slate-700 shadow-soft divide-y divide-slate-100 dark:divide-slate-700">
          
          {/* Care Plan Information */}
          <button
            onClick={() => setStep('ONBOARDING')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-400 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.patientCarePlan}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{patient.condition}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* My Medicines */}
          <button
            onClick={() => setStep('MEDICATIONS')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-400 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.myMedicines}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{medications.length} Active Prescription{medications.length === 1 ? '' : 's'}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* My Recovery */}
          <button
            onClick={() => setStep('DASHBOARD')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.myRecovery}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Recovery Hub & Vital Stats</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Privacy & RLS */}
          <div className="p-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.privacySecurity}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Supabase RLS enabled • Data isolated per user ID</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Protected
            </span>
          </div>

        </div>

        {/* SETTINGS CARD SECTION */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <SettingsIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
              {t.profile.settings}
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Setting 1: Change Language */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-650">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.changeLanguage}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Current: <strong className="text-slate-800 dark:text-slate-200">{language}</strong></p>
                </div>
              </div>

              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
              >
                {SUPPORTED_LANGUAGES_LIST.map((lang) => (
                  <option key={lang.id} value={lang.name}>
                    {lang.flag} {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>

            {/* Setting 2: Dark Mode / Light Mode Toggle */}
            <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-650">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">{t.profile.theme}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Active: <strong className="text-slate-800 dark:text-slate-200">{theme === 'dark' ? t.profile.darkMode : t.profile.lightMode}</strong>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                  theme === 'dark' ? 'bg-brand-600' : 'bg-slate-300'
                }`}
                title="Toggle Dark/Light Mode"
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Setting 3: Delete Account Option */}
            <div className="bg-rose-50/50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-rose-950 dark:text-rose-200 text-xs sm:text-sm">{t.profile.dangerZone}</h4>
                    <p className="text-[11px] text-rose-700 dark:text-rose-300">{t.profile.deleteAccountDesc}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-xs transition shrink-0"
                >
                  {t.profile.deleteAccount}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Log Out Button */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-sm py-4 rounded-2xl border border-rose-200 dark:border-rose-800 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.nav.logout}</span>
          </button>
        </div>

      </div>

      {/* Delete Account Confirmation Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

