"use client";

import React, { useState } from 'react';
import { useDemo } from '@/context/DemoContext';
import { AYURBOOK_REMEDIES, Remedy } from '@/data/mockData';
import { Search, BookOpen, Sparkles, ShieldCheck, ArrowRight, Coffee, Leaf, Shield, CheckCircle2 } from 'lucide-react';

export const AyurBookScreen: React.FC = () => {
  const { setSelectedRemedy, setStep, symptom } = useDemo();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Digestive & Anti-Nausea', 'Digestive & Antispasmodic', 'Mucosal Protection', 'Immunity & Stress Relief'];

  const filteredRemedies = AYURBOOK_REMEDIES.filter(rem => {
    const matchesSearch = rem.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rem.botanicalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rem.sanskritName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || rem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectRemedy = (remedy: Remedy) => {
    setSelectedRemedy(remedy);
    setStep('REMEDY_DETAIL');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 pb-24">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
              Step 6 • Herbal Remedy Catalog
            </span>
            <span className="text-xs text-emerald-700 font-medium">Safety-Screened Database</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">AyurBook Remedy Explorer</h1>
          <p className="text-xs text-slate-500">
            Select a traditional remedy to check compatibility against Ananya's active medications.
          </p>
        </div>

        {/* Recommended Remedy Callout for Active Symptom */}
        <div className="bg-gradient-to-r from-brand-600 to-teal-700 text-white rounded-2xl p-5 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-200" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-200">
                Tailored Recommendation for "{symptom.symptom}"
              </span>
            </div>
            <h3 className="text-lg font-extrabold">Ginger Tea (Zingiber officinale)</h3>
            <p className="text-xs text-brand-100">
              Classic botanical remedy for post-operative stomach uneasiness & mild nausea.
            </p>
          </div>
          <button
            onClick={() => handleSelectRemedy(AYURBOOK_REMEDIES[0])}
            className="w-full sm:w-auto bg-white text-brand-900 hover:bg-brand-50 font-bold text-xs px-5 py-3 rounded-xl shadow-md transition shrink-0 flex items-center justify-center gap-1.5"
          >
            <span>Select Ginger Tea</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by remedy name (e.g. Ginger, Mentha, Yasthimadhu)..."
              className="w-full text-xs pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-brand-600 border-brand-600 text-white shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Remedy List Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredRemedies.map((remedy) => (
            <div
              key={remedy.id}
              onClick={() => handleSelectRemedy(remedy)}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-400 shadow-soft hover:shadow-card cursor-pointer transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                    {remedy.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    {remedy.safetyRating}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-700 transition">
                  {remedy.name}
                </h3>
                <p className="text-xs font-medium italic text-slate-500 mb-2">
                  {remedy.botanicalName} ({remedy.sanskritName})
                </p>

                <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                  {remedy.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-brand-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Detail & Check Interactions &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
