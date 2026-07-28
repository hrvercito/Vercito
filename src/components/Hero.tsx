/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  Globe2,
  Users,
  Building2,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTranslation } from '../i18n/LanguageContext';

interface HeroProps {
  onOpenAIEvaluator: () => void;
  onOpenAppointment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAIEvaluator, onOpenAppointment }) => {
  const { t } = useTranslation();
  const [quickCountry, setQuickCountry] = useState('Italy');
  const [quickDegree, setQuickDegree] = useState('Masters');
  const [quickIelts, setQuickIelts] = useState('6.5');

  return (
    <section className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#0B1F3A] text-white">
      {/* Ambient Radial Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-[#D4AF37]/15 via-[#0B1F3A]/60 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('hero.topBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              {t('hero.title1')} <br />
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenAIEvaluator}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E2C044] to-[#C5A028] text-[#0B1F3A] font-extrabold text-sm shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('hero.evaluateAi')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 hover:border-[#D4AF37]/50 transition-all flex items-center justify-center gap-2 backdrop-blur-md"
              >
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                <span>{t('hero.bookConsultation')}</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{t('hero.stat1Val')}</p>
                <p className="text-xs text-slate-400">{t('hero.stat1Label')}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white">{t('hero.stat2Val')}</p>
                <p className="text-xs text-slate-400">{t('hero.stat2Label')}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#D4AF37]">{t('hero.stat3Val')}</p>
                <p className="text-xs text-slate-400">{t('hero.stat3Label')}</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white">{t('hero.stat4Val')}</p>
                <p className="text-xs text-slate-400">{t('hero.stat4Label')}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Glassmorphism Quick Eligibility Widget & Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Glass Card Widget */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6 relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[#D4AF37]">
                    <Globe2 className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t('hero.widgetBadge')}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mt-1">{t('hero.widgetTitle')}</h2>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    {t('hero.widgetCountryLabel')}
                  </label>
                  <select
                    value={quickCountry}
                    onChange={(e) => setQuickCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A]/80 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Italy">Italy (DSU Scholarship - €0 Tuition)</option>
                    <option value="Germany">Germany (Tuition-Free Public Unis)</option>
                    <option value="France">France (Campus France & CAF Rent Subsidy)</option>
                    <option value="Hungary">Hungary (Stipendium Hungaricum Grant)</option>
                    <option value="Spain">Spain (Top Business & Engineering)</option>
                    <option value="Portugal">Portugal (Fast EU Residence Pathway)</option>
                    <option value="Poland">Poland (Low Living Cost & Full Work Permit)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('hero.widgetDegreeLabel')}
                    </label>
                    <select
                      value={quickDegree}
                      onChange={(e) => setQuickDegree(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A]/80 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Bachelors">Bachelors Degree</option>
                      <option value="Masters">Masters Degree</option>
                      <option value="PhD">PhD / Research</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      {t('hero.widgetScoreLabel')}
                    </label>
                    <select
                      value={quickIelts}
                      onChange={(e) => setQuickIelts(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1F3A]/80 border border-white/15 text-white text-xs font-medium focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="7.0+">IELTS 7.0+</option>
                      <option value="6.5">IELTS 6.5</option>
                      <option value="6.0">IELTS 6.0</option>
                      <option value="5.5">IELTS 5.5 / PTE</option>
                      <option value="MOI">English Medium (MOI)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenAIEvaluator}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] font-bold text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t('hero.analyzeBtn')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Guarantees */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Official Partner Unis
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Zero Hidden Costs
                </span>
              </div>
            </div>

            {/* Floating Highlight Badge */}
            <div className="absolute -bottom-6 -left-6 p-4 rounded-xl bg-[#0B1F3A] border border-[#D4AF37]/50 shadow-2xl flex items-center gap-3 hidden sm:flex z-20 backdrop-blur-md">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">DSU Scholarship Experts</p>
                <p className="text-[10px] text-slate-300">Italy €7,000/yr Grant Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
