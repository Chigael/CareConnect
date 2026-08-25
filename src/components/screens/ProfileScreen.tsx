"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
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
  HeartHandshake
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { user, profile, signOut, isDemoMode } = useAuth();
  const { patient, setStep, resetDemo } = useDemo();

  const handleLogout = async () => {
    await signOut();
    resetDemo();
    setStep('LANDING');
  };

  const displayName = profile?.firstName || user?.user_metadata?.first_name || (isDemoMode ? patient.name : 'CareConnect User');
  const displayEmail = profile?.email || user?.email || (isDemoMode ? 'ananya.demo@careconnect.health' : 'user@careconnect.health');

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header Title */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
            User Account
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Profile & Settings</h1>
          <p className="text-xs text-slate-500">Manage account information, medicines, and privacy settings</p>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 text-white font-black text-2xl flex items-center justify-center shadow-md shrink-0">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">{displayName}</h2>
                {isDemoMode && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                    Fictional Demo Mode
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{displayEmail}</span>
              </p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authenticated via Supabase Auth</span>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-3 pt-5 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">User ID</span>
              <span className="font-mono text-slate-700 font-bold truncate block">
                {user?.id ? user.id.slice(0, 14) + '...' : 'demo-user-id'}
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-semibold uppercase text-slate-400 block mb-1">RLS Protection</span>
              <span className="text-emerald-700 font-bold block">Active (Row-Level Security)</span>
            </div>
          </div>
        </div>

        {/* Profile Sections List */}
        <div className="bg-white rounded-3xl p-2 border border-slate-200 shadow-soft divide-y divide-slate-100">
          
          {/* Recovery Information */}
          <button
            onClick={() => setStep('ONBOARDING')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Recovery Information</h4>
                <p className="text-[11px] text-slate-500">Post-Op Appendectomy Recovery • Day 4/14</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* My Medicines */}
          <button
            onClick={() => setStep('MEDICATIONS')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">My Medicines</h4>
                <p className="text-[11px] text-slate-500">2 Active Prescriptions (Amoxicillin, Paracetamol)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* My Recovery */}
          <button
            onClick={() => setStep('DASHBOARD')}
            className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-2xl transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">My Recovery</h4>
                <p className="text-[11px] text-slate-500">Recovery Hub & Vital Stats</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Privacy & RLS */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Privacy & Data Security</h4>
                <p className="text-[11px] text-slate-500">Supabase RLS enabled • Data isolated per user ID</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
              Protected
            </span>
          </div>

        </div>

        {/* Log Out Button */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-sm py-4 rounded-2xl border border-rose-200 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

      </div>
    </div>
  );
};
