"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { MailCheck, RefreshCw, ArrowRight, AlertCircle, CheckCircle2, ChevronLeft, Lock } from 'lucide-react';

export const VerifyEmailScreen: React.FC = () => {
  const { unverifiedEmail, checkEmailVerified, resendVerificationEmail } = useAuth();
  const { setStep } = useDemo();

  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const displayEmail = unverifiedEmail || 'your registered email';

  const handleCheckVerification = async () => {
    setIsChecking(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const isVerified = await checkEmailVerified();
    setIsChecking(false);

    if (isVerified) {
      setStep('LANGUAGE_SELECTION');
    } else {
      setErrorMessage("Your email address is not verified yet. Please check your email inbox and click the verification link sent by CareConnect.");
    }
  };

  const handleResendEmail = async () => {
    if (!unverifiedEmail) {
      setErrorMessage("No email address found to resend. Please log in again.");
      return;
    }

    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { error } = await resendVerificationEmail(unverifiedEmail);
    setIsResending(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage(`A new verification link has been sent to ${unverifiedEmail}. Check your inbox or spam folder.`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">

        {/* Back Link */}
        <button
          onClick={() => setStep('LOG_IN')}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Log In</span>
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-lg mx-auto">
            <MailCheck className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Verify your email
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            We've sent a verification link to <strong className="text-slate-800 font-semibold">{displayEmail}</strong>. Please check your inbox and verify your email before continuing.
          </p>
        </div>

        {/* Action Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">

          {errorMessage && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-2.5 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <Lock className="w-4 h-4 text-brand-600" />
              <span>Security Access Guard</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Access to your personalized CareConnect recovery dashboard is protected and requires an authenticated, verified email address.
            </p>
          </div>

          <div className="space-y-3 pt-1">
            <button
              onClick={handleCheckVerification}
              disabled={isChecking}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition disabled:opacity-50"
            >
              <span>{isChecking ? 'Checking verification status...' : "I've Verified My Email / Continue"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResendEmail}
              disabled={isResending}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs py-3 rounded-xl border border-slate-300 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isResending ? 'animate-spin' : ''}`} />
              <span>{isResending ? 'Resending email...' : 'Resend Verification Email'}</span>
            </button>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Need to use a different email?{' '}
              <button
                onClick={() => setStep('SIGN_UP')}
                className="text-brand-600 hover:text-brand-700 font-bold underline"
              >
                Sign Up Again
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
