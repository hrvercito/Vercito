/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Sparkles, CheckCircle2, ChevronRight, Calculator, FileText, Send } from 'lucide-react';
import { Currency } from '../types';
import { useCMS } from '../context/CMSContext';
import { useTranslation } from '../i18n/LanguageContext';
import { CountrySelect } from './CountrySelect';

interface ScholarshipCalculatorProps {
  currency: Currency;
  onOpenAppointment: () => void;
  onOpenApplication: () => void;
}

export const ScholarshipCalculator: React.FC<ScholarshipCalculatorProps> = ({
  currency,
  onOpenAppointment,
  onOpenApplication,
}) => {
  const { t, language } = useTranslation();
  const isBn = language === 'bn';
  const { cmsData } = useCMS();
  const SCHOLARSHIPS = cmsData.scholarships;
  const [cgpa, setCgpa] = useState<number>(3.3);
  const [ielts, setIelts] = useState<number>(6.5);
  const [targetCountry, setTargetCountry] = useState<string>('Italy');

  const filteredScholarships = SCHOLARSHIPS.filter((s) => {
    const cgpaOk = cgpa >= s.minCGPA - 0.2; // leeway
    const ieltsOk = ielts >= s.minIELTS - 0.5;
    const countryOk = targetCountry === 'All' || s.country === targetCountry || s.country === 'All Europe';
    return cgpaOk && ieltsOk && countryOk;
  });

  return (
    <section id="scholarships" className="py-24 bg-slate-50 dark:bg-[#071426] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>{t('calculator.tag')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] dark:text-white tracking-tight">
            {t('calculator.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            {t('calculator.subtitle')}
          </p>
        </div>

        {/* Interactive Calculator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Controls Box */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 shadow-lg space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
              <Calculator className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white">
                Scholarship Criteria
              </h3>
            </div>

            {/* CGPA Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-200">
                <span>Academic CGPA / GPA:</span>
                <span className="font-extrabold text-[#D4AF37] text-sm">{cgpa.toFixed(2)} / 4.0</span>
              </div>
              <input
                type="range"
                min="2.5"
                max="4.0"
                step="0.05"
                value={cgpa}
                onChange={(e) => setCgpa(parseFloat(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>2.5 (Pass)</span>
                <span>3.2 (Good)</span>
                <span>4.0 (Outstanding)</span>
              </div>
            </div>

            {/* IELTS Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-medium text-slate-700 dark:text-slate-200">
                <span>IELTS Overall Band:</span>
                <span className="font-extrabold text-[#D4AF37] text-sm">{ielts.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="5.0"
                max="8.5"
                step="0.5"
                value={ielts}
                onChange={(e) => setIelts(parseFloat(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>5.5</span>
                <span>6.5</span>
                <span>8.0+</span>
              </div>
            </div>

            <CountrySelect
              value={targetCountry}
              onChange={setTargetCountry}
              label="Preferred Country"
            />

            {/* Assessment Note */}
            <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <p className="font-bold text-[#0B1F3A] dark:text-[#D4AF37] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                VERCITO DSU Guarantee
              </p>
              <p className="text-[11px] leading-relaxed">
                If family income is under €25,000/yr, Italian public universities offer guaranteed DSU tuition waivers + up to €7,000 cash grant!
              </p>
            </div>
          </div>

          {/* Matches List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#0B1F3A] dark:text-white">
                Eligible Scholarships ({filteredScholarships.length})
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Matching score based on {cgpa.toFixed(2)} CGPA & IELTS {ielts}
              </span>
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 text-center space-y-3">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  No direct automated match found for these precise sliders.
                </p>
                <p className="text-xs text-slate-500">
                  Our Gulshan counselors can evaluate alternative university-specific merit waivers for your exact profile.
                </p>
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B1F3A] font-bold text-xs"
                >
                  Consult Senior Counselor
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredScholarships.map((s) => (
                  <div
                    key={s.id}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0B1F3A] border border-slate-200 dark:border-white/10 hover:border-[#D4AF37] shadow-sm hover:shadow-xl transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#0B1F3A] dark:text-[#D4AF37]">
                            {s.country}
                          </span>
                          {s.isFullyFunded && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                              Fully Funded
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-lg font-bold text-[#0B1F3A] dark:text-white mt-1">
                          {s.name}
                        </h4>
                      </div>

                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Deadline: {s.deadline}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {s.description}
                    </p>

                    {/* Coverage Highlight */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-xs">
                      <span className="text-[10px] font-mono uppercase text-[#D4AF37] block font-bold">
                        Grant Coverage:
                      </span>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">
                        {s.coverage}
                      </p>
                    </div>

                    {/* Footer Row */}
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-[11px]">
                        <span>Min CGPA: <strong>{s.minCGPA}</strong></span>
                        <span>Min IELTS: <strong>{s.minIELTS}</strong></span>
                      </div>

                      <button
                        onClick={onOpenApplication}
                        className="py-2 px-4 rounded-xl bg-[#0B1F3A] dark:bg-[#D4AF37] text-[#D4AF37] dark:text-[#0B1F3A] font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1"
                      >
                        <span>Apply For Grant</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
