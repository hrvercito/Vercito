/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UNIVERSITY_PARTNERS } from '../data/mockData';
import { Building2, Search, GraduationCap, Award, ChevronRight, ExternalLink } from 'lucide-react';
import { Currency } from '../types';

interface UniversityPartnersProps {
  currency: Currency;
  onSelectUniversityForApplication: (uniName: string) => void;
}

export const UniversityPartners: React.FC<UniversityPartnersProps> = ({
  currency,
  onSelectUniversityForApplication,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState('All');

  const EUR_TO_BDT_RATE = 132;
  const formatMoney = (amountEUR: number) => {
    if (amountEUR === 0) return 'Tuition Free (€0)';
    if (currency === 'BDT') {
      const bdt = Math.round(amountEUR * EUR_TO_BDT_RATE);
      return `৳${bdt.toLocaleString('en-IN')}/yr`;
    }
    return `€${amountEUR.toLocaleString('en-US')}/yr`;
  };

  const countriesList = ['All', 'Italy', 'Germany', 'France', 'Spain', 'Hungary', 'Portugal'];

  const filteredUnis = UNIVERSITY_PARTNERS.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.featuredPrograms.some((p) => p.toLowerCase().includes(search.toLowerCase()));

    const matchesCountry = selectedCountryFilter === 'All' || u.country === selectedCountryFilter;

    return matchesSearch && matchesCountry;
  });

  return (
    <section id="universities" className="py-24 bg-white dark:bg-[#0B1F3A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>World-Ranked European Institutions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            Partner Public & Private Universities
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            VERCITO works directly with renowned European institutions to ensure high acceptance rates, fast offer letter turnarounds, and English medium waiver options.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search university, program, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {countriesList.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCountryFilter(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCountryFilter === c
                    ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                }`}
              >
                {c === 'All' ? 'All European Unis' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnis.map((uni) => (
            <div
              key={uni.id}
              className="rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={uni.image}
                  alt={uni.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-black/30" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2">
                  <span>{uni.logo}</span>
                  <span>{uni.country}</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold uppercase">
                  QS Rank #{uni.ranking}
                </div>

                <div className="absolute bottom-3 left-3 text-white text-xs font-medium">
                  {uni.city} • Est. {uni.established}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white leading-snug mb-2">
                    {uni.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs mb-3 text-slate-600 dark:text-slate-300">
                    <span>Type: <strong>{uni.type}</strong></span>
                    <span className="font-bold text-[#0B1F3A] dark:text-[#D4AF37]">
                      {formatMoney(uni.tuitionFeePerYearEUR)}
                    </span>
                  </div>

                  {/* Featured Programs */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                      Featured Programs:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-200">
                      {uni.featuredPrograms.map((prog, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{prog}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Scholarships Available */}
                  {uni.scholarshipsOffered.length > 0 && (
                    <div className="mt-3 p-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] text-slate-800 dark:text-slate-200">
                      <strong className="text-[#0B1F3A] dark:text-[#D4AF37] block font-bold">Grants Offered:</strong>
                      <span>{uni.scholarshipsOffered.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <button
                    onClick={() => onSelectUniversityForApplication(uni.name)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Apply to {uni.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
