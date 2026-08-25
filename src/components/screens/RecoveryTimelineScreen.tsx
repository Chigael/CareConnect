"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { Clock, CheckCircle2, Circle, Sparkles, RotateCcw, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const RecoveryTimelineScreen: React.FC = () => {
  const { timeline, patient, resetDemo, setStep } = useDemo();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-md">
                Step 9 • Recovery History
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-2">14-Day Post-Op Recovery Timeline</h1>
              <p className="text-xs text-slate-500">
                Patient: {patient.name} • {patient.condition}
              </p>
            </div>

            <button
              onClick={resetDemo}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-300 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start Demo Again</span>
            </button>
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft relative overflow-hidden">
          
          {/* Vertical timeline connector line */}
          <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-slate-200" />

          <div className="space-y-8 relative">
            {timeline.map((event) => {
              const isCompleted = event.status === 'COMPLETED';
              const isCurrent = event.status === 'CURRENT';

              return (
                <div key={event.id} className="flex items-start gap-4">
                  {/* Icon Node */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 ${
                    isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 shadow-md'
                      : isCompleted
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 border border-slate-300 text-slate-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      <Sparkles className="w-4 h-4 animate-spin-slow" />
                    ) : (
                      <Circle className="w-3 h-3" />
                    )}
                  </div>

                  {/* Content Box */}
                  <div className={`flex-1 p-4 rounded-2xl border text-xs transition ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-50/70 to-orange-50/70 border-amber-300 shadow-md'
                      : isCompleted
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-slate-50/40 border-slate-200/60 text-slate-400'
                  }`}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-slate-900 text-sm">
                        {event.title}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                        {event.date} • Day {event.day}
                      </span>
                    </div>

                    <p className={`mt-1 leading-relaxed ${isCurrent ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                      {event.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        event.category === 'DISCHARGE' ? 'bg-emerald-100 text-emerald-800' :
                        event.category === 'MEDICATION' ? 'bg-indigo-100 text-indigo-800' :
                        event.category === 'REMEDY' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        {event.category}
                      </span>

                      {isCurrent && (
                        <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          Active Today
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Completion Card */}
        <div className="bg-gradient-to-r from-brand-700 via-teal-700 to-emerald-700 text-white rounded-3xl p-6 shadow-card text-center space-y-3">
          <ShieldCheck className="w-10 h-10 text-brand-200 mx-auto" />
          <h3 className="text-xl font-extrabold">Full Hackathon Flow Complete!</h3>
          <p className="text-xs text-brand-100 max-w-md mx-auto leading-relaxed">
            You have experienced the complete 10-screen user journey of CareConnect: from prescription baseline → symptom log → red-flag safety gate → AyurBook → medicine-remedy interaction check → recovery timeline.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={resetDemo}
              className="bg-white hover:bg-brand-50 text-brand-900 font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
            >
              Replay Demo Flow
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
