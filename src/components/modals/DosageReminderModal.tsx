"use client";

import React, { useEffect, useRef } from 'react';
import { useDemo } from '@/context/DemoContext';
import { Pill, Bell, Check, X, Clock, AlertCircle, Volume2 } from 'lucide-react';

export const DosageReminderModal: React.FC = () => {
  const { activeReminderMedication, setActiveReminderMedication, recordDosageAdherence } = useDemo();
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!activeReminderMedication) return;

    // Web Audio API chime synthesis
    let intervalId: any = null;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const playTone = () => {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
          osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 0.45);
        };

        playTone();
        intervalId = setInterval(playTone, 2500);
      }
    } catch (e) {
      console.warn("Web Audio API not supported or blocked");
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [activeReminderMedication]);

  if (!activeReminderMedication) return null;

  const handleAction = (status: 'TAKEN' | 'SKIPPED' | 'SNOOZED') => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    recordDosageAdherence(activeReminderMedication.id, status);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
        
        {/* Glowing Bell Banner */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
          <Bell className="w-10 h-10 animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
          </span>
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-800 bg-brand-100 px-3 py-1 rounded-full border border-brand-200 inline-flex items-center gap-1.5">
            <Volume2 className="w-3 h-3 text-brand-700" />
            <span>Time for Scheduled Medication</span>
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">
            {activeReminderMedication.name}
          </h2>
          <p className="text-xs font-semibold text-brand-600 mt-0.5">
            {activeReminderMedication.dosage} • {activeReminderMedication.frequency}
          </p>
        </div>

        {/* Prescription Details Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-500 text-[11px]">
            <span>Scheduled Time: <strong>{activeReminderMedication.reminderTime || '08:00 AM'}</strong></span>
            <span className="font-semibold text-slate-700">{activeReminderMedication.category}</span>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/60">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Instructions:</span>
            <p className="font-semibold text-slate-800 text-xs mt-0.5 leading-relaxed">
              {activeReminderMedication.instructions || 'Take as directed by your physician.'}
            </p>
          </div>
        </div>

        {/* 3 Action Buttons */}
        <div className="space-y-2.5">
          
          {/* Button 1: Yes (taken) */}
          <button
            onClick={() => handleAction('TAKEN')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition group"
          >
            <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Yes (Taken)</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Button 2: No (not taking) */}
            <button
              onClick={() => handleAction('SKIPPED')}
              className="flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-900 font-extrabold text-xs py-3.5 rounded-xl border border-rose-200 transition"
            >
              <X className="w-4 h-4 text-rose-600" />
              <span>No (Not Taking)</span>
            </button>

            {/* Button 3: Snooze */}
            <button
              onClick={() => handleAction('SNOOZED')}
              className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs py-3.5 rounded-xl border border-amber-200 transition"
            >
              <Clock className="w-4 h-4 text-amber-700" />
              <span>Snooze (15m)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
