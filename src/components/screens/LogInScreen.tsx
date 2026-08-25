"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { HeartHandshake, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

export const LogInScreen: React.FC = () => {
  const { signIn, setUnverifiedEmail } = useAuth();
  const { setStep, realUserMedicines } = useDemo();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(email, password);
    setIsSubmitting(false);

    if (result.isUnverified) {
      setUnverifiedEmail(email);
      setStep('VERIFY_EMAIL');
      return;
    }

    if (result.error) {
      setError(result.error.message);
    } else {
      // Verified returning user: if medicines already set, go straight to DASHBOARD, else POST_SIGNUP_SETUP
      if (realUserMedicines.length > 0) {
        setStep('DASHBOARD');
      } else {
        setStep('POST_SIGNUP_SETUP');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg mx-auto">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome back 👋
          </h1>
          <p className="text-xs text-slate-500">
            Log in to manage your post-discharge recovery companion
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Email Address
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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setStep('FORGOT_PASSWORD')}
                  className="text-[11px] text-brand-600 hover:text-brand-700 font-semibold"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-teal-600 hover:from-brand-700 hover:to-teal-700 text-white font-bold text-sm py-4 rounded-xl shadow-lg shadow-brand-500/20 transition disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'Logging in...' : 'Log In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to SignUp */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <button
                onClick={() => setStep('SIGN_UP')}
                className="text-brand-600 hover:text-brand-700 font-bold underline"
              >
                Create one
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
