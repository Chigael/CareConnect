"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useDemo } from '@/context/DemoContext';
import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
  const { session, isSupabaseConfigured, signOut } = useAuth();
  const { resetDemo } = useDemo();
  const { t } = useLanguage();

  const [confirmInput, setConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDeleteAccount = async () => {
    if (confirmInput.trim().toUpperCase() !== 'DELETE') return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      if (isSupabaseConfigured && session?.access_token) {
        const res = await fetch('/api/delete-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || 'Failed to delete user account from Supabase Auth.');
        }
      }

      await signOut();
      resetDemo('LANDING');
      setConfirmInput('');
      onClose();
    } catch (e: any) {
      console.error('Error deleting account:', e);
      setDeleteError(e.message || 'Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 max-w-md w-full rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                {t.deleteModal.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Irreversible Account Action</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Content */}
        <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl p-4 text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
          <p>{t.deleteModal.warning}</p>
        </div>

        {/* Error Alert */}
        {deleteError && (
          <div className="bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-800 rounded-2xl p-3 text-xs text-rose-900 dark:text-rose-200 font-medium">
            ⚠️ {deleteError}
          </div>
        )}

        {/* Confirmation Form */}
        <div className="space-y-2 text-xs">
          <label className="block font-bold text-slate-700 dark:text-slate-300">
            {t.deleteModal.confirmText}
          </label>
          <input
            type="text"
            value={confirmInput}
            onChange={(e) => setConfirmInput(e.target.value)}
            placeholder="DELETE"
            className="w-full text-xs px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl font-mono focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500 transition text-slate-900 dark:text-slate-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition"
          >
            {t.deleteModal.cancel}
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={confirmInput.trim().toUpperCase() !== 'DELETE' || isDeleting}
            className="flex-1 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <Trash2 className="w-4 h-4" />
            <span>{isDeleting ? 'Deleting...' : t.deleteModal.confirmDelete}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
