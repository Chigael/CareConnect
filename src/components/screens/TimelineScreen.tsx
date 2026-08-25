"use client";

import React from 'react';
import { useDemo } from '@/context/DemoContext';
import { 
  Clock, 
  CheckCircle2, 
  Pill, 
  Activity, 
  Sparkles, 
  Calendar,
  FileCheck
} from 'lucide-react';

export const TimelineScreen: React.FC = () => {
  const { timelineEvents, setStep } = useDemo();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'MEDICATION':
        return <Pill className="w-4 h-4 text-emerald-600" />;
      case 'SYMPTOM':
        return <Activity className="w-4 h-4 text-amber-600" />;
      case 'REMEDY':
        return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'DISCHARGE':
        return <FileCheck className="w-4 h-4 text-brand-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
    }
  };

  const getBadgeStyle = (badgeColor: string) => {
    switch (badgeColor) {
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'teal':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rose':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-28">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Page Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-100 px-2.5 py-1 rounded-md">
            Care History
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Recovery Timeline</h1>
          <p className="text-xs text-slate-500">Track your daily dosage events, logged symptoms, and milestones over time.</p>
        </div>

        {/* Timeline Events Container */}
        {timelineEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">No Timeline Activity Yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your logged medication doses, symptom check-ins, and remedy safety checks will automatically appear here.
            </p>
            <button
              onClick={() => setStep('MEDICATIONS')}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
            >
              <Pill className="w-4 h-4" />
              <span>Go to Medicines</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft relative">
            <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
              {timelineEvents.map((event) => (
                <div key={event.id} className="relative flex items-start gap-4 pl-1 group">
                  
                  {/* Timeline Dot Icon */}
                  <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-200 text-slate-600 flex items-center justify-center shrink-0 z-10 shadow-xs group-hover:border-brand-500 transition-colors">
                    {getCategoryIcon(event.category)}
                  </div>

                  {/* Timeline Event Content Card */}
                  <div className="flex-1 bg-slate-50 hover:bg-slate-100/80 p-4 rounded-2xl border border-slate-150 transition space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(event.badgeColor)}`}>
                        {event.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm">{event.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
