"use client";

import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-amber-500/10 border-b border-amber-200/60 px-4 py-2.5 text-xs text-slate-700">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-tight">
            <span className="font-semibold text-amber-900">Prototype Demo Mode:</span> Interaction results are mock data only. CareConnect does not replace medical advice or doctors.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-brand-700 bg-brand-100/70 px-2.5 py-0.5 rounded-full border border-brand-200 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Safety First Protocol</span>
        </div>
      </div>
    </div>
  );
};
