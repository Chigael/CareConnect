"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { Mail, AlertCircle, CheckCircle2, ArrowRight, ChevronLeft } from 'lucide-react';

export const ForgotPasswordScreen: React.FC = () => {
  const { resetPassword } = useAuth();
  const { setStep } = useDemo();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const { error: resetError } = await resetPassword(email);
    setIsSubmitting(false);

    if (resetError) {
      setError(resetError.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">

        <button
          onClick={() => setStep('LOG_IN')}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Log In</span>
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter your email to receive a password reset link from Supabase
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Password reset instructions have been sent to your email. Check your inbox.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'Sending email...' : 'Send Reset Link'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
