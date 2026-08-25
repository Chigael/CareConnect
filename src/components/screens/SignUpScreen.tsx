"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { HeartHandshake, User, Mail, Lock, AlertCircle, ArrowRight, Calendar, UserCheck, KeyRound } from 'lucide-react';

export const SignUpScreen: React.FC = () => {
  const { signUp, setUnverifiedEmail } = useAuth();
  const { setStep } = useDemo();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsExistingUser(false);

    // Validation
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    const numericAge = parseInt(age, 10);
    if (isNaN(numericAge) || numericAge < 18 || numericAge > 120) {
      setError('Please enter a valid age (18 or older).');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please retype carefully.');
      return;
    }

    setIsSubmitting(true);
    const result = await signUp(fullName, email, password, numericAge);
    setIsSubmitting(false);

    if (result.isExistingUser) {
      setIsExistingUser(true);
      setError("An account with this email already exists. Please log in instead.");
      return;
    }

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (result.isUnverified) {
      setUnverifiedEmail(email);
      setStep('VERIFY_EMAIL');
      return;
    }

    // Direct entry if verified immediately -> language selection
    setStep('LANGUAGE_SELECTION');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-lg mx-auto">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Create your CareConnect account
          </h1>
          <p className="text-xs text-slate-500">
            Join the post-discharge safety companion platform
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-5">
          
          {/* Duplicate Account Alert Banner */}
          {isExistingUser ? (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs text-amber-900 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-start gap-2.5">
                <UserCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950 text-xs">Account Already Exists</h4>
                  <p className="text-amber-800 leading-relaxed text-[11px] mt-0.5">
                    An account with <strong>{email}</strong> already exists. Please log in instead.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('LOG_IN')}
                  className="flex-1 py-2.5 px-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-center text-xs transition"
                >
                  Go to Login
                </button>
                <button
                  type="button"
                  onClick={() => setStep('FORGOT_PASSWORD')}
                  className="flex-1 py-2.5 px-3 bg-white hover:bg-amber-100/50 text-amber-900 border border-amber-300 font-bold rounded-xl text-center text-xs transition"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            {/* Email & Age Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Email Address *
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

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Age *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="number"
                    min="18"
                    max="120"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 34"
                    className="w-full text-xs pl-9 pr-2 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
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
              <span>{isSubmitting ? 'Creating account...' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Switch to Login */}
          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => setStep('LOG_IN')}
                className="text-brand-600 hover:text-brand-700 font-bold underline"
              >
                Log In
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
