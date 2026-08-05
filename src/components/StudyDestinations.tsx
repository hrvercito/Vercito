/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CountryDestination, Currency } from '../types';
import { useCMS } from '../context/CMSContext';
import { useTranslation } from '../i18n/LanguageContext';
import {
  Globe2,
  Euro,
  GraduationCap,
  Briefcase,
  Check,
  ChevronRight,
  Filter,
  X,
  Search,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StudyDestinationsProps {
  currency: Currency;
  onSelectCountryForApplication: (countryName: string) => void;
  onOpenAIEvaluator?: () => void;
}

export const StudyDestinations: React.FC<StudyDestinationsProps> = ({
  currency,
  onSelectCountryForApplication,
  onOpenAIEvaluator,
}) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const { cmsData } = useCMS();
  const COUNTRY_DESTINATIONS = cmsData.destinations;
  const [selectedCountry, setSelectedCountry] = useState<CountryDestination | null>(null);
  const [filterScholarship, setFilterScholarship] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const EUR_TO_BDT_RATE = 132; // 1 EUR = ~132 BDT

  const formatMoney = (amountEUR: number) => {
    if (currency === 'BDT') {
      const bdtAmount = Math.round(amountEUR * EUR_TO_BDT_RATE);
      return `৳${bdtAmount.toLocaleString('en-IN')}`;
    }
    return `€${amountEUR.toLocaleString('en-US')}`;
  };

  const filteredCountries = COUNTRY_DESTINATIONS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.popularMajors.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesScholarship =
      filterScholarship === 'All' ||
      (filterScholarship === 'Full Grant' && c.scholarshipAvailability === 'Full Grant Available') ||
      (filterScholarship === 'High' && (c.scholarshipAvailability === 'High' || c.scholarshipAvailability === 'Full Grant Available'));

    return matchesSearch && matchesScholarship;
  });

  return (
    <section id="destinations" className="py-24 bg-slate-50 dark:bg-[#071426] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>{t('destinations.tag')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('destinations.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {t('destinations.subtitle')}
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isBn ? "দেশ, রাজধানী বা বিষয় খুঁজুন..." : "Search country, capital, or major..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Scholarship Filter Pills */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
              Grant:
            </span>
            {['All', 'Full Grant', 'High'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterScholarship(tag)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterScholarship === tag
                    ? 'bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] shadow-md'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {tag === 'All' ? 'All European Nations' : tag === 'Full Grant' ? 'Full Scholarship Nations' : 'High Funding Opportunities'}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.map((country) => (
            <motion.div
              key={country.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 overflow-hidden shadow-md hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={country.image}
                  alt={country.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-black/30" />

                {/* Country Flag & Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                </div>

                {/* Scholarship Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-[#0B1F3A] text-[10px] font-extrabold uppercase tracking-wider shadow">
                  {country.scholarshipAvailability}
                </div>

                {/* Capital & Visa Rate */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-medium text-slate-200">Capital: {country.capital}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {country.visaSuccessRate}% Visa Rate
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {country.overview}
                  </p>

                  {/* Pricing Key Facts */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs">
                    <div>
                      <span className="text-slate-600 dark:text-slate-300 block text-[10px] uppercase font-mono">Tuition / Year</span>
                      <span className="font-bold text-[#0B1F3A] dark:text-[#D4AF37]">
                        {country.tuitionRange.min === 0
                          ? '€0 (Free Public)'
                          : `${formatMoney(country.tuitionRange.min)} - ${formatMoney(country.tuitionRange.max)}`}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-600 dark:text-slate-300 block text-[10px] uppercase font-mono">Living / Month</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {formatMoney(country.livingCostMonthly.min)} - {formatMoney(country.livingCostMonthly.max)}
                      </span>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {country.keyHighlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCountry(country)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-[#0B1F3A] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#0B1F3A] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Guide</span>
                  </button>

                  <button
                    onClick={() => onSelectCountryForApplication(country.name)}
                    className="py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1"
                  >
                    <span>Apply</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Comprehensive Country Deep-Dive */}
        <AnimatePresence>
          {selectedCountry && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#0B1F3A] rounded-2xl overflow-y-auto border border-slate-200 dark:border-white/15 shadow-2xl text-slate-900 dark:text-white p-6 sm:p-8 space-y-6 relative"
              >
                {/* Modal Close Button */}
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="flex items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-3xl shadow">
                    {selectedCountry.flag}
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0B1F3A] dark:text-white">
                      Study in {selectedCountry.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Capital: {selectedCountry.capital} • {selectedCountry.topUniversitiesCount}+ Top Institutions
                    </p>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">Overview</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedCountry.overview}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Tuition Fee / Year</span>
                    <p className="text-sm font-bold text-[#0B1F3A] dark:text-[#D4AF37]">
                      {selectedCountry.tuitionRange.min === 0
                        ? '€0 / Year (Public Universities Tuition-Free)'
                        : `${formatMoney(selectedCountry.tuitionRange.min)} - ${formatMoney(selectedCountry.tuitionRange.max)}`}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Living Expense / Month</span>
                    <p className="text-sm font-bold text-[#0B1F3A] dark:text-white">
                      {formatMoney(selectedCountry.livingCostMonthly.min)} - {formatMoney(selectedCountry.livingCostMonthly.max)}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Student Work Permit</span>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {selectedCountry.workRights}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Post-Study Work Visa</span>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {selectedCountry.postStudyWorkVisa}
                    </p>
                  </div>
                </div>

                {/* Popular Majors & Intakes */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Popular Subjects & Intakes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCountry.popularMajors.map((m, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-white/10 text-xs text-slate-700 dark:text-slate-200 font-medium"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-700 dark:text-slate-200">Primary Intakes:</strong>{' '}
                    {selectedCountry.intakeSeasons.join(', ')} •{' '}
                    <strong className="text-slate-700 dark:text-slate-200">Language:</strong>{' '}
                    {selectedCountry.languageRequirement}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      const cName = selectedCountry.name;
                      setSelectedCountry(null);
                      onSelectCountryForApplication(cName);
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg hover:brightness-110 transition-all text-center"
                  >
                    Apply for {selectedCountry.name} Admissions
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCountry(null);
                      onOpenAIEvaluator?.();
                    }}
                    className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-white font-semibold text-xs hover:bg-slate-200 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Check AI Match</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
