"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { 
  Coffee, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Pill, 
  ChevronLeft,
  Flame,
  Clock,
  HelpCircle,
  Lock,
  ThumbsUp,
  Meh,
  ThumbsDown,
  XCircle
} from 'lucide-react';

export const RemedyDetailScreen: React.FC = () => {
  const { selectedRemedy, medications, submitRemedyConfirmation, setStep, ayurbookLockUntil } = useDemo();

  // SECTION 8 State: Confirmation & Follow-up questions
  const [isDoing, setIsDoing] = useState<boolean | null>(null);
  const [yesOutcome, setYesOutcome] = useState<'Good' | 'Ok' | 'Bad' | null>(null);
  const [noReason, setNoReason] = useState<string | null>(null);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDoing === null) return;

    const response = isDoing ? (yesOutcome || 'Good') : (noReason || 'No ingredients');
    submitRemedyConfirmation(selectedRemedy.id, isDoing, response, customNotes);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Back Link */}
        <button
          onClick={() => setStep('AYURBOOK')}
          className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to AyurBook Explorer</span>
        </button>

        {/* Header Hero Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <Coffee className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-100 dark:bg-brand-950 px-2 py-0.5 rounded-md">
                  Herbal Remedy Profile
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">{selectedRemedy.name}</h1>
                <p className="text-xs font-medium italic text-slate-500 dark:text-slate-400">
                  {selectedRemedy.botanicalName} ({selectedRemedy.sanskritName})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{selectedRemedy.safetyRating} Profile</span>
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedRemedy.summary}
          </p>

          {/* Recommended For Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 uppercase">Target Symptoms:</span>
            {selectedRemedy.recommendedFor.map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-brand-50 dark:bg-brand-950/60 text-brand-800 dark:text-brand-300 px-2.5 py-1 rounded-lg border border-brand-200 dark:border-brand-800">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION 8: Ingredients & Preparation Method Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-soft space-y-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
            <Clock className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>Ingredients & Step-by-Step Preparation</span>
          </h3>

          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-600 space-y-2">
            <span className="text-[10px] font-extrabold uppercase text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-md">
              Preparation Instructions
            </span>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
              "{selectedRemedy.preparation}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl">
              <span className="text-slate-400 dark:text-slate-400 text-[10px] font-bold uppercase block">Active Compounds:</span>
              <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{selectedRemedy.activeCompounds.join(', ')}</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl">
              <span className="text-slate-400 dark:text-slate-400 text-[10px] font-bold uppercase block">Safety Rating:</span>
              <p className="font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">✓ {selectedRemedy.safetyRating} for concurrent usage</p>
            </div>
          </div>
        </div>

        {/* SECTION 8: Interactive Confirmation & Follow-up Questions Form */}
        {!isSubmitted ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-emerald-300 dark:border-emerald-700 shadow-card space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Remedy Confirmation & Tracker</h3>
            </div>

            <form onSubmit={handleConfirmSubmit} className="space-y-5">
              
              {/* Question 1: Are you doing this? Yes / No */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                  Question 1: Are you doing / trying this remedy now? *
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDoing(true);
                      setNoReason(null);
                    }}
                    className={`py-3.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 border transition ${
                      isDoing === true
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Yes (I am trying it)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDoing(false);
                      setYesOutcome(null);
                    }}
                    className={`py-3.5 px-4 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 border transition ${
                      isDoing === false
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4" />
                    <span>No (I will not try it)</span>
                  </button>
                </div>
              </div>

              {/* Follow-up Question IF YES: How is it working for you? (Good / Ok / Bad) */}
              {isDoing === true && (
                <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3 animate-in fade-in">
                  <label className="block text-xs font-extrabold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider">
                    Follow-up: How is it working for you? *
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setYesOutcome('Good')}
                      className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 border transition ${
                        yesOutcome === 'Good'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-emerald-950 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Good</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setYesOutcome('Ok')}
                      className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 border transition ${
                        yesOutcome === 'Ok'
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-700 hover:bg-amber-100'
                      }`}
                    >
                      <Meh className="w-4 h-4" />
                      <span>Ok (Neutral)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setYesOutcome('Bad')}
                      className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 border transition ${
                        yesOutcome === 'Bad'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                          : 'bg-white dark:bg-slate-700 text-rose-950 dark:text-rose-200 border-rose-200 dark:border-rose-700 hover:bg-rose-100'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Bad</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Follow-up Question IF NO: Why not? (No ingredients / Doctor advised against / Other) */}
              {isDoing === false && (
                <div className="bg-rose-50/70 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200 dark:border-rose-800 space-y-3 animate-in fade-in">
                  <label className="block text-xs font-extrabold text-rose-950 dark:text-rose-200 uppercase tracking-wider">
                    Follow-up: Why not? *
                  </label>

                  <div className="space-y-2">
                    {[
                      'No ingredients at home',
                      'Doctor / Pharmacist advised against',
                      'Other / Changed my mind'
                    ].map((reason) => (
                      <button
                        key={reason}
                        type="button"
                        onClick={() => setNoReason(reason)}
                        className={`w-full p-3 rounded-xl font-semibold text-xs text-left border transition ${
                          noReason === reason
                            ? 'bg-rose-600 text-white border-rose-600 font-bold'
                            : 'bg-white dark:bg-slate-700 text-rose-950 dark:text-rose-200 border-rose-200 dark:border-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {noReason === reason ? '✓ ' : ''}{reason}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {isDoing !== null && (
                <button
                  type="submit"
                  disabled={(isDoing && !yesOutcome) || (!isDoing && !noReason)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition disabled:opacity-40"
                >
                  <Lock className="w-4 h-4" />
                  <span>Submit Response & Lock AyurBook (25m Cooldown)</span>
                </button>
              )}

            </form>
          </div>
        ) : (
          /* Success & 25-Minute Lock Notification Card */
          <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 text-white rounded-3xl p-6 shadow-card space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold shrink-0">
                <Lock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-200 bg-emerald-800/60 px-2.5 py-0.5 rounded-md">
                  Response Logged • Cooldown Triggered
                </span>
                <h3 className="text-lg font-extrabold text-white mt-1">AyurBook Search Locked for 25 Minutes</h3>
              </div>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
              Thank you for submitting your feedback! To allow your body adequate time to process the remedy and prevent over-medicating, the AyurBook search feature is now frozen for 25 minutes.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep('AYURBOOK')}
                className="flex-1 bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold text-xs py-3.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
              >
                <span>View AyurBook Cooldown Screen</span>
                <ArrowRight className="w-4 h-4 text-emerald-800" />
              </button>

              <button
                onClick={() => setStep('DASHBOARD')}
                className="bg-emerald-800/70 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 px-4 rounded-xl border border-emerald-600/50 transition"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

