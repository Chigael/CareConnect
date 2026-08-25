"use client";

import React, { useState } from 'react';
import { useDemo, STEP_ORDER, STEP_LABELS, DemoStep } from '@/context/DemoContext';
import { ChevronRight, ChevronLeft, Layers, Sparkles } from 'lucide-react';

export const FlowStepper: React.FC = () => {
  const { currentStep, stepIndex, setStep, nextStep, prevStep } = useDemo();
  const [isOpen, setIsOpen] = useState(false);

  // Show top step bar ONLY for true one-time sequential signup/setup flows
  const setupSteps: DemoStep[] = ['SIGN_UP', 'LOG_IN', 'FORGOT_PASSWORD', 'LANGUAGE_SELECTION', 'POST_SIGNUP_SETUP'];
  if (!setupSteps.includes(currentStep)) return null;

  const total = setupSteps.length;
  const currentSetupIndex = setupSteps.indexOf(currentStep);
  const progressPercent = Math.round(((currentSetupIndex + 1) / total) * 100);

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Step Info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1.5 rounded-lg border border-slate-700 transition"
            title="Click to jump to any screen"
          >
            <Layers className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-semibold text-brand-300">Step {stepIndex + 1}/{total}</span>
          </button>

          <div className="hidden sm:block">
            <h4 className="text-xs font-semibold text-slate-100 leading-tight">
              {STEP_LABELS[currentStep].title}
            </h4>
            <p className="text-[11px] text-slate-400">
              {STEP_LABELS[currentStep].subtitle}
            </p>
          </div>
        </div>

        {/* Middle: Progress bar */}
        <div className="flex-1 max-w-xs mx-2">
          <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
            <span>Demo Journey</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-brand-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right: Step Navigation Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={prevStep}
            disabled={stepIndex === 0}
            className="p-1.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextStep}
            disabled={stepIndex === total - 1}
            className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-40 transition"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Selector Drawer */}
      {isOpen && (
        <div className="bg-slate-950 border-t border-slate-800 px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-400" />
                Jump to any MVP screen:
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline"
              >
                Close menu
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STEP_ORDER.map((stepKey, idx) => {
                const isActive = stepKey === currentStep;
                return (
                  <button
                    key={stepKey}
                    onClick={() => {
                      setStep(stepKey);
                      setIsOpen(false);
                    }}
                    className={`text-left p-2 rounded-lg border text-xs transition ${
                      isActive
                        ? 'bg-brand-950 border-brand-500 text-brand-200 font-semibold'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] text-slate-500 font-bold mb-0.5">
                      {idx + 1}. {stepKey.replace('_', ' ')}
                    </div>
                    <div className="truncate text-[11px]">{STEP_LABELS[stepKey].title}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
